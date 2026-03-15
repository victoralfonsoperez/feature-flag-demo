import type { ThemeConfig } from "../theme";

const buildFlags = __BUILD_FLAGS__;

function AnalyticsPanel({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-5 space-y-3 ${theme.cardShadow}`}
    >
      <div className="flex items-center gap-2">
        <svg
          className={`w-5 h-5 ${theme.headerIcon}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
        <h3 className={`text-sm font-semibold ${theme.title}`}>
          Premium Analytics
        </h3>
        <span
          className={`text-xs ${theme.badgeBuild} px-2 py-0.5 rounded-full`}
        >
          BUILD-TIME
        </span>
      </div>
      <p className={`text-xs ${theme.secondaryText}`}>
        This section was included at build time because{" "}
        <code className="text-amber-400">enable_analytics</code> was{" "}
        <code className="text-amber-400">"true"</code>.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className={`${theme.inputBg} rounded-md p-3`}>
          <p className={`text-xs ${theme.mutedText}`}>Conversion Rate</p>
          <p className={`text-lg font-bold ${theme.cardValue}`}>3.24%</p>
          <p className="text-xs text-green-400">+0.5% vs last week</p>
        </div>
        <div className={`${theme.inputBg} rounded-md p-3`}>
          <p className={`text-xs ${theme.mutedText}`}>Avg. Session</p>
          <p className={`text-lg font-bold ${theme.cardValue}`}>4m 32s</p>
          <p className="text-xs text-green-400">+12s vs last week</p>
        </div>
      </div>
    </div>
  );
}

function BetaBanner({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className={`${theme.betaBanner} text-sm rounded-md px-3 py-2 flex items-center gap-2`}
    >
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      This is a beta build. Some features may be unstable.
    </div>
  );
}

export function BuildTimeDemo({ theme }: { theme: ThemeConfig }) {
  const analyticsEnabled = buildFlags.enable_analytics === "true";
  const betaBannerEnabled = buildFlags.enable_beta_banner === "true";
  const flagEntries = Object.entries(buildFlags);

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className={`text-lg font-semibold ${theme.title}`}>
          Build-Time Flags
        </h2>
        <span
          className={`text-xs ${theme.badgeBuild} px-2 py-0.5 rounded-full`}
        >
          STATIC
        </span>
      </div>

      <div className="space-y-4">
        {betaBannerEnabled && <BetaBanner theme={theme} />}

        {analyticsEnabled ? (
          <AnalyticsPanel theme={theme} />
        ) : (
          <div
            className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-5 ${theme.cardShadow}`}
          >
            <p className={`text-sm ${theme.secondaryText}`}>
              Premium Analytics is{" "}
              <strong className={theme.cardValue}>disabled</strong>.
              The code for it was tree-shaken from this build.
            </p>
            <p className={`text-xs ${theme.mutedText} mt-1`}>
              Set <code className="text-amber-400">enable_analytics</code> to{" "}
              <code className="text-amber-400">"true"</code> and rebuild to
              enable it.
            </p>
          </div>
        )}

        {/* Flags table */}
        <div
          className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-5 ${theme.cardShadow}`}
        >
          <h3 className={`text-sm font-semibold ${theme.title} mb-3`}>
            Baked-in Flags
          </h3>
          {flagEntries.length === 0 ? (
            <p className={`text-xs ${theme.mutedText}`}>
              No build-time flags were injected.
            </p>
          ) : (
            <div className="space-y-1">
              {flagEntries.map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center justify-between ${theme.inputBg} rounded px-3 py-2 text-xs`}
                >
                  <code className="text-amber-400">{key}</code>
                  <code className={theme.secondaryText}>{value}</code>
                </div>
              ))}
            </div>
          )}
          <p className={`text-xs ${theme.mutedText} mt-3`}>
            These values were fetched from the API at build time and injected
            via <code className="text-amber-400">vite.config.ts define</code>.
            Changing them requires a rebuild.
          </p>
        </div>
      </div>
    </section>
  );
}
