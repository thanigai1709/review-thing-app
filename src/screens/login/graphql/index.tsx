import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
    query UserLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            user {
                id
                email
                name
                avatar
                projects {
                    id
                    name
                }
            }
            token
        }
    }
`;
