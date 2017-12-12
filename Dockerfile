FROM node:latest

ARG USER_NAME=webidl-diff
ARG USER_ID=1001
ARG GROUP_NAME=webidl-diff
ARG GROUP_ID=1001
ARG USER_HOME=/home/webidl-diff

# System setup (root)
RUN apk add --no-cache shadow
RUN mkdir -p "${USER_HOME}"
RUN groupadd -g "${GROUP_ID}" "${GROUP_NAME}"
RUN useradd -r -u "${USER_ID}" -d "${USER_HOME}" -g "${GROUP_NAME}" "${USER_NAME}"
RUN chown -R "${USER_NAME}:${GROUP_NAME}" "${USER_HOME}"

# Local setup (user)
WORKDIR "${USER_HOME}"
USER "${USER_NAME}"
