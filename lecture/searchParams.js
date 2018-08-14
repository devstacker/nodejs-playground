
const { URL } = require('url'); //const URL = url.URL;

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get()', myURL.searchParams.get('limit'));
console.log('searchParams.has():', myURL.searchParams.has('page'));

console.log('searchParams.key():', myURL.searchParams.keys());
console.log('searchParams.values()', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3'); // &filter=es3
myURL.searchParams.append('filter', 'es5'); // &filter=3&filter=5  기존값 보존후 값추가
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');  //  &filter=es6 기존값 초기화후 값추가
console.log(myURL.searchParams.getAll('filter'));
myURL.searchParams.delete('filter')
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString()', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString(); //마지막에 문자열로 합치기!






