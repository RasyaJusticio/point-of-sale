<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryStoreRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categoriesQuery = Category::query();

        $categoriesQuery->when($request->query('search'), function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        });

        $categoriesQuery->orderBy('id', 'asc');

        $categories = $categoriesQuery->paginate(10)->withQueryString();

        return Inertia::render('crud/categories/index', [
            'categories' => $categories,
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
        return Inertia::render('crud/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request)
    {
        $fields = $request->validated();

        Category::create($fields);

        return redirect()->route('categories.index')->with('success', 'Kategori berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
