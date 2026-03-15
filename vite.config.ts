import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async ({ command }) => {
  let buildFlags: Record<string, string> = {};

  if (command === "build") {
    const apiUrl =
      process.env.VITE_API_URL || "https://feature-flag-system.onrender.com";
    try {
      const res = await fetch(
        `${apiUrl}/api/flags/resolve?type=build-time&env=production`
      );
      if (res.ok) {
        buildFlags = await res.json();
        // Remove internal keys
        delete (buildFlags as Record<string, unknown>)._variants;
        console.log("Build-time flags fetched:", buildFlags);
      }
    } catch (err) {
      console.warn("Could not fetch build-time flags, using defaults:", err);
    }
  } else {
    // Dev defaults so the app works without the API running
    buildFlags = {
      enable_analytics: "true",
      enable_beta_banner: "true",
    };
  }

  return {
    plugins: [react()],
    define: {
      __BUILD_FLAGS__: JSON.stringify(buildFlags),
    },
  };
});
