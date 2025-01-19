/* 
file for GraphQL queries
*/

import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User {
  user {
    _id
    name
    email
    avatar
    bio
  }
}
`
