import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import Combobox from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/features/category/types/category';
import ImageUpload from '@/features/item/components/ImageUpload';
import { ItemForm } from '@/features/item/types/item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Produk',
        href: '/items',
    },
    {
        title: 'Buat Produk',
        href: '/items/create',
    },
];

export default function ProductCreate({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<ItemForm>({
        name: '',
        price: 5000,
        stock: 1,
        category_id: 1,
        image: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('items.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Produk" />

            <div className="flex h-full flex-col gap-4 p-4">
                <form className="flex flex-col gap-6 rounded-lg border bg-white p-4" onSubmit={submit}>
                    <h1 className="text-xl font-bold">Buat Produk</h1>
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

                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Kategori</Label>
                            <Combobox
                                options={categories.map((category) => ({ label: category.name, value: category.id }))}
                                value={data.category_id}
                                onChange={(value) => setData('category_id', parseInt(value))}
                                placeholder="Pilih kategori"
                                searchPlaceholder="Cari kategori..."
                                searchNoResults="Kategori tidak ditemukan"
                            />
                            <InputError message={errors.category_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                id="price"
                                type="number"
                                tabIndex={3}
                                autoComplete="price"
                                value={data.price}
                                min={0}
                                onChange={(e) => setData('price', parseInt(e.target.value))}
                            />
                            <InputError message={errors.price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stok</Label>
                            <Input
                                id="stock"
                                type="number"
                                tabIndex={4}
                                autoComplete="stock"
                                value={data.stock}
                                min={0}
                                step={1}
                                onChange={(e) => setData('stock', parseInt(e.target.value))}
                            />
                            <InputError message={errors.stock} />
                        </div>

                        <div className="grid w-full max-w-full gap-2">
                            <Label htmlFor="image">Gambar</Label>
                            <ImageUpload value={data.image} onChange={(files) => setData('image', files)} />
                            <InputError message={errors.image} />
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
