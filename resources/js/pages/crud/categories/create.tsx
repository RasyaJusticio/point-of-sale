import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryForm } from '@/features/category/types/category';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Kategori',
        href: '/categories',
    },
    {
        title: 'Buat Kategori',
        href: '/categories/create',
    },
];

export default function CategoryCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<CategoryForm>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Kategori" />

            <div className="flex h-full flex-col gap-4 p-4">
                <form className="flex flex-col gap-6 rounded-lg border bg-white p-4" onSubmit={submit}>
                    <h1 className="text-xl font-bold">Buat Kategori</h1>
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

                        <div className="align-items mt-4 flex w-full gap-2">
                            <Button type="button" variant={'outline'} className="w-fit px-8" tabIndex={6}>
                                <Link href={route('items.index')}>Batal</Link>
                            </Button>
                            <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
