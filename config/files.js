// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

(function() {
  var isServer = typeof window === 'undefined';

  var sep = isServer ? require('path').sep : '/';

  // TODO(markdittmer): Use FOAM ClassLoader instead after
  // https://github.com/foam-framework/foam2/issues/262 is resolved.
  (isServer ? global : window).WEB_IDL_DIFF_FILES = [
    // Basic parsers
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}Plus0.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}ParserWithAction.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}Parsers.js`,

    // Tokenized parsers
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenizedParser.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenSequence.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenSequence1.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenRepeat.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenPlus.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}parsers${sep}TokenParsers.js`,

    // AST nodes (no extends)
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttribute.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Inheritable.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Named.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}OperationQualifier.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}AttributeLike.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Typed.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Membered.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Member.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Returner.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}Outputer.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Argument.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}DefinitionData.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Defaulted.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Type.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Definition.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}TypeSuffix.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Attributed.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Literal.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}SerializerPatternType.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Parameterized.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}MemberData.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}SerializerPattern.js`,

    // AST nodes (extends)
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Infinity.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttributeIdentList.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}DecInteger.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Enum.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Namespace.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}StaticMember.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}OctInteger.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Attribute.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Exception.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Dictionary.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}String.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttributeArgList.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Typedef.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Identifier.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}SetLike.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Const.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Interface.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Number.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttributeIdentifierOrString.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}UnionType.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}EmptyArray.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttributeNamedArgList.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Callback.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}HexInteger.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}MapLike.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}DictionaryMemberData.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Serializer.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}CallbackInterface.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}ExtendedAttributeNoArgs.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Implements.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Operation.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}NonUnionType.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Iterable.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Stringifier.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}ast${sep}Float.js`,

    // Web IDL parser
    `lib${sep}org${sep}chromium${sep}webidl${sep}Parser.js`,

    // Gitiles crawler
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}GitilesRequestType.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}GitilesRequest.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}RetryDecorator.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}RateLimiter.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}RateLimitDecorator.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}GitilesRequestBuilder.js`,
    `lib${sep}org${sep}chromium${sep}webidl${sep}crawlers${sep}GitilesCrawler.js`,
  ];
})();
