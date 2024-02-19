import Icons from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_QUERY } from './graphql';
import { toast } from 'sonner';
import { XCircle } from 'lucide-react';
import { useSetAtom } from 'jotai/react';
import { LoggedInUserAtom } from '@/context/LoggedInUserContext';
import Logo from '@/components/ui/logo';

const Login = () => {
    const navigate = useNavigate();
    const setLoggedInSession = useSetAtom(LoggedInUserAtom);

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Invalid email address')
                .required('Email address is required'),
            password: yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            handleLogin({
                variables: {
                    email: values.email,
                    password: values.password,
                },
            });
        },
    });

    const [handleLogin, { loading }] = useLazyQuery(LOGIN_QUERY, {
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            loginForm.resetForm();
            console.log(data.userLogin.user, 'login successful');
            setLoggedInSession({
                id: data.userLogin.user.id,
                name: data.userLogin.user.name,
                email: data.userLogin.user.email,
                avatar: data.userLogin.user.avatar,
                projects: data.userLogin.user.projects
                    ? data.userLogin.user.projects
                    : [],
                token: data.userLogin.token,
                isLoggedIn: true,
            });
            if (data.userLogin.user.projects.length) {
                navigate(`/projects/${data.userLogin.user.projects[0].id}`);
            } else {
                navigate('/projects/create');
            }
        },
        onError: (error) => {
            loginForm.resetForm();
            const errCode = error.graphQLErrors[0].extensions.code;
            if (error && errCode === 'INVALID_CREDENTIALS') {
                toast.error('Invalid login or password.', {
                    icon: <XCircle className="fill-red-400 w-4 h-4 mr-3" />,
                });
            }
            console.log(error);
        },
    });

    return (
        <div className="flex login-screen__wrap h-screen justify-center items-center px-4">
            <Card className="w-[360px]">
                <CardHeader>
                    <Logo />
                </CardHeader>
                <form onSubmit={loginForm.handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="jhon@gmail.com"
                                        type="text"
                                        value={loginForm.values.email}
                                        onChange={loginForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                loginForm.touched.email &&
                                                loginForm.errors.email,
                                        })}
                                    />
                                    {loginForm.touched.email &&
                                        loginForm.errors.email && (
                                            <span className="error text-xs text-red-500">
                                                {loginForm.errors.email}
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
                                        value={loginForm.values.password}
                                        onChange={loginForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                loginForm.touched.password &&
                                                loginForm.errors.password,
                                        })}
                                    />
                                    {loginForm.touched.password &&
                                        loginForm.errors.password && (
                                            <span className="error text-xs text-red-500">
                                                {loginForm.errors.password}
                                            </span>
                                        )}
                                </div>
                                <div className="text-right mt-0">
                                    <Link
                                        to={'/amnesia'}
                                        className="text-[13px] text-blue-600 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-col gap-3">
                        <Button
                            size="lg"
                            className="w-full text-sm"
                            type="submit"
                            isLoading={loading}
                        >
                            Login
                        </Button>
                        <Separator />
                        <div className="flex flex-col gap-3 w-full">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full flex items-center justify-center gap-2 text-sm"
                                type="button"
                            >
                                <Icons name="google" width={20} height={20} />{' '}
                                Google
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                                Don't have an account?{' '}
                                <Link
                                    to={'/signup'}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
