<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Document/Index', [
            'documents' => [],
        ]);
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
        $validated = $request->validate([
            'images' => 'required',
        ]);

        if ($request->hasFile('images')) {
            // $allowedfileExtension = ['pdf', 'jpg', 'png', 'docx'];
            $files = $request->file('images');
            dd($files);
            // foreach ($files as $file) {
            //     $filename = $file->getClientOriginalName();
            //     $extension = $file->getClientOriginalExtension();
            //     $check = in_array($extension, $allowedfileExtension);
            //     // dd($check);
            //     if ($check) {
            //         // $items = Item::create($request->all());
            //         // foreach ($request->photos as $photo) {
            //         //     $filename = $photo->store('photos');
            //         //     ItemDetail::create([
            //         //         'item_id' => $items->id,
            //         //         'filename' => $filename
            //         //     ]);
            //         // }
            //     }
            // }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
