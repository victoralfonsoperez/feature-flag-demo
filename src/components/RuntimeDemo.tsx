import { useFlag, useFlags } from "@victoralfonsoperez/feature-flags-sdk";

function ClassicCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function NeonCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-yellow-500/30 p-4 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
      <h4 className="text-sm font-medium text-yellow-400">{title}</h4>
      <p className="mt-1 text-2xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}

function ClassicDashboard() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        Classic layout — simple stacked cards
      </p>
      <div className="space-y-3">
        <ClassicCard title="Active Users" value="1,234" />
        <ClassicCard title="Flags Evaluated" value="56,789" />
        <ClassicCard title="Uptime" value="99.9%" />
      </div>
    </div>
  );
}

function NewDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-400">New layout — grid with charts</p>
        <span className="text-xs bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full">
          NEW
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ClassicCard title="Active Users" value="1,234" />
        <ClassicCard title="Flags Evaluated" value="56,789" />
        <ClassicCard title="Uptime" value="99.9%" />
      </div>
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <h4 className="text-sm font-medium text-gray-400 mb-3">
          Evaluations (last 7 days)
        </h4>
        <div className="flex items-end gap-1 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-yellow-500/60 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-gray-500">
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

export function RuntimeDemo() {
  const theme = useFlag("theme", "default");
  const newDashboard = useFlag("new_dashboard", "false");
  const allFlags = useFlags();

  const isNeon = theme === "neon";
  const showNewDashboard = newDashboard === "true";

  const Card = isNeon ? NeonCard : ClassicCard;

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-white">Runtime Flags</h2>
        <span className="text-xs bg-yellow-900/40 text-yellow-300 px-2 py-0.5 rounded-full">
          LIVE
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Theme demo */}
        <div
          className={`bg-gray-900 rounded-lg border p-5 space-y-4 ${
            isNeon ? "border-yellow-500/30" : "border-gray-700"
          }`}
        >
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Theme Flag
            </h3>
            <p className="text-xs text-gray-500">
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">
                useFlag("theme", "default")
              </code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Current:</span>
            <span
              className={`text-sm font-mono font-bold ${
                isNeon ? "text-yellow-400" : "text-white"
              }`}
            >
              {theme}
            </span>
          </div>
          <div className="space-y-2">
            <Card title="Sample Card" value="Hello!" />
          </div>
          <p className="text-xs text-gray-500">
            Set the <code className="text-yellow-400">theme</code> flag to{" "}
            <code className="text-yellow-400">"neon"</code> to see the glow
            effect.
          </p>
        </div>

        {/* Dashboard layout demo */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Dashboard Layout Flag
            </h3>
            <p className="text-xs text-gray-500">
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">
                useFlag("new_dashboard", "false")
              </code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Current:</span>
            <span className="text-sm font-mono font-bold text-white">
              {newDashboard}
            </span>
          </div>
          {showNewDashboard ? <NewDashboard /> : <ClassicDashboard />}
          <p className="text-xs text-gray-500">
            Set <code className="text-yellow-400">new_dashboard</code> to{" "}
            <code className="text-yellow-400">"true"</code> to see the
            redesigned layout.
          </p>
        </div>
      </div>

      {/* Debug panel */}
      <details className="mt-4">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
          Debug: All runtime flag values
        </summary>
        <pre className="mt-2 bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-300 overflow-x-auto">
          {JSON.stringify(allFlags, null, 2)}
        </pre>
      </details>
    </section>
  );
}
