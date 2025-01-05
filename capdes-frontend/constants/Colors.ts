/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    textLinks: "#FFB300",
    textBottons: "#111111",
    enclosedText: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: { first: "#CCCCFF", second: "#DDDDFFcc", third: "#EEEEFFaa" },
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    textLinks: "#FFB300",
    textBottons: "#111111",
    enclosedText: "#fff",
    buttons: { background: "#FFB300", text: "#111", round: 5, weight: 500, shadow: '#1116', shadowLength: 3 },
  },
};
