import { PortfolioTheme } from "@/types/portfolio";

export function generateDynamicThemeCss(theme?: PortfolioTheme | null): string {
  if (!theme) return "";

  const rootVars: string[] = [];
  if (theme.primaryColor) rootVars.push(`--primary: ${theme.primaryColor};`);
  if (theme.secondaryColor)
    rootVars.push(`--secondary: ${theme.secondaryColor};`);
  if (theme.backgroundColor)
    rootVars.push(`--background: ${theme.backgroundColor};`);
  if (theme.surfaceColor) {
    rootVars.push(`--card: ${theme.surfaceColor};`);
    rootVars.push(`--popover: ${theme.surfaceColor};`);
  }
  if (theme.textColor) {
    rootVars.push(`--foreground: ${theme.textColor};`);
    rootVars.push(`--card-foreground: ${theme.textColor};`);
  }
  if (theme.borderColor) rootVars.push(`--border: ${theme.borderColor};`);
  if (theme.borderRadius) rootVars.push(`--radius: ${theme.borderRadius};`);

  const extraRules: string[] = [];
  const borderColor = theme.borderColor || "var(--border)";

  if (theme.shadowX && theme.shadowY) {
    extraRules.push(
      `.shadow-hard { box-shadow: ${theme.shadowX} ${theme.shadowY} 0 ${borderColor} !important; }`,
      `.shadow-hard-lg { box-shadow: calc(${theme.shadowX} + 2px) calc(${theme.shadowY} + 2px) 0 ${borderColor} !important; }`,
      `.shadow-hard-xl { box-shadow: calc(${theme.shadowX} + 4px) calc(${theme.shadowY} + 4px) 0 ${borderColor} !important; }`,
    );
  }

  if (theme.borderWidth) {
    extraRules.push(
      `.border-brutal { border-width: ${theme.borderWidth} !important; border-color: ${borderColor} !important; }`,
    );
  }

  return `
    :root {
      ${rootVars.join("\n      ")}
    }
    ${extraRules.join("\n    ")}
  `;
}
