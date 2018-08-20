const EventEmitter = require('events');

const myEvent = new EventEmitter();

//addListener = on (alias)
myEvent.addListener('방문', () => {
    console.log('방문해 주셔서 감사합니다.');
});
myEvent.on('종료', () => {
    console.log('안녕히가세요');
});
myEvent.once('특별이벤트', () => {
    console.log('한번만 실행되요');
});

//이벤트호출
myEvent.emit('방문');
myEvent.emit('종료');
myEvent.emit('특별이벤트');
myEvent.emit('특별이벤트');

myEvent.on('계속', () => {
    console.log('계속 리스닝');
});
myEvent.removeAllListeners('계속');
myEvent.emit('계속');


const callback = () => {
    console.log('제발좀 가십쇼');
};
myEvent.on('종료1', callback);
myEvent.on('종료1', () => {
    console.log('안녕히 가십쇼');
});

myEvent.removeListener('종료1', callback);
myEvent.emit('종료1');
console.log(myEvent.listenerCount('종료1'));