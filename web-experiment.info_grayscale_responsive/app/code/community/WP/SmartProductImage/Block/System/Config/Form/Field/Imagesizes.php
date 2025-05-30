<?php

class WP_SmartProductImage_Block_System_Config_Form_Field_Imagesizes
    extends Mage_Adminhtml_Block_System_Config_Form_Field_Array_Abstract
{
    public function __construct()
    {
        $this->addColumn('image_width', array(
            'label' => Mage::helper('smartproductimage')->__('Image Width (px)'),
            'style' => 'width:100px',
        ));
        $this->_addAfter = false;
        $this->_addButtonLabel = Mage::helper('smartproductimage')->__('Add Image Width');
        parent::__construct();
    }
}
