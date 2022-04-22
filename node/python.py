from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

client = Client(transport = RequestsHTTPTransport(
                                        url='https://gql.playpen01.distro.energy/v1/graphql',
                                        headers={'x-hasura-admin-secret': 'thisisadminkeyfortest'}))

insert = gql(
    """
   mutation {
     insert_test_one(object: {value: "A"}) {
       id
     }
   }

"""
)

query = gql(
    """
   query {
     wallets(where: {wallet_id: {_like: "A"}}) {
       wallet_id

       purchases {
        price
        qty
      }
     }
   }
"""
)

insert_result = client.execute(insert)
query_result = client.execute(query)

print(query_result)
