const fs = require('fs');

// 1. 순서대로 처리하고 싶으면 콜백의 콜백의 콜백 형식으로 작성하면 된다.(콜백은 비동기방식, 이방법을 많이 씀)
console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});

// 2. 동기방식 - fs 모듈은 동기 메서드를 지원함(readFileSync)
// 실제로는 비동기방식을 많이쓴다. 만약 파일을 읽는데 시간이 오래걸린다면, 서버가 파일 하나 읽느라 다른 요청들을 처리 할수 없으므로 문제가 될 수 있다.
// 그렇기 때문에 Sync 메서드들은 잘 쓰지 않고 좀 지저분 하더라도 readFile 메서드를 더 많이 쓴다고 한다.
// 대신 콜백헬이 발생하는것을 막기위해 util.promisify나 node 10에서 새로 지원하는 fs promise를 사용해서 극복한다고 함
// Sync 메서드를 써도 되는 경우는 desktop 프로그램이나 딱 한번만 실행되는 함수, 한번만 블락킹 일어날 수 있는 경우에만 쓰면된다.
console.log('시작');
let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
console.log('끝');

