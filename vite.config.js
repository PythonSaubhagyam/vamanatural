import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export default defineConfig({
  plugins: [react(), commonjs(), splitVendorChunkPlugin()],
  define: {
    "process.env": env,
  },
  //   build: {
  //     rollupOptions: {
  //         output: {
  //             manualChunks( id) {
  //                 if (id.includes('node_modules')) {
  //                   if (id.includes('moment-timezone')) {
  //                     return "vendor_moment_timezone"
  //                   }
  //                   return "vendor"
  //                 }
  //             }
  //         }
  //     }
  // }
});
