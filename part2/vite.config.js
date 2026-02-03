import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/openstack/part2/",
  plugins: [react()],
})
