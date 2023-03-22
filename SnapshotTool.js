//AS OF 3/22 8:23am EST
//Would not use until hiro has updated their site. Currently it displays the genesis address and not the current holder.
//This message will be deleted once they have updated.

const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline-sync');
const puppeteer = require('puppeteer');
const fs = require('fs');

let collectionName = readline.question("What collection do you want to look up? ")
const words = collectionName.split(" ");
const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
const output = capitalizedWords.join(" ");
console.log(`Searching collection: ${output} ...`)

setTimeout(()=> {
    console.log('TAKING SNAPSHOT...')
}, 1000)

const collectionSplit = collectionName.split(" ")
const collectionLink = collectionSplit.join("-")
const collectionLowercase = collectionLink.toLowerCase()

const url = `https://ordinalswallet.com/collection/${collectionLowercase}`

const results = []

async function getIds() {
  try {  
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 100;
        let scrollDelay = 100;
        let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
              }
        }, scrollDelay);
    });
});

    const html = await page.content();
    await browser.close();
    const $ = cheerio.load(html);
    const ids = $('p.InscriptionCard_subtitle__Yvhsb.text-sm.semibold').text()
    const idMatches = ids.match(/#(\d+)w*/g)
    const idNumbers = idMatches.map(match => match.replace("#", "").replace("Inscription", ""))
    return idNumbers;

    } catch(error) {
        console.log(error)
  }    
}

async function getId(value) {
  try {
    const url = (`https://api.hiro.so/ordinals/v1/inscriptions/${value}`)      
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const holder = response.data.address;      
    return `#${value}'s current address: ${holder}`      
  } catch(error) {
    console.log(error);
  }
}

async function processValues() {
  const idNumbers = await getIds()
  for (let i = 0; i < idNumbers.length; i++) {
    const value = idNumbers[i];
    const result = await getId(value)
    results.push(result);
  }
  return results;
} 

async function run() {
  try {
    const results = await processValues();
    console.log(results)
    fs.writeFile(`${collectionLowercase}.txt`, results.join('\n'), function (err) {
      if (err) return console.log(err);
      console.log(`Results written to ${collectionLowercase}.txt in the current working directory`);
    });
  } catch (error) {
    console.log(error)
  }
}

run();

