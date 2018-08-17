//const { odd, even } = require('./var');
const OddOrEven = require("./func"); //변수 명을 바꿔서 불러온것.
//const checkStringOddOrEven = require('./func');

// Q. func 파일에서 변수명을 바꿔서 불러왔는데 두개의 함수중에 어떤 함수를 불러온건지 어떻게 아는걸까? 
// 해결!!(여러 함수가 있을 경우에는 비구조화 할당으로 묶어서 내보내고 가져올때 아래와 같이 불러오면 함수 지정가능)
console.log(OddOrEven.checkOddOrEven(9));
console.log(OddOrEven.checkStringOddOrEven("nodejs"));
console.log(OddOrEven.odd);
console.log(OddOrEven.even);

//console.log(checkStringOddOrEven('nodejs'));

//console.log(global); //node의 전역객체

// 해당 파일경로
console.log(__filename);
// 해당 파일이 들어있는 폴더경로
console.log(__dirname);