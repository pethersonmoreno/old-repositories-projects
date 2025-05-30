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
class Bassi_Imageslider_Block_Adminhtml_Imageslider extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_imageslider';
    $this->_blockGroup = 'imageslider';
    $this->_headerText = Mage::helper('imageslider')->__('Banner Manager');
    $this->_addButtonLabel = Mage::helper('imageslider')->__('Add banner image');
    parent::__construct();
  }
}