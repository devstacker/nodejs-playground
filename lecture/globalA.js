
module.exports = () => global.message; 
//global은 전역객체라서 모든 파일들이 공유하므로 require가 필요없다.
//그리고 누구나 접근 가능하기 때문에 누군가가 메세지를 바꿀수 있어 글로벌에 객체를 직접 대입해서 사용하지 않는게 좋다. 
