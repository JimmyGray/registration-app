import { normalize } from "react-native-elements";
import { Header } from "react-navigation";

export const fontSize = {
    xxSmall: normalize(12),
    xSmall: normalize(14),
    small: normalize(15),
    medium: normalize(17),
    large: normalize(20),
    xLarge: normalize(24),
    xxLarge: normalize(28)
};

export const spacing = {
    xSmall: normalize(10),
    small: normalize(12),
    medium: normalize(16),
    large: normalize(20),
    xLarge: normalize(24)
};

export const keyboardAvoidingView = normalize(Header.HEIGHT + 10);

// https://refactoringui.com/previews/building-your-color-palette/

export const black = '#000';
export const white = '#fff';

// PRIMARY
// These are the colors that determine the overall look of a site — the ones that make you think of Facebook as "blue",
// even though it's really mostly grey.
export const blue = {
    base: '#2196f3',
    blue50: '#e3f2fd',
    blue100: '#bbdefb',
    blue200: '#90caf9',
    blue300: '#64b5f6',
    blue400: '#42a5f5',
    blue500: '#2196f3',
    blue600: '#1e88e5',
    blue700: '#1976d2',
    blue800: '#1565c0',
    blue900: '#0d47a1',
    bluea100: '#82b1ff',
    bluea200: '#448aff',
    bluea400: '#2979ff',
    bluea700: '#2962ff'
};

// ACCENT ->
// On top of primary colors, every site needs a few accent colors for communicating different things to the user.
// For example, you might want to use an eye-grabbing color like yellow, pink, or teal to highlight a new feature:

export const teal = {
    base: '#009688',
    teal50: '#e0f2f1',
    teal100: '#b2dfdb',
    teal200: '#80cbc4',
    teal300: '#4db6ac',
    teal400: '#26a69a',
    teal500: '#009688',
    teal600: '#00897b',
    teal700: '#00796b',
    teal800: '#00695c',
    teal900: '#004d40',
    teala100: '#a7ffeb',
    teala200: '#64ffda',
    teala400: '#1de9b6',
    teala700: '#00bfa5'
};

// GREYS
// Text, backgrounds, panels, form controls — almost everything in an interface is grey.

export const grey = {
    base: '#9e9e9e',
    grey50: '#fafafa',
    grey100: '#f5f5f5',
    grey200: '#eeeeee',
    grey300: '#e0e0e0',
    grey400: '#bdbdbd',
    grey500: '#9e9e9e',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey900: '#212121'
};

// STATUS ->
// colors to emphasize different semantic states

export const red = {
    base: '#f44336',
    red50: '#ffebee',
    red100: '#ffcdd2',
    red200: '#ef9a9a',
    red300: '#e57373',
    red400: '#ef5350',
    red500: '#f44336',
    red600: '#e53935',
    red700: '#d32f2f',
    red800: '#c62828',
    red900: '#b71c1c',
    reda100: '#ff8a80',
    reda200: '#ff5252',
    reda400: '#ff1744',
    reda700: '#d50000'
};

export const green = {
    base: '#4caf50',
    green50: '#e8f5e9',
    green100: '#c8e6c9',
    green200: '#a5d6a7',
    green300: '#81c784',
    green400: '#66bb6a',
    green500: '#4caf50',
    green600: '#43a047',
    green700: '#388e3c',
    green800: '#2e7d32',
    green900: '#1b5e20',
    greena100: '#b9f6ca',
    greena200: '#69f0ae',
    greena400: '#00e676',
    greena700: '#00c853'
};

export const yellow = {
    base: '#ffeb3b',
    50: '#fffde7',
    100: '#fff9c4',
    200: '#fff59d',
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b',
    600: '#fdd835',
    700: '#fbc02d',
    800: '#f9a825',
    900: '#f57f17',
    a100: '#ffff8d',
    a200: '#ffff00',
    a400: '#ffea00',
    a700: '#ffd600'
};

// OTHER ->
// Think hard before using these colors.

const amber = {
    base: '#ffc107',
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
    a100: '#ffe57f',
    a200: '#ffd740',
    a400: '#ffc400',
    a700: '#ffab00'
};

const pink = {
    base: '#e91e63',
    50: '#fce4ec',
    100: '#f8bbd0',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
    a100: '#ff80ab',
    a200: '#ff4081',
    a400: '#f50057',
    a700: '#c51162'
};

const purple = {
    base: '#9c27b0',
    50:   '#f3e5f5',
    100:  '#e1bee7',
    200:  '#ce93d8',
    300:  '#ba68c8',
    400:  '#ab47bc',
    500:  '#9c27b0',
    600:  '#8e24aa',
    700:  '#7b1fa2',
    800:  '#6a1b9a',
    900:  '#4a148c',
    a100: '#ea80fc',
    a200: '#e040fb',
    a400: '#d500f9',
    a700: '#aa00ff'
};

const deepPurple = {
    base: '#673ab7',
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#673ab7',
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
    a100: '#b388ff',
    a200: '#7c4dff',
    a400: '#651fff',
    a700: '#6200ea'
};

const indigo = {
    base: '#3f51b5',
    50: '#e8eaf6',
    100: '#c5cae9',
    200: '#9fa8da',
    300: '#7986cb',
    400: '#5c6bc0',
    500: '#3f51b5',
    600: '#3949ab',
    700: '#303f9f',
    800: '#283593',
    900: '#1a237e',
    a100: '#8c9eff',
    a200: '#536dfe',
    a400: '#3d5afe',
    a700: '#304ffe'
};

const lightBlue = {
    base: '#03a9f4',
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    a100: '#80d8ff',
    a200: '#40c4ff',
    a400: '#00b0ff',
    a700: '#0091ea'
};

const cyan = {
    base: '#00bcd4',
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
    a100: '#84ffff',
    a200: '#18ffff',
    a400: '#00e5ff',
    a700: '#00b8d4'
};

const lightGreen = {
    base: '#8bc34a',
    50:   '#f1f8e9',
    100:  '#dcedc8',
    200:  '#c5e1a5',
    300:  '#aed581',
    400:  '#9ccc65',
    500:  '#8bc34a',
    600:  '#7cb342',
    700:  '#689f38',
    800: '#558b2f',
    900: '#33691e',
    a100: '#ccff90',
    a200: '#b2ff59',
    a400: '#76ff03',
    a700: '#64dd17'
};

const lime = {
    base: '#cddc39',
    50:   '#f9fbe7',
    100:  '#f0f4c3',
    200:  '#e6ee9c',
    300:  '#dce775',
    400:  '#d4e157',
    500:  '#cddc39',
    600:  '#c0ca33',
    700:  '#afb42b',
    800:  '#9e9d24',
    900:  '#827717',
    a100: '#f4ff81',
    a200: '#eeff41',
    a400: '#c6ff00',
    a700: '#aeea00'
};

const orange = {
    base: '#ff9800',
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    a100: '#ffd180',
    a200: '#ffab40',
    a400: '#ff9100',
    a700: '#ff6d00'
};

const deepOrange = {
    base: '#ff5722',
    50: '#fbe9e7',
    100: '#ffccbc',
    200: '#ffab91',
    300: '#ff8a65',
    400: '#ff7043',
    500:  '#ff5722',
    600:  '#f4511e',
    700:  '#e64a19',
    800:  '#d84315',
    900:  '#bf360c',
    a100: '#ff9e80',
    a200: '#ff6e40',
    a400: '#ff3d00',
    a700: '#dd2c00'
};

const brown = {
    base: '#795548',
    50:   '#efebe9',
    100:  '#d7ccc8',
    200:  '#bcaaa4',
    300:  '#a1887f',
    400:  '#8d6e63',
    500:  '#795548',
    600:  '#6d4c41',
    700:  '#5d4037',
    800:  '#4e342e',
    900:  '#3e2723'
};

const blueGray = {
    base: '#607d8b',
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#607d8b',
    600: '#546e7a',
    700: '#455a64',
    800: '#37474f',
    900: '#263238'
};