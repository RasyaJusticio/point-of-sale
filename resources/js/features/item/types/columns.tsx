import { ActionCell } from '@/components/ui/actioncell';
import { ColumnDef } from '@tanstack/react-table';
import { Item } from './item';

export const itemsColumns: ColumnDef<Item>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        header: 'Kategori',
        cell: ({ row }) => {
            return row.original.category ? row.original.category.name : row.original.category_id;
        },
    },
    {
        accessorKey: 'price',
        header: 'Harga',
    },
    {
        accessorKey: 'stock',
        header: 'Stok',
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            return <ActionCell editRoute={route('items.edit', row.original.id)} deleteRoute={route('items.destroy', row.original.id)} />;
        },
    },
];
