import { createTheme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({});

theme = responsiveFontSizes(theme);

export default theme;
