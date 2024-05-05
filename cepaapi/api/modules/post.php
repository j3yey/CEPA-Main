<?php
// POST Method

require_once "global.php"; 
require_once 'C:/xampp/htdocs/CEPA-Main/vendor/autoload.php';

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Post extends GlobalMethods{
    private $pdo;

    public function __construct(\PDO $pdo){
        $this->pdo = $pdo;
    }
    
    /**
     * Add a new with the provided data.
     *
     * @param array|object $data
     *   The data representing the new.
     *
     * @return array|object
     *   The added data.
     */

     //Enter the public function below
    public function submit_feedback($data) {
        $sql = "INSERT INTO feedback(q1_answer, q2_answer, q3_answer, q4_answer, q5_answer, feedback) 
                VALUES (?, ?, ?, ?, ?, ?)";
        
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([
                $data->q1_answer,
                $data->q2_answer,
                $data->q3_answer,
                $data->q4_answer,
                $data->q5_answer,
                $data->feedback
            ]);
            
            // Return a JSON response indicating success
            return json_encode(["status" => "success", "message" => "Successfully created a new feedback record."]);
        } catch(\PDOException $e) {
            // Return a JSON response indicating failure with error message
            return json_encode(["status" => "failed", "message" => $e->getMessage()]);
        }
    }
   

    /**
     * Add a new job with the provided data.
     *
     * @param array|object $data
     *   The data representing the new job.
     *
     * @return array|object
     *   The added job data.
     */

     
     //Enter public fuction below
    public function sendEmail($data){
        // Check if $data is null
        if ($data === null) {
            return ['success' => false, 'message' => 'Data is null'];
        }
    
        // Debug autoload
        $mail = new PHPMailer(true);
    
        try {
            // Configure SMTP settings
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'cepa.appdev@gmail.com';                //SMTP username
            $mail->Password   = 'iiot dgrb rlxw mcas';                  //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
            // Set email content
            $mail->setFrom('cepa.appdev@gmail.com', 'CEPA');
    
            // Check if $data->to is set
            if (isset($data->to)) {
                $mail->addAddress($data->to);
            } else {
                return ['success' => false, 'message' => 'Recipient email is not provided'];
            }
    
            // Check if $data->subject is set
            if (isset($data->subject)) {
                $mail->Subject = $data->subject;
            } else {
                return ['success' => false, 'message' => 'Email subject is not provided'];
            }
    
            // Check if $data->message is set
            if (isset($data->message)) {
                $mail->Body = $data->message;
            } else {
                return ['success' => false, 'message' => 'Email message is not provided'];
            }
    
            $mail->isHTML(true);
    
            // Send email
            $mail->send();
    return ['success' => true, 'message' => 'Email sent successfully'];
} catch (Exception $e) {
    return ['success' => false, 'message' => 'Failed to send email: ' . $mail->ErrorInfo];
}
    }
    
    public function submit_attendance($data) {
        $sql = "INSERT INTO attendance (l_name, f_name, address, email, p_number) 
                VALUES (?, ?, ?, ?, ?)";
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([
                $data->l_name,
                $data->f_name,
                $data->address,
                $data->email,
                $data->p_number
            ]);
            return $this->sendPayload(null, "success", "Successfully submitted attendance.", 200);
        } catch(\PDOException $e) {
            $errmsg = $e->getMessage();
            $code = 400;
        }
        return $this->sendPayload(null, "failed", $errmsg, $code);
    }
}

