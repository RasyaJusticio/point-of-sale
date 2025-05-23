<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categoryId = $request->query('category', '1');
        $searchQuery = $request->query('search', '');

        $invalidCategoryId = false;

        $category = Category::find($categoryId);
        if (empty($category)) {
            $invalidCategoryId = true;
            $category = Category::query()->orderBy('id', 'asc')->first();
            $categoryId = $category->id;
        }

        if ($category) {
            $category['items_count'] = $category->items()->count();
        }

        $categories = Category::query()
            ->when($categoryId, function ($query, $categoryId) {
                $query->whereNot('id', $categoryId);
            })
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($category) {
                $category['items_count'] = $category->items()->count();

                return $category;
            });

        $itemsQuery = Item::query();

        $itemsQuery->when($categoryId, function ($query, $categoryId) {
            $query->where('category_id', $categoryId);
        });

        $itemsQuery->when($searchQuery, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        });

        $items = $itemsQuery->get();

        $props = [
            'items' => $items,
            'categories' => $categories,
            'category' => $category,
            'filters' => [
                'search' => $searchQuery,
            ],
        ];

        if ($invalidCategoryId && Category::count() > 0) {
            return Inertia::render('shopping-cart', $props)->with('error', 'Kategori tidak valid, menggunakan kategori nomor 1.');
        } else {
            return Inertia::render('shopping-cart', $props);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
