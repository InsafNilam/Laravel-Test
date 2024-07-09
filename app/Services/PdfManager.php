<?php

namespace App\Services;

use App\Models\User;
use Dompdf\Dompdf;
use Dompdf\Options;

class PdfManager
{
    public function generatePDF($data, $template)
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
        $dompdf->stream('generated-document.pdf');
        return response()->json(["success"=> true,'message' => 'PDF generated successfully'], 200);


    }
}
