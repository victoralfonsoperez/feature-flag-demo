export interface ThemeConfig {
  pageBg: string;
  pageText: string;
  headerBorder: string;
  headerIcon: string;
  title: string;
  subtitle: string;
  cardBg: string;
  cardBorder: string;
  cardTitle: string;
  cardValue: string;
  cardShadow: string;
  codeBg: string;
  codeText: string;
  secondaryText: string;
  mutedText: string;
  badgeRuntime: string;
  badgeBuild: string;
  inputBg: string;
  chartBar: string;
  betaBanner: string;
}

const dark: ThemeConfig = {
  pageBg: "bg-gray-950",
  pageText: "text-gray-100",
  headerBorder: "border-gray-800",
  headerIcon: "text-yellow-500",
  title: "text-white",
  subtitle: "text-gray-500",
  cardBg: "bg-gray-900",
  cardBorder: "border-gray-700",
  cardTitle: "text-gray-400",
  cardValue: "text-white",
  cardShadow: "",
  codeBg: "bg-gray-800",
  codeText: "text-yellow-400",
  secondaryText: "text-gray-400",
  mutedText: "text-gray-500",
  badgeRuntime: "bg-yellow-900/40 text-yellow-300",
  badgeBuild: "bg-amber-900/40 text-amber-300",
  inputBg: "bg-gray-800",
  chartBar: "bg-yellow-500/60",
  betaBanner:
    "bg-amber-900/30 border border-amber-700 text-amber-300",
};

const light: ThemeConfig = {
  pageBg: "bg-gray-50",
  pageText: "text-gray-900",
  headerBorder: "border-gray-200",
  headerIcon: "text-yellow-600",
  title: "text-gray-900",
  subtitle: "text-gray-500",
  cardBg: "bg-white",
  cardBorder: "border-gray-200",
  cardTitle: "text-gray-500",
  cardValue: "text-gray-900",
  cardShadow: "shadow-sm",
  codeBg: "bg-gray-100",
  codeText: "text-yellow-600",
  secondaryText: "text-gray-500",
  mutedText: "text-gray-400",
  badgeRuntime: "bg-yellow-100 text-yellow-700",
  badgeBuild: "bg-amber-100 text-amber-700",
  inputBg: "bg-gray-100",
  chartBar: "bg-yellow-500",
  betaBanner:
    "bg-amber-50 border border-amber-300 text-amber-700",
};

const neon: ThemeConfig = {
  pageBg: "bg-gray-950",
  pageText: "text-gray-100",
  headerBorder: "border-yellow-500/30",
  headerIcon: "text-yellow-400",
  title: "text-yellow-300",
  subtitle: "text-yellow-500/60",
  cardBg: "bg-gray-900",
  cardBorder: "border-yellow-500/30",
  cardTitle: "text-yellow-400",
  cardValue: "text-yellow-300",
  cardShadow: "shadow-[0_0_15px_rgba(234,179,8,0.1)]",
  codeBg: "bg-gray-800",
  codeText: "text-yellow-400",
  secondaryText: "text-gray-400",
  mutedText: "text-gray-500",
  badgeRuntime: "bg-yellow-900/40 text-yellow-300",
  badgeBuild: "bg-amber-900/40 text-amber-300",
  inputBg: "bg-gray-800",
  chartBar: "bg-yellow-400/80",
  betaBanner:
    "bg-amber-900/30 border border-amber-700 text-amber-300",
};

export const themes: Record<string, ThemeConfig> = { dark, light, neon };

export function getTheme(value: string): ThemeConfig {
  return themes[value] ?? themes.dark;
}
