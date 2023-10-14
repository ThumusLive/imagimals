# Imagimals

> Simple bot for sending multiple random images of animals
> Easily extensible.

## What is this bot?

It's a bot aimed to send random images of multiple animals with multi-languages support.
You can add anything at `src/data/animals.js`.

## Installation

You will need:

- [NodeJS](https://nodejs.org)
- [discord.js](https://discordjs.dev/)

The first thing to do is to put your env variables.
You will need to rename the file `.env.example` to `.env` and then edit it by adding your credits.

You'll need to install their node_modules.
In a terminal in the root folder of the project, type:

```bash
npm i
```

And then, to launch the bot, do

```bash
npm run commands:launch && npm start
```

## Docker

You just need to build the image with:

```bash
docker buildx build . -t imagimals:latest
```

To use docker compose you need to edit `compose/.env`.
And then after editing this file, do:

```bash
cd compose && docker compose up -d
```

## Docs

In the future

## TODO:

- [ ] Docs
- [x] Multi languages support
- [ ] Functions to simplify the process of adding apis and languages
- [ ] Support of multiple types of apis
- [ ] Types for typescript
