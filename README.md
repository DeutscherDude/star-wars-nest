# Setting up the project :)

## Requirements to run it locally

1. Node 16 LTS or higher
2. Docker installed on your machine
3. Stable internet connection

## Cloning this repository

In order to clone this repository, please use either of the following commands:

`git clone https://github.com/DeutscherDude/star-wars-nest.git`

`git clone git@github.com:DeutscherDude/star-wars-nest.git`

Afterwards, please rename the `sample.env` file to `.env` and populate it accordingly with your local configuration

## Running docker containers

For convenience, this repository contains a Makefile, that pre-defines some useful commands.
After you have cloned the code, you should use the following commands to start the api:

- make build-dev
- make run-dev

In order to stop the instance, please use:

- make stop

To attach the console and see live logs from the application, use the following:

- make attach-console

## Installing docker

### Linux

Please follow the official docker guide, which is distro-dependent: [link](https://docs.docker.com/engine/install/ubuntu/)

### MacOs

Installation packages vary between Intel and Apple chips: [link](https://docs.docker.com/desktop/install/mac-install/)

### Windows

Installation tutorial: [link](https://docs.docker.com/desktop/install/windows-install/)