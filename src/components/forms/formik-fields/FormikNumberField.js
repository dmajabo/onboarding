import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';

const FormikNumberField = ({ min, max, name, ...inputProps }) => {
    const { values, handleChange, handleBlur, errors } = useFormikContext();

    return (
        <TextField
            type="number"
            variant="outlined"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                inputProps: {
                    max,min
                }
            }}
            {...inputProps}
            id={name}
            value={(values && values[name]) || ''}
            helperText={errors[name]}
            error={errors[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
        />
    )

}

export default FormikNumberField;
