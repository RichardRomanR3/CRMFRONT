import { createTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        ligth: '#424242',
        main: '#212121',
        dark: '#000000',
        contrastText: '#ffffff',
      },
      secondary: {
        ligth: '#37474f',
        main: '#263238',
        dark: '#212121',
        contrastText: '#ffffff',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  esES
);
export default theme;
