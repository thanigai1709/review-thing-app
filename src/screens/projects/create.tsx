import AuthGuard from '@/auth/auth-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectCreateForm from '../../components/ui/project-create-form';
import { TNewProject } from './@types';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { LoggedInUserAtom } from '@/context/LoggedInUserContext';

const ProjectCreate = () => {
    const navigate = useNavigate();
    const [loggedInState, setLoggedInUserProjects] = useAtom(LoggedInUserAtom);
    function handleProjectCreate(newProject: TNewProject) {
        setLoggedInUserProjects({
            ...loggedInState,
            projects: [
                ...loggedInState?.projects,
                { id: newProject.id, name: newProject.name },
            ],
        });
        navigate(`/projects/${newProject.id}`);
    }

    return (
        <>
            <AuthGuard>
                <div className="flex login-screen__wrap h-screen justify-center items-center px-4">
                    <Card className="w-[480px]">
                        <CardHeader>
                            <CardTitle className="text-[24px] text-center font-bold max-w-[380px] m-auto">
                                Start your{' '}
                                <span className="text-primary">creative</span>{' '}
                                journey by setting up your first project
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectCreateForm onCreate={handleProjectCreate} />
                        </CardContent>
                    </Card>
                </div>
            </AuthGuard>
        </>
    );
};

export default ProjectCreate;
