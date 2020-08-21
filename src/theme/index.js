import { createMuiTheme } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { breakpoints } from './breakpoints'
const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  breakpoints,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
