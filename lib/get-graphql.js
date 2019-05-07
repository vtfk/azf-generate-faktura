const { GraphQLClient } = require('graphql-request')
const jwt = require('jsonwebtoken')

module.exports = async (personalIds) => {
  if (!personalIds) {throw Error('Missing required parameter: personalIds <Array(String)>')}
  personalIds = Array.isArray(personalIds) ? personalIds : [personalIds]

  const jwtToken = jwt.sign({}, process.env.GRAPHQL_JWT, {expiresIn: '2m'})

  const graphQLClient = new GraphQLClient(process.env.GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${jwtToken}`,
    }
  })

  const query = /* GraphQL */`
  query getPerson($personalId: [String!]) {
    persons(personalId: $personalId) {
      personalId
      fullname
      guardians {
        fullname
        address {
          address
          zip
          city
        }
        mobile {
          number
        }
        email {
          address
        }
      }
    }
  }
  `

  const variables = {
    personalId: personalIds
  }

  try {
    return graphQLClient.request(query, variables)
  } catch (error) {
    throw error
  }
}