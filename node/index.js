let polyfill = require('cross-fetch/polyfill');
let apc = require("apollo-boost");
const fs = require('fs');
let _ = require('lodash')

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

const insert = (records) => {

    return client.mutate({
        variables : {object : records},
        mutation: gql`
      mutation MyMutation($object : [readings_table_insert_input!]!) {
  insert_readings_table(objects: $object) {
    returning {
      id
    }
  }
}
`
    })
}

//clear();


let rawdata = fs.readFileSync('data.json');
let records = JSON.parse(rawdata).records;

const fixedRecords = records.map( r => ({
    address : r.address,
    device_id : r.deviceId,
    ptu_id : r.ptuId,
    timestamp : new Date(r.timestamp * 1000),
    consumed : +r.consumed,
    generated : + r.generated
}));
//
// fixedRecords.forEach(fr => {
//     insert([fr]).then(x => console.log(x));
// });

const pages = 50;
const chunks = _.chunk(fixedRecords, pages);

// chunks.forEach(c => {
//     insert(c);
// })

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function load () {
    for (var i = 0; i < fixedRecords.length / pages; i++) {
        console.log(i);
        await timer(1000);

        await insert(chunks[i])
    }
}

load();


