import 'dotenv/config.js';
import TelegramBot from 'node-telegram-bot-api';
import { ethers } from 'ethers';
import { provider } from './provider/provider.js';
import {
  DRIP_ADDRESS,
  DRIP_ABI,
  addresses,
} from './contracts/drip_contract.js';

const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramBot(token, { polling: true });
console.log('DRIP SACRIFICE LISTENER bot active.');

const contract = new ethers.Contract(DRIP_ADDRESS, DRIP_ABI, provider);
const METHOD_ID = '0xa9059cbb';
const processedHashes = new Set();
let largestSacrificed = ethers.BigNumber.from(0);

const opts = {
  parse_mode: 'Markdown',
  disable_web_page_preview: true,
};

async function handleEvent(from, to, value, event) {
  if (!addresses.includes(from)) {
    if (!processedHashes.has(event.transactionHash)) {
      processedHashes.add(event.transactionHash);
      const tx = await provider.getTransaction(event.transactionHash);
      if (
        tx.data.substring(0, 10) === METHOD_ID &&
        tx.data.substring(34, 74) === addresses[0].toLowerCase().substring(2)
      ) {
        const valueHex = tx.data.slice(-64);
        const valueBN = ethers.BigNumber.from(`0x${valueHex}`);
        if (valueBN.gt(largestSacrificed)) {
          largestSacrificed = valueBN;
        }
        bot.sendMessage(
          process.env.CHAT_ID,
          `[Drip Sacrificed](https://bscscan.com/tx/${
            event.transactionHash
          }): ${ethers.utils.formatEther(valueBN.toString())}\n
Largest Sacrificed: ${ethers.utils.formatEther(largestSacrificed.toString())}
          `,
          opts
        );
      }
    }
  }
}

async function resetLargestSacrificed() {
  largestSacrificed = ethers.BigNumber.from(0);
  processedHashes.clear();
  bot.sendMessage(process.env.CHAT_ID, `🔥 Largest Sacrificed Reset 🔥`, opts);
}

async function main() {
  const filter = {
    topics: [
      ethers.utils.id('Transfer(address,address,uint256)'),
      null,
      ethers.utils.hexZeroPad(addresses[0], 32),
    ],
  };
  contract.on(filter, handleEvent);

  setInterval(resetLargestSacrificed, 4 * 60 * 60 * 1000);
}

bot.sendMessage(process.env.CHAT_ID, `Bot starting...`, opts);
main();
