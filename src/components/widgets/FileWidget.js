import { TextField } from "@mui/material";

const FileWidget = (props) => {
    // function processFile(files) {
    //     const f = files[0];
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = (event) => resolve(event.target.result);
    //         reader.readAsDataURL(f);
    //     });
    // }
    console.log(props);
    const _onChange = ({ target: { value }}) => {
        props.onChange(value);
    };
    const _onBlur = ({ target: { value }}) => {
        props.onBlur(value);
    };
    const _onFocus = ({ target: { value }}) => {
        props.onFocus(value);
    };

    return (
        <TextField
            size="small"
            variant="outlined"
            InputLabelProps={{
                shrink: true
            }}
            label={props.label}
            type="file"
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            // {...props.schema}
        />

    );
};

export default FileWidget;
