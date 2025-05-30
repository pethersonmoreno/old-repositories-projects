<?php

class WP_CustomMenu_Model_System_Config_Source_Popuptype
{
    const TYPE_FIXED    = 'fixed';
    const TYPE_RELATIVE = 'relative';

    public function toOptionArray()
    {
        return array(
            array(
                'value' => self::TYPE_FIXED,
                'label' => Mage::helper('custommenu')->__('Fixed')
            ),
            array(
                'value' => self::TYPE_RELATIVE,
                'label' => Mage::helper('custommenu')->__('Relative')
            ),
        );
    }
}
