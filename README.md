
# Botmimimi
**Botmimimi** is my personal Discord bot. It is currently a work in progress, as I constantly update it for my own needs. This bot usually consists of me automating things that I feel are repetitive, so it saves me time. I’ll probably keep adding more stuff as I go — whatever I find useful or fun.

## 📦 Requirements
- Node.js
- [Discord Application](https://discord.com/developers/applications)


## 🔧 Installation
1. Clone this repo or Download as zip
```bash
git clone https://github.com/mabufu172/botmimimi.git
```

2. Once you're running commands in the bot folder; install the required npm packages:
```bash
npm i
```
3. Fill the missing dotenv values in `.env.example`:
```env
TOKEN=YOUR_DISCORD_APPLICATION_TOKEN
OWNER_ID=YOUR_DISCORD_USER_ID
SYSTEMCTL_SERVICE_NAME=SYSTEMCTL_SERVICE_NAME
PREFIX=!
``` 
- `YOUR_DISCORD_APPLICATION_TOKEN` can be obtained through [Discord Developer Portal](https://discord.com/developers/applications) and creating a new application

- `OWNER_ID` is your [Discord User ID](https://support.discord.com/hc/articles/206346498), and is used for commands that only allows the owner of the bot (If user's ID matches `OWNER_ID` it will grant them access)

- `SYSTEMCTL_SERVICE_NAME` this is referring to the service name of `.service` file. Let's say your service file is `bot.service` then you'd want to fill `bot` for your `SYSTEMCTL_SERVICE_NAME` (this only applies if you want to run this using `systemctl`, if you're not using it then just remove this line and also delete anything related to `systemctl` system-wide

- `PREFIX` is used for botmimimi's command prefix, inserting `!` as `PREFIX` would make you run ping (or any command) as such: `!ping`
4. Rename `.env.example` to `.env` to apply
5. Let Botmimimi breathe air:
```bash
node .
```

Now Botmimimi should be ready to use, and to get started, type `<prefix>help` in Discord Channels.
