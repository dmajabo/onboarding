import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';

const FormikTextField = ({ name, ...inputProps }) => {
    const { values, handleChange, handleBlur, errors } = useFormikContext();

    return (
        <TextField
            type="text"
            variant="outlined"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
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

export default FormikTextField;
