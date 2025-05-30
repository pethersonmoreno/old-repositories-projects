<?php
/**
 *
 * Version			: 1.0.4
 * Edition 			: Community 
 * Compatible with 	: Magento 1.5.x to latest
 * Developed By 	: Magebassi
 * Email			: magebassi@gmail.com
 * Web URL 			: www.magebassi.com
 * Extension		: Magebassi Easy Banner slider
 * 
 */
?>
<?php

class Bassi_Imageslider_Model_Mysql4_Imageslider extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {            
        $this->_init('imageslider/imageslider', 'imageslider_id');
    }
}