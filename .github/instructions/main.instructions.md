---
applyTo: '**'
---

**규칙**

- 절대 직접 커밋 및 푸시 금지
- 폴더 구조
    
    ```json
    .
    ├── README.md
    ├── dist-electron
    │   ├── handlers
    │   │   ├── magic-link.js
    │   │   ├── oauth.js
    │   │   └── secure-storage.js
    │   ├── main.js
    │   ├── managers
    │   │   └── window-manager.js
    │   ├── preload.js
    │   └── utils
    │       ├── logger.js
    │       └── pkce.js
    ├── electron
    │   ├── main.ts
    │   ├── preload.ts
    │   └── tsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── electron.js
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.css
    │   ├── App.test.tsx
    │   ├── api
    │   ├── components
    │   ├── config
    │   ├── constants
    │   ├── hooks
    │   ├── index.css
    │   ├── index.tsx
    │   ├── lib
    │   ├── logo.svg
    │   ├── main.tsx
    │   ├── pages
    │   ├── react-app-env.d.ts
    │   ├── reportWebVitals.ts
    │   ├── setupTests.ts
    │   └── types
    └── tsconfig.json
    ```
    
- 작명 규칙
    1. 앱라우팅(폴더 구조 == URL)
    2. 페이지 작성 시
        1. 폴더명은 페이지 이름으로, ‘-’사용(ex. my-page)
         ‘()’ 사용은 라우터에 관여 X, ‘[]’ 사용 시 파라미터임
        2. 내부는 page.tsx와 style.ts로 구성
        3. 페이지 내부 함수명은 페이지 이름 + page, 파스칼케이스 사용(ex. MyPage)
    3. 컴포넌트 작성 시
        1. 폴더명은 컴포넌트명으로, ‘-’사용(ex. my-card)
        2. 내부는 index.tsx와 style.ts로 구성
        3. 컴포넌트 내부 함수명은 컴포넌트 이름(뒤집어서), 파스칼케이스 사용(ex. CardMy)
        4. 함수 선언 시 “export default function 이름(파라미터)” 형식 사용
    
    띄어 쓰기 시 2칸 띄어쓰기(4칸 X)
    
- 스타일 규칙
    
    최상위 태그 `<Wrapper>` `<Wrapper/>`