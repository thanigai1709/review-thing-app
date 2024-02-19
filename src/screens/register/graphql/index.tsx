import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation CreateUser($input: createUserType!) {
        createUser(input: $input) {
            name
            email
        }
    }
`;
