import { createTheme, adaptV4Theme } from '@mui/material';
import { common } from '@mui/material/colors';

const theme = createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: '#F07049',
        }
    },
    typography: {
        allVariants: {
            color: '#000'
        },
        h2: {
            fontWeight: 600,
        }
    },
    overrides: {
        MuiButton: {
            contained: {
                borderRadius: 24,
                transition: 'transform 0.2s linear',
                '&:hover': {
                    transform: 'translate(0px, -3px)',
                }
            },
            containedPrimary: {
                backgroundColor : '#F07049',
                color: common.white,
            }
        },
        MuiMobileStepper: {
            root: {
                backgroundColor: 'inherit',
            },
            dot: {
                width: 12,
                height: 12,
                marginRight: 40,
                '&:last-child': {
                    marginRight: 0
                }
            },
            dots: {

            }
        },
        MuiTextField: {
            root: {
                backgroundColor: '#eff5fc'
            },
        },
        MuiChip: {
            deleteIconColorPrimary: {
                color: common.white
            },
            colorPrimary: {
                color: common.white
            }
        }
    }
}));
//
// theme.overrides.MuiPaper = {
//     root: {
//
//         paddingRight: theme.spacing(1),
//         [theme.breakpoints.up('sm')]: {
//            // marginLeft: '400px !important',
//             paddingRight: theme.spacing(2),
//         }
//     },
// }

export default theme;
