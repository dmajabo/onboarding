import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Amplify, Storage} from 'aws-amplify'

import './styles/_main.scss';

import App from './App';

Amplify.configure({
	Auth: {
		identityPoolId: process.env.REACT_APP_COGNITO_USERPOOL_IDENTITY,
		region: process.env.REACT_APP_REGION,
		userPoolId: process.env.REACT_APP_COGNITO_USERPOOL,
		userPoolWebClientId: process.env.REACT_APP_COGNITO_USERPOOL_CLIENT,
		identityPoolRegion: process.env.REACT_APP_REGION,
		mandatorySignIn: true
},
Storage: {
	AWSS3: {
		identityPoolId: process.env.REACT_APP_COGNITO_USERPOOL_IDENTITY,
		bucket: process.env.REACT_APP_FILE_BUCKET,
		region: process.env.REACT_APP_REGION,
		level: 'private'
	}
}});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
