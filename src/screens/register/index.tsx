import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from './graphql';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup
                .string()
                .email('Invalid email address')
                .required('Email address is required'),
            password: yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            console.table(values);
            handleMutation({
                variables: {
                    input: {
                        name: signupForm.values.name,
                        email: signupForm.values.email,
                        password: signupForm.values.password,
                    },
                },
            });
        },
    });

    const [handleMutation, { loading }] = useMutation(SIGNUP_MUTATION, {
        onCompleted: (data) => {
            // console.log(data, 'created user data');
            toast.success('Account Created', {
                description:
                    'Your account has been successfully created. Welcome aboard!',
                icon: <CheckCircle className="fill-green-400 w-4 h-4 mr-3" />,
            });
            navigate('/login');
        },
        onError: (error) => {
            const errCode = error.graphQLErrors[0].extensions.code;
            if (error && errCode === 'DUPLICATE_FIELD') {
                signupForm.setFieldError('email', error.message);
            }
            console.log(error);
        },
    });

    return (
        <div className="flex login-screen__wrap h-screen justify-center items-center px-4">
            <Card className="w-[360px]">
                <CardHeader>
                    <CardTitle className="text-[20px] text-center font-bold">
                        Join review<span className="text-primary">thing</span>{' '}
                        and Elevate Your Collaboration Game!
                    </CardTitle>
                </CardHeader>
                <form onSubmit={signupForm.handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Jhon Doe"
                                        type="text"
                                        value={signupForm.values.name}
                                        onChange={signupForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                signupForm.touched.name &&
                                                signupForm.errors.name,
                                        })}
                                    />
                                    {signupForm.touched.name &&
                                        signupForm.errors.name && (
                                            <span className="error text-xs text-red-500">
                                                {signupForm.errors.name}
                                            </span>
                                        )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="jhon@gmail.com"
                                        type="text"
                                        value={signupForm.values.email}
                                        onChange={signupForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                signupForm.touched.email &&
                                                signupForm.errors.email,
                                        })}
                                    />
                                    {signupForm.touched.email &&
                                        signupForm.errors.email && (
                                            <span className="error text-xs text-red-500">
                                                {signupForm.errors.email}
                                            </span>
                                        )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={signupForm.values.password}
                                        onChange={signupForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                signupForm.touched.password &&
                                                signupForm.errors.password,
                                        })}
                                    />
                                    {signupForm.touched.password &&
                                        signupForm.errors.password && (
                                            <span className="error text-xs text-red-500">
                                                {signupForm.errors.password}
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-col gap-3">
                        <div className="flex flex-col gap-3 w-full">
                            <Button
                                size="lg"
                                className="w-full text-sm"
                                type="submit"
                                isLoading={loading}
                            >
                                Sign up
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                                Already have an account?{' '}
                                <Link
                                    to={'/login'}
                                    className="text-blue-600 hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Register;
