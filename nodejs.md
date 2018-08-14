

# Node.js

- **javascript runtime**
- 자바스크립트를 웹브라우저 외부 환경에서도 돌릴수 있게 해주는 환경을 제공해주는 녀석

> runtime은 컴퓨터 프로그램이 실행되고 있는 동안의 동작을 의미. 런타임 환경은 컴퓨터가 실행되는 동안 프로세스나 프로그램을 위한 스프트웨어 서비스를 제공하는 가상 머신의 상태

**cf. REPL (read,evaluate,print,loop)**



### 서버로서의 역할

- 이벤트 기반
- 논 블로킹 I/O 
- 싱글 쓰레드



#### 이벤트기반(Event Driven)

이벤트 기반을 설명하기전에 이벤트 루프를 먼저 알아야 한다(자바스크립트)

**이벤트 루프**는 테스크큐의 작업을 호출스택이 비워지면 호출스택으로 옮겨주는 역할을 한다. 

언제 태스크 큐에 들어갈까?

`setTimeout`, `setInterval`, `setImmediate`,

 `Promise` `resolve`, `reject`(`async`, `await`), 

`이벤트리스너의 콜백` 등의 함수들이 들어간다.



##### 이벤트 루프의 역할

여러개의 태스크 큐에 이런 함수들이 쌓이게 되는데 이벤트 루프의 역할은 여러 큐에서 정해진 순서대로 하나씩 꺼내오는것. (이벤트 루프가 우선순위를 알고 있음)

우선순위가 높은애들을 호출스택으로 꺼내온다.

https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/



이제 이벤트 기반을 알아보자

어떻게 노드가 서버의 역할을 할 수 있을까?

어떻게해야 서버가 동작할 수 있을까?

홈페이지의 경우 방문자에게 html/css/js 파일을 보여줘야하는데 이럴때 이벤트 리스너를 사용해서 사용자가 방문했을 경우 html를 띄우게 한다.

그래서 이벤트 리스너가 작동을 하면서 (HTML줘 - 보통 이런것들을 이벤트리스터에 달린 콜백함수라 부름, 무조건 콜백함수라고해서 태스크 큐로 들어가는것은 아니라고함) 태스크 큐에 콜백함수들이 들어가고 이때 이벤트 루프가 우선순위를 파악해서 호출스택으로 이동시켜 함수들은 호출스택에서 실행이 된다.

이런 흐름을 이벤트 드리븐이라고 한다.



#### 논 블로킹 I/O

논블로킹은 setTimeout처럼 호출스택에 쌓이는것이 아닌 태스크큐로 보내버리는 동작을 뜻함. 그래서 눈에 보이는 코드의 순서와 달리 태스크큐로 보내 <u>실행순서가 달라지는것</u>을 말한다.



> IO(Input/Output) : 파일시스템과 네트워크에서 파일열고쓰고 네트워크 요청 보내고 받고를 의미. 파일시스템은 알아서 멀티쓰레드로 돌림. 자바스크립트는 싱글쓰레드이다. 그래서 노드가 싱글쓰레드인데 이 점을 극복하기 위해 여러프로세스를 만들어 멀티스레드 인것처럼 사용한다고 한다.

 



### 노드 모듈 시스템

다른 파일의 변수나 함수등을 참조해서 쓰고 싶을때 module.exports로 내보내서 사용할 수 있다.

모듈은 여러 번 재사용될 수 있다.

##### var.js

```js
const odd = '홀수입니다';
const even = '짝수입니다';

//다른 파일에서 현재파일을 불러올수 있도록하는 코드(내보냄=module, 여기서는 속성들을 내보냄)
module.exports = {
    odd,
    even,
};
```

##### func.js

```javascript
const {odd, even} = require('./var');
console.log(odd);
console.log(even);

function checkOddOrEven(num) {
    if(num%2) {
        return odd;
    }
    return even;
}

module.exports = { odd, even };//불러온 속성을 또다른 파일에서 참조할수 있도록 내보낼수도 있고
module.exports = checkOddOrEven; //함수를 내보낼수도 있다.

```

##### index.js

```js
const {odd, even} = require('./var');
const checkNumber = require('./func'); //변수 명을 바꿔서 불러온것.

function checkStringOddOrEven(str) {
    if(str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
```

> module.exports === exports
>
> exports는 객체 속성만 담을수 있음



### 노드 내장 객체

- 노드의 전역 객체 - **global** (브라우저에서는 window, 최신 브라우저에서는 global 가능)

  > 전역객체: 어디에서는 접근 가능한 객체,
  >
  > global은 전역객체라서 모든 파일들이 공유하므로 require가 필요없다.
  >
  > 그리고 누구나 접근 가능하기 때문에 누군가가 메세지를 바꿀수 있어 글로벌에 객체를 직접 대입해서 사용하지 않는게 좋다. 




- **console** 객체

  객체안에 디버깅을 도와주는 많으 메서드가 있음

  - console.time('인자') / console.timeEnd('인자') : 인자가 같아야 함
  -  console.dir() : 객체를 로깅할때 좋음
  - console.trace() : 호출 스택을 추적할 수 있음
  - 등등

- timer 객체 (**setTimeout**, **setInterval**, **setImmediate**)

  - set~ / clear~ (설정/해제)
  - 이벤트루프로 바로 보내버리고 싶을때 사용

  

- **\__filename, \_\_dirname, process**

  - filename - 해당 파일경로 / dirname - 해당파일이 들어있는 폴더경로
  - process 객체에는 현재 실행중인 노드 프로그램 정보가 들어있다.
    - process.execPath : 노드가 설치된 경로
    - process.cwd() : 노드 프로세스 실행위치
    -  process.exit() : 프로세스 종료
    - process.uptime() : 노드 프로그램이 시작되고나서  흐른 시간
    - 등등



### 내장 모듈

- os  - 운영체제와 관련된 모듈
  - os.uptime() / os.hostname() / os.freemem() 등등

- path - 모든 속성들이 실무에서 많이 쓰여서 중요함!
  - path.sep : 경로 구분자
  - path.delimiter : 환경변수 구분자
  - path.dirname : 디렉토리명
  - path.extname : 확장자명
  - path.basename: 파일명
  - path.parse : 해당 경로를 구성요소로 쪼개줌
  - path.format : 파싱했던 객체를 합쳐줌
  - path.normalize : 경로를 알아서 제대로 만들어줌
  - path.isAbsolute : 절대경로인지 상대경로인지
  - path.relative : 경로인자를 넣어주면 첫번째 인자에서 두번쨰 경로를 가는 상대경로를 보여줌
  - path.join : 조각나 있는 경로들을 하나로 합쳐줌 ( 절대경로 무시하고 합침)
  - path.resolve : 절대 경로 고려하고 합침

- URL

  ![url-module](/jpg/url-module.jpg)

  > 위쪽은 기존 방식의 주소체계 (url.parse) - 호스트가 없을 때도 쓸수 있음
  >
  > 아래는 WHATWG방식의 주소체계(url.URL) - search 부분을 자유자재로 다루기 편리함

  - `searchParams`의 메서드는 `FormData`나 `URLSearchParams` 객체에도 비슷하게 쓰인다고 함

- querystring - 기존 방식의 url.parse 와 함께 자주 쓰임

  > whatwg 방식의 url.URL 파싱은 searchParams를 제공하기 때문에 querystring이 필요없음

- crypto 

  - 단방향 암호화 : 암호화만 되고 복호화할수 없는 것

    > 비밀번호는 hash방식으로 암호화해 복호화되지 않는 문자열을 만든다. 암호문(해시)을 저장한 후 사용자의 입력 비밀번호를 암호화한 것과 비교해서 일치하면 로그인이 된다. 그러므로 원래의 비밀번호는 어디에도 저장될 필요가 없다.

    - 충돌 :  똑같은 암호화 해시가 나올 가능성이 존재
    - 실무에서는 bcrypt, scrypt를 많이 사용

  - 양방향 암호화 : 복호화도 가능

    - createCipher : utf-8 평문을 base64 암호문으로
    - createDecipher : base64 암호문을 utf 평문으로

- util

