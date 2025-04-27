import { DataTable, FiltersData } from '@/components/ui/datatable';
import { itemsColumns } from '@/features/item/types/columns';
import { Item } from '@/features/item/types/item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PaginationData } from '@/types/pagination';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Produk',
        href: '/items',
    },
];

export default function Products({ items, filters }: { items: PaginationData<Item>; filters: FiltersData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    label="Produk"
                    columns={itemsColumns}
                    data={items}
                    onStoreRoute={route('items.create')}
                    onSearchRoute={route('items.index')}
                    filters={filters}
                />
            </div>
        </AppLayout>
    );
}
