<?php

class WP_SmartProductImage_Block_Js extends Mage_Catalog_Block_Product_View_Abstract
{
    private $_imageSizes = null;

    public function _prepareLayout()
    {
        if (!Mage::getStoreConfig('smart_product_image/general/enabled')) return;
        $this->setTemplate('webandpeople/smartproductimage/js.phtml');
    }

    public function getViewportWidthArray()
    {
        $res = '[]';
        $imageSizes = $this->getImageSizes();
        if (isset($imageSizes['viewport_width_array'])
            && is_array($imageSizes['viewport_width_array'])
                && count($imageSizes['viewport_width_array']))
        {
            $res = '[' . implode(',', $imageSizes['viewport_width_array']) . ']';
        }
        return $res;
    }

    public function getImagesArray()
    {
        $imageSizes = $this->getImageSizes();
        if (isset($imageSizes['image_width_array'])
            && is_array($imageSizes['image_width_array'])
                && count($imageSizes['image_width_array']))
        {
            $_product   = $this->getProduct();
            $_helper    = $this->helper('catalog/image');

            $res = ''; $i = 0;

            $imageUrls = array();
            foreach ($imageSizes['image_width_array'] as $imageWidth)
            {
                $imageUrls[] = $_helper->init($_product, 'image')
                    ->constrainOnly(true)
                    ->keepAspectRatio(true)
                    ->keepFrame(false)
                    ->resize($imageWidth, null)
                    ->__toString();
            }
            $res.= 'wpImageHashMain[' . $i++ . '] = ["' . implode('","', $imageUrls) . '"];' . "\n";

            $_gallery = $_product->getMediaGalleryImages();
            foreach ($_gallery as $_image)
            {
                $imageUrls = array();
                foreach ($imageSizes['image_width_array'] as $imageWidth)
                {
                    $imageUrls[] = $_helper->init($_product, 'image', $_image->getFile())
                        ->constrainOnly(true)
                        ->keepAspectRatio(true)
                        ->keepFrame(false)
                        ->resize($imageWidth, null)
                        ->__toString();
                }
                $res.= '    wpImageHashMain[' . $i++ . '] = ["' . implode('","', $imageUrls) . '"];' . "\n";
            }
        }
        else $res = '[]';
        return $res;
    }

    public function getImageSizes()
    {
        if (is_null($this->_imageSizes))
        {
            try
            {
                $res = unserialize(Mage::getStoreConfig('smart_product_image/general/image_sizes'));
            }
            catch (Exception $e)
            {
                // ---
            }
            $imageSizes = array();
            if (is_array($res) && count($res))
            {
                foreach ($res as $item)
                {
                    $imageSizes['viewport_width_array'][] = $item['image_width'];
                    $imageSizes['image_width_array'][$item['image_width']] = $item['image_width'];
                }
                sort($imageSizes['viewport_width_array']);
                ksort($imageSizes['image_width_array']);
            }
            $this->_imageSizes = $imageSizes;
        }
        return $this->_imageSizes;
    }
}
