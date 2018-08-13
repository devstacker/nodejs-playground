const { odd, even } = require('./var');
//console.log(odd);
//console.log(even);

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

module.exports = { odd, even };//불러온 속성을 또다른 파일에서 또 쓸수있도록 내보낼수도 있고
module.exports = checkOddOrEven; //함수를 내보낼수도 있다.
module.exports = checkStringOddOrEven;