<?php

class WP_SmartCatalog_Helper_Data extends Mage_Core_Helper_Abstract
{
    public function getTemplateData(&$blockProductList)
    {
        // --- get Column Width ---
        $_columnWidth = $blockProductList->getColumnWidth() + 0;
        if (!$_columnWidth) $_columnWidth = Mage::getStoreConfig('smart_catalog/general/column_width') + 0;
        if (!$_columnWidth) $_columnWidth = 150;
        // --- get Image Width ---
        $_imgWidth = $blockProductList->getImageWidth();
        if (!$_imgWidth) $_imgWidth = Mage::getStoreConfig('smart_catalog/general/image_width');
        if ($_imgWidth == '-') {
            $_imgWidth = $_imgHeight = 0;
        } else {
            $_imgWidth += 0;
            // --- get Image Height ---
            $_imgHeight = $blockProductList->getImageHeight() + 0;
            if (!$_imgHeight) $_imgHeight = Mage::getStoreConfig('smart_catalog/general/image_height');
            if (!$_imgHeight) $_imgHeight = $_imgWidth;
        }

        $_productCollection = $blockProductList->getLoadedProductCollection();
        if (is_null($_productCollection)) $_productCollection = $blockProductList->getProductCollection();

        if (!is_null($_productCollection) && $_productsCount = $blockProductList->getProductsCount()) {
            $_productCollection = $_productCollection->clear()
                ->setPageSize($_productsCount)
                ->load()
            ;
            Mage::getModel('review/review')->appendSummary($_productCollection);
        }

        return array($_imgWidth, $_imgHeight, $_columnWidth, $_productCollection);
    }

    public function displayShortDescription()
    {
        return Mage::getStoreConfig('smart_catalog/general/display_short_desc');
    }
}
