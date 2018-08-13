
const timeout = setTimeout(() => {
    console.log('1.5초 뒤에 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초 마다 실행');
}, 1000);


//설정해제
//clearTimeout(timeout);
//clearInterval(interval);

const timeout2 = setTimeout(() => {
    console.log('실행 되지 않습니다');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

//굳이 setImmediate를 사용하는 이유는? 
//timer함수안에 들어있는 함수들을 이벤트 루프로 보내 실행순서가 달라지게 하는 효과를 내기위해 사용 
const im = setImmediate(() => {
    console.log('즉시실행');
});
//clearImmediate(im);