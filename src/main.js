/* eslint-disable import/extensions */
import { Client, GatewayIntentBits, resolveColor } from "discord.js";
import "dotenv/config";
import { gets, cached } from "./utils/url.js";

import { getAliases } from "./data/animals.js";

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

const modules = new Map();
const aliases = new Map();

for (const [key, values] of Object.entries(getAliases())) {
    createModules(key, values.alias, values.url);
}

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const name = interaction.commandName;
    const module = modules.has(name)
        ? modules.get(name)
        : aliases.has(name)
            ? modules.get(aliases.get(name))
            : null;

    if (!module) return;

    await module(interaction);
});

bot.on("messageCreate", async (message) => {
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const name = message.content.slice(process.env.PREFIX.length);
    const module = modules.has(name)
        ? modules.get(name)
        : aliases.has(name)
            ? modules.get(aliases.get(name))
            : null;

    if (!module) return;

    await module(message);
});

bot.on("ready", () => {
    console.log(`* Client connected as ${bot.user.tag} <@${bot.user.id}>`);
});

function format(url) {
    return {
        embeds: [
            {
                image: {
                    url,
                },
                color: resolveColor("Random"),
            },
        ],
    };
}

function createModules(name, alias, url) {
    const api = cached(gets(url));
    modules.set(name, async (thing) => thing.reply(format(await api())));
    for (const ali of alias) {
        aliases.set(ali, name);
    }
}

bot.login(process.env.TOKEN);
