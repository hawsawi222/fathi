import { voiceClient } from "./client.js";
import tokens from "./tokens.js";
import express from 'express';
import { fetch } from 'undici';

const app = express();
const port = process.env.PORT || 3000;
const url = "https://four-aluminum-charger.glitch.me/";

let requests = 0;

// ✅ رد على GET
app.get('/', (req, res) => res.send('Hello World!'));

// ✅ رد على HEAD (مهم لـ UptimeRobot)
app.head('/', (req, res) => res.sendStatus(200));

app.listen(port, () => console.log(`Server running at ${url} on port ${port}`));

// ✅ مسك أي أخطاء
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// ✅ ping داخلي باستخدام HEAD (خفيف)
setInterval(async () => {
    try {
        const response = await fetch(url, { method: 'HEAD' }); // هذا هو المطلوب
        requests++;
        console.log(`HEAD ping success (${response.status}) - Count: ${requests}`);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}, 300000); // كل 5 دقايق

// ✅ فلترة التوكنات وتشغيل البوتات
const cleanTokens = tokens.filter(token => token?.token?.length > 30);

for (const token of cleanTokens) {
    const client = new voiceClient(token);

    client.on('ready', (user) => {
        console.log(`Logged in as ${user.username}#${user.discriminator}`);
    });

    client.on('connected', () => console.log('Connected to Discord'));

    client.on('disconnected', () => {
        console.log('Disconnected from Discord — attempting reconnect...');
        // client.connect(); // تفعلها لو تبغى يعيد الاتصال تلقائي
    });

    client.on('voiceReady', () => console.log('Voice is ready'));
    client.on('error', (error) => console.error('Error:', error));
    client.on('debug', (msg) => console.debug(msg));

    client.connect();
}
