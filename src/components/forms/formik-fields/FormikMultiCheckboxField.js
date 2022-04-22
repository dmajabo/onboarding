import { Field } from 'formik';
import FieldSet from './FieldSet';

const FormikCheckboxField = ({ name, label, ...checkboxProps }) => {
    return (
        <FieldSet legend={'Typical working days in a week'} fullWidth={true}>
            <label>
                <Field type="checkbox" name="checked" value="Monday" />
                Monday
            </label>

            <label>
                <Field type="checkbox" name="checked" value="Tuesday" />
                Tuesday
            </label>

            <label>
                <Field type="checkbox" name="checked" value="Wednesday" />
                Wednesday
            </label>

            <label>
                <Field type="checkbox" name="checked" value="Thursday" />
                Thursday
            </label>

            <label>
                <Field type="checkbox" name="checked" value="Friday" />
                Friday
            </label>
        </FieldSet>
    );
};

export default FormikCheckboxField;
