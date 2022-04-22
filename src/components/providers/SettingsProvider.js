import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsContext from 'contexts/SettingsContext';

const SettingsProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [state, setState] = useState({
        language: 'en'
    });

    useEffect(() => {
        i18n.changeLanguage(state.language);
    }, [i18n, state.language]);

    const handleChangeLanguage = (lang) => {
        setState(prevState => ({ ...prevState, language: lang }));
    };

    return (
        <SettingsContext.Provider 
            value={{ 
                language: state.language, 

                onChangeLanguage: handleChangeLanguage 
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsProvider;
