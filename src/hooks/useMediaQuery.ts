import {
  Breakpoint,
  useTheme,
  useMediaQuery as useMediaQueryMui
} from '@mui/material';

export const useUpMediaQuery = (breakpoint: Breakpoint) => {
  const theme = useTheme();

  return useMediaQueryMui(theme.breakpoints.up(breakpoint));
};
