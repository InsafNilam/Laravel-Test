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

    public function generatePDF()
    {
        return $this->pdfService->generatePDF();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
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
