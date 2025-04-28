import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category as BaseCategory } from '@/features/category/types/category';
import { Item as BaseItem } from '@/features/item/types/item';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Minus, Plus, Search, Trash, X } from 'lucide-react';
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

type Item = BaseItem & {
    qty: number;
};

type Filters = {
    search: string;
};

const ShoppingCart = ({ items, categories, category, filters }: { items: Item[]; categories: Category[]; category?: Category; filters: Filters }) => {
    const [inCartItems, setInCartItems] = useState<Item[]>(JSON.parse(localStorage.getItem('inCartData') ?? '[]'));
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
        return inCartItems.some((product) => product.id === itemId);
    };

    const storeItemToCart = (item: Item, qty: number) => {
        const cartData: Item[] = JSON.parse(localStorage.getItem('inCartData') ?? '[]');

        const foundData = cartData.find((data) => data.id === item.id);

        if (foundData) {
            if (qty > 0) {
                foundData.qty = qty;
            } else {
                const index = cartData.indexOf(foundData);
                if (index !== -1) {
                    cartData.splice(index, 1);
                }
            }

            setInCartItems((prev) => {
                const updatedProducts = prev.map((product) => (product.id === item.id ? { ...product, qty } : product));
                return qty > 0 ? updatedProducts : updatedProducts.filter((product) => product.id !== item.id);
            });
        } else {
            cartData.push({
                ...item,
                qty: 1,
            });

            setInCartItems((prev) => [...prev, { ...item, qty: 1 }]);
        }

        localStorage.setItem('inCartData', JSON.stringify(cartData));
    };

    const handleItemClick = (item: Item) => {
        if (isSelected(item.id)) {
            storeItemToCart(item, 0)
        } else {
            storeItemToCart(item, 1);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keranjang" />

            <div className="flex w-full max-w-full flex-1 flex-col gap-4 bg-stone-100 p-4 lg:flex-row">
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
                    <div className="grid w-full auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className={cn(
                                    'flex w-full cursor-pointer flex-col rounded-md bg-white p-2 transition-colors',
                                    isSelected(item.id) ? 'border border-orange-500 bg-orange-50' : 'border border-transparent',
                                )}
                            >
                                <div className="h-32 w-full overflow-hidden rounded-md">
                                    <img src={`/storage/${item.image_path}`} alt="" className="h-full w-full object-cover" />
                                </div>

                                <p className="w-full truncate text-base font-semibold">{item.name}</p>
                                <p className="w-full truncate text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-md bg-white p-4 lg:w-72">
                    <h2 className="mb-3 text-lg font-bold">Keranjang</h2>

                    <div className="flex flex-col gap-2">
                        {inCartItems.map((item) => (
                            <div key={item.id} className="flex flex-row gap-2 rounded-md border bg-white p-1 pr-3">
                                <div className="h-16 w-16 overflow-hidden rounded-md">
                                    <img src={`/storage/${item.image_path}`} alt="" className="h-full w-full object-cover" />
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">{item.name}</p>
                                    <p className="text-xs text-neutral-800">Rp {item.price.toLocaleString('id-ID')}</p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                storeItemToCart(item, item.qty - 1);
                                            }}
                                            disabled={item.qty === 1}
                                            className="disabled:cursor-not-allowed cursor-pointer rounded-full border border-orange-500 bg-orange-100 text-orange-500 hover:opacity-70"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-sm">{item.qty}</span>
                                        <button
                                            onClick={() => {
                                                storeItemToCart(item, item.qty + 1);
                                            }}
                                            disabled={item.qty >= item.stock}
                                            className="disabled:cursor-not-allowed cursor-pointer rounded-full border border-orange-600 bg-orange-500 text-white hover:opacity-80"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="ml-auto flex flex-col items-end justify-between pt-1.5">
                                    <button
                                        onClick={() => {
                                            storeItemToCart(item, 0);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <Trash size={16} />
                                    </button>
                                    <p className="text-sm font-semibold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShoppingCart;
