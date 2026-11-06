import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { appManifest } from "@activitypods/app-manifest/vite";

export default defineConfig({
  plugins: [react(), appManifest()],
});
