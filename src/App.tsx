import { FlagProvider, useFlag } from "@victoralfonsoperez/feature-flags-sdk";
import { RuntimeDemo } from "./components/RuntimeDemo";
import { BuildTimeDemo } from "./components/BuildTimeDemo";
import { getTheme } from "./theme";

function AppContent() {
  const themeValue = useFlag("theme", "dark") ?? "dark";
  const theme = getTheme(themeValue);

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.pageText}`}>
      <header className={`border-b ${theme.headerBorder} px-6 py-4`}>
        <div className="mx-auto max-w-5xl flex items-center gap-3">
          <svg
            className={`w-7 h-7 ${theme.headerIcon}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          <h1 className={`text-xl font-bold ${theme.title}`}>Feature Flag Demo</h1>
          <span className={`ml-auto text-xs ${theme.subtitle}`}>
            Powered by @victoralfonsoperez/feature-flags-sdk
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        <RuntimeDemo theme={theme} />
        <BuildTimeDemo theme={theme} />
      </main>
    </div>
  );
}

export default function App() {
  const apiUrl =
    import.meta.env.VITE_API_URL || "http://localhost:3100";
  const apiKey = import.meta.env.VITE_SDK_API_KEY as string | undefined;

  return (
    <FlagProvider
      serviceUrl={apiUrl}
      environment="development"
      apiKey={apiKey}
      defaults={{ theme: "dark", new_dashboard: "false" }}
    >
      <AppContent />
    </FlagProvider>
  );
}
