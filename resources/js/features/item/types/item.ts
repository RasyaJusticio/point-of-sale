import { Category } from '@/features/category/types/category';

export type Item = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category_id: number;
    category?: Category;
};

export type ItemForm = {
    name: string;
    price: number;
    stock: number;
    category_id: number;
};
