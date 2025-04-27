import { ActionCell } from '@/components/ui/actioncell';
import { ColumnDef } from '@tanstack/react-table';
import { Category } from './category';

export const categoriesColumns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            return <ActionCell editRoute={route('categories.edit', row.original.id)} />;
        },
    },
];
