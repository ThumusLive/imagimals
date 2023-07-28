/* eslint-disable max-len, import/extensions */
import { REST, Routes } from "discord.js";
import "dotenv/config";

import { data as animals } from "../src/data/animals.js";

const commands = [];

const languages = {
  fr: (name) => `Envois des images de ${name}s.`,
  "es-ES": (name) => `Enviar fotos de ${name}s.`,
};

for (const obj of Object.entries(animals)) {
  const { names } = obj[1];
  commands.push({
    name: obj[0],
    description: `Send images of ${obj[0]}s.`,
    description_localizations: Object.fromEntries(Object.entries(names).map((a) => [a[0], languages[a[0]](a[1])])),
    name_localizations: names,
  });
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
