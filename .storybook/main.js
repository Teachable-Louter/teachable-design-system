/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // 1. 스토리 파일 위치 지정: src 폴더 아래의 모든 .stories.(js|jsx|ts|tsx) 파일 찾기
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"], 
  
  // 2. 사용할 애드온 목록
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // 디자인 토큰 및 스타일 문서를 위한 애드온 등을 추가할 수 있습니다.
  ],
  
  // 3. Storybook이 실행될 환경 설정 (Vite를 사용하시는 것 같아 Vite builder를 가정했습니다.)
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  
  // 4. 기타 설정 (문서 및 정적 파일 경로 등)
  docs: {},
  // staticDirs: ["../public"], // 필요한 경우 주석 해제
};

export default config;