const http = require('http');
const fs = require('fs');

// parsing cookies - 지금은 몰라도되는 코드
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http.createServer((req, res) => {
    console.log(req.url, parseCookies(req.headers.cookie));
    res.writeHead(200, { 'Set-Cookie':'mycookie=test'} ) //서버에서 클라이언트로 데이터보냄
    //console.log('서버실행');
    fs.readFile('./server.html', (err, data) => { //버퍼가 data에 담김
        if(err) {
            throw err;
        }
        res.end(data); //버퍼에는 사람이 읽기 어려운 문자로 데이터가 담겨있는데 브라우저가 알아서 toString 처리해준다.
    });
    // res.write('<h1>Hello Node!</h1>');
    // res.write('<h2>javascript runtime!</h2>');
    // res.end('<p>Hello Server</p>');
}).listen(8080);

// Q. listening 같은건 내맘대로 이름 지어도 되는건가..이 이름은 언제쓰는거지? 내가 쉽게 구별하려고 지은거맞나
server.on('listening', () => {
    console.log('8080 포트에서 서버 대기중입니다.');
});
server.on('error', (error) => {
    console.error(error);
});