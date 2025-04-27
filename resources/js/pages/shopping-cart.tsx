import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category as BaseCategory } from '@/features/category/types/category';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keranjang Belanja',
        href: '/cart',
    },
];

type Category = BaseCategory & {
    items_count: number;
};

const ShoppingCart = ({ categories, category }: { categories: Category[]; category?: Category }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keranjang" />

            <div className="flex w-full max-w-full flex-1 flex-col gap-4 overflow-hidden bg-stone-100 p-4">
                <div className="relative w-full">
                    <Carousel
                        className="mx-12 flex flex-col"
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {category && (
                                <CarouselItem className="flex basis-1/3 pl-2 md:basis-1/5 md:pl-4" key={category.id}>
                                    <Link
                                        href={route('cart.index', { category: category.id })}
                                        className="w-full rounded-md border border-orange-500 bg-orange-100 px-3 py-1 text-center text-sm"
                                    >
                                        <h3 className="text-md tracking-wider text">{category.name}</h3>
                                        <h4 className="text-xs text-neutral-700 tracking-wide">{category.items_count} Produk</h4>
                                    </Link>
                                </CarouselItem>
                            )}
                            {categories.map((category) => (
                                <CarouselItem className="flex basis-1/3 pl-2 md:basis-1/5 md:pl-4" key={category.id}>
                                    <Link
                                        href={route('cart.index', { category: category.id })}
                                        className="w-full rounded-md border border-transparent bg-white px-3 py-1 text-center text-sm"
                                    >
                                        <h3 className="text-md tracking-wider">{category.name}</h3>
                                        <h4 className="text-xs text-neutral-700 tracking-wide">{category.items_count} Produk</h4>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="flex-1" />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShoppingCart;
