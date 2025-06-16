# 비즈니스 프로그래밍 과제 레포지토리

비즈니스 프로그래밍 수업에 대한 과제와 실습을 업로드하는 레포지토리입니다.

## 📬 Gmail AI Assistant 자동화 과제

이 프로젝트는 Python과 Selenium, Google Gemini API를 활용하여 Gmail에서 읽지 않은 메일을 수집하고 중요도를 평가한 후, AI가 자동으로 응답 초안을 생성하는 자동화 시스템입니다.

---

### ✅ 주요 기능

1. **Gmail 자동 로그인**

    - 최초 로그인 시 패스키 등 수동 인증 필요할 수 있음
    - 이후 세션 정보 유지하여 자동 로그인 가능

2. **읽지 않은 메일 크롤링**

    - `is:unread` 조건으로 필터링
    - 제목, 본문, 발신자 이메일/이름, 메일 ID 추출

3. **Gemini AI를 통한 중요도 분석 및 요약**

    - Gemini 1.5 Flash 모델 사용
    - 0~10점 사이의 중요도 평가 및 한 줄 요약 생성

4. **AI 답장 초안 생성 (긍정/부정 선택)**

    - 사용자가 긍정/부정 의도 선택
    - Gemini가 여러 개의 답변 초안을 생성하여 선택 가능

5. **pyautogui를 이용한 클릭 및 입력 자동화**

    - '읽지 않음으로 표시' 버튼 클릭 위치를 계산해 자동 클릭
    - 사용자가 선택한 AI 답변을 메일 본문에 자동 입력

6. **창 전환 자동화**
    - `pygetwindow`, `osascript` 등을 사용하여 VSCode ↔ Chrome 창 전환 자동 수행

---

### ⚙️ 설치 및 실행 방법

1. 프로젝트 디렉토리로 이동 후, 가상 환경 생성 (선택)

2. 필요한 패키지 설치

```bash
pip install -r requirements.txt
```

3. `.env` 파일 생성

```env
GMAIL_EMAIL=your_email@gmail.com
GMAIL_PASSWORD=your_password
API_KEY=your_google_gemini_api_key
```

### 📁 폴더 구조 예시

```
term_project/
├── term_project.py
├── ratingPrompt.txt
├── replyPrompt.txt
├── requirements.txt
└── .env
```

---

### 📌 기타 주의사항

-   🚨 주의: 프로그램은 Google 계정에 로그인해야 하며, 2단계 인증이 비활성화되어 있어야 정상 작동합니다.
-   클래스명 기반의 UI 요소는 Gmail 업데이트에 따라 변경될 수 있음
-   AI 응답의 신뢰성은 Gemini API 응답 품질에 따라 다름

---

### 🙋‍♀️ 과제 목적 요약

-   웹 자동화 (Selenium)
-   대화형 AI API 연동 (Gemini)
-   사용자 입력 기반의 동적 분기 처리
-   GUI 제어(pyautogui), 창 제어(pygetwindow, osascript)
