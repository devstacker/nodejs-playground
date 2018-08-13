//const { odd, even } = require('./var');
const checkNumber = require('./func'); //변수 명을 바꿔서 불러온것.
const checkStringOddOrEven = require('./func');


console.log(checkNumber(10));
//Q. func 파일에서 변수명을 바꿔서 불러왔는데 두개의 함수중에 어떤 함수를 불러온건지 어떻게 아는걸까?
console.log(checkNumber('hello'));
console.log(checkStringOddOrEven('nodejs'));