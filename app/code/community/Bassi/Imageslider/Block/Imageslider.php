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
class Bassi_Imageslider_Block_Imageslider extends Mage_Core_Block_Template {

	public function getImageCollection() {
		$collection = Mage::getModel('imageslider/imageslider')->getCollection()->addFieldToFilter('status',1)->setOrder('sort_order', 'ASC');		
		$banners = array();
		foreach ($collection as $banner) {			
				$banners[] = $banner;
		}
		return $banners;
	}
	
} 