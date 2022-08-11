import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 16000,
    rollupOptions: {
      output: {
        manualChunks: {
          moreBigLibs: [
            "styled-components",
            "react-phone-number-input",
            "axios",
            "uuid",
            "recoil",
          ],
          bigLibs: [
            "@fortawesome/fontawesome-svg-core",
            "react-data-table-component",
            "sweetalert2",
          ],
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
          agora: ["agora-react-uikit"],
        },
      },
    },
  },
});
