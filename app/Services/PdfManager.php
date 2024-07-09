<?php

namespace App\Services;

use Dompdf\Dompdf;
use Dompdf\Options;

class PdfManager
{
    public function generatePDF($template, $data = [
            'name' => 'John Doe',
            'course' => 'Advanced PHP Programming',
            'date' => 'July 9, 2024',
            'instructor_name' => 'Jane Smith',
            'institution_name' => 'Tech Academy'
    ], )
    {
        // Instantiate domPDF
        $dompdf = new Dompdf();
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $dompdf->setOptions($options);

        // Load HTML content
        $html = view('template', $data)->render();
        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (downloadable)
        $dompdf->stream('generated-document.pdf');
        return $dompdf->output();


    }
}
