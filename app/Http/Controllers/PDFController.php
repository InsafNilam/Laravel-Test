<?php

namespace App\Http\Controllers;

use App\Services\PdfService;
use Illuminate\Http\Request;

class PDFController extends Controller
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

    public function generatePDF(Request $request)
    {
        $validated = $request->validate([
            'data' => 'object|nullable',
            'template' => 'string|nullable'
        ]);

        $this->pdfService->generatePDF($validated['template'], $validated['data']);

        // return redirect()->back()->with('success', 'PDF generated successfully');
    }

    public function downloadPDF(Request $request)
    {
        $validated = $request->validate([
            'data' => 'nullable',
            'template' => 'nullable'
        ]);

        return $this->pdfService->downloadPDF($validated['template']);
    }
}
