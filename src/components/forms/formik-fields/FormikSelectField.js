import { MenuItem, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

const FormikSelectField = ({ name, options, ...inputProps }) => {
    const { values, handleChange, handleBlur, errors } = useFormikContext();

    return (
        <TextField
            type="text"
            variant="outlined"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            {...inputProps}
            id={values[name]}
            select={true}
            value={values[name]}
            helperText={errors[name]}
            error={errors[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
        >
            {options.map((option, i) => (
                <MenuItem value={option} key={i}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default FormikSelectField;
