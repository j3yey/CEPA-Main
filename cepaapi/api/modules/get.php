<?php
// Retrieving records from database
require_once "global.php";

class Get extends GlobalMethods{
    private $pdo;

    public function __construct(\PDO $pdo){
        $this->pdo = $pdo;
    }

    public function executeQuery($sql){
        $data = array(); //place to store records retrieved for db
        $errmsg = ""; //initialized error message variable
        $code = 0; //initialize status code variable

        try{
            if($result = $this->pdo->query($sql)->fetchAll()){ //retrieved records from db, returns false if no records found
                foreach($result as $record){
                    array_push($data, $record);
                }
                $code = 200;
                $result = null;
                return array("code"=>$code, "data"=>$data);
            }
            else{
                //if no record found, assign corresponding values to error messages/status
                $errmsg = "No records found";
                $code = 404;
            }
        }
        catch(\PDOException $e){
            //PDO errors, mysql errors
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    //Enter the public function below
    public function get_records($table, $condition=null){
        $sqlString = "SELECT * FROM $table";
        if($condition != null){
            $sqlString .= " WHERE " . $condition;
        }
        
        $result = $this->executeQuery($sqlString);

        if($result['code']==200){
            return $this->sendPayload($result['data'], "success", "Successfully retrieved records.", $result['code']);
        }
        
        return $this->sendPayload(null, "failed", "Failed to retrieve records.", $result['code']);
    }

    public function get_events() {
        $response = $this->get_records('events', null);
        return $response;
    }

    public function get_info() {
        //$sqlString = "SELECT id, fname, lname, position FROM participants";
        $response = $this->get_records('participants', null);
        return $response;
    }
    
    public function get_attendees($eventId) {
        try {
            // Prepare SQL statement to fetch attendance data for the specified event ID
            $sql = "SELECT * FROM attendance WHERE event_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$eventId]);
            
            // Fetch all attendance records for the specified event ID
            $attendanceData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Return the fetched attendance data
            return $attendanceData;
        } catch(PDOException $e) {
            // Handle any potential errors
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];
        }
    }


    public function get_attendance_for_event($eventId) {
        try {
            // Prepare SQL statement to fetch attendance data for the specified event ID
            $sql = "SELECT * FROM attendance WHERE event_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$eventId]);
            
            // Fetch all attendance records for the specified event ID
            $attendanceData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Return the fetched attendance data
            return $attendanceData;
        } catch(PDOException $e) {
            // Handle any potential errors
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];
        }
    }
}
