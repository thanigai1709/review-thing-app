import { CardTitle } from './card';

const Logo = () => {
    return (
        <CardTitle className="text-[26px] text-center font-bold">
            review
            <span className="text-primary">thing</span><sup className='text-[10px] top-[-20px]'>[ BETA ]</sup>
        </CardTitle>
    );
};

export default Logo;