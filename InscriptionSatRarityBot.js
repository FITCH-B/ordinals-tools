require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Ready: " + client.user.username);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.id == client.user.id) return;

  if (msg.content.startsWith("!inscription")) {
    const [ , inscriptionNumber] = msg.content.split(" ");
    msg.channel.send(`Searching Inscription ${inscriptionNumber} ...`)

    if (inscriptionNumber.startsWith("-")) {
      msg.channel.send({ embeds: [{ description: 'NEGATIVE INSCRIPTIONS NOT SUPPORTED', color: 0xFF0000 }] });
    } else if (inscriptionNumber.match(/[a-zA-Z]/)) {
      msg.channel.send({ embeds: [{ description: 'LETTER INSCRIPTIONS NOT SUPPORTED', color: 0xFF0000 }] });
    } else {      
      const url = `https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionNumber}`

      async function getSat() {
        try {
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
          satoshi = response.data.sat_ordinal;
          rarity = response.data.sat_rarity;
          rarityMsg = rarity.toUpperCase()
          id = response.data.id;
          return id
        } catch (error) {
          console.log(error)
        }    
      }

      async function getCollection() {
        try {
          const id = await getSat();
          const url2 = `https://magiceden.io/ordinals/item-details/${id}`
          const response = await axios.get(url2);
          const $ = cheerio.load(response.data);
          let variable = $('a.tw-text-pink-primary').text()
          //console.log(variable);
          let collectionLink = $('a.tw-text-pink-primary').attr('href');
          //console.log(collectionLink);
          let collectionName = `[${variable}](https://magiceden.io${collectionLink})`;
          //console.log(collectionName);

          if (!variable){
            collectionName = 'NOT LISTED'
          }    

          return { collectionName, collectionLink };

        } catch (error) {
          console.log(error)
        } 
      }

      async function getPrice() { 
        const { collectionLink } = await getCollection();
        const url5 = `https://magiceden.io${collectionLink}`; 
        try {    
          browser = await puppeteer.launch();
          const page = await browser.newPage();
  
          await page.goto(`${url5}`)
          await page.waitForSelector('div.tw-cursor-help.tw-max-w-full.tw-truncate', { timeout: 30000 });
  
          const floorPrice = await page.$$('div.tw-cursor-help.tw-max-w-full.tw-truncate', { timeout: 30000 });
          const floorPriceText = await floorPrice[0].evaluate(el => el.textContent.trim());
          price = floorPriceText; 
        
          await browser.close()
          return price;
        } catch (error) {
          console.log(error);
        } finally {
          if(browser) {
            await browser.close();
          }
        }   
      }

      async function getTimestamp() {
        try {    
          const url3 = `https://ordinals.com/sat/${satoshi}`;  
          const response = await axios.get(url3);
          const $ = cheerio.load(response.data);
          const variable = $('dd:nth-of-type(11)').text()
          timestamp = variable; 
        } catch (error) {
          console.log(error);
        }
      }

      let satoshi;
      let id;
      let timestamp;
      let rarityMsg;

      async function sendInscriptionMessage() {
        //await getSat();
        const { collectionName } = await getCollection();
        await getTimestamp();
        const price = await getPrice();  

      const satBotEmbed = new EmbedBuilder()      
      .setColor(0xadff2f)
      .setTitle(`Inscription ${inscriptionNumber}`)
      .setURL(`https://magiceden.io/ordinals/item-details/${id}`)    
      .setAuthor({ name: 'INSCRIPTION INFO BOT'})
      .setThumbnail(`https://ordinals.com/content/${id}`)            
      .addFields(
          { name: 'Collection Name:', value: `${collectionName}`, inline: true },
          { name: 'Floor Price:', value: `${price} \u20BF`, inline: true },
          { name: 'Satoshi:', value: `${satoshi}` },
          { name: 'Date Sat Mined:', value: `${timestamp}`, inline: true },
          { name: '\u200B', value: '\u200B', inline: true },
          { name: 'Inscription Sat Rarity:', value: `${rarityMsg}`, inline: true },
      )    
      .setTimestamp()
      .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

      msg.channel.send({ embeds: [satBotEmbed] });
      }

      sendInscriptionMessage()

  }}})

client.login(process.env["DISCORD_BOT_TOKEN"]);
