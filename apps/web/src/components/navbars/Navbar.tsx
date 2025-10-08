import NavbarSigninAction from '../base/NavbarSigninAction';
import NavItems from './NavItems';
import { GiNinjaHead } from "react-icons/gi";

const navItems = [
    {
        name: 'Features',
        link: '#features',
    },
    {
        name: 'Pricing',
        link: '#pricing',
    },
    {
        name: 'Contact',
        link: '#contact',
    },
];

export default function Navbar() {
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 py-3 rounded-2xl shadow-lg z-[100] bg-[#141517]">
            <div className="px-4 flex items-center justify-between w-full">
                <GiNinjaHead className='text-light h-7 w-7' />
                <NavItems items={navItems}></NavItems>
                <NavbarSigninAction />
            </div>
        </div>
    );
}
