// status can be "online", "idle", "dnd", or "invisible" or "offline"
export default [
    {
        channelId: "1386157570548564028",
        serverId: "1346788139724963840",
        token: process.env.token1,
        selfDeaf: false,
        autoReconnect: {
            enabled: true,
            delay: 5, // ثواني
            maxRetries: 5,
        },
        presence: {
            status: "idle",
        },
        selfMute: false,
    },
];