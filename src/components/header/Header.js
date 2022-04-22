import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Grid, Box, Container, TextField, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Form from '@rjsf/material-ui';
import SettingsContext from 'contexts/SettingsContext';
import { AccountContext } from '../providers/AccountProvider';
import { UserContext } from '../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
    app: {
        zIndex: 0,
        paddingLeft: '0%',
        paddingTop: theme.spacing(),
        backgroundColor: 'white',
        paddingBottom: theme.spacing(),
    },
    inheritColor: {
        '& *': {
            color: 'inherit',
            borderColor: 'inherit',
        },
    },
}));

const LanguageSelectWidget = (props) => {
    const classes = useStyles();

    return (
        <TextField
            select={true}
            label={props.label || props.schema.title}
            variant="outlined"
            color="primary"
            size="small"
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            fullWidth={true}
            InputLabelProps={{
                shrink: true,
            }}
            className={classes.inheritColor}
            margin="dense"
        >
            {props.options.enumOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

const Header = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const settingsContext = useContext(SettingsContext);
    const { user } = useContext(UserContext);

    if (!user) {
        return null;
    }

    return (
        <AppBar className={classes.app} position="static" elevation={0}>
            <Toolbar>
                <Container>
                    <Grid container={true} justifyContent="space-between">
                        {/*<Box display="flex" alignItems="center">*/}
                        {/*    {site.name}/{user?.UserName}*/}
                        {/*</Box>*/}

                        <Box minWidth={220}>
                            {/*<Form*/}
                            {/*    schema={{*/}
                            {/*        type: 'string',*/}
                            {/*        title: t('langSettings.title'),*/}
                            {/*        value: settingsContext.language,*/}
                            {/*        default: settingsContext.language,*/}
                            {/*        anyOf: [*/}
                            {/*            {*/}
                            {/*                type: 'string',*/}
                            {/*                title: t('langSettings.options.en'),*/}
                            {/*                enum: ['en'],*/}
                            {/*            },*/}

                            {/*        ],*/}
                            {/*    }}*/}
                            {/*    uiSchema={{*/}
                            {/*        'ui:widget': 'languageSelectWidget',*/}
                            {/*    }}*/}
                            {/*    widgets={{*/}
                            {/*        languageSelectWidget: LanguageSelectWidget,*/}
                            {/*    }}*/}
                            {/*    onChange={({ formData }) => {*/}
                            {/*        settingsContext.onChangeLanguage(formData);*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <React.Fragment />*/}
                            {/*</Form>*/}
                        </Box>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
