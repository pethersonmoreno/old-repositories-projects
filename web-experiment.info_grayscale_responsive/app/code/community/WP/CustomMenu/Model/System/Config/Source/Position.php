<?php

class WP_CustomMenu_Model_System_Config_Source_Position
{
    const POSITION_TOP      = 'top';
    const POSITION_LEFT     = 'left';
    const POSITION_RIGHT    = 'right';

    public function toOptionArray()
    {
        return array(
            array(
                'value' => self::POSITION_TOP,
                'label' => Mage::helper('custommenu')->__('Top')
            ),
            array(
                'value' => self::POSITION_LEFT,
                'label' => Mage::helper('custommenu')->__('Left')
            ),
            array(
                'value' => self::POSITION_RIGHT,
                'label' => Mage::helper('custommenu')->__('Right')
            ),
        );
    }
}
