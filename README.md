# 📅 스케줄러

일정을 등록하고 관리하는 간단한 웹 앱입니다. 데이터는 브라우저(localStorage)에 저장됩니다.

## 주요 기능

- 일정 추가 (내용 / 날짜 / 시간)
- 완료 체크 및 삭제
- 전체 / 진행중 / 완료 필터
- 지난 일정 표시
- 새로고침해도 유지 (브라우저 저장)
- 다크 모드 자동 지원

## 배포 (GitHub Pages)

`main` 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로우가
자동으로 GitHub Pages에 배포합니다.

### 최초 1회 설정

저장소 **Settings → Pages → Build and deployment → Source** 를
**GitHub Actions** 로 설정하세요.

설정 후 배포되는 주소:

```
https://duckjin87-web.github.io/scheduler/
```

## 로컬에서 실행

`index.html`을 브라우저에서 열기만 하면 됩니다. 별도 빌드가 필요 없습니다.
