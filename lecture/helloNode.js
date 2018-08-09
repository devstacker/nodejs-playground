// Hello Node
var a = 1;
var b = 2;
console.log(a+b);
console.log('hello node!');

// JS
// function과 => 함수 내부 this 동작의 차이점
var relationship1 = {
  name: "dahye",
  friends: ["sungzi", "nayoung", "yuri"],
  logFriends: function() {
    var that = this; //relationship1을 가리키는 this를 that에 저장
    this.friends.forEach(function(friend) {
        console.log(that.name, friend); // function함수에서는 forEach문 내부의 this(=window)와 logFriends 안의 this(=relationship2)가 서로 가르키는것이 다르므로 다른 this를 원할경우에 사용됨. 여기서는 같은 this를 사용하기 위해 that으로 따로 선언해서 사용함 
    });
  }
};
relationship1.logFriends();
    // ES6
const relationship2 = {
    name: 'dahye',
    friends: ['sungzi', 'nayoung', 'yuri'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend); // => 함수를 사용하면 logFriends의 this를 화살표 함수의 this와 같게 만들어줘서 바로 가져올수 있음
        });
    },
};
relationship2.logFriends();

// 비구조화 할당
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    }
}

var status = candyMachine.status
var getCandy = candyMachine.getCandy // 변수이름과 메서드이름이 같을 경우에 ES6에서는 간단하게 새로운 문법을 제공하는데 다음 코드를 봐보면

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
    // ES6
const status = candyMachine.status;
const getCandy = candyMachine.getCandy; // 이렇게 써도 상관없지만 아래와 같이 축약할 수 있다고 함.
const { status, getCandy } = candyMachine; // candyMachine에서 속성값을 변수로 꺼내와서 쓰겠다고 선언한것. 편함


candyMachine.getCandy(); //4.
const { getCandy } = candyMachine;
getCandy() //undefined. 추가적으로 비구조화로 getCandy를 캔디머신이랑 분리시켜 호출해보면 undefined가 나옴.앞에 캔디머신을 붙여주거나 call같은 this를 바꿔주는 메소드를 사용해야함. 객체에 붙어있어야 this가 제대로 동작함

var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[array.length - 1];
    // ES6
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array;
const [node, obj, ...bool] = array;// 10, true가 bool로 들어감


//콜백지옥
Users.findOne('dahye', (err, user) => {
    if (err) {
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
