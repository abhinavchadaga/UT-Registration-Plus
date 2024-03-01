export const colors = {
    ut: {
        burntorange: '#BF5700',
        black: '#333F48',
        orange: '#F8971F',
        yellow: '#FFD600',
        lightgreen: '#A6CD57',
        green: '#579D42',
        teal: '#00A9B7',
        blue: '#005F86',
        gray: '#9CADB7',
        offwhite: '#D6D2C4',
        concrete: '#95A5A6',
        red: '#B91C1C', //   Not sure if this should be here, but it's used for remove course, and add course is ut-green
        white: '#FFFFFF',
    },
    theme: {
        red: '#AF2E2D',
        black: '#1A2024',
    },
    gradeDistribution: {
        a: '#22C55E',
        aminus: '#A3E635',
        bplus: '#84CC16',
        b: '#FDE047',
        bminus: '#FACC15',
        cplus: '#F59E0B',
        c: '#FB923C',
        cminus: '#F97316',
        dplus: '#EA580C', // TODO (achadaga): copilot generated, get actual color from Isaiah
        d: '#DC2626',
        dminus: '#B91C1C',
        f: '#B91C1C',
    },
    palette: {
        slate500: '#64748B',
        gray500: '#6B7280',
        stone500: '#78716C',
        red500: '#EF4444',
        orange500: '#F97316',
        amber500: '#F59E0B',
        yellow500: '#EAB308',
        lime500: '#84CC16',
        green500: '#22C55E',
        emerald500: '#10B981',
        teal500: '#14B8A6',
        cyan500: '#06B6D4',
        sky500: '#0EA5E9',
        blue500: '#3B82F6',
        indigo500: '#6366F1',
        violet500: '#8B5CF6',
        purple500: '#A855F7',
        fuschia500: '#D946EF',
        pink500: '#EC4899',
        rose500: '#F43F5E',
    },
} as const satisfies Record<string, Record<string, string>>;

type NestedKeys<T> = {
    [K in keyof T]: T[K] extends Record<string, any> ? `${string & K}-${string & keyof T[K]}` : never;
}[keyof T];

/**
 * A union of all colors in the theme
 */
export type ThemeColor = NestedKeys<typeof colors>;

/**
 * Flattened colors object.
 * @type {Record<ThemeColor, string>}
 */
export const colorsFlattened = Object.entries(colors).reduce(
    (acc, [prefix, group]) => {
        for (const [name, hex] of Object.entries(group)) {
            acc[`${prefix}-${name}`] = hex;
        }
        return acc;
    },
    {} as Record<ThemeColor, string>
);

/**
 * Converts a hexadecimal color code to an RGB color array.
 * @param hex The hexadecimal color code to convert.
 * @returns An array representing the RGB color values.
 */
export const hexToRgb = (hex: string) =>
    hex.match(/[0-9a-f]{2}/gi).map(partialHex => parseInt(partialHex, 16)) as [number, number, number];

/**
 * Represents the flattened RGB values of the colors.
 * @type {Record<ThemeColor, ReturnType<typeof hexToRgb>>}
 */
const colorsFlattenedRgb = Object.fromEntries(
    Object.entries(colorsFlattened).map(([name, hex]) => [name, hexToRgb(hex)])
) as Record<ThemeColor, ReturnType<typeof hexToRgb>>;

/**
 * Retrieves the hexadecimal color value by name from the theme.
 *
 * @param name - The name of the theme color.
 * @returns The hexadecimal color value.
 */
export const getThemeColorHexByName = (name: ThemeColor): string => colorsFlattened[name];

/**
 *
 * @param name - The name of the theme color.
 * @returns An array of the red, green, and blue values, respectively
 */
export const getThemeColorRgbByName = (name: ThemeColor) => colorsFlattenedRgb[name];
