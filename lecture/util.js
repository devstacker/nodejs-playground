const util = require('util');
const crypto = require('crypto');

const dontuseme = util.deprecate(((x,y) => {
    console.log(x + y);
}), '이 함수는 12월 12일 부로 지원하지 않는 기능입니다.');
dontuseme(1,2);

crypto.randomBytes(64, (err, buf) => { 
    const salt = buf.toString('base64'); 
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('dahlia1225', salt, 551395, 64, 'sha512', (err, key) => { 
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });

});

// 위의 코드에서 콜백지옥을 없애려면 randomBytes라는 함수가 promise를 지원해야 아래같은 형식으로 쓸수 있는데, 지원하지 않는다!
// crypto.randomBytes(64)
//     .then((buf) => {

//     })
//     .catch((err) => {
//         console.error(err);
//     })

// 하지만 util.promisify 메서드를 사용해 promise형식으로 바꿀수 있다
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

randomBytesPromise(64)
    .then((buf) => {
        const salt = buf.toString('base64');
        return pbkdf2Promise('dahlia1225', salt, 551395, 64, 'sha512');
    })
    .then((key) => {
        console.log('password', key.toString('base64'));
    })
    .catch((err) => {
        console.error(err);
    });

// 위에서 promise로 바꾼 문법을 이제 다시 async/await으로 바꿀수 있다
(async() => {
    const buf = await randomBytesPromise(64);
    const salt = buf.toString('base64');
    const key = await pbkdf2Promise('dahlia1225', salt, 551395, 64, 'sha512');
    console.log('password', key.toString('base64'));
})();

