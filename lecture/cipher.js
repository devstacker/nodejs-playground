const crypto = require('crypto');

//암호화
const cipher = crypto.createCipher('aes-256-cbc', '열쇠'); //암호화하는 알고리즘 중 하나
let result = cipher.update('dahlia1225', 'utf-8', 'base64'); //인코딩은 utf-8, 결과는 base64로
result += cipher.final('base64'); //암호화를 마무리
console.log('암호: ', result);


//복호화
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠'); //암호화했던 알고리즘과 열쇠가 같아야 함
let result2 = decipher.update(result, 'base64', 'utf-8');
result2 += decipher.final('utf-8'); //복호화를 마무리
console.log('평문: ', result2);
