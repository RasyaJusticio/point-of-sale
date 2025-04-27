<?php

namespace App\Http\Controllers;

use App\Http\Requests\Item\ItemStoreRequest;
use App\Http\Requests\Item\ItemUpdateRequest;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        try {
            if ($request->has('image')) {
                $images = $request->file('image');

                if ($images && count($images) > 0) {
                    $image = $images[0];

                    $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

                    $imagePath = Storage::disk('public')->putFileAs('images', $image, $imageName);
                    $fields['image_path'] = $imagePath;
                }
            }

            Item::create($fields);

            return redirect()->route('items.index')->with('success', 'Produk berhasil dibuat.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['image' => 'Gagal mengunggah gambar, coba lagi nanti.']);
        }
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

        $imageBlob = null;
        $imageMime = null;

        if (!empty($item->image_path) && Storage::disk('public')->exists($item->image_path)) {
            $imageUrl = Storage::disk('public')->path($item->image_path);
            $imageMime = mime_content_type($imageUrl);

            $imageBlob = base64_encode(file_get_contents($imageUrl));
        }

        return Inertia::render('crud/items/edit', [
            'item' => $item,
            'categories' => $categories,
            'imageBlob' => $imageBlob,
            'imageMime' => $imageMime
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItemUpdateRequest $request, Item $item)
    {
        $fields = $request->validated();

        if ($request->has('image')) {
            $images = $request->file('image');

            if (!empty($images)) {
                if (!empty($item->image_path)) {
                    if (Storage::disk('public')->exists($item->image_path)) {
                        Storage::disk('public')->delete($item->image_path);
                    }
                }

                $image = $images[0];

                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

                $imagePath = Storage::disk('public')->putFileAs('images', $image, $imageName);
                $fields['image_path'] = $imagePath;
            }
        }

        $item->update($fields);

        return redirect()->route('items.index')->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        if (!empty($item->image_path)) {
            if (Storage::disk('public')->exists($item->image_path)) {
                Storage::disk('public')->delete($item->image_path);
            }
        }

        $item->delete();

        return redirect()->route('items.index')->with('success', 'Produk berhasil dihapus.');
    }
}
