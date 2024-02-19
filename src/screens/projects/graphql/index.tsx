import { gql } from '@apollo/client';

export const PROJECT_CREATE_MUTATION = gql`
    mutation CreateProject($input: createProjectType!) {
        createProject(input: $input) {
            id
            name
            project_status
        }
    }
`;
