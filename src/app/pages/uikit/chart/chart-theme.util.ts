/**
 * Small helper that reads PrimeNG CSS variables from the document so chart
 * components remain in sync with the active Aura/Lara/Nora theme and
 * dark-mode selector. Kept as a pure utility (no Angular deps) so it can
 * be imported by any chart wrapper without polluting DI.
 */
export interface ChartTheme {
    textColor: string;
    textColorSecondary: string;
    surfaceBorder: string;
    primary500: string;
    primary400: string;
    primary200: string;
    indigo500: string;
    indigo400: string;
    purple500: string;
    purple400: string;
    teal500: string;
    teal400: string;
    orange500: string;
}

export function readChartTheme(): ChartTheme {
    const s = typeof document !== 'undefined' ? getComputedStyle(document.documentElement) : null;
    const v = (name: string, fallback = '') => (s ? s.getPropertyValue(name).trim() || fallback : fallback);
    return {
        textColor: v('--text-color', '#1f2937'),
        textColorSecondary: v('--text-color-secondary', '#6b7280'),
        surfaceBorder: v('--surface-border', '#e5e7eb'),
        primary500: v('--p-primary-500', '#6366f1'),
        primary400: v('--p-primary-400', '#818cf8'),
        primary200: v('--p-primary-200', '#c7d2fe'),
        indigo500: v('--p-indigo-500', '#6366f1'),
        indigo400: v('--p-indigo-400', '#818cf8'),
        purple500: v('--p-purple-500', '#a855f7'),
        purple400: v('--p-purple-400', '#c084fc'),
        teal500: v('--p-teal-500', '#14b8a6'),
        teal400: v('--p-teal-400', '#2dd4bf'),
        orange500: v('--p-orange-500', '#f97316')
    };
}

export function cartesianOptions(theme: ChartTheme, aspectRatio = 0.8) {
    return {
        maintainAspectRatio: false,
        aspectRatio,
        plugins: {
            legend: { labels: { color: theme.textColor } }
        },
        scales: {
            x: {
                ticks: { color: theme.textColorSecondary, font: { weight: 500 } },
                grid: { color: theme.surfaceBorder, drawBorder: false }
            },
            y: {
                ticks: { color: theme.textColorSecondary },
                grid: { color: theme.surfaceBorder, drawBorder: false }
            }
        }
    };
}

export function radialOptions(theme: ChartTheme) {
    return {
        plugins: {
            legend: { labels: { usePointStyle: true, color: theme.textColor } }
        },
        scales: {
            r: {
                pointLabels: { color: theme.textColor },
                grid: { color: theme.surfaceBorder },
                ticks: { display: false, color: theme.textColorSecondary }
            }
        }
    };
}
