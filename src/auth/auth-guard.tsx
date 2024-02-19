import { checkAuth } from '@/lib/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TAuthGuard = {
    children: React.ReactNode[] | React.ReactNode | any;
};

const AuthGuard = ({ children }: TAuthGuard) => {
    const navigate = useNavigate();
    const isLoggedIn = checkAuth();   
    useEffect(() => {
        console.log('auth gaurd called');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, []);
    return isLoggedIn ? <>{children}</> : null;
};

export default AuthGuard;
