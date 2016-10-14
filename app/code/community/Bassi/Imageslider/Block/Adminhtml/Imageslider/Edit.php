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
class Bassi_Imageslider_Block_Adminhtml_Imageslider_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                 
        $this->_objectId = 'id';
        $this->_blockGroup = 'imageslider';
        $this->_controller = 'adminhtml_imageslider';
        
        $this->_updateButton('save', 'label', Mage::helper('imageslider')->__('Save Banner'));
        $this->_updateButton('delete', 'label', Mage::helper('imageslider')->__('Delete Banner'));
		
        $this->_addButton('saveandcontinue', array(
            'label'     => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick'   => 'saveAndContinueEdit()',
            'class'     => 'save',
        ), -100);

        $this->_formScripts[] = "
            function toggleEditor() {
                if (tinyMCE.getInstanceById('imageslider_content') == null) {
                    tinyMCE.execCommand('mceAddControl', false, 'imageslider_content');
                } else {
                    tinyMCE.execCommand('mceRemoveControl', false, 'imageslider_content');
                }
            }

            function saveAndContinueEdit(){
                editForm.submit($('edit_form').action+'back/edit/');
            }
        ";
    }

    public function getHeaderText()
    {
        if( Mage::registry('imageslider_data') && Mage::registry('imageslider_data')->getId() ) {
            return Mage::helper('imageslider')->__("Edit banner '%s'", $this->htmlEscape(Mage::registry('imageslider_data')->getTitle()));
        } else {
            return Mage::helper('imageslider')->__('Add Banner');
        }
    }
}