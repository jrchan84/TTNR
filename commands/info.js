const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('learn more about this bot!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
    console.log('TTNR replied pong to: ' + interaction.user.tag
			+ ' in server: ' + interaction.guild.name);
	},
};
