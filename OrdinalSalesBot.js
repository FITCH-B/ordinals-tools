//Ordinal Sales Bot for Magic Eden marketplace. Can be changed to any marketplace.

require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const fs = require("fs");

let browser;

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

    if (msg.content.startsWith("!run1")) {        

async function getME() {
  let id, floorPriceText, collectionName2, collectionFloor, title, inscriptionNumber, number;    
  const marketplace = 'Magic Eden';
  try {      
      browser = await puppeteer.launch({headless: "new"});
      const page = await browser.newPage();
  
      await page.goto('https://magiceden.io/ordinals');
  
      await page.waitForSelector('div.tw-w-full.tw-text-sm.tw-whitespace-nowrap.tw-flex.tw-flex-col.tw-items-center.tw-rounded-b-xl.Carousel_cardInfo__mzLAl', { timeout: 15000 });
  
      const test = await page.$$('div.tw-w-full.tw-text-sm.tw-whitespace-nowrap.tw-flex.tw-flex-col.tw-items-center.tw-rounded-b-xl.Carousel_cardInfo__mzLAl');

      const fullTexts = await Promise.all(test.map(async (element) => {
        await page.waitForFunction(el => el.textContent !== '', {}, element);
        const text = await page.evaluate(el => el.textContent, element);
        return text;
      }));
      
      //const rankDiv = fullTexts.find(div => div.includes("Inscription #"), { timeout: 15000 });
      const rankDivs = fullTexts.filter(div => div.includes("Inscription #")).slice(0, 5);
      //console.log(rankDivs);
      let rankDiv = rankDivs[0];
      if (rankDiv) {
        const soldPrice = rankDiv.match(/SOLD FOR [0-9.]+ BTC/)[0];       
        const regex = /[0-9]+\.[0-9]+/; 
        const match = soldPrice.match(regex);
        number = match[0];        
        const hrefDiv = await page.evaluate(() => {
          const anchorTag = document.querySelector('a[href*="item-details"]', { timeout: 10000 });
          return anchorTag ? anchorTag.getAttribute('href') : null;
        });
        //console.log(hrefDiv)
        if (hrefDiv) {
          id = hrefDiv.replace("/ordinals/item-details/", "");
          //console.log(id);
          const response = await axios.get(`https://magiceden.io${hrefDiv}`);
          const $ = cheerio.load(response.data);
          const descriptionContent = $('h3:contains("Inscription Number")');
          inscriptionNumber = descriptionContent.find('span:nth-child(2)').text();
          title = `Inscription #${inscriptionNumber}`;        
          const page2 = await browser.newPage();
          await page2.goto(`https://magiceden.io/ordinals/item-details/${inscriptionNumber}`);
          await page2.waitForSelector('a.tw-text-pink-primary');
          let item = await page2.$('a.tw-text-pink-primary');
          let items = await page2.evaluate(item => item.textContent, item);
          let collectionLink2 = await page2.$$('a.tw-text-pink-primary', { timeout: 15000 });
          let hrefs = await page2.evaluate(el => el.getAttribute('href'), collectionLink2[0]); 
          ///console.log(hrefs)
          let href = `https://magiceden.io${hrefs}`;
          //console.log(href)
          if (!items) {
            item = await page2.$('a.tw-text-pink-hot.tw-bg-gray-300.tw-p-1.tw-rounded-md.tw-text-sm');
            items = await page2.evaluate(item => item.textContent, item );
            collectionLink2 = await page2.$$('a.tw-text-pink-hot.tw-bg-gray-300.tw-p-1.tw-rounded-md.tw-text-sm');
            hrefs = await page2.evaluate(el => el.getAttribute('href'), collectionLink2[0] );
            href = `https://magiceden.io${hrefs}`;
          }
          /*if (!items && inscriptionNumber < 0) {
            items = 'Cursed';
            href = 'https://magiceden.io/ordinals/marketplace/cursed';
          } else if (!items && inscriptionNumber > 0 && inscriptionNumber < 10000) {
            items = 'Sub 10K';
            href = 'https://magiceden.io/ordinals/marketplace/sub-10k';
          } else if (!items && inscriptionNumber >= 10000 && inscriptionNumber < 100000) {
            items = 'Sub 100K';
            href = 'https://magiceden.io/ordinals/marketplace/sub-100k';
          } else if (!items && inscriptionNumber >= 100000 && inscriptionNumber < 1000000) {
            items = 'Sub 1MIL';
            href = 'https://magiceden.io/ordinals/marketplace/sub-1mil';
          } */else if (href === 'https://magiceden.io/ordinals/marketplace/undefined' || href === 'undefined') {
            collectionName2 = 'N/A';
            collectionFloor = 'N/A';
          } else {
            const page3 = await browser.newPage();
  
            await page3.goto(`${href}`)
            await page3.waitForSelector('div.tw-cursor-help.tw-max-w-full.tw-truncate', { timeout: 15000 });
  
            const floorPrice = await page3.$$('div.tw-cursor-help.tw-max-w-full.tw-truncate', { timeout: 15000 });
            const floorPriceText = await floorPrice[0].evaluate(el => el.textContent.trim());
            collectionFloor = floorPriceText;
            collectionName2 = `[${items}](${href})`; 
        
          await page3.close();
        };
      } else {
        await browser.close();
      };
    } else {
      await browser.close();
    };
    await browser.close()
        
    return {
      id,
      inscriptionNumber,
      title,
      collectionName2,
      number,
      floorPriceText,
      collectionFloor,
      rankDiv,
      marketplace,
    }; 

  } catch(error) {
    console.log(error);
    await browser.close();
  }; 
};

async function sendLatestMESale() {
  try {
    const { id, title, number, collectionFloor, marketplace, inscriptionNumber, collectionName2 } = await getME();
    const lastProcessed2 = JSON.parse(fs.readFileSync("lastProcessed2.json", "utf8"));
    const lastProcessedNumbers = lastProcessed2.inscriptionNumber || [];
    
    if (!inscriptionNumber) {
      return;
    }

    if (lastProcessedNumbers.includes(inscriptionNumber)) {
      return;
    }

    lastProcessedNumbers.push(inscriptionNumber);
    if (lastProcessedNumbers.length > 5) {
      lastProcessedNumbers.shift();
    }

    fs.writeFile("lastProcessed2.json", JSON.stringify({ inscriptionNumber: lastProcessedNumbers }), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    })

    if (
      id === undefined ||
      title === undefined ||
      number === undefined ||
      collectionFloor === undefined ||
      marketplace === undefined ||
      inscriptionNumber === undefined ||
      collectionName2 === undefined
    ) {
      return
    }

const salesBotEmbed2 = new EmbedBuilder()      
.setColor(0xadff2f)
.setTitle(`${title}`)
.setURL(`https://magiceden.io/ordinals/item-details/${inscriptionNumber}`)    
.setAuthor({ name: 'ORDINAL SALES BOT'})
.setThumbnail('https://i.seadn.io/gcs/files/e462bf5493aa94feb02c504104ec5450.png?auto=format&w=128')            
.addFields(
{ name: 'Sale Price:', value: `${number} \u20BF`, inline: false },
{ name: 'Inscription #:', value: `${inscriptionNumber}`, inline: false },
{ name: 'Collection:', value: `${collectionName2}`, inline: true  },    
{ name: 'Floor:', value: `${collectionFloor} \u20BF`, inline: true },
{ name: 'Marketplace', value: `${marketplace}`, inline: false  },
) 
.setImage(`https://ord-mirror.magiceden.dev/content/${id}`)   
.setTimestamp()
.setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

msg.channel.send({ embeds: [salesBotEmbed2] });
  } catch (error) {
    console.log(error);
    if (browser) {
      await browser.close();
    }      
    console.log('Retrying sendLatestMESale()...');
    setTimeout(sendLatestMESale, 20000);
  }
};

setInterval(() => {
    sendLatestMESale();
}, 60000); 
}});

client.login(process.env["DISCORD_BOT_TOKEN"]);
