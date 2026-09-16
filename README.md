# 업무 스케줄러 목업 (Schedule · TODO Mockup)

PC/모바일에서 하나의 데이터로 동작하는 업무용 캘린더 + TODO 통합 스케줄러의
UI/UX 목업입니다. 정적 HTML/CSS/JS 한 파일로만 구성되어 있으며, 별도의
빌드 과정 없이 브라우저에서 바로 열립니다.

## 미리보기

`index.html`을 브라우저로 열면 됩니다. GitHub Pages로 배포하면 별도 설정 없이
바로 접속 가능합니다.

```
git clone <repo-url>
cd schedule-todo-mockup
open index.html   # 또는 브라우저에 파일을 드래그
```

### GitHub Pages로 보기
1. 저장소 Settings → Pages
2. Branch: `main`, 폴더: `/ (root)` 선택 후 저장
3. `https://<username>.github.io/<repo>/` 로 접속

## 화면 구성

- **데스크탑**: 좌측 사이드바(오늘 / 캘린더 / TODO / 업무·개인 구분) + 주간
  캘린더 그리드 + 우측 대시보드(오늘 요약 KPI, 지연 업무, 중요 TODO, 일정
  연결 TODO)
- **모바일**: "오늘" 화면 우선 + 하단 5탭 네비게이션(오늘 / 캘린더 / TODO /
  검색 / 설정) + 빠른등록 FAB
- 우상단 **데스크탑 / 모바일** 버튼으로 두 레이아웃을 전환하며 확인 가능

## 구현된 인터랙션 (목업 수준)

| 기능 | 설명 |
|---|---|
| 업무/개인 필터 | 칩(전체·업무·개인) 클릭 시 캘린더와 오늘 화면이 동시에 필터링됨 |
| 일정 ↔ TODO 연결 | "○○업체 방문" 일정 클릭(모바일) 시 연결된 체크리스트가 펼쳐짐 |
| TODO 체크 | 진행 중 / 오늘 마감 TODO 클릭 시 완료 상태 토글 |
| **자동 이월** | "지연된 업무" 패널의 [지금 이월 적용] 버튼 → 마감이 지난 미완료 업무가 오늘 TODO로 이동, `이월` 배지 표시, KPI·토스트 알림 갱신. 실제 서비스에서는 **매일 자정 배치 작업**이 이 로직을 자동 수행 |

> 현재는 모든 데이터가 JS 안의 정적 배열(mock data)이며, 새로고침하면
> 초기화됩니다. PC/모바일 화면이 "같은 데이터"를 보여주는 것을 보여주기 위한
> 개념 시연이며, 실제 기기 간 동기화는 아닙니다.

## 다음 단계 (실제 개발 로드맵)

목업이 아닌 실사용 앱으로 발전시킬 경우의 방향입니다.

**Phase 1** — 기존 UI 유지 + 로그인 + DB + 일정/TODO CRUD + 업무/개인 구분 + 반응형
**Phase 2** — PC↔모바일 실시간 동기화 + 검색 + 반복 일정 + 우선순위 + 일정-TODO 연결 + 자동 이월 배치
**Phase 3** — 알림(Web Push) + PWA + 오프라인 캐시
**Phase 4** — 업무 템플릿 + 통계 + 대시보드 고도화 + 협업 확장

**권장 기술 스택**
- Frontend: React / Next.js + TypeScript + Tailwind CSS
- Backend/DB: Supabase (Auth + PostgreSQL + Realtime + Row Level Security)
- 배포: Vercel

## 폴더 구조

```
schedule-todo-mockup/
├── index.html   # 목업 전체 (HTML/CSS/JS 단일 파일)
└── README.md
```
