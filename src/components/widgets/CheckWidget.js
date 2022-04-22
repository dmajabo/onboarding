import { Widgets } from '@rjsf/material-ui';

const CheckWidget = (props) => {
    const { schema } = props;

    return (
        <Widgets.CheckboxWidget
            {...props}
            {...schema}
            InputLabelProps={{ shrink: true }}
        />
    );
};

export default CheckWidget;
