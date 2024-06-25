const COLORS = {
    bgPrimary: '#4D92FF',
    bgSecondary: '#E7F8F8',
    bgTertiary: '#DAE8FF',

    primary: '#48B2FF',
    secondary: '#A4D9FF',
    tertiary: '#609CFF',

    textPrimary: '#1E2142',
    textSecondary: '#000000',
    textTertiary: '#2A287A',

    white: '#FFF',
    lightWhite: '#F0F0F0',
    gradientWhite: 'rgba(255,255,255, 0.65)',

    disabled: '#7D96C0'
};

const COLORS_RED = {
    primary: '#F87662',
    primaryLight: '#FFC7BE',
    white: '#FFECE9',
    secondary: '#FF6851',
    tertiary: '#F86262',
    dark: '#3A0800',
    base: '#732C21',
    disabled: '#C07D7D'
};

const FONT = {
    MSRegular: 'Mont',
    MSMedium: 'MontMedium',
    MSSemiBold: 'MontSemiBold',
    MSBold: 'MontBold',
    MSExtraBold: 'MontExBold',
    MSLight: 'MontLight',
    MSBlack: 'MontBlack',
    PopRegular: 'Poppins',
    PopSemiBold: 'PoppinsSemiBold',
    PopBold: 'PoppinsBold',
    TorBold: 'TorusBold',
    TorRegular: 'TorusRegular',
    TorLight: 'TorusLight'
};

const SIZES = {
    xxSmall: 8,
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32
};

const SHADOWS = {
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 7
    },
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 0,
            height: 4
        },
        textShadowRadius: 4
    }
};

const BORDER_RADIUS = {
    small: 10,
    medium: 20,
    large: 30,
    xLarge: 40,
    xxLarge: 50
};

export { COLORS_RED, COLORS, FONT, SIZES, SHADOWS, BORDER_RADIUS };
