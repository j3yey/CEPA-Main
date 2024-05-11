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
     public function add_event($data) {
        $sql = "INSERT INTO events(event_name, event_date, event_location, organizer, description) VALUES (?,?,?,?,?)";
    
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([
    
                $data->event_name,
                $data->event_date,
                $data->event_location,
                $data->organizer,
                $data->description

            ]);
            return $this->sendPayload(null, "success", "Successfully created a new event.", 200);
        } catch (\PDOException $e) {
            $errmsg = $e->getMessage();
        }
        return $this->sendPayload(null, "failed", $errmsg, 400);
    }
    

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
    public function edit_participant($data) {
        $sql = "UPDATE participants SET first_name=?, last_name=?, email=?, phone_number=?, address=? WHERE participant_id=?";
        
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([
                $data->participant_id, // Assuming participant_id is included in $data
                $data->first_name,
                $data->last_name,
                $data->email,
                $data->phone_number,
                $data->address
            ]);
            return $this->sendPayload(null, "success", "Successfully updated participant information.", 200);
        } catch (\PDOException $e) {
            $errmsg = $e->getMessage();
            return $this->sendPayload(null, "failed", $errmsg, 400);
        }
    }
     
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
                $mail->isHTML(true); // Set email as HTML
            } else {
                return ['success' => false, 'message' => 'Email message is not provided'];
            }
    
            // Send email
            $mail->send();
            return ['success' => true, 'message' => 'Email sent successfully'];
        } catch (Exception $e) {
            return ['success' => false, 'message' => 'Failed to send email: ' . $mail->ErrorInfo];
        }
    }
    
    public function submit_attendance($data) {
        // Check if participant exists, if not, insert them
        $participantId = $this->insertParticipant($data);
    
        // Construct the SQL query to insert attendance data
        $sql = "INSERT INTO attendance (event_id, participant_id, attendance_date, l_name, f_name, address, email, p_number) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([
                $data->event_id,
                $participantId,
                $data->attendance_date, // Add attendance date to the execution array
                $data->l_name,
                $data->f_name,
                $data->address,
                $data->email,
                $data->p_number
            ]);
            
            // Return a success message in JSON format
            return json_encode([
                "status" => "success",
                "message" => "Successfully submitted attendance."
            ]);
        } catch(\PDOException $e) {
            // Return an error message in JSON format
            return json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
    
    private function insertParticipant($data) {
        // Check if the participant already exists by name and email
        $existingParticipant = $this->getParticipantByNameAndEmail($data->f_name, $data->l_name, $data->email);
    
        if ($existingParticipant) {
            // Participant already exists, return their ID
            return $existingParticipant['participant_id'];
        } else {
            // Participant doesn't exist, insert them and return their ID
            $sql = "INSERT INTO participants (first_name, last_name, email, phone_number, address) 
                    VALUES (?, ?, ?, ?, ?)";
            
            try {
                $statement = $this->pdo->prepare($sql);
                $statement->execute([
                    $data->f_name,
                    $data->l_name,
                    $data->email,
                    $data->p_number,
                    $data->address
                ]);
        
                // Return the auto-generated participant ID
                return $this->pdo->lastInsertId();
            } catch(\PDOException $e) {
                // Handle participant insertion error
                // For simplicity, you can return null here or handle the error as needed
                return null;
            }
        }
    }
    
    private function getParticipantByNameAndEmail($firstName, $lastName, $email) {
        // Check if the participant already exists by name and email
        $sql = "SELECT participant_id FROM participants WHERE first_name = ? AND last_name = ? AND email = ?";
        
        try {
            $statement = $this->pdo->prepare($sql);
            $statement->execute([$firstName, $lastName, $email]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch(\PDOException $e) {
            // Handle error
            return null;
        }
    }
}

