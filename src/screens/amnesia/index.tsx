import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { toast } from 'sonner';

const Amnesia = () => {
    const amnesiaForm = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Invalid email address')
                .required('Email address is required'),
        }),
        onSubmit: (values) => {
            console.table(values);
            toast.info('Reset email sent', {
                description: `We have just sent an email with a password rest link to ${values.email}`,
            });
        },
    });

    return (
        <div className="flex login-screen__wrap h-screen justify-center items-center px-4">
            <Card className="w-[360px]">
                <CardHeader>
                    <CardTitle className="text-[20px] text-center font-bold">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and we'll send instructions to reset
                        your password.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={amnesiaForm.handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="jhon@gmail.com"
                                        type="text"
                                        value={amnesiaForm.values.email}
                                        onChange={amnesiaForm.handleChange}
                                        autoComplete="off"
                                        className={clsx({
                                            'border border-red-500':
                                                amnesiaForm.touched.email &&
                                                amnesiaForm.errors.email,
                                        })}
                                    />
                                    {amnesiaForm.touched.email &&
                                        amnesiaForm.errors.email && (
                                            <span className="error text-xs text-red-500">
                                                {amnesiaForm.errors.email}
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
                            >
                                Reset
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                                Go back to{' '}
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
export default Amnesia;
