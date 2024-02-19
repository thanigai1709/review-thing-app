import { LoggedInUserAtom } from '@/context/LoggedInUserContext';
import { type ClassValue, clsx } from 'clsx';
import { useAtomValue } from 'jotai/react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function checkAuth(): boolean {
    const loggedInSession = useAtomValue(LoggedInUserAtom);
    return loggedInSession.isLoggedIn;
}
