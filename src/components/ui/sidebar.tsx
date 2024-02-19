import Logo from './logo';
import { useAtom, useAtomValue } from 'jotai/react';
import { LoggedInUserAtom } from '@/context/LoggedInUserContext';
import {
    ChevronDown,
    FolderKanban,
    LogOut,
    MoreVertical,
    Plus,
    Settings,
    Trash2,
} from 'lucide-react';
import { Button } from './button';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProjectCreateForm from '@/components/ui/project-create-form';
import { TNewProject } from '@/screens/projects/@types';
import { useState } from 'react';
import { boolean } from 'yup';

const SideBar = () => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [mdialogOpen, setMDialogOpen] = useState<boolean>(false);

    const { projects, name, id } = useAtomValue(LoggedInUserAtom);
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
        setDialogOpen(false);
        navigate(`/projects/${newProject.id}`);
    }

    return (
        <div className="w-[240px] flex flex-col gap-4">
            <div className="flex justify-center">
                <Logo />
            </div>
            <div className="flex">
                <div className="flex px-3 py-2 w-full rounded-md border-2 bg-slate-900 font-semibold gap-2 justify-between">
                    <span className="capitalize text-white/75">
                        {name}'s Workspace
                    </span>
                    <ChevronDown className="w-4 opacity-75" />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex px-3 py-2 justify-between rounded-md border-2">
                    <span className="text-md flex items-center gap-2 text-white/75">
                        <FolderKanban className="w-5" />
                        Projects
                    </span>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger>
                            <Button
                                variant="secondary"
                                size="sm"
                                title="Add Project"
                            >
                                <Plus className="w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Project</DialogTitle>
                                <div className="pt-3">
                                    <ProjectCreateForm
                                        onCreate={handleProjectCreate}
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <ul className="flex flex-col pl-3 pt-2 gap-2">
                    {projects.map((p) => (
                        <li key={p.id} className="text-sm ">
                            <NavLink
                                to={`/projects/${p.id}`}
                                className="rounded-md pl-4 pr-2 flex justify-between gap-2 items-center hover:bg-secondary/60 ease duration-300 nav-link relative text-white/75 hover:text-white"
                            >
                                <span className="flex py-2.5">{p.name}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="side-menu ease duration-300 transition-all opacity-0">
                                        <MoreVertical className="w-6" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            className="text-[13px] cursor-pointer px-3 flex items-center text-white/75 hover:text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setMDialogOpen(true);
                                            }}
                                        >
                                            <Settings className="w-5 mr-2" />
                                            <span>Project Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[13px] cursor-pointer px-3 flex items-center text-white/75 hover:text-white">
                                            <LogOut className="w-5 mr-2" />
                                            <span>Leave project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[13px] cursor-pointer px-3 flex items-center text-white/75 hover:text-white">
                                            <Trash2 className="w-5 mr-2" />
                                            <span>Delete project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavLink>
                            <Dialog
                                open={mdialogOpen}
                                onOpenChange={setMDialogOpen}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you absolutely sure?
                                        </DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
