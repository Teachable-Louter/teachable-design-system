import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

// 이미지 파일 무시 플러그인
const ignoreAssetsPlugin = {
  name: 'ignore-assets',
  resolveId(id) {
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(id)) {
      return { id, external: true };
    }
  }
};

export default [
  // 1. 메인 컴포넌트 번들링 설정 (ESM 및 CJS 포맷)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      ignoreAssetsPlugin,
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types',
      })
    ],
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', 'lucide-react'],
  },

  // 2. 타입 정의 파일 (.d.ts) 번들링 설정
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: ['react', 'react-dom', /\.(png|jpg|jpeg|gif|svg|webp)$/], // 이미지 파일도 external 추가
  },
];