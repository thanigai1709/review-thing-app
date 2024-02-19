import { useAtomValue, useSetAtom } from 'jotai/react';
import Avatar from './avatar';
import { LoggedInUserAtom } from '@/context/LoggedInUserContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const loggedInUser = useAtomValue(LoggedInUserAtom);
    const logOutUser = useSetAtom(LoggedInUserAtom);
    const navigate = useNavigate();

    function handleLogOut() {
        logOutUser({
            name: '',
            id: '',
            avatar: '',
            isLoggedIn: false,
            projects: [],
            email: '',
            token: '',
        });
        navigate('/login');
    }

    return (
        <div className="px-5 py-2 flex justify-end gap-4">
            <div className='flex'>
                <Popover>
                    <PopoverTrigger className='p-2 opacity-70 hover:opacity-100 transition-opacity ease-out'><Bell className="w-5" /></PopoverTrigger>
                    <PopoverContent className='mr-1'>
                        No Notifications Found
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex'>
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                        <Avatar
                            name={loggedInUser.name}
                            src={loggedInUser.avatar}
                            className="w-[40px] bg-primary"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-1">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center"
                            onClick={handleLogOut}
                        >
                            <LogOut className="w-5 pr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Header;
