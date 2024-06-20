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

    // Get Documents
    public function getData(Request $request)
    {
        $documents = Document::query()->where('user_id', auth()->id())->paginate(10)->onEachSide(1);
        return response()->json($documents);
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
        $files = $request->file('files');
        $user_id = auth()->id();

        if (!$files || empty($files)) {
            return response()->json([
                'success' => false,
                'message' => 'No files were uploaded',
            ], 400);
        }

        try {
            $documents = $this->uploadDocuments($user_id, $files);

            return response()->json([
                'success' => true,
                'message' => 'Files uploaded successfully',
                'documents' => $documents,
            ], 201);
        } catch (Exception $e) {
            $errorMessage = $e instanceof FileUploadException ? $e->getMessage() : 'An error occurred while uploading files.';
            return response()->json([
                'success' => false,
                'message' => $errorMessage,
            ], 500);
        }
    }

    /**
     * Upload documents and create records in the database
     * @param $user_id
     * @param $files
     *
     * @return mixed
     */
    private function uploadDocuments($user_id, $files)
    {
        return DB::transaction(function () use ($user_id, $files) {
            return collect($files)->map(function ($file) use ($user_id) {
                $response = $this->uploadFile($user_id, $file);
                return $this->createDocument($user_id, $response);
            });
        });
    }

    /**
     * Upload file to the server
     * @param $user_id
     * @param $file
     *
     * @return mixed
     */
    private function uploadFile($user_id, $file)
    {
        $response = $this->fileService->upload('documents', $user_id, $file)->getData();
        return $response;
    }

    /**
     * Create document record in the database
     * @param $user_id
     * @param $response
     *
     * @return mixed
     */
    private function createDocument($user_id, $response)
    {
        return Document::create([
            'user_id' => $user_id,
            'file_id' => $response->file->id,
            'file_path' => $response->path,
        ]);
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
