<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Services\FileService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DocumentController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $documents = Document::query()->where('user_id', auth()->id())->paginate(10)->onEachSide(1);

        return Inertia::render('Document/Index', [
            'documents' => $documents,
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
        try {
            DB::transaction(function () use ($request) {
                $files = $request->file('files');
                $user_id = auth()->id();

                foreach ($files as $file) {
                    $response = $this->fileService->upload('documents', $user_id, $file)->getData();
                    Document::create([
                        'user_id' => $user_id,
                        'file_id' => $response->file->id,
                        'file_path' => $response->path,
                    ]);
                }
            });
            return back()->with('success', 'Files uploaded successfully');
        } catch (Exception $e) {
            // DB::rollBack();
            back()->withErrors(['files' => 'No files were uploaded']);
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
