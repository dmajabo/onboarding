import React from 'react';

const SettingsContext = React.createContext({
    language: 'en',
    onChangeLanguage: (lang) => null,
});

export default SettingsContext;