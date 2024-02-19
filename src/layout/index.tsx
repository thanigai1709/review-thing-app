import Header from '@/components/ui/header';
import SideBar from '@/components/ui/sidebar';

type TLayout = {
    children: React.ReactNode[] | React.ReactNode | null;
};

export const ProjectLayout = ({ children }: TLayout) => {
    return (
        <div className="dashboard-container flex">
            <aside className="h-screen px-3 py-2 flex flex-col bg-secondary/30">
                <SideBar />
            </aside>
            <main className="h-screen w-full flex flex-col">
                <Header />
                <div className="dashboard-container__content">{children}</div>
            </main>
        </div>
    );
};
