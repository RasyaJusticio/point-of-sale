import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast, Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const pageProps = usePage().props;

    useEffect(() => {
        if (pageProps.flash) {
            const flash: { success?: string; error?: string } = pageProps.flash;

            if (flash.success)
                toast('Berhasil', {
                    description: flash.success,
                    icon: <CheckCircle color="green" size={16} />,
                });
            if (flash.error)
                toast('Gagal', {
                    description: flash.error,
                    icon: <XCircle color="red" size={16} />,
                });
        }
    }, [pageProps]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster />
        </AppLayoutTemplate>
    );
};
