let polyfill = require('cross-fetch/polyfill');
let apc = require("apollo-boost");

let {gql, ApolloClient, HttpLink, InMemoryCache} = apc;

const httpLink = new HttpLink({
    uri: "https://gql.playpen01.distro.energy/v1/graphql",
    headers: {
        "x-hasura-admin-secret": "thisisadminkeyfortest"
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const clear = () => {

   const deleteCognito = (userName) => {
       return fetch('https://itkhxs3ay1.execute-api.eu-west-1.amazonaws.com/prod/authAPI/delete', {
           method: 'post',
           body: JSON.stringify({input : {arg1 : {username : userName}}}),
           headers: {'Content-Type': 'application/json'}
       })
   }

   //delete users, then accounts, which uses a CASCASE to delete everything below it
   deleteCognito('mogmog+admin@gmail.com')
   .then(() => deleteCognito('mogmog+test@gmail.com'))
   .then(x => {
    client.mutate({
        mutation: gql`mutation {
                  delete_account_table(where: {deployment_id: {_is_null: false}}) {
                    returning {
                      id
                    }
                  }
                }
    `
    })
    });

}


clear();
