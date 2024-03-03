require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => { res.status(200); });
app.listen(port, () => console.log(`Listening on port ${port}`));
const {
  Client, GatewayIntentBits, Collection, REST,
} = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { GetListByKeyword } = require('youtube-search-api');
const { Routes } = require('discord-api-types/v9');
const CommandController = require('./CommandController');
const ConnectionManager = require('./connections/ConnectionManager');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

const controller = new CommandController();
const connectionManager = new ConnectionManager();
const token = process.env.MESIBOT_TOKEN;
client.commands = new Collection();
/// ////
// client.channelsCache = new Map();
client.once('ready', () => {
  controller.reloadCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { channel } = interaction.member.voice;
  if (!channel) {
    interaction.reply({ content: 'You need to be in a voice channel.', ephemeral: true });
    return;
  }
  if (!controller.connection) {
    controller.createConnection(interaction);
  }
  /// ///////
  // client.channelsCache.set(interaction.user.id, channel);
  try {
    await controller.doCommand(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);
