import AuthGuard from '@/auth/auth-guard';
import { ProjectLayout } from '@/layout';
import { Link, useParams } from 'react-router-dom';

const ProjectDashboard = () => {
    const urlParams = useParams();
    console.log(urlParams, 'url params ++++++');
    return (
        <AuthGuard>
            <ProjectLayout>
               hello world
               <Link to={"/projects/create"}>Create</Link>
            </ProjectLayout>
        </AuthGuard>
    );
};

export default ProjectDashboard;
