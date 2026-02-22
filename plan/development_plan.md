# 자산 관리 대시보드 개발 계획서 (Development Plan)

## 1. 개발 개요 (Overview)
본 문서는 기획/디자인이 확정된 PRD 요구사항을 바탕으로, 실제 코드 레벨의 구현(Implementation)을 담당하는 개발자(Frontend & Backend)를 위한 구체적인 기술 명세와 마일스톤을 정의합니다.

## 2. 개발 환경 및 단위 구조 (Environment & Structure)
프론트엔드와 백엔드를 로컬에서 분리 구조로 관리하며, 통신은 REST API를 기본으로 합니다.

### 2.1. 폴더 아키텍처
```text
자산관리대시보드/
├── plan/               # 기획 문서 (PRD, task, development_plan)
├── frontend/           # React + Vite 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/ # 재사용 가능한 UI 컴포넌트 (UI 라이브러리)
│   │   ├── hooks/      # 커스텀 훅 (상태 관리 로직)
│   │   ├── pages/      # 라우팅 뷰 페이지 (대시보드 홈, 자산 등록 페이지)
│   │   ├── services/   # 백엔드 API 통신 및 Supabase 로직
│   │   └── types/      # TypeScript 타입/인터페이스 선언
│   └── package.json
└── backend/            # FastAPI 파이썬 백엔드 (uv 의존성 환경)
    ├── app/
    │   ├── api/        # 엔드포인트 라우터 (이미지 파싱 API 등)
    │   ├── core/       # 전역 설정 (CORS, Config)
    │   ├── models/     # Pydantic 모델
    │   └── services/   # 핵심 비즈니스 로직 (Gemini API 호출 로직 등)
    ├── pyproject.toml
    └── main.py
```

## 3. 세부 구현 마일스톤 (Milestones)

### Milestone 1: 프론트엔드 뼈대 및 디자인 시스템 (UI/UX Foundation)
- [x] Tailwind CSS 세팅 적용
- [x] 디자이너가 확정한 고밀도(High-Density) 라이트 모드 컬러 및 레이아웃 토큰 설정
- [x] 공용 레이아웃 구성 (좌측 사이드바 필터, 메인 데이터 패널)
- [x] 기본 화면 라우팅 구축 (Home, Asset Registration)

### Milestone 2: 대시보드 메인 화면 구현 (Mock 데이터 기반)
- [x] 최상단 **요약 카드 (Summary Cards)**: 기간별 전환 Toggle 기능 및 단위(₩, %) 애니메이션
- [x] 메인 **차트 컴포넌트 (Charts)**: Recharts 라이브러리를 활용한 시계열 변동 차트 및 자산 비중 도넛 차트
- [x] 리스트형 **자산 테이블 (Asset Table)**: 고밀도 그리드의 자산/거래 내역 표기
- [x] (단기 목표) 정적 Mock 데이터를 주입하여 UI가 시안과 동일하게 떨어지는지 시각적 완성도 점검

### Milestone 3: 백엔드 API 및 AI 연동 로직
- [ ] FastAPI 서버 기본 셋업 및 프론트엔드 통신을 위한 CORS 구성
- [ ] Supabase Python 클라이언트 연결
- [ ] **Gemini API 연동 모듈**: 자산 이미지(주식 앱 등) 업로드 시 OCR 및 정형 JSON 데이터(자산명, 단가, 수량) 추출 비즈니스 로직 작성

### Milestone 4: 프론트엔드 - 백엔드/DB 통합 (Integration)
- [ ] 프론트엔드에 자산 등록용 Drag & Drop 업로드 폼 완성
- [ ] 사용자가 이미지 등록 시 백엔드 API를 호출하고 파싱 결과(JSON)를 테이블에 채워주는 양방향 통신 구현
- [ ] 사용자의 수동 검증 및 수정 후 Supabase DB에 최종 `Insert` 처리
- [ ] DB 입력 성공 시 홈 대시보드 화면이 동적으로 즉시 갱신되도록 연동

## 4. 코딩 규약 (Coding Standards & Global Rules)
사용자의 메모리 지침에 따라 다음 규칙을 완벽하게 엄수합니다.

- **가독성 (Readability)**: 직관적인 변수명, 단일 책임 원칙(SRP)에 따른 컴포넌트 분리 지향 (`pages` 파일이 비대해지지 않도록 핵심 로직 분리).
- **언어 (Language)**: 사용자는 한국어를 선호. 코드 내 커뮤니케이션 주석과 UI 화면 렌더링 텍스트는 **한국어** 의무 적용. 주석은 가급적 '무엇'을 '왜' 작성했는지 의도를 설명.
- **예외 처리 (Error Handling)**: 언제나 예외 상황 필착 고려. 통신 에러 발생 시 try-catch로 잡아내고 Frontend에는 Toast 메시지로, Backend에서는 일관적인 ErrorResponse 스키마를 던짐.
- **비용 원칙**: 클라우드/BaaS는 무조건 프리티어 서비스만(무료) 활용. Gemini 모델 등 모든 개발 요소에서 과금을 배제할 것.
