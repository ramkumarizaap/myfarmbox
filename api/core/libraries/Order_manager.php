<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order_manager
{
	private $_CI;
	private $_cc = array();
	private $_bcc = array();

	public function __construct($options = array())
	{
		$this->_CI = & get_instance();
		$this->_CI->error_message = '';	

		$this->_CI->load->model('purchase_model');	
		$this->_CI->load->model('vendor_products_model');	
	}

	function updateStockByPO($po_id = 0) {

		

		try {
			// Check if valid PO ID
			if (!(int)$po_id) {
				throw new Exception("Invalid PO ID.");				
			}

			// get PO Data
			$po_data = $this->_CI->purchase_model->get_order_data($po_id);

			

			if (!count($po_data)) {
				throw new Exception("Invalid PO ID.");	
			}

			// get PO Items
			$po_items = $this->_CI->purchase_model->get_order_items_with_vendor_stock($po_id);
			$get_price_config = $this->_CI->purchase_model->get_price_config('14');
			//print_r($po_items);die;
			// Start Transaction
            $this->_CI->db->trans_begin();

			foreach ($po_items as $po_item) {
				if ($po_item['vendor_stock'] !== '' && $po_item['vendor_stock'] !== 'NULL') {
					
					$where = array(
						'vendor_id' => $po_item['vendor_id'],
						'product_variant_id' => $po_item['product_variant_id']
					);

					$updated_stock = (int)$po_item['vendor_stock'] + $po_item['quantity'];
					$data = array('quantity' => $updated_stock);
					$this->_CI->vendor_products_model->update($where, $data);
				} else {
					
					$data = array(
						'vendor_id' => $po_item['vendor_id'],
						'product_variant_id' => $po_item['product_variant_id'],
						'quantity' => $po_item['quantity'],
						'price' => ($get_price_config * $po_item['unit_price']),
						'is_active' => '1'
					);
					$this->_CI->vendor_products_model->insert($data);
				}
			}

			if ($this->_CI->db->trans_status() === FALSE) {
                throw new Exception("DB_ERROR"); 
            }

            $this->_CI->db->trans_commit();

            return TRUE;

		} catch (Exception $e) {
			$this->_CI->error_message = $e->getMessage();
			return FALSE;
		}
	}

	
}
?>