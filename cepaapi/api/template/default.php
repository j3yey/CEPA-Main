<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        /* Add your CSS styles here */
        .container {
            position: relative;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            background-color: rgba(255, 255, 255, 0.8); /* Add opacity to the container */
            overflow: hidden; /* Ensure the background container stays within the bounds */
            opacity: 1;
            color: #333;
        }

        .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background-image: url('https://drive.google.com/uc?id=1xcvRaQ2KQj5062V9SXsRKkrv3rAR6VFU');
            background-size: 20% auto;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 8px; /* Match the border radius of the container */
            height: 125px; /* Set a fixed height */
        }

        .qr-code {
            margin: 20px auto;
            width: 20px; /* Adjust the size of the QR code */
            display: flex;
            align-items: center; /* Center vertically */
            justify-content: center; /* Center horizontally */
        }

        h1 {
            color: #333;
        }

        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="background-container"></div>    
    <div class="container">             
        <h1>Hello!</h1>
        <p>I love you mga poge</p>
        <p><?php echo $data->message; ?></p>
        <!-- QR code will be generated here -->
        <div class="qr-code">
            <?php
            // Include the QR code library
            require_once 'C:\xampp\htdocs\CEPA-Main\vendor\autoload.php';

            // Generate the QR code using the builder
            $qrCode = Endroid\QrCode\Builder\Builder::create()
                ->writer(new Endroid\QrCode\Writer\PngWriter())
                ->data($qrCodeData)
                ->encoding(new Endroid\QrCode\Encoding\Encoding('UTF-8'))
                ->size(300)
                ->margin(10)
                ->validateResult(false)
                ->build();

            // Output the QR code
            echo '<img src="data:image/png;base64,' . base64_encode($qrCode->getString()) . '" alt="QR Code Image">';
            ?>
        </div>
        <p>Regards,<br>CEPA Team</p>
    </div>
</body>

