<pre>
    next js 라우팅 구조
    _document.js = html,body,head
    _app.js = root
    _error.js = 에러
    pages = 컴포넌트
</pre>

usecallback 감싸는 기준 : 자식 컴포넌트에 넘기는 함수

Redux(state) -> React state 안써도 됨

state 한곳에서 관리 따라서 안정성 및 state통제 용이

store는 state, action, reducer 전부가 합쳐진 개념

Action -> state 바꾸는 행동
Dispatch -> Action 실행
Reducer -> Action의 결과로 state 어떻게 바꿀지 정의

리덕스는 동기적 프로그래밍
리덕스사가가 필요

function* 무한 혹은 비동기함수

currying 기법이란? 인자 하나를 받아 다른 함수를 리턴

high order component 
const hoc = (Component) = () =>{
    기존 컴포넌트에 props 같은 것을 추가하여 다른 동작을 하게 함
}

function* generator(){
    yield console.log(1)
}

const gen = generator()
gen.next() // 1