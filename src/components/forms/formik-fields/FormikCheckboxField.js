import { FormControlLabel, Checkbox } from '@mui/material';
import { useFormikContext } from 'formik';
import FieldSet from './FieldSet2'

const FormikCheckboxField = ({ name, label, ...checkboxProps }) => {
    const { values, handleChange } = useFormikContext();

    return (
        <FieldSet legend={'Days Of Week'}>
            <FormControlLabel
                control={<Checkbox checked={values[name]} onChange={handleChange(name)} {...checkboxProps}  />}
                label={label}

            />
        </FieldSet>
    );
};

export default FormikCheckboxField;
