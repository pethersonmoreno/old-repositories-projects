<?php

class WP_SmartCatalog_Block_Toggle extends Mage_Core_Block_Template
{
    public function _prepareLayout()
    {
        if (!Mage::getStoreConfigFlag('smart_catalog/general/enabled')) return;
        $layout = $this->getLayout();
        // --- css ---
        $head = $layout->getBlock('head');
        $head->addItem('skin_css', 'css/webandpeople/smartcatalog/smartcatalog.css');
        // --- js ---
        if (Mage::getStoreConfigFlag('smart_catalog/include_jquery_files/include_jquery')) {
            $head->addItem('js', 'webandpeople/jquery/smartcatalog/jquery.min.js');
            $head->addItem('js', 'webandpeople/jquery/smartcatalog/jquery-noconflict.js');
        }
        $head->addItem('js', 'webandpeople/jquery_plugins/smartcatalog/jquery-noconflict.js', 'name="wp_jquery_noconflict"');
        if (Mage::getStoreConfigFlag('smart_catalog/include_jquery_files/include_debouncedresize')) {
            $head->addItem('js', 'webandpeople/jquery_plugins/smartcatalog/jquery.debouncedresize.js', 'name="wp_jquery_plugins"');
        }
        $head->addItem('js', 'webandpeople/jquery_plugins/smartcatalog/jquery.actual.js', 'name="wp_jquery_plugins"');
        $head->addItem('skin_js', 'js/webandpeople/smartcatalog/jquery.smartCatalog.js', 'name="wp_custom_js"');
    }
}
