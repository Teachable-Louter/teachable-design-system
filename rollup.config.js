import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts'; // 타입 정의 파일 번들링을 위한 플러그인

// 이미지 파일 무시 플러그인
const ignoreAssetsPlugin = {
  name: 'ignore-assets',
  resolveId(id) {
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(id)) {
      return { id, external: true };
    }
  }
};

// Rollup 설정을 담는 배열을 내보냅니다.
export default [
  // 1. 메인 컴포넌트 번들링 설정 (ESM 및 CJS 포맷)
  {
    input: 'src/index.ts', // 디자인 시스템의 진입점
    output: [
      {
        file: 'dist/index.esm.js', // package.json의 "module" 경로
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js', // package.json의 "main" 경로
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      ignoreAssetsPlugin,
      external(), // peerDependencies는 번들에 포함하지 않음
      resolve(), // node_modules에서 모듈을 찾을 수 있도록 함
      commonjs(), // CommonJS 모듈을 ESM으로 변환
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types',
      }),
    ],
    // Rollup에게 빌드에서 제외할 외부 모듈을 알려줍니다.
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', 'lucide-react'],
  },

  // 2. 타입 정의 파일 (.d.ts) 번들링 설정
  {
    input: 'dist/types/index.d.ts', // TypeScript 플러그인이 생성한 임시 .d.ts 파일의 경로 (아래 참고)
    output: [{ file: 'dist/index.d.ts', format: 'es' }], // package.json의 "types" 경로
    plugins: [dts()],
    external: ['react', 'react-dom'],
  },
];