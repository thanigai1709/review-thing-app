import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { PROJECT_CREATE_MUTATION } from '../../screens/projects/graphql';
import { TNewProject } from '../../screens/projects/@types';
import { useAtomValue } from 'jotai/react';
import { LoggedInUserAtom } from '@/context/LoggedInUserContext';

type TProjectCreateFormProps = {
    onCreate: (e: TNewProject) => void;
};

const ProjectCreateForm = ({ onCreate }: TProjectCreateFormProps) => {
    const LoggedInUser = useAtomValue(LoggedInUserAtom);
    const projectForm = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .matches(/^[A-Za-z0-9 ]*$/, 'Please enter valid name')
                .max(40)
                .required('Project name is required'),
        }),
        onSubmit: (values) => {
            console.table(values);
            handleProjectCreate({
                variables: {
                    input: {
                        name: projectForm.values.name,
                        creator_id: LoggedInUser?.id,
                        project_status: 'IN_PROGRESS',
                    },
                },
            });
        },
    });
    const [handleProjectCreate, { loading }] = useMutation(
        PROJECT_CREATE_MUTATION,
        {
            onCompleted: (data) => {
                onCreate(data.createProject);
                toast.success('Project created successfully!', {
                    icon: (
                        <CheckCircle className="fill-green-400 w-4 h-4 mr-3" />
                    ),
                });
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
    return (
        <div>
            <form onSubmit={projectForm.handleSubmit}>
                <div className="flex flex-col">
                    <div className="space-y-3">
                        <Input
                            id="name"
                            placeholder="Enter Project Name"
                            type="text"
                            value={projectForm.values.name}
                            onChange={projectForm.handleChange}
                            autoComplete="off"
                            className={clsx({
                                'border border-red-500':
                                    projectForm.touched.name &&
                                    projectForm.errors.name,
                            })}
                        />
                        {projectForm.touched.name &&
                            projectForm.errors.name && (
                                <span className="error text-xs text-red-500">
                                    {projectForm.errors.name}
                                </span>
                            )}
                        <Button
                            size="lg"
                            className="w-full text-sm"
                            type="submit"
                            isLoading={loading}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProjectCreateForm;
