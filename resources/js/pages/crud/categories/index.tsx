import { DataTable, FiltersData } from '@/components/ui/datatable';
import { Category } from '@/features/category/types/category';
import { categoriesColumns } from '@/features/category/types/columns';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PaginationData } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Kategori',
        href: '/categories',
    },
];

export default function Categories({ categories, filters }: { categories: PaginationData<Category>; filters: FiltersData }) {
    useEffect(() => {
        console.log(categories);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Kategori" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={categoriesColumns}
                    data={categories}
                    onStoreRoute={route('categories.create')}
                    onSearchRoute={route('categories.index')}
                    filters={filters}
                />
            </div>
        </AppLayout>
    );
}
