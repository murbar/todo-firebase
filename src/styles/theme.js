import { media } from './helpers';

const accentsLight = {
  blue: '#027afe',
  purple: '#bf78d9',
  red: '#fd3e30',
  orange: '#fd9500',
  yellow: '#fccd01',
  green: '#13c758'
};

const accentsDark = {
  blue: '#0c84fe',
  purple: '#d47ff5',
  red: '#fd463a',
  orange: '#fea00a',
  yellow: '#fed60a',
  green: '#31d15b'
};

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  offWhite: '#f4f4f4',
  offBlack: '#393939'
};

const theme = {
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Source Sans Pro', sans-serif",
  media
};

const light = {
  colors: {
    background: colors.white,
    foreground: colors.offBlack,
    primary: colors.blue,
    ...colors,
    ...accentsLight
  },
  ...theme
};

const dark = {
  colors: {
    background: colors.black,
    foreground: colors.offWhite,
    primary: colors.blue,
    ...colors,
    accentsDark
  },
  ...theme
};

export default { light, dark };
