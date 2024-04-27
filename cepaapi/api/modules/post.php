<?php

// POST <ethod

require_once "global.php"; 

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

    public function attendance_submit($data){
        $sql = "INSERT INTO attendance(id, l_name, f_name , address, email, p_number) 
        VALUES (?,?,?,?,?,?)";
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute(
                [
                    $data->id,
                    $data->l_name,
                    $data->f_name,
                    $data->address,
                    $data->email,
                    $data->p_number,
                  
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
}
