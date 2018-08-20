
//1초마다 반복해서 콜백 실행
//error가 발생할 수 있는 상황에 try catch 로 감싸면 error가 발생하더라도 죽지않음
//하지만 try catch가 필요없는 상황으로 만드는것이 더 좋다. (async/await 제외)
setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 고장내겠다!');        
    } catch (error) {
        console.error(error);
    }
}, 1000);


//try catch를 쓰지 않고도 error를 잡아내는 방법
process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러', err);
    // 서버를 복구하는 코드를 집어넣을순 있지만 노드가 이 콜백을 실행할것이라는 보장이 되진 않음.
});