const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grade_resume')
		.setDescription('Send in a resume through here to be graded by our ATS.')
		.addAttachmentOption(option =>
			option.setName('resume')
				.setDescription('The resume to be analyzed.')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('only_you')
				.setDescription('instead of making a thread, the bot will dm you your grade.')),
	async execute(interaction) {
		const attachment = interaction.options.getAttachment('resume');
		if (interaction.options.getBoolean('only_you') ?? true) {
			await interaction.reply(`Received ${attachment.name}, creating thread...`);
		}
	},
};
