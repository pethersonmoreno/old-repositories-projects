<?php

class WP_CustomMenu_Helper_Data extends Mage_Core_Helper_Abstract
{
    private $_menuData = null;

    public function saveCurrentCategoryIdToSession()
    {
        $currentCategory = Mage::registry('current_category');
        $currentCategoryId = 0;
        if (is_object($currentCategory)) {
            $currentCategoryId = $currentCategory->getId();
        }
        Mage::getSingleton('catalog/session')
            ->setCustomMenuCurrentCategoryId($currentCategoryId);
    }

    public function initCurrentCategory()
    {
        $currentCategoryId = Mage::getSingleton('catalog/session')->getCustomMenuCurrentCategoryId();
        $currentCategory = null;
        if ($currentCategoryId) {
            $currentCategory = Mage::getModel('catalog/category')
                ->setStoreId(Mage::app()->getStore()->getId())
                ->load($currentCategoryId);
        }
        Mage::unregister('current_category');
        Mage::register('current_category', $currentCategory);
    }

    public function getMenuData()
    {
        if (!is_null($this->_menuData)) return $this->_menuData;
        $blockClassName = Mage::getConfig()->getBlockClassName('custommenu/navigation');
        $block = new $blockClassName();
        $categories = $block->getStoreCategories();
        if (is_object($categories)) $categories = $block->getStoreCategories()->getNodes();
        if (Mage::getStoreConfig('custom_menu/general/ajax_load_content')) {
            $_moblieMenuAjaxUrl = str_replace('http:', '', Mage::getUrl('custommenu/ajaxmobilemenucontent'));
            $_menuAjaxUrl = str_replace('http:', '', Mage::getUrl('custommenu/ajaxmenucontent'));
        } else {
            $_moblieMenuAjaxUrl = '';
            $_menuAjaxUrl = '';
        }
        $this->_menuData = array(
            '_block'                        => $block,
            '_categories'                   => $categories,
            '_moblieMenuAjaxUrl'            => $_moblieMenuAjaxUrl,
            '_menuAjaxUrl'                  => $_menuAjaxUrl,
            '_topmenuStaticBlockId'         => Mage::getStoreConfig('custom_menu/general/topmenu_static_block'),
            '_menuPosition'                 => Mage::getStoreConfig('custom_menu/general/position'),
            '_showHomeLink'                 => Mage::getStoreConfig('custom_menu/general/show_home_link'),
            '_rtl'                          => Mage::getStoreConfig('custom_menu/general/rtl') + 0,
            '_mobileMenuEnabled'            => Mage::getStoreConfig('custom_menu/general/mobile_menu') + 0,
            // ---
            '_popupDelayBeforeDisplaying'   => Mage::getStoreConfig('custom_menu/popup/delay_displaying') + 0,
            '_popupDelayBeforeHiding'       => Mage::getStoreConfig('custom_menu/popup/delay_hiding') + 0,
            // ---
            '_popupWidth'                   => Mage::getStoreConfig('custom_menu/popup/width') + 0,
            '_popupTopOffset'               => Mage::getStoreConfig('custom_menu/popup/top_offset') + 0,
            // ---
            '_sbPopupType'                  => Mage::getStoreConfig('custom_menu/popup/sb_popup_type'),
            '_sbPopupWidth'                 => Mage::getStoreConfig('custom_menu/popup/sb_width') + 0,
            '_sbPopupHeight'                => Mage::getStoreConfig('custom_menu/popup/sb_height') + 0,
            '_sbPopupBottomOffset'          => Mage::getStoreConfig('custom_menu/popup/sb_bottom_offset') + 0,
        );
        return $this->_menuData;
    }

    public function getMobileMenuContent()
    {
        $menuData = Mage::helper('custommenu')->getMenuData();
        extract($menuData);
        if (!$_mobileMenuEnabled) return '';
        // --- Home Link ---
        $homeLinkUrl        = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB);
        $homeLinkText       = $this->__('Home');
        $homeLink           = '';
        if ($_showHomeLink) {
            $homeLink = <<<HTML
<div id="menu-mobile-0" class="menu-mobile level0">
    <div class="parentMenu">
        <a href="$homeLinkUrl">
            <span>$homeLinkText</span>
        </a>
    </div>
</div>
HTML;
        }
        // --- Menu Content ---
        $mobileMenuContent = '';
        $mobileMenuContentArray = array();
        foreach ($_categories as $_category) {
            $mobileMenuContentArray[] = $_block->drawCustomMenuMobileItem($_category);
        }
        if (count($mobileMenuContentArray)) {
            $mobileMenuContent = implode("\n", $mobileMenuContentArray);
        }
        // --- Result ---
        $menu = <<<HTML
$homeLink
$mobileMenuContent
<div class="clearBoth"></div>
HTML;
        return $menu;
    }

    public function getMenuContent()
    {
        $menuData = Mage::helper('custommenu')->getMenuData();
        extract($menuData);
        // --- Menu Content ---
        if (Mage::getStoreConfig('custom_menu/general/position') != WP_CustomMenu_Model_System_Config_Source_Position::POSITION_TOP) {
            // ---------------
            // --- Sidebar ---
            // ---------------

            $topMenuSidebar = '';
            $topMenuSidebarArray = array();
            $deep = Mage::getStoreConfig('custom_menu/general/sibebar_draw_max_level');
            foreach ($_categories as $_category) {
                $topMenuSidebarArray[] = $_block->drawCustomMenuSidebarItem($_category, 0, $deep);
            }
            if (count($topMenuSidebarArray)) {
                $topMenuSidebar = implode("\n", $topMenuSidebarArray);
            }
            $topMenuSidebar = <<<HTML
$topMenuSidebar
<div class="clearBoth"></div>
HTML;
            $popupMenuSidebarArray = $_block->getPopupMenuArray();
            $popupMenuSidebar = '';
            if (count($popupMenuSidebarArray)) {
                $popupMenuSidebar = implode("\n", $popupMenuSidebarArray);
            }
            // --- Top Static Block ---
            $topMenu            = '';
            $popupMenuContent   = '';
            if ($_topmenuStaticBlockId) {
                $topMenu = Mage::app()->getLayout()->createBlock('cms/block')->setBlockId($_topmenuStaticBlockId)->toHtml();
            }
        } else {
            // -----------
            // --- Top ---
            // -----------

            // --- Home Link ---
            $homeLinkUrl        = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB);
            $homeLinkText       = $this->__('Home');
            $homeLink           = '';
            if ($_showHomeLink) {
                $homeLink = <<<HTML
<div class="menu">
    <div class="parentMenu menu0">
        <a href="$homeLinkUrl">
            <span>$homeLinkText</span>
        </a>
    </div>
</div>
HTML;
            }
            $menuContentArray = array();
		    $blockClassNameSpecialMenus = Mage::getConfig()->getBlockClassName('custommenu/specialmenus');
		    $blockSpecialMenus = new $blockClassNameSpecialMenus();
			$_arrMenuAddInicio = $blockSpecialMenus->getArrayMenuInicio();
            foreach ($_arrMenuAddInicio as $_specialMenuItem) {
                $_block->drawCustomSpecialMenuItem($_specialMenuItem);
            }
            foreach ($_categories as $_category) {
                $_block->drawCustomMenuItem($_category);
            }
			$_arrMenuAddFim = $blockSpecialMenus->getArrayMenuFim();
            foreach ($_arrMenuAddFim as $_specialMenuItem) {
                $_block->drawCustomSpecialMenuItem($_specialMenuItem);
            }
            $topMenuArray = $_block->getTopMenuArray();
            $topMenuContent = '';
            if (count($topMenuArray)) {
                $topMenuContent = implode("\n", $topMenuArray);
            }
            $popupMenuArray = $_block->getPopupMenuArray();
            $popupMenuContent = '';
            if (count($popupMenuArray)) {
                $popupMenuContent = implode("\n", $popupMenuArray);
            }
            $topMenuSidebar     = '';
            $popupMenuSidebar   = '';
            // --- Result ---
            $topMenu = <<<HTML
$homeLink
$topMenuContent
<div class="clearBoth"></div>
HTML;
        }
        return array(
            'topMenu'           => $topMenu,
            'popupMenu'         => $popupMenuContent,
            'topMenuSidebar'    => $topMenuSidebar,
            'popupMenuSidebar'  => $popupMenuSidebar);
    }
}
