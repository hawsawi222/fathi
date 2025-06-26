// status can be "online", "idle", "dnd", or "invisible" or "offline"
export default [
    {
        channelId: "1386157633786085386",
        serverId: "1346788139724963840",
        token: process.env.token1,
        selfDeaf: false,
        autoReconnect: {
            enabled: true,
            delay: 5, // ثواني
            maxRetries: 5,
        },
        presence: {
            status: "dnd",
        },
        selfMute: false,
    },
  
      {
        channelId: "1386157650798055545",
        serverId: "1346788139724963840",
        token: process.env.token2,
        selfDeaf: false,
        autoReconnect: {
            enabled: true,
            delay: 5, // ثواني
            maxRetries: 5,
        },
        presence: {
            status: "dnd",
        },
        selfMute: false,
    },
];