const config = require("../settings/config");
const os = require("os");

function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
    command: 'alive',
    description: 'check system status and bot info',
    category: 'general',
    execute: async (sock, m, {
        args,
        text,
        q,
        quoted,
        mime,
        qmsg,
        isMedia,
        groupMetadata,
        groupName,
        participants,
        groupOwner,
        groupAdmins,
        isBotAdmins,
        isAdmins,
        isGroupOwner,
        isCreator,
        prefix,
        reply,
        config: cmdConfig,
        sender
    }) => {
        try {
            // Tech reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "⚡", key: m.key } 
            });

            const userName = m.pushName || "user";
            const botUptime = runtime(process.uptime());
            const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
            const usedMemory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
            const ping = Date.now() - m.messageTimestamp * 1000;
            const platform = os.platform();
            const arch = os.arch();
            const cpu = os.cpus()[0].model;

            const aliveMessage = 
`🤖 *${config.settings.title} - system status*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
👤 **user**: ${userName}
⏱️ **uptime**: ${botUptime}
💾 **memory**: ${usedMemory}MB / ${totalMemory}GB
📶 **ping**: ${ping}ms
🖥️ **platform**: ${platform} ${arch}
⚙️ **cpu**: ${cpu.split(' ')[0]}...

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🔧 **dev**: ${config.owner}
📁 **repo**: ${config.settings.author}
💬 **desc**: ${config.settings.description}

🔗 **channel**:
https://whatsapp.com/channel/0029VbBnbJM1XquQqdF5hS2y

${config.settings.footer}`;

            await sock.sendMessage(m.chat, {
                image: { url: config.thumbUrl },
                caption: aliveMessage,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: `🤖 ${config.settings.title}`,
                        body: "system online & operational",
                        thumbnailUrl: config.thumbUrl,
                        sourceUrl: "https://github.com/derpiestcat",
                        mediaType: 1
                    }
                }
            }, { quoted: m });

            // Technical success reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "✅", key: m.key } 
            });

        } catch (error) {
            console.error("Error in alive command:", error);
            await sock.sendMessage(m.chat, { 
                react: { text: "❌", key: m.key } 
            });
            await reply("🚨 system diagnostic failed. please try the command again.");
        }
    }
};
