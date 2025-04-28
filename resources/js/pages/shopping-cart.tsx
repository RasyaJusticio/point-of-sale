import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category as BaseCategory } from '@/features/category/types/category';
import { Item } from '@/features/item/types/item';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keranjang Belanja',
        href: '/cart',
    },
];

type Category = BaseCategory & {
    items_count: number;
};

type Filters = {
    search: string;
};

type CartData = {
    id: number;
    qty: number;
};

const ShoppingCart = ({ items, categories, category, filters }: { items: Item[]; categories: Category[]; category?: Category; filters: Filters }) => {
    const [selectedProducts, setSelectedProducts] = useState<CartData[]>(JSON.parse(localStorage.getItem('cartData') || '[]'));
    const [search, setSearch] = useState(filters.search || '');

    const setParams = (extraParams?: { [key: string]: string }) => {
        const currentParams = new URLSearchParams(window.location.search);

        if (extraParams) {
            Object.entries(extraParams).forEach(([key, value]) => {
                currentParams.set(key, value);
            });
        }

        return Object.fromEntries(currentParams);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('cart.index'), setParams({ search }), { preserveState: true });
    };

    const onClearSearch = () => {
        setSearch('');
        router.get(route('cart.index'), setParams({ search: '' }), { preserveState: true });
    };

    const isSelected = (itemId: number) => {
        return selectedProducts.some((product) => product.id === itemId);
    }

    const storeItemToCart = (itemId: number, qty: number) => {
        const cartData: CartData[] = JSON.parse(localStorage.getItem('cartData') ?? '[]');

        const foundData = cartData.find((data) => data.id == itemId);

        if (foundData) {
            if (qty > 0) {
                cartData.splice(cartData.indexOf(foundData), 1);
            } else {
                foundData.qty = qty;
            }

            setSelectedProducts((prev) => {
                const updatedProducts = prev.map((product) => (product.id === itemId ? { ...product, qty } : product));
                return qty > 0 ? updatedProducts : updatedProducts.filter((product) => product.id !== itemId);
            });
        } else {
            cartData.push({
                id: itemId,
                qty: 1,
            });

            setSelectedProducts((prev) => [...prev, { id: itemId, qty }]);
        }

        localStorage.setItem('cartData', JSON.stringify(cartData));
    };

    const handleItemClick = (item: Item) => {
        storeItemToCart(item.id, 1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keranjang" />

            <div className="flex w-full max-w-full flex-1 flex-row gap-4 bg-stone-100 p-4">
                <div className="flex w-full max-w-full flex-1 flex-col gap-4 overflow-hidden">
                    {/* Category Picker */}
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
                                        <div className="w-full rounded-md border border-orange-500 bg-orange-100 px-3 py-1 text-center text-sm">
                                            <h3 className="text-md text tracking-wider">{category.name}</h3>
                                            <h4 className="text-xs tracking-wide text-neutral-700">{category.items_count} Produk</h4>
                                        </div>
                                    </CarouselItem>
                                )}
                                {categories.map((category) => (
                                    <CarouselItem className="flex basis-1/3 pl-2 md:basis-1/5 md:pl-4" key={category.id}>
                                        <Link
                                            href={route('cart.index', setParams({ category: category.id }))}
                                            className="w-full rounded-md border border-transparent bg-white px-3 py-1 text-center text-sm"
                                        >
                                            <h3 className="text-md tracking-wider">{category.name}</h3>
                                            <h4 className="text-xs tracking-wide text-neutral-700">{category.items_count} Produk</h4>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="flex-1" />
                            <CarouselNext />
                        </Carousel>
                    </div>

                    {/* Item Search Bar */}
                    <form onSubmit={handleSearch} className="w-full">
                        <label
                            className={cn(
                                'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border bg-white px-3 py-1 text-base transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                'focus-within:border-orange-500/50',
                                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                            )}
                        >
                            <Search size={16} />
                            <input
                                type="text"
                                className="flex-1 bg-transparent outline-none"
                                placeholder={`Cari Produk...`}
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

                    {/* Item Grid */}
                    <div className="grid w-full auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {items.map((item) => (
                            <button key={item.id} onClick={() => !isSelected(item.id) && handleItemClick(item)} className={cn(
                                "flex w-full flex-col cursor-pointer rounded-md bg-white p-2",
                                isSelected(item.id) ? "bg-orange-100 border-orange-500 border" : ""
                            )}>
                                <div className="h-32 w-full overflow-hidden rounded-md">
                                    <img src={`/storage/${item.image_path}`} alt="" className="h-full w-full object-cover" />
                                </div>

                                <p className="w-full truncate text-base font-semibold">{item.name}</p>
                                <p className="w-full truncate text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-md bg-white p-4">
                    <h2 className='text-lg font-bold'>Keranjang</h2>
                    
                    <div></div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShoppingCart;
