import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($name: String!, $email: String!, $avatar: String, $bio: String) {
    updateUser(name: $name, email: $email, avatar: $avatar, bio: $bio) {
      name
      email
      avatar
      bio
    }
  }
`;
