const fs = require('fs');
const zlib = require('zlib'); // 파일압축 모듈

const readStream = fs.createReadStream('readme3.txt');
const writeStream = fs.createWriteStream('writeme2.txt');
const zlibStream = zlib.createGzip(); //압축
readStream.pipe(writeStream); // readme3파일 읽어서 writeme2에 연결하는거니까 복사하는 행위와 같다.
readStream.pipe(zlibStream).pipe(writeStream); // stream 간 파이프는 계속 연결 가능하다. 이럴땐 zlib로 파일 압축을 해준다.

// copyFile로 바로 복사할수 있는 기능이 나옴
const readStream = fs.copyFile('./readme4.txt', './writeme3.txt', (err) => {
    console.log(err);
});