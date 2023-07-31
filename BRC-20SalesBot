//Using bestinslot API

require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

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

  if (msg.content.startsWith("!run2")) {

    async function getOrdi() {
      try {
        const url = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/ordi/4/1/ts_desc';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        inscriptionNum = response.data[0].inscription_number;
        unitPrice = response.data[0].unit_price;
        quantity = response.data[0].amount;
        totalValue = response.data[0].psbt_price;
        totalUSD = (totalValue * .00026);
        id = response.data[0].inscription_id;
        inscriptioninfo = `[${inscriptionNum}](https://ordinals.com/inscription/${id})`;

        if (!isNaN(unitPrice)) {
          if (unitPrice % 1 === 0) {
            unitPrice = parseFloat(unitPrice).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice = parseFloat(unitPrice).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity)) {
          if (quantity % 1 === 0) {
            quantity = parseFloat(quantity).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue)) {
          if (totalValue % 1 === 0) {
            totalValue = parseFloat(totalValue).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue = parseFloat(totalValue).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD)) {
          if (totalUSD % 1 === 0) {
            totalUSD = parseFloat(totalUSD).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD = parseFloat(totalUSD).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum,
          unitPrice,
          quantity,
          totalValue,
          totalUSD,
          inscriptioninfo
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestOrdiSale() {
      const { inscriptionNum, unitPrice, quantity, totalValue, totalUSD, inscriptioninfo } = await getOrdi();      
      
      try {        
        const lastProcessed = JSON.parse(fs.readFileSync("lastProcessed.json", "utf8"));
        const lastProcessedNumbers = lastProcessed.lastProcessedNumbers || [];
    
        if (!inscriptionNum) {
          return;
        }

        if (lastProcessedNumbers.includes(inscriptionNum)) {
          return;
        }

        lastProcessedNumbers.push(inscriptionNum);
        if (lastProcessedNumbers.length > 5) {
          lastProcessedNumbers.shift();
        }
        fs.writeFile("lastProcessed.json", JSON.stringify({ lastProcessedNumbers }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('ORDI')
        .setURL(`https://unisat.io/market?tick=ordi&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/GcD9RsRbg/ordi.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo}`, inline: false },
          { name: 'Price:', value: `${unitPrice} sat/ordi`, inline: true  },    
          { name: 'Quantity:', value: `${quantity}`, inline: true },
          { name: 'Total Value:', value: `${totalValue} sat ($${totalUSD} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestOrdiSale()
    }, 30000); 


    async function getWhee() {
      try {
        const url2 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/whee/4/1/ts_desc';
        const response2 = await axios.get(url2);
        const $2 = cheerio.load(response2.data);
        inscriptionNum2 = response2.data[0].inscription_number;
        unitPrice2 = response2.data[0].unit_price;
        quantity2 = response2.data[0].amount;
        totalValue2 = response2.data[0].psbt_price;
        totalUSD2 = (totalValue2 * .00026);
        id2 = response2.data[0].inscription_id;
        inscriptioninfo2 = `[${inscriptionNum2}](https://ordinals.com/inscription/${id2})`;

        if (!isNaN(unitPrice2)) {
          if (unitPrice2 % 1 === 0) {
            unitPrice2 = parseFloat(unitPrice2).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice2 = parseFloat(unitPrice2).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity2)) {
          if (quantity2 % 1 === 0) {
            quantity2 = parseFloat(quantity2).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue2)) {
          if (totalValue2 % 1 === 0) {
            totalValue2 = parseFloat(totalValue2).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue2 = parseFloat(totalValue2).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD2)) {
          if (totalUSD2 % 1 === 0) {
            totalUSD2 = parseFloat(totalUSD2).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD2 = parseFloat(totalUSD2).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum2,
          unitPrice2,
          quantity2,
          totalValue2,
          totalUSD2,
          inscriptioninfo2
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestWheeSale() {
      const { inscriptionNum2, unitPrice2, quantity2, totalValue2, totalUSD2, inscriptioninfo2 } = await getWhee();      
      
      try {        
        const lastProcessed2 = JSON.parse(fs.readFileSync("lastProcessed2.json", "utf8"));
        const lastProcessedNumbers2 = lastProcessed2.lastProcessedNumbers2 || [];
    
        if (!inscriptionNum2) {
          return;
        }

        if (lastProcessedNumbers2.includes(inscriptionNum2)) {
          return;
        }

        lastProcessedNumbers2.push(inscriptionNum2);
        if (lastProcessedNumbers2.length > 5) {
          lastProcessedNumbers2.shift();
        }
        fs.writeFile("lastProcessed2.json", JSON.stringify({ lastProcessedNumbers2 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('WHEE')
        .setURL(`https://unisat.io/market?tick=whee&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/24IBAFtIP/whee.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo2}`, inline: false },
          { name: 'Price:', value: `${unitPrice2} sat/whee`, inline: true  },    
          { name: 'Quantity:', value: `${quantity2}`, inline: true },
          { name: 'Total Value:', value: `${totalValue2} sat ($${totalUSD2} USD)` , inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestWheeSale()
    }, 30000);


    async function getOxbt() {
      try {
        const url3 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/oxbt/4/1/ts_desc';
        const response3 = await axios.get(url3);
        const $3 = cheerio.load(response3.data);
        inscriptionNum3 = response3.data[0].inscription_number;
        unitPrice3 = response3.data[0].unit_price;
        quantity3 = response3.data[0].amount;
        totalValue3 = response3.data[0].psbt_price;
        totalUSD3 = (totalValue3 * .00026);
        id3 = response3.data[0].inscription_id;
        inscriptioninfo3 = `[${inscriptionNum3}](https://ordinals.com/inscription/${id3})`;

        if (!isNaN(unitPrice3)) {
          if (unitPrice3 % 1 === 0) {
            unitPrice3 = parseFloat(unitPrice3).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice3 = parseFloat(unitPrice3).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity3)) {
          if (quantity3 % 1 === 0) {
            quantity3 = parseFloat(quantity3).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue3)) {
          if (totalValue3 % 1 === 0) {
            totalValue3 = parseFloat(totalValue3).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue3 = parseFloat(totalValue3).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD3)) {
          if (totalUSD3 % 1 === 0) {
            totalUSD3 = parseFloat(totalUSD3).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD3 = parseFloat(totalUSD3).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum3,
          unitPrice3,
          quantity3,
          totalValue3,
          totalUSD3,
          inscriptioninfo3
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestOxbtSale() {
      const { inscriptionNum3, unitPrice3, quantity3, totalValue3, totalUSD3, inscriptioninfo3 } = await getOxbt();      
      
      try {        
        const lastProcessed3 = JSON.parse(fs.readFileSync("lastProcessed3.json", "utf8"));
        const lastProcessedNumbers3 = lastProcessed3.lastProcessedNumbers3 || [];
    
        if (!inscriptionNum3) {
          return;
        }

        if (lastProcessedNumbers3.includes(inscriptionNum3)) {
          return;
        }

        lastProcessedNumbers3.push(inscriptionNum3);
        if (lastProcessedNumbers3.length > 5) {
          lastProcessedNumbers3.shift();
        }
        fs.writeFile("lastProcessed3.json", JSON.stringify({ lastProcessedNumbers3 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('OXBT')
        .setURL(`https://unisat.io/market?tick=oxbt&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/4o5Xad-Fn/gp3Ub6kC_400x400.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo3}`, inline: false },
          { name: 'Price:', value: `${unitPrice3} sat/oxbt`, inline: true  },    
          { name: 'Quantity:', value: `${quantity3}`, inline: true },
          { name: 'Total Value:', value: `${totalValue3} sat ($${totalUSD3} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestOxbtSale()
    }, 20000);


    async function getPepe() {
      try {
        const url4 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/pepe/4/1/ts_desc';
        const response4 = await axios.get(url4);
        const $4 = cheerio.load(response4.data);
        inscriptionNum4 = response4.data[0].inscription_number;
        unitPrice4 = response4.data[0].unit_price;
        quantity4 = response4.data[0].amount;
        totalValue4 = response4.data[0].psbt_price;
        totalUSD4 = (totalValue4 * .00026);
        id4 = response4.data[0].inscription_id;
        inscriptioninfo4 = `[${inscriptionNum4}](https://ordinals.com/inscription/${id4})`;

        if (!isNaN(unitPrice4)) {
          if (unitPrice4 % 1 === 0) {
            unitPrice4 = parseFloat(unitPrice4).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice4 = parseFloat(unitPrice4).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity4)) {
          if (quantity4 % 1 === 0) {
            quantity4 = parseFloat(quantity4).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue4)) {
          if (totalValue4 % 1 === 0) {
            totalValue4 = parseFloat(totalValue4).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue4 = parseFloat(totalValue4).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD4)) {
          if (totalUSD4 % 1 === 0) {
            totalUSD4 = parseFloat(totalUSD4).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD4 = parseFloat(totalUSD4).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum4,
          unitPrice4,
          quantity4,
          totalValue4,
          totalUSD4,
          inscriptioninfo4
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestPepeSale() {
      const { inscriptionNum4, unitPrice4, quantity4, totalValue4, totalUSD4, inscriptioninfo4 } = await getPepe();      
      
      try {        
        const lastProcessed4 = JSON.parse(fs.readFileSync("lastProcessed4.json", "utf8"));
        const lastProcessedNumbers4 = lastProcessed4.lastProcessedNumbers4 || [];
    
        if (!inscriptionNum4) {
          return;
        }

        if (lastProcessedNumbers4.includes(inscriptionNum4)) {
          return;
        }

        lastProcessedNumbers4.push(inscriptionNum4);
        if (lastProcessedNumbers4.length > 5) {
          lastProcessedNumbers4.shift();
        }
        fs.writeFile("lastProcessed4.json", JSON.stringify({ lastProcessedNumbers4 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('PEPE')
        .setURL(`https://unisat.io/market?tick=pepe&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/OPXt-6gZw/HhczkhfU_400x400.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo4}`, inline: false },
          { name: 'Price:', value: `${unitPrice4} sat/pepe`, inline: true  },    
          { name: 'Quantity:', value: `${quantity4}`, inline: true },
          { name: 'Total Value:', value: `${totalValue4} sat ($${totalUSD4} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestPepeSale()
    }, 30000); 


    async function getSats() {
      try {
        const url5 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/sats/4/1/ts_desc';
        const response5 = await axios.get(url5);
        const $5 = cheerio.load(response5.data);
        inscriptionNum5 = response5.data[0].inscription_number;
        unitPrice5 = response5.data[0].unit_price;
        quantity5 = response5.data[0].amount;
        totalValue5 = response5.data[0].psbt_price;
        totalUSD5 = (totalValue5 * .00026);
        id5 = response5.data[0].inscription_id;
        inscriptioninfo5 = `[${inscriptionNum5}](https://ordinals.com/inscription/${id5})`;

        if (!isNaN(unitPrice5)) {
          if (unitPrice5 % 1 === 0) {
            unitPrice5 = parseFloat(unitPrice5).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice5 = parseFloat(unitPrice5).toFixed(7); // Convert to number and apply toFixed(7)
          }
        }
        
        if (!isNaN(quantity5)) {
          if (quantity5 % 1 === 0) {
            quantity5 = parseFloat(quantity5).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue5)) {
          if (totalValue5 % 1 === 0) {
            totalValue5 = parseFloat(totalValue5).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue5 = parseFloat(totalValue5).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD5)) {
          if (totalUSD5 % 1 === 0) {
            totalUSD5 = parseFloat(totalUSD5).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD5 = parseFloat(totalUSD5).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum5,
          unitPrice5,
          quantity5,
          totalValue5,
          totalUSD5,
          inscriptioninfo5
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestSatsSale() {
      const { inscriptionNum5, unitPrice5, quantity5, totalValue5, totalUSD5, inscriptioninfo5 } = await getSats();      
      
      try {        
        const lastProcessed5 = JSON.parse(fs.readFileSync("lastProcessed5.json", "utf8"));
        const lastProcessedNumbers5 = lastProcessed5.lastProcessedNumbers5 || [];
    
        if (!inscriptionNum5) {
          return;
        }

        if (lastProcessedNumbers5.includes(inscriptionNum5)) {
          return;
        }

        lastProcessedNumbers5.push(inscriptionNum5);
        if (lastProcessedNumbers5.length > 5) {
          lastProcessedNumbers5.shift();
        }
        fs.writeFile("lastProcessed5.json", JSON.stringify({ lastProcessedNumbers5 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('SATS')
        .setURL(`https://unisat.io/market?tick=sats&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/3b2sdL70b/SATS.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo5}`, inline: false },
          { name: 'Price:', value: `${unitPrice5} sat/sats`, inline: true  },    
          { name: 'Quantity:', value: `${quantity5}`, inline: true },
          { name: 'Total Value:', value: `${totalValue5} sat ($${totalUSD5} USD)` , inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestSatsSale()
    }, 30000);


    async function getPiza() {
      try {
        const url6 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/piza/4/1/ts_desc';
        const response6 = await axios.get(url6);
        const $6 = cheerio.load(response6.data);
        inscriptionNum6 = response6.data[0].inscription_number;
        unitPrice6 = response6.data[0].unit_price;
        quantity6 = response6.data[0].amount;
        totalValue6 = response6.data[0].psbt_price;
        totalUSD6 = (totalValue6 * .00026);
        id6 = response6.data[0].inscription_id;
        inscriptioninfo6 = `[${inscriptionNum6}](https://ordinals.com/inscription/${id6})`;

        if (!isNaN(unitPrice6)) {
          if (unitPrice6 % 1 === 0) {
            unitPrice6 = parseFloat(unitPrice6).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice6 = parseFloat(unitPrice6).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity6)) {
          if (quantity6 % 1 === 0) {
            quantity6 = parseFloat(quantity6).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue6)) {
          if (totalValue6 % 1 === 0) {
            totalValue6 = parseFloat(totalValue6).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue6 = parseFloat(totalValue6).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD6)) {
          if (totalUSD6 % 1 === 0) {
            totalUSD6 = parseFloat(totalUSD6).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD6 = parseFloat(totalUSD6).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum6,
          unitPrice6,
          quantity6,
          totalValue6,
          totalUSD6,
          inscriptioninfo6
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestPizaSale() {
      const { inscriptionNum6, unitPrice6, quantity6, totalValue6, totalUSD6, inscriptioninfo6 } = await getPiza();      
      
      try {        
        const lastProcessed6 = JSON.parse(fs.readFileSync("lastProcessed6.json", "utf8"));
        const lastProcessedNumbers6 = lastProcessed6.lastProcessedNumbers6 || [];
    
        if (!inscriptionNum6) {
          return;
        }

        if (lastProcessedNumbers6.includes(inscriptionNum6)) {
          return;
        }

        lastProcessedNumbers6.push(inscriptionNum6);
        if (lastProcessedNumbers6.length > 5) {
          lastProcessedNumbers6.shift();
        }
        fs.writeFile("lastProcessed6.json", JSON.stringify({ lastProcessedNumbers6 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('PIZA')
        .setURL(`https://unisat.io/market?tick=piza&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/NDIlzjaCg/piza.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo6}`, inline: false },
          { name: 'Price:', value: `${unitPrice6} sat/piza`, inline: true  },    
          { name: 'Quantity:', value: `${quantity6}`, inline: true },
          { name: 'Total Value:', value: `${totalValue6} sat ($${totalUSD6} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestPizaSale()
    }, 30000);


    async function getBili() {
      try {
        const url7 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/bili/4/1/ts_desc';
        const response7 = await axios.get(url7);
        const $7 = cheerio.load(response7.data);
        inscriptionNum7 = response7.data[0].inscription_number;
        unitPrice7 = response7.data[0].unit_price;
        quantity7 = response7.data[0].amount;
        totalValue7 = response7.data[0].psbt_price;
        totalUSD7 = (totalValue7 * .00026);
        id7 = response7.data[0].inscription_id;
        inscriptioninfo7 = `[${inscriptionNum7}](https://ordinals.com/inscription/${id7})`;

        if (!isNaN(unitPrice7)) {
          if (unitPrice7 % 1 === 0) {
            unitPrice7 = parseFloat(unitPrice7).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice7 = parseFloat(unitPrice7).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity7)) {
          if (quantity7 % 1 === 0) {
            quantity7 = parseFloat(quantity7).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue7)) {
          if (totalValue7 % 1 === 0) {
            totalValue7 = parseFloat(totalValue7).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue7 = parseFloat(totalValue7).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD7)) {
          if (totalUSD7 % 1 === 0) {
            totalUSD7 = parseFloat(totalUSD7).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD7 = parseFloat(totalUSD7).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum7,
          unitPrice7,
          quantity7,
          totalValue7,
          totalUSD7,
          inscriptioninfo7
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestBiliSale() {
      const { inscriptionNum7, unitPrice7, quantity7, totalValue7, totalUSD7, inscriptioninfo7 } = await getBili();      
      
      try {        
        const lastProcessed7 = JSON.parse(fs.readFileSync("lastProcessed7.json", "utf8"));
        const lastProcessedNumbers7 = lastProcessed7.lastProcessedNumbers7 || [];
    
        if (!inscriptionNum7) {
          return;
        }

        if (lastProcessedNumbers7.includes(inscriptionNum7)) {
          return;
        }

        lastProcessedNumbers7.push(inscriptionNum7);
        if (lastProcessedNumbers7.length > 5) {
          lastProcessedNumbers7.shift();
        }
        fs.writeFile("lastProcessed7.json", JSON.stringify({ lastProcessedNumbers7 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('BILI')
        .setURL(`https://unisat.io/market?tick=bili&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/pWHlcbDt2/kZB3zpG7_400x400.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo7}`, inline: false },
          { name: 'Price:', value: `${unitPrice7} sat/bili`, inline: true  },    
          { name: 'Quantity:', value: `${quantity7}`, inline: true },
          { name: 'Total Value:', value: `${totalValue7} sat ($${totalUSD7} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestBiliSale()
    }, 30000);


    async function getVmpx() {
      try {
        const url8 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/vmpx/4/1/ts_desc';
        const response8 = await axios.get(url8);
        const $8 = cheerio.load(response8.data);
        inscriptionNum8 = response8.data[0].inscription_number;
        unitPrice8 = response8.data[0].unit_price;
        quantity8 = response8.data[0].amount;
        totalValue8 = response8.data[0].psbt_price;
        totalUSD8 = (totalValue8 * .00026);
        id8 = response8.data[0].inscription_id;
        inscriptioninfo8 = `[${inscriptionNum8}](https://ordinals.com/inscription/${id8})`;

        if (!isNaN(unitPrice8)) {
          if (unitPrice8 % 1 === 0) {
            unitPrice8 = parseFloat(unitPrice8).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice8 = parseFloat(unitPrice8).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity8)) {
          if (quantity8 % 1 === 0) {
            quantity8 = parseFloat(quantity8).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue8)) {
          if (totalValue8 % 1 === 0) {
            totalValue8 = parseFloat(totalValue8).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue8 = parseFloat(totalValue8).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD8)) {
          if (totalUSD8 % 1 === 0) {
            totalUSD8 = parseFloat(totalUSD8).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD8 = parseFloat(totalUSD8).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum8,
          unitPrice8,
          quantity8,
          totalValue8,
          totalUSD8,
          inscriptioninfo8
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestVmpxSale() {
      const { inscriptionNum8, unitPrice8, quantity8, totalValue8, totalUSD8, inscriptioninfo8 } = await getVmpx();      
      
      try {        
        const lastProcessed8 = JSON.parse(fs.readFileSync("lastProcessed8.json", "utf8"));
        const lastProcessedNumbers8 = lastProcessed8.lastProcessedNumbers8 || [];
    
        if (!inscriptionNum8) {
          return;
        }

        if (lastProcessedNumbers8.includes(inscriptionNum8)) {
          return;
        }

        lastProcessedNumbers8.push(inscriptionNum8);
        if (lastProcessedNumbers8.length > 5) {
          lastProcessedNumbers8.shift();
        }
        fs.writeFile("lastProcessed8.json", JSON.stringify({ lastProcessedNumbers8 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('VMPX')
        .setURL(`https://unisat.io/market?tick=vmpx&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/VKhcS1bQP/qYY7vsNe_400x400.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo8}`, inline: false },
          { name: 'Price:', value: `${unitPrice8} sat/vmpx`, inline: true  },    
          { name: 'Quantity:', value: `${quantity8}`, inline: true },
          { name: 'Total Value:', value: `${totalValue8} sat ($${totalUSD8} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestVmpxSale()
    }, 30000);


    async function getOshi() {
      try {
        const url9 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/oshi/4/1/ts_desc';
        const response9 = await axios.get(url9);
        const $9 = cheerio.load(response9.data);
        inscriptionNum9 = response9.data[0].inscription_number;
        unitPrice9 = response9.data[0].unit_price;
        quantity9 = response9.data[0].amount;
        totalValue9 = response9.data[0].psbt_price;
        totalUSD9 = (totalValue9 * .00026);
        id9 = response9.data[0].inscription_id;
        inscriptioninfo9 = `[${inscriptionNum9}](https://ordinals.com/inscription/${id9})`;

        if (!isNaN(unitPrice9)) {
          if (unitPrice9 % 1 === 0) {
            unitPrice9 = parseFloat(unitPrice9).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice9 = parseFloat(unitPrice9).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity9)) {
          if (quantity9 % 1 === 0) {
            quantity9 = parseFloat(quantity9).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue9)) {
          if (totalValue9 % 1 === 0) {
            totalValue9 = parseFloat(totalValue9).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue9 = parseFloat(totalValue9).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD9)) {
          if (totalUSD9 % 1 === 0) {
            totalUSD9 = parseFloat(totalUSD9).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD9 = parseFloat(totalUSD9).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum9,
          unitPrice9,
          quantity9,
          totalValue9,
          totalUSD9,
          inscriptioninfo9
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestOshiSale() {
      const { inscriptionNum9, unitPrice9, quantity9, totalValue9, totalUSD9, inscriptioninfo9 } = await getOshi();      
      
      try {        
        const lastProcessed9 = JSON.parse(fs.readFileSync("lastProcessed9.json", "utf8"));
        const lastProcessedNumbers9 = lastProcessed9.lastProcessedNumbers9 || [];
    
        if (!inscriptionNum9) {
          return;
        }

        if (lastProcessedNumbers9.includes(inscriptionNum9)) {
          return;
        }

        lastProcessedNumbers9.push(inscriptionNum9);
        if (lastProcessedNumbers9.length > 5) {
          lastProcessedNumbers9.shift();
        }
        fs.writeFile("lastProcessed9.json", JSON.stringify({ lastProcessedNumbers9 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('OSHI')
        .setURL(`https://unisat.io/market?tick=oshi&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/wc_JpPxMv/Oshi.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo9}`, inline: false },
          { name: 'Price:', value: `${unitPrice9} sat/oshi`, inline: true  },    
          { name: 'Quantity:', value: `${quantity9}`, inline: true },
          { name: 'Total Value:', value: `${totalValue9} sat ($${totalUSD9} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestOshiSale()
    }, 30000);


    async function getBtoc() {
      try {
        const url10 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/btoc/4/1/ts_desc';
        const response10 = await axios.get(url10);
        const $10 = cheerio.load(response10.data);
        inscriptionNum10 = response10.data[0].inscription_number;
        unitPrice10 = response10.data[0].unit_price;
        quantity10 = response10.data[0].amount;
        totalValue10 = response10.data[0].psbt_price;
        totalUSD10 = (totalValue10 * .00026);
        id10 = response10.data[0].inscription_id;
        inscriptioninfo10 = `[${inscriptionNum10}](https://ordinals.com/inscription/${id10})`;

        if (!isNaN(unitPrice10)) {
          if (unitPrice10 % 1 === 0) {
            unitPrice10 = parseFloat(unitPrice10).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice10 = parseFloat(unitPrice10).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity10)) {
          if (quantity10 % 1 === 0) {
            quantity10 = parseFloat(quantity10).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue10)) {
          if (totalValue10 % 1 === 0) {
            totalValue10 = parseFloat(totalValue10).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue10 = parseFloat(totalValue10).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD10)) {
          if (totalUSD10 % 1 === 0) {
            totalUSD10 = parseFloat(totalUSD10).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD10 = parseFloat(totalUSD10).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum10,
          unitPrice10,
          quantity10,
          totalValue10,
          totalUSD10,
          inscriptioninfo10
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestBtocSale() {
      const { inscriptionNum10, unitPrice10, quantity10, totalValue10, totalUSD10, inscriptioninfo10 } = await getBtoc();      
      
      try {        
        const lastProcessed10 = JSON.parse(fs.readFileSync("lastProcessed10.json", "utf8"));
        const lastProcessedNumbers10 = lastProcessed10.lastProcessedNumbers10 || [];
    
        if (!inscriptionNum10) {
          return;
        }

        if (lastProcessedNumbers10.includes(inscriptionNum10)) {
          return;
        }

        lastProcessedNumbers10.push(inscriptionNum10);
        if (lastProcessedNumbers10.length > 5) {
          lastProcessedNumbers10.shift();
        }
        fs.writeFile("lastProcessed10.json", JSON.stringify({ lastProcessedNumbers10 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('BTOC')
        .setURL(`https://unisat.io/market?tick=btoc&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/nljJTTMoh/2p9SWYWX_400x400.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo10}`, inline: false },
          { name: 'Price:', value: `${unitPrice10} sat/btoc`, inline: true  },    
          { name: 'Quantity:', value: `${quantity10}`, inline: true },
          { name: 'Total Value:', value: `${totalValue10} sat ($${totalUSD10} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestBtocSale()
    }, 30000);


    async function getMeme() {
      try {
        const url11 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/meme/4/1/ts_desc';
        const response11 = await axios.get(url11);
        const $11 = cheerio.load(response11.data);
        inscriptionNum11 = response11.data[0].inscription_number;
        unitPrice11 = response11.data[0].unit_price;
        quantity11 = response11.data[0].amount;
        totalValue11 = response11.data[0].psbt_price;
        totalUSD11 = (totalValue11 * .00026);
        id11 = response11.data[0].inscription_id;
        inscriptioninfo11 = `[${inscriptionNum11}](https://ordinals.com/inscription/${id11})`;

        if (!isNaN(unitPrice11)) {
          if (unitPrice11 % 1 === 0) {
            unitPrice11 = parseFloat(unitPrice11).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice11 = parseFloat(unitPrice11).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity11)) {
          if (quantity11 % 1 === 0) {
            quantity11 = parseFloat(quantity11).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue11)) {
          if (totalValue11 % 1 === 0) {
            totalValue11 = parseFloat(totalValue11).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue11 = parseFloat(totalValue11).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD11)) {
          if (totalUSD11 % 1 === 0) {
            totalUSD11 = parseFloat(totalUSD11).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD11 = parseFloat(totalUSD11).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum11,
          unitPrice11,
          quantity11,
          totalValue11,
          totalUSD11,
          inscriptioninfo11
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestMemeSale() {
      const { inscriptionNum11, unitPrice11, quantity11, totalValue11, totalUSD11, inscriptioninfo11 } = await getMeme();      
      
      try {        
        const lastProcessed11 = JSON.parse(fs.readFileSync("lastProcessed11.json", "utf8"));
        const lastProcessedNumbers11 = lastProcessed11.lastProcessedNumbers11 || [];
    
        if (!inscriptionNum11) {
          return;
        }

        if (lastProcessedNumbers11.includes(inscriptionNum11)) {
          return;
        }

        lastProcessedNumbers11.push(inscriptionNum11);
        if (lastProcessedNumbers11.length > 5) {
          lastProcessedNumbers11.shift();
        }
        fs.writeFile("lastProcessed11.json", JSON.stringify({ lastProcessedNumbers11 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('MEME')
        .setURL(`https://unisat.io/market?tick=meme&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/xJLXeCg3J/ZnW5aagO_400x400.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo11}`, inline: false },
          { name: 'Price:', value: `${unitPrice11} sat/meme`, inline: true  },    
          { name: 'Quantity:', value: `${quantity11}`, inline: true },
          { name: 'Total Value:', value: `${totalValue11} sat ($${totalUSD11} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestMemeSale()
    }, 30000); 


    async function getGrum() {
      try {
        const url12 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/grum/4/1/ts_desc';
        const response12 = await axios.get(url12);
        const $12 = cheerio.load(response12.data);
        inscriptionNum12 = response12.data[0].inscription_number;
        unitPrice12 = response12.data[0].unit_price;
        quantity12 = response12.data[0].amount;
        totalValue12 = response12.data[0].psbt_price;
        totalUSD12 = (totalValue12 * .00026);
        id12 = response12.data[0].inscription_id;
        inscriptioninfo12 = `[${inscriptionNum12}](https://ordinals.com/inscription/${id12})`;

        if (!isNaN(unitPrice12)) {
          if (unitPrice12 % 1 === 0) {
            unitPrice12 = parseFloat(unitPrice12).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice12 = parseFloat(unitPrice12).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity12)) {
          if (quantity12 % 1 === 0) {
            quantity12 = parseFloat(quantity12).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue12)) {
          if (totalValue12 % 1 === 0) {
            totalValue12 = parseFloat(totalValue12).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue12 = parseFloat(totalValue12).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD12)) {
          if (totalUSD12 % 1 === 0) {
            totalUSD12 = parseFloat(totalUSD12).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD12 = parseFloat(totalUSD12).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum12,
          unitPrice12,
          quantity12,
          totalValue12,
          totalUSD12,
          inscriptioninfo12
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestGrumSale() {
      const { inscriptionNum12, unitPrice12, quantity12, totalValue12, totalUSD12, inscriptioninfo12 } = await getGrum();      
      
      try {        
        const lastProcessed12 = JSON.parse(fs.readFileSync("lastProcessed12.json", "utf8"));
        const lastProcessedNumbers12 = lastProcessed12.lastProcessedNumbers12 || [];
    
        if (!inscriptionNum12) {
          return;
        }

        if (lastProcessedNumbers12.includes(inscriptionNum12)) {
          return;
        }

        lastProcessedNumbers12.push(inscriptionNum12);
        if (lastProcessedNumbers12.length > 5) {
          lastProcessedNumbers12.shift();
        }
        fs.writeFile("lastProcessed12.json", JSON.stringify({ lastProcessedNumbers12 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('GRUM')
        .setURL(`https://unisat.io/market?tick=grum&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/xx3Uy8Ii9/gLT7IOS5hAGmZa-M5-QUOoiaDaxzHZSXdvEkjYmWmuw.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo12}`, inline: false },
          { name: 'Price:', value: `${unitPrice12} sat/grum`, inline: true  },    
          { name: 'Quantity:', value: `${quantity12}`, inline: true },
          { name: 'Total Value:', value: `${totalValue12} sat ($${totalUSD12} USD)` , inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestGrumSale()
    }, 30000);


    async function getOich() {
      try {
        const url13 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/oich/4/1/ts_desc';
        const response13 = await axios.get(url13);
        const $13 = cheerio.load(response13.data);
        inscriptionNum13 = response13.data[0].inscription_number;
        unitPrice13 = response13.data[0].unit_price;
        quantity13 = response13.data[0].amount;
        totalValue13 = response13.data[0].psbt_price;
        totalUSD13 = (totalValue13 * .00026);
        id13 = response13.data[0].inscription_id;
        inscriptioninfo13 = `[${inscriptionNum13}](https://ordinals.com/inscription/${id13})`;

        if (!isNaN(unitPrice13)) {
          if (unitPrice13 % 1 === 0) {
            unitPrice13 = parseFloat(unitPrice13).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice13 = parseFloat(unitPrice13).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity13)) {
          if (quantity13 % 1 === 0) {
            quantity13 = parseFloat(quantity13).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue13)) {
          if (totalValue13 % 1 === 0) {
            totalValue13 = parseFloat(totalValue13).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue13 = parseFloat(totalValue13).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD13)) {
          if (totalUSD13 % 1 === 0) {
            totalUSD13 = parseFloat(totalUSD13).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD13 = parseFloat(totalUSD13).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum13,
          unitPrice13,
          quantity13,
          totalValue13,
          totalUSD13,
          inscriptioninfo13
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestOichSale() {
      const { inscriptionNum13, unitPrice13, quantity13, totalValue13, totalUSD13, inscriptioninfo13 } = await getOich();      
      
      try {        
        const lastProcessed13 = JSON.parse(fs.readFileSync("lastProcessed13.json", "utf8"));
        const lastProcessedNumbers13 = lastProcessed13.lastProcessedNumbers13 || [];
    
        if (!inscriptionNum13) {
          return;
        }

        if (lastProcessedNumbers13.includes(inscriptionNum13)) {
          return;
        }

        lastProcessedNumbers13.push(inscriptionNum13);
        if (lastProcessedNumbers13.length > 5) {
          lastProcessedNumbers13.shift();
        }
        fs.writeFile("lastProcessed13.json", JSON.stringify({ lastProcessedNumbers13 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('OICH')
        .setURL(`https://unisat.io/market?tick=oich&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/RBDKubM66/LuicJsSF_400x400.png?size=100x100')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo13}`, inline: false },
          { name: 'Price:', value: `${unitPrice13} sat/oich`, inline: true  },    
          { name: 'Quantity:', value: `${quantity13}`, inline: true },
          { name: 'Total Value:', value: `${totalValue13} sat ($${totalUSD13} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestOichSale()
    }, 30000);


    async function getMxrc() {
      try {
        const url14 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/mxrc/4/1/ts_desc';
        const response14 = await axios.get(url14);
        const $14 = cheerio.load(response14.data);
        inscriptionNum14 = response14.data[0].inscription_number;
        unitPrice14 = response14.data[0].unit_price;
        quantity14 = response14.data[0].amount;
        totalValue14 = response14.data[0].psbt_price;
        totalUSD14 = (totalValue14 * .00026);
        id14 = response14.data[0].inscription_id;
        inscriptioninfo14 = `[${inscriptionNum14}](https://ordinals.com/inscription/${id14})`;

        if (!isNaN(unitPrice14)) {
          if (unitPrice14 % 1 === 0) {
            unitPrice14 = parseFloat(unitPrice14).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice14 = parseFloat(unitPrice14).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        if (!isNaN(quantity14)) {
          if (quantity14 % 1 === 0) {
            quantity14 = parseFloat(quantity14).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue14)) {
          if (totalValue14 % 1 === 0) {
            totalValue14 = parseFloat(totalValue14).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue14 = parseFloat(totalValue14).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD14)) {
          if (totalUSD14 % 1 === 0) {
            totalUSD14 = parseFloat(totalUSD14).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD14 = parseFloat(totalUSD14).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum14,
          unitPrice14,
          quantity14,
          totalValue14,
          totalUSD14,
          inscriptioninfo14
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestMxrcSale() {
      const { inscriptionNum14, unitPrice14, quantity14, totalValue14, totalUSD14, inscriptioninfo14 } = await getMxrc();      
      
      try {        
        const lastProcessed14 = JSON.parse(fs.readFileSync("lastProcessed14.json", "utf8"));
        const lastProcessedNumbers14 = lastProcessed14.lastProcessedNumbers14 || [];
    
        if (!inscriptionNum14) {
          return;
        }

        if (lastProcessedNumbers14.includes(inscriptionNum14)) {
          return;
        }

        lastProcessedNumbers14.push(inscriptionNum14);
        if (lastProcessedNumbers14.length > 5) {
          lastProcessedNumbers14.shift();
        }
        fs.writeFile("lastProcessed14.json", JSON.stringify({ lastProcessedNumbers14 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('MXRC')
        .setURL(`https://unisat.io/market?tick=mxrc&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/I-2q77yW5/MXRC.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo14}`, inline: false },
          { name: 'Price:', value: `${unitPrice14} sat/mxrc`, inline: true  },    
          { name: 'Quantity:', value: `${quantity14}`, inline: true },
          { name: 'Total Value:', value: `${totalValue14} sat ($${totalUSD14} USD)`, inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestMxrcSale()
    }, 30000); 


    async function getDgoo() {
      try {
        const url15 = 'https://brc20api.bestinslot.xyz/v1/get_brc20_activity/dgoo/4/1/ts_desc';
        const response15 = await axios.get(url15);
        const $15 = cheerio.load(response15.data);
        inscriptionNum15 = response15.data[0].inscription_number;
        unitPrice15 = response15.data[0].unit_price;
        quantity15 = response15.data[0].amount;
        totalValue15 = response15.data[0].psbt_price;
        totalUSD15 = (totalValue15 * .00026);
        id15 = response15.data[0].inscription_id;
        inscriptioninfo15 = `[${inscriptionNum15}](https://ordinals.com/inscription/${id15})`;

        if (!isNaN(unitPrice15)) {
          if (unitPrice15 % 1 === 0) {
            unitPrice15 = parseFloat(unitPrice15).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            unitPrice15 = parseFloat(unitPrice15).toFixed(7); // Convert to number and apply toFixed(7)
          }
        }
        
        if (!isNaN(quantity15)) {
          if (quantity15 % 1 === 0) {
            quantity15 = parseFloat(quantity15).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            //totalValue = totalValue.toFixed(2); // Two decimal places if the number has non-zero decimal digits
          }
        }
        
        if (!isNaN(totalValue15)) {
          if (totalValue15 % 1 === 0) {
            totalValue15 = parseFloat(totalValue15).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalValue15 = parseFloat(totalValue15).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }

        if (!isNaN(totalUSD15)) {
          if (totalUSD15 % 1 === 0) {
            totalUSD15 = parseFloat(totalUSD15).toFixed(0); // Convert to number and apply toFixed(0)
          } else {
            totalUSD15 = parseFloat(totalUSD15).toFixed(2); // Convert to number and apply toFixed(2)
          }
        }
        
        return {
          inscriptionNum15,
          unitPrice15,
          quantity15,
          totalValue15,
          totalUSD15,
          inscriptioninfo15
        };
          
      } catch (error) {
          console.log(error);
      }
    };     
    
    async function sendLatestDgooSale() {
      const { inscriptionNum15, unitPrice15, quantity15, totalValue15, totalUSD15, inscriptioninfo15 } = await getDgoo();      
      
      try {        
        const lastProcessed15 = JSON.parse(fs.readFileSync("lastProcessed15.json", "utf8"));
        const lastProcessedNumbers15 = lastProcessed15.lastProcessedNumbers15 || [];
    
        if (!inscriptionNum15) {
          return;
        }

        if (lastProcessedNumbers15.includes(inscriptionNum15)) {
          return;
        }

        lastProcessedNumbers15.push(inscriptionNum15);
        if (lastProcessedNumbers15.length > 5) {
          lastProcessedNumbers15.shift();
        }
        fs.writeFile("lastProcessed15.json", JSON.stringify({ lastProcessedNumbers15 }), (err) => {
          if (err) {
              console.error(err);
              return;
          }
        })
  
      const salesBotEmbed = new EmbedBuilder()      
        .setColor(0xadff2f)
        .setTitle('DGOO')
        .setURL(`https://unisat.io/market?tick=dgoo&tab=1`)    
        .setAuthor({ name: 'BRC-20 SALES BOT'})
        .setThumbnail('https://cdn.coinranking.com/M3G6JKtFW/VolzCwqG_400x400.PNG?size=34x34')            
        .addFields(
          { name: 'Inscription #:', value: `${inscriptioninfo15}`, inline: false },
          { name: 'Price:', value: `${unitPrice15} sat/dgoo`, inline: true  },    
          { name: 'Quantity:', value: `${quantity15}`, inline: true },
          { name: 'Total Value:', value: `${totalValue15} sat ($${totalUSD15} USD)` , inline: false  },
        ) 
        .setTimestamp()
        .setFooter({ text: 'by bfitch.eth', iconURL: 'https://i.seadn.io/gcs/files/3784d5ac049f2518b4d9e14b265bf04c.jpg?auto=format&w=1920'});

        msg.channel.send({ embeds: [salesBotEmbed] });
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      sendLatestDgooSale()
    }, 30000);

  }});

client.login(process.env["DISCORD_BOT_TOKEN"]);

 
