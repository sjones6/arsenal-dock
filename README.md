# Arsenal-Dock

This is basic building block of [ArsenalIO](https://arsenalio.com).

Arsenal values Open Source; thus, all code is open and available.

# Getting Started

This application is intended to be run via Docker, but it can also be run via node with `npm run start`.

The following instructions assumes you have Docker installed; if not, see [here](https://docs.docker.com/engine/installation/) for your system.

## 1. Build Locally

With Docker: 

`docker build -t arsenal-dock .`

Via NPM script:

`npm run build`

## 1.1 Run Container

With Docker: 

`docker run --name=arsenal -p 8080:8080 -i arsenal-dock:latest`

Via NPM script:

`npm run start:docker`

This will start Docker, and attach port 80 on the host machine.

# Issues

Have issues with this container?

Have feature requests?

[Open an issue.](https://github.com/sjones6/arsenal-dock/issues)

# Contributions

All community contributions are welcome via [GitHub](https://github.com/sjones6/arsenal-dock).

Contributions must include tests and appropriate documentation.