# study-auth
현재 오픈채팅방에서 주로 이루어 지고 있는 스터디 모임을 웹페이지를 통해 더욱 자유롭고 형식을 갖춘 스터디 모임으로 발전 시킬 수 있는 장을 만든다.

---
## Front


## Server
### DB - Mysql5.7
### Framework - NestJS

## Git Flow
### branch 전략
#### 새로운 기능 추가시
1. main 브렌치를 기준으로 브랜치 생성 이때 브렌치 이름은 feature/추가기능
2. feature/추가기능 완성 후 원격의 main pull받고 main의 내용 feature/추가기능으로 rebase또는 병합
3. feature/추가기능 origin 으로 push
4. push후 main으로 pull request 작성 및 리뷰어 등록
5. merge 후 feature/추가기능 브렌치 삭제
6. 삭제하지 않고 같은 브렌치 사용하면서 rebase하게 되면 commit history 꼬임
### commit message convention
1. 브렌치가 feature/추가기능 라고 가정하면
2. feat(추가기능): 커밋메시지

## CI/CD
### github
1. github webhook 사용
2. AWS의 codebuilder로 이동
### build
1. AWS의 codebuilder 에서 build 후
### deploy
1. 멀티 도커 환경의 EB로 배포
