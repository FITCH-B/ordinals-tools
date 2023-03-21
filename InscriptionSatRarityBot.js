const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline-sync')

let inscriptionNumber = readline.question("What is your Inscription #? ")
console.log(`Searching Inscription ${inscriptionNumber} ...`)

const url = `https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionNumber}`

async function getSat() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    satoshi = response.data.sat_ordinal;
    rarity = response.data.sat_rarity;
    rarityMsg = rarity.toUpperCase()
    id = response.data.id;
    address = response.data.address;

    return id
  } catch (error) {
    console.log(error)
  }    
}

async function getCollection() {
  try {
    const url2 = `https://ordinalhub.com/inscription/${id}`
    const response = await axios.get(url2);
    const $ = cheerio.load(response.data);
    let variable = $('section.css-dv4wg3 a').text();
    
    if (!variable) {
      variable = 'NOT LISTED';
    }

    collectionName = variable;
    console.log(`Collection Name: ${collectionName}`);
    return collectionName;

    } catch (error) {
    console.log(error);
  }
}

async function getTimestamp() {
  await getSat();
  await getCollection();
  try {    
    const url3 = `https://ordinals.com/sat/${satoshi}`;  
    const response = await axios.get(url3);
    const $ = cheerio.load(response.data);
    const variable = $('dd:nth-of-type(11)').text();
    timestamp = variable;

    console.log(`Inscription ID: ${id}`);
    console.log(`Current Address: ${address}`);
    console.log(`Satoshi: ${satoshi}`);
    console.log(`Sat Rarity: ${rarityMsg}`);
    console.log(`Date Sat Created: ${timestamp}`);

  } catch (error) {
    console.log(error);
  };
};

getTimestamp();