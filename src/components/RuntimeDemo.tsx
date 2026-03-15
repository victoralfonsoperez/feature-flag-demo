import { useFlag, useFlags } from "@victoralfonsoperez/feature-flags-sdk";
import type { ThemeConfig } from "../theme";

function ThemedCard({
  title,
  value,
  theme,
}: {
  title: string;
  value: string;
  theme: ThemeConfig;
}) {
  return (
    <div
      className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-4 ${theme.cardShadow}`}
    >
      <h4 className={`text-sm font-medium ${theme.cardTitle}`}>{title}</h4>
      <p className={`mt-1 text-2xl font-bold ${theme.cardValue}`}>{value}</p>
    </div>
  );
}

function ClassicDashboard({ theme }: { theme: ThemeConfig }) {
  return (
    <div className="space-y-4">
      <p className={`text-sm ${theme.secondaryText}`}>
        Classic layout — simple stacked cards
      </p>
      <div className="space-y-3">
        <ThemedCard title="Active Users" value="1,234" theme={theme} />
        <ThemedCard title="Flags Evaluated" value="56,789" theme={theme} />
        <ThemedCard title="Uptime" value="99.9%" theme={theme} />
      </div>
    </div>
  );
}

function NewDashboard({ theme }: { theme: ThemeConfig }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <p className={`text-sm ${theme.secondaryText}`}>
          New layout — grid with charts
        </p>
        <span className="text-xs bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full">
          NEW
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ThemedCard title="Active Users" value="1,234" theme={theme} />
        <ThemedCard title="Flags Evaluated" value="56,789" theme={theme} />
        <ThemedCard title="Uptime" value="99.9%" theme={theme} />
      </div>
      <div
        className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-4 ${theme.cardShadow}`}
      >
        <h4 className={`text-sm font-medium ${theme.cardTitle} mb-3`}>
          Evaluations (last 7 days)
        </h4>
        <div className="flex items-end gap-1 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className={`flex-1 ${theme.chartBar} rounded-t`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className={`flex justify-between mt-1 text-[10px] ${theme.mutedText}`}>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}

export function RuntimeDemo({ theme }: { theme: ThemeConfig }) {
  const themeValue = useFlag("theme", "dark");
  const newDashboard = useFlag("new_dashboard", "false");
  const allFlags = useFlags();

  const showNewDashboard = newDashboard === "true";

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className={`text-lg font-semibold ${theme.title}`}>Runtime Flags</h2>
        <span
          className={`text-xs ${theme.badgeRuntime} px-2 py-0.5 rounded-full`}
        >
          LIVE
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Theme demo */}
        <div
          className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-5 space-y-4 ${theme.cardShadow}`}
        >
          <div>
            <h3 className={`text-sm font-semibold ${theme.title} mb-1`}>
              Theme Flag
            </h3>
            <p className={`text-xs ${theme.mutedText}`}>
              <code className={`${theme.codeBg} px-1.5 py-0.5 rounded ${theme.codeText}`}>
                useFlag("theme", "dark")
              </code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${theme.secondaryText}`}>Current:</span>
            <span className={`text-sm font-mono font-bold ${theme.cardValue}`}>
              {themeValue}
            </span>
          </div>
          <div className="space-y-2">
            <ThemedCard title="Sample Card" value="Hello!" theme={theme} />
          </div>
          <p className={`text-xs ${theme.mutedText}`}>
            Set the <code className={theme.codeText}>theme</code> flag to{" "}
            <code className={theme.codeText}>"dark"</code>,{" "}
            <code className={theme.codeText}>"light"</code>, or{" "}
            <code className={theme.codeText}>"neon"</code> to change the look.
          </p>
        </div>

        {/* Dashboard layout demo */}
        <div
          className={`${theme.cardBg} rounded-lg border ${theme.cardBorder} p-5 space-y-4 ${theme.cardShadow}`}
        >
          <div>
            <h3 className={`text-sm font-semibold ${theme.title} mb-1`}>
              Dashboard Layout Flag
            </h3>
            <p className={`text-xs ${theme.mutedText}`}>
              <code className={`${theme.codeBg} px-1.5 py-0.5 rounded ${theme.codeText}`}>
                useFlag("new_dashboard", "false")
              </code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${theme.secondaryText}`}>Current:</span>
            <span className={`text-sm font-mono font-bold ${theme.cardValue}`}>
              {newDashboard}
            </span>
          </div>
          {showNewDashboard ? (
            <NewDashboard theme={theme} />
          ) : (
            <ClassicDashboard theme={theme} />
          )}
          <p className={`text-xs ${theme.mutedText}`}>
            Set <code className={theme.codeText}>new_dashboard</code> to{" "}
            <code className={theme.codeText}>"true"</code> to see the
            redesigned layout.
          </p>
        </div>
      </div>

      {/* Debug panel */}
      <details className="mt-4">
        <summary className={`text-xs ${theme.mutedText} cursor-pointer hover:${theme.secondaryText}`}>
          Debug: All runtime flag values
        </summary>
        <pre
          className={`mt-2 ${theme.cardBg} border ${theme.cardBorder} rounded-lg p-3 text-xs ${theme.secondaryText} overflow-x-auto`}
        >
          {JSON.stringify(allFlags, null, 2)}
        </pre>
      </details>
    </section>
  );
}
