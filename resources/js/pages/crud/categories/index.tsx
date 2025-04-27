import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Kategori',
        href: '/categories',
    },
];

export default function Categories() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Kategori" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            </div>
        </AppLayout>
    );
}
