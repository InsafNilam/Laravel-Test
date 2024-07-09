<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Achievement</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            padding: 50px;
        }
        .certificate-container {
            border: 10px solid #ddd;
            padding: 50px;
            width: 700px;
            margin: 0 auto;
        }
        .certificate-header {
            font-size: 24px;
            font-weight: bold;
        }
        .certificate-title {
            font-size: 48px;
            margin: 20px 0;
        }
        .certificate-body {
            font-size: 18px;
            margin: 20px 0;
        }
        .certificate-footer {
            margin-top: 50px;
        }
        .signature {
            display: inline-block;
            width: 200px;
            text-align: center;
            border-top: 1px solid #000;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="certificate-header">
            Certificate of Achievement
        </div>
        <div class="certificate-title">
            This is to Certify That
        </div>
        <div class="certificate-body">
            <h1>{{ $name }}</h1>
            has successfully completed the course
            <br>
            <strong>{{ $course }}</strong>
            <br>
            on
            <br>
            <strong>{{ $date }}</strong>
        </div>
        <div class="certificate-footer">
            <div class="signature">
                {{ $instructor_name }}
                <br>
                Instructor
            </div>
            <div class="signature">
                {{ $institution_name }}
                <br>
                Institution
            </div>
        </div>
    </div>
</body>
</html>
