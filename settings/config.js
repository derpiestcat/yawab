
// 漏 2025 Debraj. All Rights Reserved.
// respect the work, don鈥檛 just copy-paste.

const fs = require('fs')

const config = {
    owner: "-",
    botNumber: "-",
    setPair: "K0MRAID1",
    thumbUrl: "https://i.imgur.com/IkEv97P.jpeg",
    session: "sessions",
    status: {
        public: true,
        terminal: true,
        reactsw: false
    },
    message: {
        owner: "no, this is for owners only",
        group: "this is for groups only",
        admin: "this command is for admin only",
        private: "this is specifically for private chat"
    },
    mess: {
        owner: 'this command is only for the bot owner!',
        done: 'mode changed successfully!',
        error: 'something went wrong!',
        wait: 'please wait...'
    },
    settings: {
        title: "clean easy wa bot",
        packname: 'yawab',
        description: "og script by debraj, this by derpiestcat",
        author: 'https://github.com/derpiestcat/',
        footer: "@derpiestcat"
    },
    newsletter: {
        name: "yawab",
        id: "0@newsletter"
    },
    api: {
        baseurl: "https://hector-api.vercel.app/",
        apikey: "hector"
    },
    sticker: {
        packname: "clean sticker by yawab",
        author: "yawab"
    }
}

module.exports = config;

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
