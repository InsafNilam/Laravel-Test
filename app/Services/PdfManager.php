<?php

namespace App\Services;

use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Dompdf;
use Dompdf\Options;
use Exception;
use Illuminate\Support\Facades\App;

class PdfManager
{
    public function generatePDF($template = null, $data = null)
    {
        // Ensure $data is an array
        if (!is_array($data)) {
            $data = [];
        }
        $users = User::all();

        // Default data
        $defaultData = [
            'name' => 'John Doe',
            'course' => 'Advanced PHP Programming',
            'date' => 'July 9, 2024',
            'instructor_name' => 'Jane Smith',
            'institution_name' => 'Tech Academy',
            'title' => 'Welcome to ItSolutionStuff.com',
            'users' => $users,
        ];

        // Merge provided data with default data
        $data = array_merge($defaultData, $data);


        // Instantiate domPDF
        $dompdf = new Dompdf();
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $dompdf->setOptions($options);

        // Load HTML content
        $html = view($template ?? 'template', $data)->render();
        $dompdf->loadHtml($html);


        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (downloadable)
        $dompdf->stream('generated-document.pdf', ['Attachment' => false]);
        return $dompdf->output();
    }

    public function downloadPDF($template = null, $data = null)
    {
        if ($template === null) {
            throw new Exception('Template is required');
        }
        if ($data === null) {
            $data = [];
        }

        $users = User::all();
        $defaultData = [
            'date' => 'July 9, 2024',
            'title' => 'Welcome to ItSolutionStuff.com',
            'users' => $users,
        ];

        $data = array_merge($defaultData, $data);

        try {
            // Load the view into dompdf
            $pdf = Pdf::loadView($template, $data)->setOptions([
                'defaultFont' => 'arial',
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true, // Enable remote assets if necessary
                'defaultPaperSize' => 'a4',
                'defaultPaperOrientation' => 'portrait',
            ]);

            // Return the generated PDF for download
            return $pdf->download("{$template}.pdf", );
        } catch (Exception $e) {
            // Handle any exceptions that occur during PDF generation
            return response()->json(['error' => 'Failed to generate PDF: ' . $e->getMessage()], 500);
        }
    }


}
