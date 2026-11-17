[개요] 과충전 방지 기능 전기차 충전기 관리자 웹. 

[사용기술]
 - 서버(BFF): Node.js, Express 4, express-session + MySQL 세션 저장소, axios,
              multer(파일 업로드), body-parser, cors, bcrypt(의존성)
 - 프론트: React 18, MUI 5(+ DataGrid), Nivo 차트, Chart.js, FullCalendar,
           Redux Toolkit, react-router, Google Maps(@react-google-maps/api)
 - 개발: concurrently로 서버+클라이언트 동시 실행(nodemon)

[주요기능]
 - 로그인/세션 관리(만료 시 자동 로그인 화면 이동)
 - 대시보드, 충전기 위치 지도(마커/정보창)
 - 충전기 목록·상태, 단가 관리, 충전 이력, 일별 충전량(캘린더/막대·라인·파이 그래프)
 - 오류 목록, 로그 관리(로그 업로드 명령), 공용 코드 관리
 - APK 업로드/업데이트 명령(원격 앱 업데이트), 광고 업로드 화면
 - 목록 검색·페이징

[핵심 시스템 구조와 구현 방식]
 - 브라우저는 Go 서버와 직접 통신하지 않고 Node가 BFF로 중계:
   로그인 시 Go /login 호출 → 응답의 토큰을 세션(MySQL 저장)에 보관 →
   이후 요청에서 세션 확인(isAuthenticated 미들웨어) 후 Authorization: Bearer로 Go API 호출.
   Go가 401을 주면 세션을 파기하여 재로그인 유도.
 - 라우트/컨트롤러가 기능 단위(monitoring, charge-management, update, log_management,
   analysis, setting, auth)로 분리.
 - APK 업로드는 multer로 update_apks 폴더에 저장하고 Go 서버의 UpdateFirmware 명령으로
   충전기에 배포(버전$$경로 형태로 전달).

[데이터 흐름]
 React(관리자) → Node(세션 검증) → axios → Go 서버(JWT) → MySQL/충전기
 충전기 상태/이력 → Go → Node → React 테이블·차트 렌더링


<img width="1843" height="965" alt="관리자페이지2" src="https://github.com/user-attachments/assets/42d6e8f1-d1d0-4d4f-a07d-195f61a48a84" />
