# 자산 관리 대시보드 Task List (Subagent 기반)

각 단계별 핵심 페르소나가 리딩하여 다음 산출물을 만들어갑니다. 

## 1. 🧑‍💼 요구사항 전문가 (Requirements Planning)
- [x] 초기 요구사항 청취 및 자산군(주식, 코인, ISA 등) 확보
- [x] 핵심 입력 방식(Gemini API 도입) 확정
- [x] PRD 구체화 완료 및 승인

## 2. 🏛️ 아키텍트 (Architecture & System Design)
- [x] 기술 스택 명세 구체화 (Supabase + React/Vite)
- [x] 로컬/서버 배포(Phase 1, 2) 통합 구조 확립 (BaaS 채택으로 백엔드 개발 병합)
- [x] 핵심 Database Entity 모델 (User, Portfolio, Transaction 등) 스키마/ERD 기획서 확정
- [x] API Endpoints 리스트 초안 도출 (BaaS API로 대체, Edge Functions 구성안 확립)

## 3. 🎨 디자이너 (UI/UX Design)
- [x] 전체 화면 흐름(Flow) 및 라우팅 구조 확정 (Home, 자산등록, 분석 등)
- [x] 테마(화이트/라이트 모드), 컬러 팔레트, 컨셉 방향성 도출 (generate_image 활용 시안 생성 완료)
- [x] 대시보드 컴포넌트(차트, 요약 카드) UI 구조 설계서 도출 (프론트 개발자 인계)

## 4. 💻 백엔드 & 프론트엔드 개발자 (Implementation)
- [x] **개발 계획 수립**: `development_plan.md`를 통한 구현 마일스톤 및 구조 명세 확립
- [x] **버전 관리**: Git 레포지토리 초기화 (`git init`) 및 GitHub 원격 레포 연결 (로컬 초기화 완료)
- [x] Backend: `uv` 스캐폴딩 및 `FastAPI` + `Supabase` 의존성 설치 구동 완료
- [x] Frontend: `Vite + React (TypeScript)` 스캐폴딩 완료
- [ ] Backend: DB 세팅 및 Gemini API 파싱 모듈 연동
- [ ] Frontend: 자산 대시보드 뷰 구성
- [ ] Frontend & Backend: API 붙이기 및 이미지 업로드-파싱-수정 폼 구현

## 5. ⚙️ DevOps & QE 전문가 (Testing & Delivery)
- [ ] 로컬 테스트/실행을 위한 통합 스크립트 작성 (예: `run.sh` 또는 `docker-compose.yml`)
- [ ] 기능별 테스트(단위 테스트, API 통신 에러/예외 처리 등) 시나리오 점검
- [ ] `walkthrough.md` 시연 문서 작성 및 최종 검수
