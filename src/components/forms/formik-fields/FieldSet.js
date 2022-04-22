import { FormControl, FormLabel, FormGroup } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    fieldset: {
        padding: 16,
        borderWidth: 1,
        borderColor: theme.palette.grey[600],
        borderRadius: 2
    },
    legend: {
        fontWeight: 600
    }
}))

const FieldSet = ({ legend, children, fullWidth = false }) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.fieldset} component="fieldset" fullWidth={fullWidth}>
            <FormLabel className={classes.legend} component="legend">{legend}</FormLabel>
            <FormGroup>
                {children}
            </FormGroup>
        </FormControl>
    );
};

export default FieldSet