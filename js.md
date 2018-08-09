# Javascript

### ES6

#### 변수

`var`: 이제안씀(var a;)

`const` : 상수. 한번 선언하면 값 변경불가능 (단, object 값은 변경 가능=객체가 할당된 경우 객체 내부 속성은 바꿀수 있다.), 선언시부터 값 할당해야함.

```javascript
if(true) {
    const y = 3;
}
console.log(y); // 블럭 밖이라서 Error 
```

`let` : 값 변경가능

#### 템플릿 문자열(백틱, `)

```javascript
 const e = `${a}값은 ${b}와 같다`;
// 백틱을 사용하면 + 연결연산자를 안써도됨
```

#### 객체리터럴의 변화

```javascript
const obj = {
    a: 1,
    b: 2,
};
```

```javascript
var sayNode = function() {
    console.log('Node');
};
var es = 'ES';

//OLD
var oldObject = {
    sayJS: function() {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic'; //원래는 따로 지정해줘야 했음

//ES6
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,  //키랑 값(변수)값이 같은 경우 {data:data, hello:hello}를 {data, hello}로 표시함
    [es + 6]: 'Fantastic', // 동적 속성 할당을 리터럴 안에 표현이 가능함 {[변수]:값}
};

newObject.sayNoe(); //Node
newObject.sayJS(); //JS
console.log(newObject.ES6); //Fantastic
```



#### 화살표함수

```javascript
// 함수선언문 (함수랑 같이 함수에 이름 붙여서 함께 선언)
function add1(x, y) {
    return x + y;
}


// 함수표현식 (변수를 먼저 선언하고 함수에 대입)
var add2 = function(x, y) {
    return x + y;
};

const add2 = (x, y) => {
    return x + y;
}; //var는 const로 완벽대체 가능, function함수와 =>는 비슷한 역할을 하지만 살짝 다름(내부에서 this가 동작하는 방식이 서로 다름).

const add3 = (x, y) => x + y; //함수에 return만 있는 경우 이렇게 축약가능 (괄호가능)

```



####   function과 => 함수 내부 this 동작의 차이점

```javascript
var relationship1 = {
    name: 'dahye',
    friends: ['sungzi', 'nayoung', 'yuri'],
    logFriends: function() {
        var that = this; //relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function(friend) {
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriend();
//화살표안의 this(=window)와 logFriends 안의 this(=relationship2)가 원래는 가르키는것이 달라서 다른 this를 원할경우 function문을 사용하면됨. 위의 코드는 같은 this로 사용하려고 that으로 바꿔준것.


const relationship2 = {
    name: 'dahye',
    friends: ['sungzi', 'nayoung', 'yuri'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();
// 화살표 함수를 쓰면 logFriends의 this를 forEach 화살표 함수의 this와 같게 만들어줘서 바로 가져올수 있게 됨.(바깥쪽 함수의 this를 그대로 사용하고 싶을때 사용)
```



#### 비구조화 할당(destructuring)

```javascript
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    }
}

var status = candyMachine.status
var getCandy = candyMachine.getCandy
// 변수이름과 메서드이름이 같을 경우에 ES6에서는 간단하게 새로운 문법을 제공하는데 다음 코드를 봐보면


const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    }
};

const status = candyMachine.status;
const getCandy = candyMachine.getCandy;
// 이렇게 써도 상관없지만 다음과 같이 축약할 수 있다고 함.

const {status, getCandy} = candyMachine;
// candyMachine에서 속성값을 변수로 꺼내와서 쓰겠다고 선언한것. 편함


// 추가적으로 비구조화로 getCandy를 캔디머신이랑 분리시켜 호출해보면 undefined가 나옴.앞에 캔디머신을 붙여주거나 call같은 this를 바꿔주는 메소드를 사용해야함. 객체에 붙어있어야 this가 제대로 동작함
candyMachine.getCandy(); //4.
const { getCandy } = candyMachine; 
getCandy() //undefined.

// 객체에서도 쓰이지만 배열에서도 사용가능
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[array.length-1];
// ES6
const array = ['nodejs', {}, 10, true];
const [node, obj, ,bool] = array;

const [node, obj, ...bool] = array;// 10, true가 bool로 들어감
```



#### rest 문법

```javascript
function o() {
    console.log(arguments)
}

o(1, 2, 3, 4, 5) //Arguments(5) [1, 2, 3, 4, 5]

//ES6에서는 더이상 arguments(유사배열)를 사용하지 않음 rest(배열)사용!
const p = (...rest) => console.log(rest)
p(5,6,7,8,8) // (5)[5,6,7,8,9]
```



#### Callback과 Promise 비교

```javascript
//콜백지옥
Users.findOne('dahye', (err, user) => {
    if(err) {
        return console.error(err);
    }
    console.log(user);
    Users.update('dahye', 'dahlia', (err, updatedUser) => {
    	if (err) {
        	return console.log(err);
   	    }
        console.log(updatedUser);
        Users.remove('dahlia', (err, removeUser) => {
     		if (err) {
        		return console.log(err);
    		}
            console.log(removedUser);
            ...
        	});
            ...
        });
    });
});
console.log('다 찾았니?');


//ES6 이전에는 콜백지옥을 막기 위해서 아래와 같이 콜백을 변수로 빼서 사용했었음 하지만 코드의 가독성이 떨어짐
const afterRemove = (err, removeUser) => {
    console.log(removeUser);
}
const afterUpdate = (err, updatedUser) => {
    console.log(updatedUser);
    Users.remve('dahlia', afterRemove);
}

Users.findOne('dahye', (err, user) => {
    if (err) {
        return console.log(err);
    }
    console.log(user);
    Users.update('dahye', 'dahlia', afterUpdate);
});
console.log('다 찾았니?');

//하지만 ES6에 Promise가 나온 이후로 js와 nodejs에서의 비동기가 차원이 달라짐
//Promise로 바꾼 코드. 맨위의 코드와 비교해보자
Users.findOne('dahye')
    .then((user) => {
      console.log(user);
      return Users.update('dahye', 'dahlia');
})
    .then((updatedUser) => {
      console.log(updatedUser);
      return Users.remove('dahlia');
})
    .then((removedUser) => {
      console.log(removeUser);
})
    .catch((err) => {
      console.error(error);
});
console.log('다 찾았니?');
```



#### Promise

```javascript
//promise 생성자 만들기(promise 객체에만 then을 쓸수 있다)

const condition = true; //true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if(condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

//위에서 Promise 객체를 만들었으므로 then을 쓸수있다.
promise
    .then((message) => {
      console.log(message); //성공(resolve)한 경우
})
    .catch((error) => {
    console.log(error); // 실패(reject)한 경우
});

// then에 리턴 값이 있으면 다음 then으로 넘어간다. Promise를 리턴하면 resolve(-then)나 reject(-error)로 넘어감
promise
    .then((message) => {
    return new Promise((resolve, reject) => {
        resolve(message2);
    });
})
    .then((message2) => {
      console.log(message2);
    return new Promise((resolve, reject) => {
        resolve(message3);
    });
})
    .then((message3) => {
      console.log(message3);
})
    .catch((error) => {
    console.log(error);
});


const promise = new Promise((res, rej) => {
    rej('실패');
});
//위의 코드를 아래 한줄로 바뀔수 있음(실패일경우)
const successPromise = Promise.resolve('성공')
	.then();
const failurePromise = Promise.reject('실패')
	.catch();

// 모든 조건이 성공해야만 then.
Promise.all([Users.findOne(), Users.remove(), Users.update()])
	.then((results) => {})
	.catch((error) => {})

```

> Promise는 결과값을 가지고 있지만 .then이나 .catch를 붙이기 전까지 반환하지 않는것



#### async / await

