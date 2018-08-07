<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/AppController.php");

Class Users extends AppController {
    
	function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        
    }

    function login_post()
    {
        $output = array();

        try
        {
            $form = $this->post();
            $email     = $form['email'];
            $password   = $form['password'];

            if(!isset($email, $password)){
                throw new Exception("INVALID_INPUT");                
            }
            
            $user = $this->users_model->get_where(array('email' => $email))->row_array();

            if(!count($user)) {
                throw new Exception("User does not exists.");
            }
            
            if($user['password'] !== md5($password)) {
                throw new Exception("Password does not match.");
            }

            $output['status']       = 'success';
            $output['user_info']    =  $user;

        }
        catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }
        $this->response($output);
		}
		
		function contact_post()
    {
			$output = array();
			$form = $this->post();
			/*try
			{
					$form = $this->post();
					/*$email     = $form['email'];
					$password   = $form['password'];

					if(!isset($email, $password)){
							throw new Exception("INVALID_INPUT");                
					}
					
					$user = $this->users_model->get_where(array('email' => $email))->row_array();

					if(!count($user)) {
							throw new Exception("User does not exists.");
					}
					
					if($user['password'] !== md5($password)) {
							throw new Exception("Password does not match.");
					}

					$output['status']       = 'success';
					$output['user_info']    =  $user;

			}
			catch(Exception $e){
					$output['status']   = 'error';
					$output['message']  = $e->getMessage();
			}*/
			$output['form'] = $form;
			$this->response($output);
    }

    //update userinfo
    function profiles_post()
    {
    
        $output = array();

        try
        {
            $email         = $this->post('email');
            $firstname     = $this->post('first_name');
            $lastname      = $this->post('last_name');
            $id            = $this->post('id');

            if(!isset($firstname)){
                throw new Exception("INVALID Firstname");                
            }
            
            if(!isset($lastname)){
                throw new Exception("INVALID Lastname");                
            }

            if(!isset($email)){
                throw new Exception("INVALID Email ");                
            }

            $data = $this->users_model->get_where(array("email"=>$email,"id!=" => $id),'*');
            if( !$data->num_rows() )
            {
               
                $user_data = array();
                $user_data['first_name']  = $firstname;
                $user_data['last_name']   = $lastname;
                $user_data['email']       = $email;
                $user_data['updated_id']  =  $id;
                $user_data['updated_time']= date("Y-m-d H:i:s");

                $this->users_model->update(array("id" => $id),$user_data);
                $output['user_id']        = $id;
                $user = $this->users_model->get_where(array('id' => $id))->row_array();
                $output['user_info']    =  $user;
            }

            $output['status']    = 'success';
           
            $output['message']   = 'Profile updated Succesfully';
        }
        catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);       
    }  
	
	//create a new user
	function profiles_put(){
    	
        
    }

    //get userinfo 
    function profiles_get()
    {

        try
        {
            $output = $this->users_model->get_data()->row_array();
            $output['status']   = 'success';

        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);
    }

    //get Users
    function get_users_get()
    {
        try
        {
            $output = $this->users_model->get_users();
            $output['status']   = 'success';

        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);
    }

    function forgotpassword_get()
    {
        try
        {
            $this->load->library('Email_manager','email_manager');

            $email  = $this->get('email');

            if(!isset($email)){
                throw new Exception("INVALID_INPUT Email");                
            }

            $result = $this->users_model->get_where(array('email' => $email))->row_array();
            
            if(count($result) === 0){
                throw new Exception("Email doesn't exists!"); 
            }
            $link = base_url();
            $link = str_replace('/api', '', $link);

            $link .= "admin/#/auth/changepassword/".base64_encode($result['id']);

            $this->email_manager->send_forgot_password_mail($email,$link);
            $output['link']   = $link;
            $output['status']   = 'success';
        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);
    }

    function change_password_post()
    {

        try
        {
            $id        = $this->post('id');
            $password  = $this->post('password');
           
            if(!isset($id, $password)){
                throw new Exception("INVALID_INPUT");                
            }
            if(!isset($password)){
                throw new Exception("NVALID_INPUT Password.");                
            }
            
            $result = $this->users_model->get_where(array('id' => $id))->row_array();
            
            if(count($result) === 0){
                throw new Exception("User doesn't exists!"); 
            }

            $ins_data = array();
            $ins_data['password'] = md5($password);

            $result = $this->users_model->update(array('id' => $id),$ins_data);

            $output['status']   = 'success';
        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);
    }

    //delete userinfo
    function profiles_delete()
    {
        try
        {
            $user_id = $this->delete('user_id');
            $user_id = (int)$user_id;
            if( !$user_id && $user_id !== NULL )
            {
                throw new Exception("Invalid User ID");
            }
            $data = $this->user_model->get_where(array("id"=>$user_id),'id',"users");
            if( !$data->num_rows() )
            {
                throw new Exception("User not found.");
            }
            $this->user_model->delete(array("id"=>$user_id),"users");   
            $output['status'] = "success";
            $output['message'] = "User deleted successfully.";
        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }       
    	$this->response($output);
    }

    //get vendor users 
    function list_post()
    {

        try
        { 
            $this->prepare_listing_params();
            $output = $this->users_model->list_users();
            $output['status']   = 'success';
        }
        catch(Exception $e)
        {
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);
    }
   
    /*
    function list_post(){

        $output = array();

        $totalElements = 45;
        $size = $this->post('size');
        $pageNumber = $this->post('pageNumber');
        $totalPages  = ceil($totalElements/$size);

        $start = $pageNumber * $size;
        $end = ($start+$size);

        if($end > $totalElements) $end = $totalElements;

        $data = array();
        for($i=$start;$i<$end;$i++){
            $temp = array("name" => "Ethel Price $i", "gender" => "female", "company" => "CCCC", "age" => 44);
            $data[] = $temp;
        }

        
        
        $output['page'] = array('totalElements' => $totalElements, 'totalPages' => $totalPages, 'pageNumber' => $pageNumber, 'size' => $size);
        $output['data'] = $data;

        $this->response($output); 
    }
    */


     public function shipping_settings_post()   
     {
         try
         {
            $shipping_cost  = $this->post('shipping_cost');
            $key            = $this->post('key');
            $user_id        = $this->post('user_id');

            if(!isset($shipping_cost)){
                throw new Exception("INVALID_INPUT Shipping Cost");                
            }
            $where  = array('key' => $key, 'user_id' => $user_id);
            $result = $this->users_model->get_where($where,"*","settings")->row_array();
            
            $ins_data = array();
            $ins_data['value'] = $shipping_cost;

            if(count($result) === 0){
                $ins_data['user_id'] = $user_id;
                $ins_data['key']     = $key;
                $new_shipping_settings= $this->users_model->insert($ins_data,"settings");
            }
            else
            {
                $new_shipping_settings= $this->users_model->update($where,$ins_data,"settings");
            }

            $output['status']   = 'success';
            $output['message']  = 'Shipping Cost Saved Successfully';
         }
         catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
         }

         $this->response($output);
     }

     public function shipping_settings_get()
     {
         try
         {

            $key            = $this->get('key');
            $user_id        = $this->get('user_id');

            if(!isset($user_id)){
                throw new Exception("INVALID_INPUT User ID");                
            }
            $where         = array('key' => $key, 'user_id' => $user_id);
            $shipping_info = $this->users_model->get_where($where,"*","settings")->row_array();
            
            $output['status']   = 'success';
            $output['info']     = $shipping_info;
         }
         catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
         }

         $this->response($output);
     }

     public function get_paymentinfo_get($id='')
     {
         try
         {
            // $id = $this->db->get('vendorID');
            $info = $this->db->query("select * from payment_information where vendor_id='".$id."'")->result_array();
            $output['paypal']   = $info[0];
            $output['amazon']   = $info[1];
            $output['status']   = 'success';
         }
         catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
         }

         $this->response($output);
     }

    function create_paypal_post()
    {
    
        $output = array();
        
        try
        {
            $p_email         = $this->post('email');
            $username         = $this->post('username');
            $password         = $this->post('password');
            $signature         = $this->post('signature');
            $payment_mode     = $this->post('mode');
            $payment_type      = $this->post('type');
            $vendor_id            = $this->post('vendorID');

            if(!isset($p_email)){
                throw new Exception("INVALID Email");                
            }
            if(!isset($username)){
                throw new Exception("INVALID Username");                
            }
            if(!isset($password)){
                throw new Exception("INVALID Password");                
            }
            if(!isset($signature)){
                throw new Exception("INVALID Signature");                
            }
            
            if(!isset($payment_mode)){
                throw new Exception("INVALID Payment Mode");                
            }

            if(!isset($payment_type)){
                throw new Exception("INVALID Payment Type");                
            }

               
	        $update = array();
            $update['p_email']  = $p_email;
            $update['username']   = $username;
            $update['password']   = $password;
            $update['signature']   = $signature;
	        $update['payment_mode']   = $payment_mode;
	        $update['payment_type']   = $payment_type;
	        $update['updated_id']  =  $vendor_id;
            $update['updated_time']= date("Y-m-d H:i:s");
            $chk = $this->users_model->get_where(array("vendor_id"=>$vendor_id),"*","payment_information")->row_array();
            if($chk)
                $this->users_model->update(array("vendor_id" => $vendor_id,"payment_type"=>"Paypal"),$update,'payment_information');
            else
            {
                $update['payment_type'] = "Paypal";
                $this->users_model->insert($update,'payment_information');
            }
	        
            $output['status']    = 'success';
           
            $output['message']   = 'Payment Info updated Succesfully';
        }
        catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);       
    } 

    function create_amazon_post()
    {
    
        $output = array();
        
        try
        {
            $p_email         = $this->post('email');
            $username         = $this->post('username');
            $password         = $this->post('password');
            $signature         = $this->post('signature');
            $payment_mode     = $this->post('mode');
            $payment_type      = $this->post('type');
            $vendor_id            = $this->post('vendorID');

            if(!isset($p_email)){
                throw new Exception("INVALID Email");                
            }
            if(!isset($username)){
                throw new Exception("INVALID Username");                
            }
            if(!isset($password)){
                throw new Exception("INVALID Password");                
            }
            if(!isset($signature)){
                throw new Exception("INVALID Signature");                
            }
            
            if(!isset($payment_mode)){
                throw new Exception("INVALID Payment Mode");                
            }

            if(!isset($payment_type)){
                throw new Exception("INVALID Payment Type");                
            }

               
	        $update = array();
            $update['p_email']  = $p_email;
            $update['username']   = $username;
            $update['password']   = $password;
            $update['signature']   = $signature;
	        $update['payment_mode']   = $payment_mode;
	        $update['payment_type']   = $payment_type;
	        $update['updated_id']  =  $vendor_id;
            $update['updated_time']= date("Y-m-d H:i:s");
            $chk = $this->users_model->get_where(array("vendor_id"=>$vendor_id),"*","payment_information")->row_array();
            if($chk)
                $this->users_model->update(array("vendor_id" => $vendor_id,"payment_type"=>"Amazon"),$update,'payment_information');
            else
            {
                $update['payment_type'] = "Amazon";
                $this->users_model->insert($update,'payment_information');
            }
	        
            $output['status']    = 'success';
           
            $output['message']   = 'Payment Info updated Succesfully';
        }
        catch(Exception $e){
            $output['status']   = 'error';
            $output['message']  = $e->getMessage();
        }

        $this->response($output);       
    } 

        public function saveContact_post()
        {
            $this->load->library('email');
           try
           {
               $output['status'] = "success";
               $form = $this->post('params');
               $name = $form['name'];
               $from = $form['email'];
               $to = "info@myfarmbox.in";
               $subject = $form['subject'];
               $message = $form['message'];
            //    $ins = $this->users_model->insert($ins,'');
            $this->email->from($from, $name);
            $this->email->to($to);
            $this->email->subject($subject);
            $this->email->message($message);
            if( /*$this->email->send()*/ 1==1)
            {
                $output['status'] = "success";
                $output['msg'] = "Mail sent succesfully. Our admin team will reach you shortly.";
            }
            else{
                throw  new Exception("Mail not send.");
            }
        }
           catch(Exception $e)
           {
               $output['status'] = "error";
               $output['msg'] = $e->getMessage();
           }
           $this->response($output);
        }

        public function checkPincode_post(){
            try
            {
                $output['status'] = 'success';
                $form = $this->post('params');
                $where['pincode'] = $form['pincode'];
                $chk = $this->users_model->get_where($where,"*","wp_check_pincode_p")->row_array();
                if( $chk ){
                    $output['message'] = "Pincode is available to deliver!";
                }
                else
                    throw new Exception("This pincode is not available.");
            }
            catch(Exception $e)
            {
                $output['status'] = "error";
                $output['message'] = $e->getMessage();
            }
            $output['res'] = $this->post();
            $this->response($output);
        }
    
}
