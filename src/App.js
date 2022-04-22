import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/Routes';
import SettingsProvider from 'components/providers/SettingsProvider';
import UserProvider from 'components/providers/UserProvider';
import AccountProvider from 'components/providers/AccountProvider';
import DeploymentProvider from 'components/providers/DeploymentProvider';
import ApolloProvider from 'components/providers/ApolloProvider';
import mainTheme from 'themes/main.theme';
import i18n from 'services/i18n.service';
import UserAuthenticationProvider from 'components/providers/UserAuthenticationProvider';
import DarkThemeProvider from './contexts/DarkThemeContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <BrowserRouter>
            <I18nextProvider i18n={i18n}>
                <SettingsProvider>
                    <DarkThemeProvider>
                        <StyledEngineProvider injectFirst>
                            <ThemeProvider theme={mainTheme}>
                                <UserAuthenticationProvider>
                                    <ApolloProvider>
                                        <UserProvider>
                                           <DeploymentProvider>
                                                <AccountProvider>
                                                    <Routes />
                                                </AccountProvider>
                                           </DeploymentProvider>
                                        </UserProvider>
                                    </ApolloProvider>
                                </UserAuthenticationProvider>
                            </ThemeProvider>
                        </StyledEngineProvider>
                    </DarkThemeProvider>
                </SettingsProvider>
            </I18nextProvider>
        </BrowserRouter>
    );
};

export default App;
