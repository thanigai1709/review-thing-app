import { atomWithStorage } from 'jotai/utils';

interface ILoggedInUser {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    projects: IUserProjects[];
    token: string;
    isLoggedIn: boolean;
}

type IUserProjects = {
    id: string;
    name: string;
};

export const LoggedInUserAtom = atomWithStorage<ILoggedInUser>(
    'loggedInSession',
    {
        id: '',
        name: '',
        email: '',
        avatar: '',
        projects: [],
        token: '',
        isLoggedIn: false,
    },
    undefined,
    { getOnInit: true }
);
