import { Grid } from '@mui/material';

const ObjectFieldTemplate = (props) => {
    const { properties } = props;

    return (
        <Grid container={true} spacing={2} alignItems="center">
            {properties.map((property) => {
                const uiSchema = property.content.props.uiSchema;

                const columnProps = {
                    xs: uiSchema['ui:xs'],
                    sm: uiSchema['ui:sm'],
                    md: uiSchema['ui:md'],
                    lg: uiSchema['ui:lg'],
                };

                return (
                    <Grid
                        key={property.content.key}
                        item={true}
                        {...columnProps}
                    >
                        {property.content}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ObjectFieldTemplate;
