<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Batch;
use App\Http\Requests\StoreBatchRequest;
use App\Http\Requests\UpdateBatchRequest;
use App\Http\Resources\FileResource;
use App\Models\File;
use App\Services\PdfService;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class BatchController extends Controller
{
    protected $pdfService;

    /**
     * PdfController constructor.
     * This injects the PdfService class to be consumed by the PdfController class
     *
     * @param PdfService $pdfService
     * @return void
     */
    public function __construct(PdfService $pdfService)
    {
        $this->pdfService = $pdfService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $batch = Batch::query()->paginate(10)->onEachSide(1);
        $deletedBatches = Batch::onlyTrashed()->paginate(10)->onEachSide(1);

        return Inertia::render('Batches/Index', [
            'batch' => $batch,
            'deletedBatches' => $deletedBatches,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $documents = File::query()->where('user_id', auth()->id())->where('folder', 'documents')->paginate(10)->onEachSide(1);
        return Inertia::render('Batches/Create', [
            'documents' => FileResource::collection($documents),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'purchase_order_no' => 'required',
            'status' => 'required',
            'description' => '',
        ]);


        Batch::create($validated);
        return redirect()->route('batches.index')->with('success', 'Batch Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Batch $batch)
    {
        // $pdf = Pdf::loadView('pdf.invoice', $data);
        // return $pdf->download('invoice.pdf');

        return Inertia::render('Batches/Show', [
            'batch' => $batch,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Batch $batch)
    {
        $documents = File::query()->where('user_id', auth()->id())->where('folder', 'documents')->paginate(10)->onEachSide(1);
        return Inertia::render('Batches/Edit', [
            'batch' => $batch,
            'documents' => FileResource::collection($documents),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Batch $batch)
    {
        $validated = $request->validate([
            'name' => 'required',
            'purchase_order_no' => 'required',
            'status' => 'required',
            'description' => '',
        ]);

        $batch->update($validated);
        return redirect()->route('batches.index')->with('success', 'Batch updated successfully');
    }


    //  Remove the specified resource from storage.

    public function destroy(Batch $batch)
    {

        $batch->delete();
        return redirect()->route('batches.index')->with('success', 'Batch deleted successfully');
    }


    //Restore the specified resource from storage.
    public function restore($id)
    {
        $batch = Batch::withTrashed()->findOrFail($id);
        $batch->restore();
        return redirect()->route('batches.index')->with('success', 'Batch restored successfully');
    }

    //permanently delete the specified resource from storage.
    public function forceDelete($id)
    {
        $batch = Batch::withTrashed()->findOrFail($id);
        $batch->forceDelete();
        return redirect()->route('batches.index')->with('success', 'Batch permanently deleted successfully');
    }
}
