const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret ping')
		.setDescription('Replies with Pong, but only to you!'),
	async execute(interaction) {
		await interaction.reply({ content:'Pong!', ephemeral:true });
	},
};
