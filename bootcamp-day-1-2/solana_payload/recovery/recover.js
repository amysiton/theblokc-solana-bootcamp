const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('2XertqaAu1X6z8f2EsGnYTVMUwtWFBZBwJ1GVeBipfJr4CHf9Lznz3zMgAE1DeqWdLHUPNS4UpQKXiPVZ957XRiE');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`);