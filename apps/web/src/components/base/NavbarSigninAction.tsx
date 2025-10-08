'use client';
import { MdChevronRight } from 'react-icons/md';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useUserSessionStore } from '@/src/store/users/useUserSessionStore';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NavbarSigninAction() {
    const { session } = useUserSessionStore();
    const router = useRouter();

    function handler() {
        if (!session?.user) {
            signIn('google', {
                callbackUrl: '/',
                redirect: false,
            })
        } else {
            router.push('/create');
        }
    }

    return (
        <div className="">
            <Button
                onClick={handler}
                className={cn(
                    'text-[13px] font-semibold tracking-wide flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10] pr-1 rounded-lg',
                    'bg-primary',
                )}
            >
                <span>{session?.user ? 'Go to app' : 'Sign in'}</span>
                <MdChevronRight className="text-light" />
            </Button>
        </div>
    );
}
