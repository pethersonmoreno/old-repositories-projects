<?php

class WP_SmartCatalog_Model_Observer
{
    public function observeLayoutHandleInitialization(Varien_Event_Observer $observer)
    {
        if (!Mage::getStoreConfigFlag('smart_catalog/general/enabled')) return;
        $controllerAction = $observer->getEvent()->getAction();
        $fullActionName = $controllerAction->getFullActionName();
        #Mage::log($fullActionName);
        if ($fullActionName == 'catalog_category_view') {
            $controllerAction->getLayout()->getUpdate()->addHandle('wp_smartcatalog_product_list');
        }
        if ($fullActionName == 'catalogsearch_result_index' ||
            $fullActionName == 'catalogsearch_advanced_result' ||
            $fullActionName == 'tag_product_list') {
            $controllerAction->getLayout()->getUpdate()->addHandle('wp_smartcatalog_search_result_list');
        }
    }
}
