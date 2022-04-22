import { Box, Typography, Link } from '@mui/material';
import moment from 'moment';

const Footer = () => {
    return (
        <Box component="footer" textAlign="center" paddingY={1}>
            <Typography variant="caption" gutterBottom={true} component="p">
                © {moment().get('year')} Distro Energy
            </Typography>
            <Box>
                <Link color="textPrimary" style={{paddingRight : '10px' }} variant="caption" href="https://www.spglobal.com/platts/en/about-platts/website-terms-of-use" target="_blank">
                    Website Terms Of Use
                </Link>
                <Link color="textPrimary" style={{paddingRight : '10px' }} variant="caption" href="https://www.spglobal.com/en/privacy-notice" target="_blank">
                    Privacy Policy & Cookie Notice
                </Link>
                <Link color="textPrimary" variant="caption" href="mailto:support@distroenergy.com" target="_blank">
                    Support
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
