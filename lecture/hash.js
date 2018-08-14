const crypto = require('crypto');

//sha512알고리즘을 사용해 password를 암호화하고 base64방식으로 출력해줘라
console.log(crypto.createHash('sha512').update('password123').digest('base64')); 
//하지만 충돌날 가능성이 존재하므로 안전하지 않음 그래서 노드는 createHash 보다 더 강한 pbkdf2 알고리즘을 제공함