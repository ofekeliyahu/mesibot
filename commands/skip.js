const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skip the current song.'),
  execute: async ({ interaction, connectionManager }) => {
    const { playlist } = connectionManager.findConnection(interaction.guildId);
    if (!playlist.queue) {
      await interaction.reply('there is no song playlist.');
      return;
    }
    const embed = new EmbedBuilder();
    if (playlist.queue.isEmpty()) {
      embed.setTitle('You can`t skip this is the last song, add another song to skip');
      interaction.reply({ embeds: [embed] });
      return;
    }

    playlist.skip();
    embed.setTitle('skipped');
    embed.setDescription(`now playing **${playlist.current.title}**`);
    // embed.setThunbnail(playlist.current.thumbnail);
    interaction.reply({ embeds: [embed] });
  },

};
