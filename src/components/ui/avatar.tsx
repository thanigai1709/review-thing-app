import { cn } from '@/lib/utils';

type TAvatar = {
    src: string | null;
    name: string;
    className: string;
};

const Avatar: React.FC<TAvatar> = ({ src, name, className }) => {
    return (
        <div
            className={cn(
                'flex justify-center items-center aspect-square rounded-full overflow-hidden',
                className
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    loading="eager"
                    className="flex aspect-square object-cover"
                />
            ) : (
                <AvatarFallback name={name} />
            )}
        </div>
    );
};

const AvatarFallback: React.FC<{ name: string }> = ({ name }) => {
    return <span className="flex font-semibold text-lg justify-center items-center">{name.charAt(0).toUpperCase()}</span>;
};

export default Avatar;
