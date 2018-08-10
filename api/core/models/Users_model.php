<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once(COREPATH.'libraries/models/App_model.php');

class Users_model extends App_model
{
  function __construct()
  {
    parent::__construct();
    $this->_table = 'sales_order';
  }
  function get_shipping_address()
  {
    $this->db->like('meta_key','_shipping_');
    $q = $this->db->get('wp_postmeta');
    return $q->result_array();
  }
  function get_monthly_report()
  { 
  	
    $query = "SELECT 
		 MONTHNAME(created_time) AS `month`,
		  count(*) AS orders,
		 SUM(total_amount) AS `total`
		FROM sales_order
		WHERE created_time BETWEEN created_time AND NOW()
		GROUP BY YEAR(created_time), MONTH(created_time)";
        return $this->db->query($query)->result_array();
  }

  function get_weekly_report()
  { 
  	
    $query = "SELECT  WEEK(created_time) week,
		 count(*) AS orders, 
		 SUM(total_amount) AS `total`,
		 CONCAT(DATE_FORMAT(DATE_ADD(created_time, INTERVAL(1-DAYOFWEEK(created_time)) DAY),'%Y-%m-%e'), ' TO ',    
		 DATE_FORMAT(DATE_ADD(created_time, INTERVAL(7-DAYOFWEEK(created_time)) DAY),'%Y-%m-%e')) AS DateRange
		FROM `sales_order` 
		WHERE created_time BETWEEN created_time AND NOW()
		GROUP BY YEARWEEK(created_time)";
        return $this->db->query($query)->result_array();
  }

  function get_daily_report()
  { 
  	
    $query = "SELECT
        DATE(created_time) AS date,
        COUNT(*) AS orders,
        SUM(total_amount) AS `total`
	    FROM  sales_order 
	    WHERE created_time BETWEEN created_time AND NOW() 
	    GROUP BY date
	    ORDER BY date";
        return $this->db->query($query)->result_array();
  }

  function get_yearly_report()
  { 
  	
    $query = "SELECT
        DATE_FORMAT(created_time, '%Y') AS date,
        COUNT(*) AS orders,
        SUM(total_amount) AS `total`
	    FROM  sales_order 
	    WHERE created_time BETWEEN created_time AND NOW()
	    GROUP BY date
	    ORDER BY date";
        return $this->db->query($query)->result_array();
  }





  
}
?>