# study-auth
현재 오픈채팅방에서 주로 이루어 지고 있는 스터디 모임을 웹페이지를 통해 더욱 자유롭고 형식을 갖춘 스터디 모임으로 발전 시킬 수 있는 장을 만든다.

---
## Front
### 구성 전략
- 처음에는 최대한 library들을 사용하지 않고 구성한 뒤, refactoring 과정에서 어떤부분에서 library가 필요한가 필요성을 느낀 뒤 library를 사용

### 처음 개발 시 사용 언아 및 library

- React, javascript / CSS는 PostCSS를 통해 작성

- Library는 React-router, dotenv 사용 예정

#### 느낀점
- state management 전략의 필요성을 절실하게 느꼈다.[자세한 내용](https://velog.io/@inwoong100/%EC%A4%91%EA%B0%84-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%ED%9A%8C%EA%B3%A0)
- 비동기 처리에 대한 어려움을 느꼈다. [자세한 내용](https://velog.io/@inwoong100/%EC%A4%91%EA%B0%84-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%ED%9A%8C%EA%B3%A0)
- js가 정말 자유로운 언어라는 부분을 절실하게 느꼈다.[자세한 내용](https://velog.io/@inwoong100/%EC%A4%91%EA%B0%84-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%ED%9A%8C%EA%B3%A0)

### Refactoring할 내용
- Recoil, React-Query, Typescript를 차례대로 적용 예정이며,
- CSS를 하긴 했지만, 변경하기 어려운 객체 지향적인 요소들을 많이 반영해서, reset, 공통된 것들을 묶어 CSS도 refactoring이 필요하다.
- HTML의 semantic 요소들과, 스크린리더로 보았을 때의 요소 등을 전혀 고려하지 않은 html을 구성하여, refactoring이 필요하다


### 구현 기능
 
#### 그룹 일반 user 로그인 시

- 로그인
- 로그인 이후, 자신의 비밀번호 변경가능
- 그룹 생성, 생성 시 아이디 검색하여 추가 가능
- 가입되어 있는 그룹 선택, 그룹 가입되어있는 인원 선택, 날짜 선택을 통해 할일, 완료된 일 확인 가능

#### 그룹 admin 로그인 시
- 상동 하며, 그룹 멤버 추가 및 삭제 가능


## Server
### DB - Mysql5.7
### Framework - NestJS

---
## Git Flow
### branch 전략
#### 새로운 기능 추가시
1. main 브렌치를 기준으로 브랜치 생성 이때 브렌치 이름은 feature/추가기능
2. feature/추가기능 완성 후 원격의 main pull받고 main의 내용 feature/추가기능으로 rebase또는 병합
3. feature/추가기능 origin 으로 push
4. push후 main으로 pull request 작성 및 리뷰어 등록
5. merge 후 feature/추가기능 브렌치 삭제
6. 삭제하지 않고 같은 브렌치 사용하면서 rebase하게 되면 commit history 꼬임

### PR 규칙
1. 작업한 브렌치 기록
2. 어떠한 기능을 추가했는지 간략적인 설명
3. Lable 상시로 수정 및 확인

### commit message convention
1. 브렌치가 feature/추가기능 라고 가정하면
2. feat(추가기능): 커밋메시지

---
## CI/CD
### github
1. github webhook 사용
2. AWS의 codebuilder로 이동
### build
1. AWS의 codebuilder 에서 build 후
### deploy
1. 멀티 도커 환경의 EB로 배포
