import { createTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        ligth: '#303f9f',
        main: '#283593',
        dark: '#1a237e',
        contrastText: '#ffffff',
      },
      secondary: {
        ligth: '#455a64',
        main: '#37474f',
        dark: '#263238',
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
