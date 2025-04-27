import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PaginationData } from '@/types/pagination';
import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';

interface DataTableProps<TData, TValue> {
    label: string;
    columns: ColumnDef<TData, TValue>[];
    data: PaginationData<TData>;
    filters: FiltersData;
    onStoreRoute: string;
    onSearchRoute: string;
}

export type FiltersData = {
    search: string;
    sort: {
        column: string;
        order: 'asc' | 'desc';
    };
};

export function DataTable<TData, TValue>({ label, columns, data, onSearchRoute, onStoreRoute, filters }: DataTableProps<TData, TValue>) {
    const [search, setSearch] = useState(filters.search || '');

    const table = useReactTable({
        data: data.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            onSearchRoute + '?page=1',
            {
                search,
            },
            { preserveState: true },
        );
    };

    const onClearSearch = () => {
        setSearch('');
        router.get(onSearchRoute, { search: '' }, { preserveState: true });
    };

    return (
        <div>
            <div className="flex w-full items-center justify-between">
                <form onSubmit={handleSearch} className="mb-4 w-64">
                    <label
                        className={cn(
                            'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                            'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
                            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                        )}
                    >
                        <Search size={16} />
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none"
                            placeholder="Cari kategori..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {search.trim() !== '' && (
                            <button type="button" onClick={onClearSearch}>
                                <X size={14} />
                            </button>
                        )}
                    </label>
                </form>

                <Link href={onStoreRoute}>
                    <Button>Buat {label}</Button>
                </Link>
            </div>

            <div className="rounded-md border px-3 py-2 shadow-sm">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada hasil
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="mx-auto mt-2 flex w-fit justify-center divide-x rounded-md border">
                    <Link href={data.prev_page_url ? data.prev_page_url + `&search=${filters.search}` : ''} disabled={data.prev_page_url === null}>
                        <Button variant={'link'} size="sm" disabled={data.prev_page_url === null}>
                            <ChevronLeft />
                        </Button>
                    </Link>

                    <span className="grid place-items-center px-4">{data.current_page}</span>

                    <Link href={data.next_page_url ? data.next_page_url + `&search=${filters.search}` : ''} disabled={data.next_page_url === null}>
                        <Button variant={'link'} size="sm" disabled={data.next_page_url === null}>
                            <ChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
