// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'Canonicalizer',

  documentation: `This component expects to receive AST nodes. Canonical versions
    of definitions will be created from AST nodes.

    Please note that canonicalization for same IDL fragment repository cannot
    be distributed. All computations for the same repository must be done
    through one canonicalizer instances, or you will get fragmented results.`,

  requires: [
    'org.chromium.webidl.ast.Enum',
    'org.chromium.webidl.ast.Typedef',
    'org.chromium.webidl.PipelineMessage',
  ],

  imports: [ 'error' ],

  properties: [
    // TODO: This component should not be responsible for observing the
    // pipeline. onDone and waitTime should be removed in the futute and
    // replaced with a subscription to a component that is responsible for
    // observing the pipeline.
    {
      class: 'Function',
      documentation: `onDone is called after waitTime seconds has passed since
        the last call to addFragment. We currently have no way of determining
        when the Canonicalizer is finished receiving fragments. It is assumed
        that if waitTime has passed and no new fragments are received, then
        it will not receive any more fragments and results can be passed on.`,
      name: 'onDone',
      required: true,
    },
    {
      class: 'Int',
      documentation: `The amount of time to wait in seconds after the last
        addFragment request, before onDone() is called with the canonical
        IDL files.`,
      name: 'waitTime',
    },
    {
      documentation: `A timers that is used to determine whether waitTime
        has passed since the last call to addFragment.`,
      name: 'timer_',
    },
    {
      documentation: `A map containing canonical IDL files. The key of the map
        corresponds to the name of the definition.`,
      name: 'canonicalMap_',
      factory: function() { return {}; },
    },
  ],

  methods: [
    {
      documentation: 'Takes two ASTs and merges the members from src to dst.',
      name: 'merge_',
      code: function(dst, src) {
        var isDstPartial = dst.definition.isPartial;
        var isSrcPartial = src.definition.isPartial;

        // Determine if we have multiple non-partial fragments.
        if (!isDstPartial && !isSrcPartial) {
          this.error(`Canonicalizer: Two non-partial fragments!
              In Map: ${foam.json.Pretty.stringify(dst.sources)},
              Current: ${foam.json.Pretty.stringify(src.sources)}`);
          throw new Error(`Canonicalizer: Two non-partial fragments were ` +
              `found for the same definition (${ast.id})!`);
        }

        // Copy attributes and members from definition into canonical AST.
        dst.attrs = dst.attrs.concat(src.attrs);
        dst.definition.members = dst.definition.members
            .concat(src.definition.members);

        // Copy over inheritance information.
        if (!dst.definition.inheritsFrom)
          dst.definition.inheritsFrom = src.definition.inheritsFrom;

        // Update AST partial status if required.
        if (!isSrcPartial)
          dst.definition.isPartial = false;
      },
    },
    {
      documentation: `Takes a given AST and extracts the definition members
        from the AST. The members are then placed into the map corresponding to
        the given rendering engine and definition.`,
      name: 'addFragment',
      code: function(ast) {
        // Find any existing definition with same id (name).
        var clone = ast.clone();
        foam.assert(ast.id);
        var result = this.canonicalMap_[ast.id];

        if (!result) {
          // No definition of this name was found.
          // We add a copy of ourselves into the map.
          clone.definition.isCanonical = true;
          this.canonicalMap_[ast.id] = clone;
        } else if (this.Enum.isInstance(ast.definition) ||
            this.Typedef.isInstance(ast.definition)) {
          // An Enum or Typedef with the same name was previously defined!
          console.warn(`Canonicalizer: Encountered two definitions of type` +
              ` Enum or Typedef with the same name ${ast.id}`);

          // Convert entry into array if it is a node, and push both items on.
          if (!Array.isArray(result))
            this.canonicalMap_[ast.id] = [result];
          this.canonicalMap_[ast.id].push(clone);
        } else {
          // A definition with the same name was found.
          this.merge_(result, ast);

          // Update Canonical sources (at the Definition level).
          result.sources.push(clone.source);
        }
        this.resetTimer();
      },
    },
    {
      documentation: `Called after performing addFragments to reset the timer.`,
      name: 'resetTimer',
      code: function() {
        // Clear previous timer if it exists.
        if (this.timer_) clearTimeout(this.timer_);
        this.timer_ = setTimeout(function() {
          var map = this.canonicalMap_;
          var results = [];
          for (var key in map) {
            if (map.hasOwnProperty(key))
              results.push(map[key]);
          }
          this.onDone(results);
        }.bind(this), this.waitTime * 1000);
      },
    },
  ],
});
