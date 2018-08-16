const fs = require('fs');

// 모두 비동기 메서드라서 먼저끝나는애가 먼저 콘솔에 찍힌다. 시작 - 끝 - 1,3,2번(랜덤)으로 찍힌다.
console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
    if (err)  {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});
console.log('끝');

//시작-1-2-3 끝 으로 찍히게 하고 싶으면 동기방식으로 바꿔야한다.(sync.js)
