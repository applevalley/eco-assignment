import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 기상청 API의 기본 경로에 대한 프록시 설정
      "/1360000": {
        target: "http://apis.data.go.kr",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
