import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
AWS.config.region = "eu-west-1";

const auth = {
    poolData: {
        UserPoolId : 'eu-west-1_7xM7asply',
        ClientId : "16jvvfk5io1io13meeds8ceorc"
    },

    addUser: async function(name, surname, email, phone) {

        email = email.toLowerCase();

        var params = {
            UserPoolId: this.poolData.UserPoolId,
            Username: email,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: name.trim()
                },
                {
                    Name: 'family_name',
                    Value: surname.trim()
                },
                {
                    Name: 'email', /* required */
                    Value: email.trim()
                },
                {
                    Name: 'phone_number',
                    Value: phone.trim()
                },
                {
                    Name: 'email_verified',
                    Value: 'true'
                },
            ]
        };

        let credentials = await Auth.currentCredentials();

        if (credentials) {
            AWS.config.credentials = Auth.essentialCredentials(credentials);
            return new Promise((resolve, reject) => {
                var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

                cognitoidentityserviceprovider.adminCreateUser(params, async function(err, result){
                    if (err) {
                        reject(err);
                        return;
                    }

                    alert("it worked")

                });
            });
        }
    }
}

export default auth;
