<?php

namespace App\Http\Controllers;

use App\Http\Requests\Item\ItemStoreRequest;
use App\Http\Requests\Item\ItemUpdateRequest;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $itemsQuery = Item::query()->with('category');

        $itemsQuery->when($request->query('search'), function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        });

        $itemsQuery->orderBy('id', 'asc');

        $items = $itemsQuery->paginate(6)->withQueryString();

        return Inertia::render('crud/items/index', [
            'items' => $items,
            'filters' => [
                'search' => $request->query('search', ''),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('crud/items/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemStoreRequest $request)
    {
        $fields = $request->validated();

        Item::create($fields);

        return redirect()->route('items.index')->with('success', 'Produk berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        $categories = Category::all();

        return Inertia::render('crud/items/edit', [
            'item' => $item,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItemUpdateRequest $request, Item $item)
    {
        $fields = $request->validated();

        $item->update($fields);

        return redirect()->route('items.index')->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
