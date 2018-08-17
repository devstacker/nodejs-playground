const fs = require('fs');

const readStream = fs.createReadStream('./readme2.txt', {highWaterMark : 16}); // HWM : 몇바이트씩 읽을건지 - 16바이트를 채우면 읽음
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data', chunk, chunk.length);
});
//16바이트씩 옮기다가 다 끝났을때
readStream.on('end', () => {
    console.log('end', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.error('error', err);
})
