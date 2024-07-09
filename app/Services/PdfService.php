<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Dompdf;
use Dompdf\Options;



class PdfService
{

    private $PdfManagerService;
    private static $instance;

    /**
     * Get the instance of the PdfService class.
     *
     * This method returns the instance of the PdfService class.
     * If the instance does not exist, it creates a new instance and returns it.
     *
     * @param PdfManager|null $pdfManager The Pdf manager service.
     * @return PdfService Returns the instance of the PdfService class.
     */
    public static function getInstance(PdfManager $pdfManager = null)
    {
        if (is_null(self::$instance)) {
            if (is_null($pdfManager)) {
                $pdfManager = new PdfManager();
            }
            self::$instance = new self($pdfManager);
        }
        return self::$instance;
    }

    /**
     * Create a new instance of the PdfService class.
     *
     * This method creates a new instance of the PdfService class.
     *
     * @param PdfManager $pdfManager The pdf manager service.
     * @return void
     */
    private function __construct(PdfManager $pdfManager)
    {
        $this->PdfManagerService = $pdfManager;
    }

    public function generatePDF($template, $data = [
        'name' => 'John Doe',
        'course' => 'Advanced PHP Programming',
        'date' => 'July 9, 2024',
        'instructor_name' => 'Jane Smith',
        'institution_name' => 'Tech Academy'

    ])
    {
        return $this->PdfManagerService->generatePDF($data, $template);
    }
}
