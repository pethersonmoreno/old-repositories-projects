<?php

class WP_CustomMenu_Model_Observer
{
    public function observeLayoutHandleInitialization(Varien_Event_Observer $observer)
    {
        if (!Mage::getStoreConfig('custom_menu/general/enabled')) return;
        $controllerAction = $observer->getEvent()->getAction();
        #$fullActionName = $controllerAction->getFullActionName();
        #Mage::log($fullActionName);
        $controllerAction->getLayout()->getUpdate()->addHandle('wp_custommenu_main');
        if (!Mage::getStoreConfig('custom_menu/general/ajax_load_content')) {
            $controllerAction->getLayout()->getUpdate()->addHandle('wp_custommenu_content');
        }
        $position = Mage::getStoreConfig('custom_menu/general/position');
        if ($position != WP_CustomMenu_Model_System_Config_Source_Position::POSITION_TOP) {
            $controllerAction->getLayout()->getUpdate()->addHandle('wp_custommenu_sidebar_' . $position);
            $handles = $controllerAction->getLayout()->getUpdate()->getHandles();
            if (is_array($handles) && count($handles)) {
                $handles = array_flip($handles);
                #Mage::log($handles);
                if (isset($handles['catalog_category_default'])) {
                    $controllerAction->getLayout()->getUpdate()->addHandle('wp_custommenu_sidebar_left_remove_category_nav');
                }
            }
        }
    }
}
