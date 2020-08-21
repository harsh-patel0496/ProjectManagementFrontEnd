import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const BREAKPOINTS_VALUE = {
    DISPLAY: 1750,
    DESKTOP: 1450, // x_large
    LAPTOP: 1278, // large
    TABLET: 960, // medium
    PHABLET: 600, // small
    MOBILE: 450 // x_small
}
export const breakpoints = createBreakpoints({
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
        xs: 0,
        sm: BREAKPOINTS_VALUE.PHABLET,
        md: BREAKPOINTS_VALUE.TABLET,
        lg: BREAKPOINTS_VALUE.LAPTOP,
        xl: BREAKPOINTS_VALUE.DESKTOP
    }
});