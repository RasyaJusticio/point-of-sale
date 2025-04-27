import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category, CategoryForm } from '@/features/category/types/category';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Kategori',
        href: '/categories',
    },
    {
        title: 'Ubah Kategori',
        href: '/categories',
    },
];

export default function CategoryEdit({ category }: { category: Category }) {
    const { data, setData, put, processing, errors } = useForm<CategoryForm>({
        name: category.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Kategori" />

            <div className="flex h-full flex-col gap-4 p-4">
                <form className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-lg" onSubmit={submit}>
                    <h1 className="text-xl font-bold">Ubah Kategori</h1>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
