import { createMuiTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme(
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
          color: '#4caf50',
        },
      },
    },
  },
  esES
);
export default theme;
