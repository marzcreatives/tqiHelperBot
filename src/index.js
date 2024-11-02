const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;

if (!token) {
    throw new Error('The DISCORD_TOKEN environment variable is required.');
}

if (!applicationId) {
    throw new Error('The DISCORD_APPLICATION_ID environment variable is required.');
}

client.once('ready', async () => {
    console.log('Ready!');
});


client.on('messageReactionAdd', async (reaction) => {
    try {
        if (reaction.emoji.name === '👆') {
            const pendingApprovalChannel = reaction.message.guild.channels.cache.find(channel => channel.name === 'pending-approval');
            if (pendingApprovalChannel) {
                // Handle resending images or text
                if (reaction.message.attachments.size > 0) {
                    // Resend images
                    reaction.message.attachments.forEach(attachment => {
                        pendingApprovalChannel.send({
                            files: [attachment.url]
                        }).catch(err => console.log('Error sending image:', err));
                    });
                } else {
                    // Resend text
                    pendingApprovalChannel.send({
                        content: reaction.message.content
                    });
                }
            } else {
                console.error('Pending approval channel not found.');
            }
        }
    } catch (error) {
        // Log error without crashing
        console.log('Caught Error: ', error);
    }
});

client.login(process.env.DISCORD_TOKEN);

export default client;