import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
// server:{
//   host: "10.8.18.31",
//   port:8000,
//   strictPort: false, 
// },
// preview: {
//   port: 8000,
// },
})
