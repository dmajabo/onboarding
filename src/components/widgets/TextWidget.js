import { Widgets } from '@rjsf/material-ui';
import { InputAdornment } from '@mui/material';

const TextWidget = (props) => {
    const { schema } = props;

    return (
        <Widgets.TextWidget
            margin="dense"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: schema.endAdornment && (
                    <InputAdornment position="end">
                        {schema.endAdornment}
                    </InputAdornment>
                ),
            }}
            {...props}
            {...schema}
        />
    );
};

export default TextWidget;
