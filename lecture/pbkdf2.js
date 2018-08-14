const crypto = require('crypto');

// 먼저 pbfk2 알고리즘이 어떻게 작동하는지 알아보자
crypto.randomBytes(64, (err, buf) => { //buf에 닮긴 랜덤한 64바이트를 base64 문자열로 만든다. (base64는 버퍼를 문자열로 만드는 알고리즘 중 하나)
    const salt = buf.toString('base64'); //해시충돌 공격을 어렵게 하기 위해 salt라는 문자열을 원래 비밀번호에 추가하고 iteration 횟수를 높인다.
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('dahlia1225', salt, 551395, 64, 'sha512', (err, key) => { //salt는 암호화된 비밀번호와 같이 저장하고 iteration은 1초 정도가 걸릴때까지 올려주면 좋다
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });
   
});
// 실무에서는 bcrypt, scrypt를 많이 사용함