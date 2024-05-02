<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// POST <ethod
require_once "global.php"; 
require_once 'C:/xampp/htdocs/CEPA-Main/CEPA-Main/vendor/autoload.php';

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
     * Add a new employee with the provided data.
     *
     * @param array|object $data
     *   The data representing the new employee.
     *
     * @return array|object
     *   The added employee data.
     */

    public function add_employees($data){
        $sql = "INSERT INTO employees(EMPLOYEE_ID,FIRST_NAME,
        LAST_NAME,EMAIL,PHONE_NUMBER,HIRE_DATE,JOB_ID,SALARY,DEPARTMENT_ID) 
        VALUES (?,?,?,?,?,?,?,?,?)";
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute(
                [
                    $data->EMPLOYEE_ID,
                    $data->FIRST_NAME,
                    $data->LAST_NAME,
                    $data->EMAIL,
                    $data->PHONE_NUMBER,
                    $data->HIRE_DATE,
                    $data->JOB_ID,
                    $data->SALARY,
                    $data->DEPARTMENT_ID
                  
                ]
            );
            return $this->sendPayload(null, "success", "Successfully created a new record.", 200);
    
        }
        catch(\PDOException $e){
            $errmsg = $e->getMessage();
            $code = 400;
        }
       
        return $this->sendPayload(null, "failed", $errmsg, $code);
    }

    public function edit_employee($data, $id){
        $sql = "UPDATE employees SET EMAIL=? WHERE EMPLOYEE_ID = ?";
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute(
                [
                  $data->EMAIL,
                  $id
                ]
            );
            return $this->sendPayload(null, "success", "Successfully updated record.", 200);
    
        }
        catch(\PDOException $e){
            $errmsg = $e->getMessage();
            $code = 400;
        }
       
        return $this->sendPayload(null, "failed", $errmsg, $code);
    }

    public function delete_employee($id){
        $sql = "DELETE FROM employees WHERE EMPLOYEE_ID = ?";
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute(
                [
                  $id
                ]
            );
            return $this->sendPayload(null, "success", "Successfully deleted record.", 200);
    
        }
        catch(\PDOException $e){
            $errmsg = $e->getMessage();
            $code = 400;
        }
       
        return $this->sendPayload(null, "failed", $errmsg, $code);
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
    public function add_jobs($data){
        $sql = "INSERT INTO jobs(EMPLOYEE_ID,FIRST_NAME,
        LAST_NAME,EMAIL,PHONE_NUMBER,HIRE_DATE,JOB_ID,SALARY,DEPARTMENT_ID) 
        VALUES (?,?,?,?,?,?,?,?,?)";
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute(
                [
                    $data->EMPLOYEE_ID,
                    $data->FIRST_NAME,
                    $data->LAST_NAME,
                    $data->EMAIL,
                    $data->PHONE_NUMBER,
                    $data->HIRE_DATE,
                    $data->JOB_ID,
                    $data->SALARY,
                    $data->DEPARTMENT_ID
                  
                ]
            );
            return $this->sendPayload(null, "success", "Successfully created a new record.", 200);
    
        }
        catch(\PDOException $e){
            $errmsg = $e->getMessage();
            $code = 400;
        }
       
        return $this->sendPayload(null, "failed", $errmsg, 200);
    }
    public function sendEmail($data){
        // Check if $data is null
        if ($data === null) {
            return ['success' => false, 'message' => 'Data is null'];
        }
    
        // Debug autoload
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = SMTP::DEBUG_CONNECTION; // Enable debugging
    
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
    
}
