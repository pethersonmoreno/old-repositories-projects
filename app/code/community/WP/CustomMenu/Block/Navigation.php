<?php

class WP_CustomMenu_Block_Navigation extends Mage_Catalog_Block_Navigation
{
    const CUSTOM_BLOCK_TEMPLATE = "wp_custom_menu_%d";

    private $_productsCount     = null;
    private $_topMenu           = array();
    private $_popupMenu         = array();

    public function drawCustomMenuSidebarItem($category, $level = 0, $deep = 0)
    {
        if (!$category->getIsActive()) return '';
        $html = array();
        $catUrl = $this->getCategoryUrl($category);
        $id = $category->getId();
        $name = $this->_getFormatedCategoryName($category->getName());
        // --- class for active category ---
        $keyCurrent = $this->getCurrentCategory()->getId();
        $active = '';
        if ($this->isCategoryActive($category)) {
            $active = ' actParent';
            if ($id == $keyCurrent) $active = ' act';
        }
        // ---
        list($itemHtml, $drawPopup) = $this->drawSidebarMenuItemBlock($category, $level, $deep);
        $showPopup = ''; $hasPopup = '';
        $linkHref = 'href="'.$this->getCategoryUrl($category).'"';
        if ($drawPopup) {
            $showPopup = ' onmouseover="wpShowMenuPopup(this, event, \'popup' . $id . '\');" onmouseout="wpHideMenuPopup(this, event, \'popup' . $id . '\', \'menu' . $id . '\')"';
            $linkHref = 'href="javascript:void(0);" rel="'.$this->getCategoryUrl($category).'"';
            $hasPopup = ' popup';
        }
        $html[] = '<div id="menu' . $id . '" class="menu-sidebar itemMenu level' . $level . $hasPopup . '"' . $showPopup . '>';
        $html[] = '<div class="parentMenu">';
        $html[] = '<a class="itemMenuName level' . $level . $active . '" ' . $linkHref . '><span>' . $name . '</span></a>';
        $html[] = '</div>';
        $html[] = $itemHtml;
        $html[] = '</div>';
        $html = implode("\n", $html);
        return $html;
    }

    public function drawSidebarMenuItem($children, $level = 1, $deep)
    {
        $keyCurrent = $this->getCurrentCategory()->getId();
        $html = '';
        foreach ($children as $category) {
            if (is_object($category) && $category->getIsActive()) {
                $catUrl = $this->getCategoryUrl($category);
                $id = $category->getId();
                $name = $this->_getFormatedCategoryName($category->getName());
                // --- class for active category ---
                $active = '';
                if ($this->isCategoryActive($category)) {
                    $active = ' actParent';
                    if ($id == $keyCurrent) $active = ' act';
                }
                // ---
                list($itemHtml, $drawPopup) = $this->drawSidebarMenuItemBlock($category, $level, $deep);
                $showPopup = ''; $hasPopup = '';
                $linkHref = 'href="'.$this->getCategoryUrl($category).'"';
                if ($drawPopup) {
                    $showPopup = ' onmouseover="wpShowMenuPopup(this, event, \'popup' . $id . '\');" onmouseout="wpHideMenuPopup(this, event, \'popup' . $id . '\', \'menu' . $id . '\')"';
                    $linkHref = 'href="javascript:void(0);" rel="'.$this->getCategoryUrl($category).'"';
                    $hasPopup = ' popup';
                }
                $html.= '<div id="menu' . $id . '" class="itemMenu level' . $level . $hasPopup . '"' . $showPopup . '>';
                $html.= '<div class="parentMenu">';
                $html.= '<a class="itemMenuName level' . $level . $active . '" ' . $linkHref . '><span>' . $name . '</span></a>';
                $html.= '</div>';
                $html.= $itemHtml;
                $html.= '</div>';
            }
        }
        return $html;
    }

    public function drawSidebarMenuItemBlock($category, $level, $deep)
    {
        $html = '';
        $drawPopup = false;
        $id = $category->getId();
        $activeChildren = $this->_getActiveChildren($category, $level);
        $hasSubMenu = count($activeChildren);
        if ($hasSubMenu && $level < $deep) {
            $html.= '<div id="submenu-sidebar-' . $id . '" rel="level' . $level . '" class="wp-custom-menu-submenu sidebar level' . $level . '">';
            $html.= $this->drawSidebarMenuItem($activeChildren, $level + 1, $deep);
            $html.= '<div class="clearBoth"></div>';
            $html.= '</div>';
        } else {
            list($blockId, $blockHtml) = $this->_getPopupStaticBlockHtmlByCategoryId($id);
            $drawPopup = ($blockHtml || $hasSubMenu);
            if ($drawPopup) {
                $this->_generatePopupHtml($id, $activeChildren, $blockId, $blockHtml);
            }
        }
        return array($html, $drawPopup);
    }

    public function drawCustomMenuMobileItem($category, $level = 0)
    {
        if (!$category->getIsActive()) return '';
        $html = array();
        $id = $category->getId();
        // --- Sub Categories ---
        $activeChildren = $this->_getActiveChildren($category, $level);
        // --- class for active category ---
        $active = ''; if ($this->isCategoryActive($category)) $active = ' act';
        $hasSubMenu = count($activeChildren);
        $catUrl = $this->getCategoryUrl($category);
        $html[] = '<div id="menu-mobile-' . $id . '" class="menu-mobile level0' . $active . '">';
        $html[] = '<div class="parentMenu">';
        // --- Top Menu Item ---
        $html[] = '<a href="' . $catUrl .'">';
        $name = $this->_getFormatedCategoryName($category->getName());
        $html[] = '<span>' . $name . '</span>';
        $html[] = '</a>';
        if ($hasSubMenu) {
            $html[] = '<span class="button" rel="submenu-mobile-' . $id . '" onclick="wpSubMenuToggle(this, \'menu-mobile-' . $id . '\', \'submenu-mobile-' . $id . '\');">&nbsp;</span>';
        }
        $html[] = '</div>';
        if ($hasSubMenu) {
            $html[] = '<div id="submenu-mobile-' . $id . '" rel="level' . $level . '" class="wp-custom-menu-submenu mobile" style="display: none;">';
            $html[] = $this->drawMobileMenuItem($activeChildren);
            $html[] = '<div class="clearBoth"></div>';
            $html[] = '</div>';
        }
        $html[] = '</div>';
        $html = implode("\n", $html);
        return $html;
    }

    public function drawMobileMenuItem($children, $level = 1)
    {
        $keyCurrent = $this->getCurrentCategory()->getId();
        $html = '';
        foreach ($children as $child) {
            if (is_object($child) && $child->getIsActive()) {
                // --- class for active category ---
                $active = '';
                $id = $child->getId();
                $activeChildren = $this->_getActiveChildren($child, $level);
                if ($this->isCategoryActive($child)) {
                    $active = ' actParent';
                    if ($id == $keyCurrent) $active = ' act';
                }
                $html.= '<div id="menu-mobile-' . $id . '" class="itemMenu level' . $level . $active . '">';
                $name = $this->_getFormatedCategoryName($child->getName());
                $html.= '<div class="parentMenu">';
                $html.= '<a class="itemMenuName level' . $level . '" href="' . $this->getCategoryUrl($child) . '"><span>' . $name . '</span></a>';
                if (count($activeChildren) > 0) {
                    $html.= '<span class="button" rel="submenu-mobile-' . $id . '" onclick="wpSubMenuToggle(this, \'menu-mobile-' . $id . '\', \'submenu-mobile-' . $id . '\');">&nbsp;</span>';
                }
                $html.= '</div>';
                if (count($activeChildren) > 0) {
                    $html.= '<div id="submenu-mobile-' . $id . '" rel="level' . $level . '" class="wp-custom-menu-submenu mobile level' . $level . '" style="display: none;">';
                    $html.= $this->drawMobileMenuItem($activeChildren, $level + 1);
                    $html.= '<div class="clearBoth"></div>';
                    $html.= '</div>';
                }
                $html.= '</div>';
            }
        }
        return $html;
    }

    public function getTopMenuArray()
    {
        return $this->_topMenu;
    }

    public function getPopupMenuArray()
    {
        return $this->_popupMenu;
    }

    public function drawCustomMenuItem($category, $level = 0)
    {
        if (!$category->getIsActive()) return;
        $htmlTop = array();
        $id = $category->getId();
        // --- Static Block ---
        list($blockId, $blockHtml) = $this->_getPopupStaticBlockHtmlByCategoryId($id);
        // --- Sub Categories ---
        $activeChildren = $this->_getActiveChildren($category, $level);
        // --- class for active category ---
        $active = '';
        $keyCurrent = $this->getCurrentCategory()->getId();
        if ($this->isCategoryActive($category)) {
            $active = ' actParent';
            if ($id == $keyCurrent) $active = ' act';
        }
        // --- Popup functions for show ---
        $drawPopup = ($blockHtml || count($activeChildren));
        if ($drawPopup) {
            $htmlTop[] = '<div id="menu' . $id . '" class="menu" onmouseover="wpShowMenuPopup(this, event, \'popup' . $id . '\');" onmouseout="wpHideMenuPopup(this, event, \'popup' . $id . '\', \'menu' . $id . '\')">';
        } else {
            $htmlTop[] = '<div id="menu' . $id . '" class="menu">';
        }
        // --- Top Menu Item ---
        $htmlTop[] = '<div class="parentMenu">';
        if ($level == 0 && $drawPopup) {
            $htmlTop[] = '<a class="level' . $level . $active . '" href="javascript:void(0);" rel="'.$this->getCategoryUrl($category).'">';
        } else {
            $htmlTop[] = '<a class="level' . $level . $active . '" href="'.$this->getCategoryUrl($category).'">';
        }
        $name = $this->_getFormatedCategoryName($category->getName());
        $htmlTop[] = '<span>' . $name . '</span>';
        $htmlTop[] = '</a>';
        $htmlTop[] = '</div>';
        $htmlTop[] = '</div>';
        $this->_topMenu[] = implode("\n", $htmlTop);
        // --- Add Popup block (hidden) ---
        if ($drawPopup) {
            $this->_generatePopupHtml($id, $activeChildren, $blockId, $blockHtml);
        }
    }

    private function _generatePopupHtml($categoryId, $activeChildren, $blockId, $blockHtml)
    {
        $htmlPopup = array();
        // --- Popup function for hide ---
        $htmlPopup[] = '<div id="popup' . $categoryId . '" class="wp-custom-menu-popup" onmouseout="wpHideMenuPopup(this, event, \'popup' . $categoryId . '\', \'menu' . $categoryId . '\')" onmouseover="wpPopupOver(this, event, \'popup' . $categoryId . '\', \'menu' . $categoryId . '\')">';
        // --- draw Sub Categories ---
        if (count($activeChildren)) {
            $columns = (int)Mage::getStoreConfig('custom_menu/columns/count');
            $htmlPopup[] = '<div class="block1">';
            $htmlPopup[] = $this->drawColumns($activeChildren, $columns);
            $htmlPopup[] = '<div class="clearBoth"></div>';
            $htmlPopup[] = '</div>';
        }
        // --- draw Custom User Block ---
        if ($blockHtml) {
            $htmlPopup[] = '<div id="' . $blockId . '" class="block2">';
            $htmlPopup[] = $blockHtml;
            $htmlPopup[] = '</div>';
        }
        $htmlPopup[] = '</div>';
        $this->_popupMenu[] = implode("\n", $htmlPopup);
    }

    private function _getPopupStaticBlockHtmlByCategoryId($categoryId)
    {
        $blockId = sprintf(self::CUSTOM_BLOCK_TEMPLATE, $categoryId); // --- static block key
        $collection = Mage::getModel('cms/block')->getCollection()
            ->addFieldToFilter('identifier', array(array('like' => $blockId . '_w%'), array('eq' => $blockId)))
            ->addFieldToFilter('is_active', 1);
        $blockId = $collection->getFirstItem()->getIdentifier();
        $blockHtml = Mage::app()->getLayout()->createBlock('cms/block')->setBlockId($blockId)->toHtml();
        return array($blockId, $blockHtml);
    }

    public function drawColumns($children, $columns = 1)
    {
        $html = '';
        // --- explode by columns ---
        if ($columns < 1) $columns = 1;
        $chunks = $this->_explodeByColumns($children, $columns);
        // --- draw columns ---
        $lastColumnNumber = count($chunks);
        $i = 1;
        foreach ($chunks as $key => $value) {
            if (!count($value)) continue;
            $class = '';
            if ($i == 1) $class.= ' first';
            if ($i == $lastColumnNumber) $class.= ' last';
            if ($i % 2) $class.= ' odd'; else $class.= ' even';
            $html.= '<div class="column' . $class . '">';
            $html.= $this->drawMenuItem($value, 1);
            $html.= '</div>';
            $i++;
        }
        return $html;
    }

    public function drawMenuItem($children, $level = 1)
    {
        $html = '<div class="itemMenu level' . $level . '">';
        $keyCurrent = $this->getCurrentCategory()->getId();
        foreach ($children as $child) {
            if (is_object($child) && $child->getIsActive()) {
                // --- class for active category ---
                $active = '';
                if ($this->isCategoryActive($child)) {
                    $active = ' actParent';
                    if ($child->getId() == $keyCurrent) $active = ' act';
                }
                $name = $this->_getFormatedCategoryName($child->getName());
                $html.= '<a class="itemMenuName level' . $level . $active . '" href="' . $this->getCategoryUrl($child) . '"><span>' . $name . '</span></a>';
                $activeChildren = $this->_getActiveChildren($child, $level);
                if (count($activeChildren) > 0) {
                    $html.= '<div class="itemSubMenu level' . $level . '">';
                    $html.= $this->drawMenuItem($activeChildren, $level + 1);
                    $html.= '</div>';
                }
            }
        }
        $html.= '</div>';
        return $html;
    }

    protected function _getActiveChildren($parent, $level)
    {
        $activeChildren = array();
        // --- check level ---
        $maxLevel = (int)Mage::getStoreConfig('custom_menu/general/max_level');
        if ($maxLevel > 0) {
            if ($level >= ($maxLevel - 1)) return $activeChildren;
        }
        // --- / check level ---
        if (Mage::helper('catalog/category_flat')->isEnabled()) {
            $children = $parent->getChildrenNodes();
            $childrenCount = count($children);
        } else {
            $children = $parent->getChildren();
            $childrenCount = $children->count();
        }
        $hasChildren = $children && $childrenCount;
        if ($hasChildren) {
            foreach ($children as $child) {
                if ($this->_isCategoryDisplayed($child)) {
                    array_push($activeChildren, $child);
                }
            }
        }
        return $activeChildren;
    }

    private function _getFormatedCategoryName($name)
    {
        $name = $this->escapeHtml($name);
        if (Mage::getStoreConfig('custom_menu/general/non_breaking_space')) {
            $name = str_replace(' ', '&nbsp;', $name);
        }
        return $name;
    }

    private function _isCategoryDisplayed(&$child)
    {
        if (!$child->getIsActive()) return false;
        // === check products count ===
        // --- get collection info ---
        if (!Mage::getStoreConfig('custom_menu/general/display_empty_categories')) {
            $data = $this->_getProductsCountData();
            // --- check by id ---
            $id = $child->getId();
            #Mage::log($id); Mage::log($data);
            if (!isset($data[$id]) || !$data[$id]['product_count']) return false;
        }
        // === / check products count ===
        return true;
    }

    private function _getProductsCountData()
    {
        if (is_null($this->_productsCount)) {
            $collection = Mage::getModel('catalog/category')->getCollection();
            $storeId = Mage::app()->getStore()->getId();
            /* @var $collection Mage_Catalog_Model_Resource_Eav_Mysql4_Category_Collection */
            $collection->addAttributeToSelect('name')
                ->addAttributeToSelect('is_active')
                ->setProductStoreId($storeId)
                ->setLoadProductCount(true)
                ->setStoreId($storeId);
            $productsCount = array();
            foreach($collection as $cat) {
                $productsCount[$cat->getId()] = array(
                    'name' => $cat->getName(),
                    'product_count' => $cat->getProductCount(),
                );
            }
            #Mage::log($productsCount);
            $this->_productsCount = $productsCount;
        }
        return $this->_productsCount;
    }

    private function _explodeByColumns($target, $num)
    {
        if ((int)Mage::getStoreConfig('custom_menu/columns/divided_horizontally')) {
            $target = self::_explodeArrayByColumnsHorisontal($target, $num);
        } else {
            $target = self::_explodeArrayByColumnsVertical($target, $num);
        }
        #return $target;
        if ((int)Mage::getStoreConfig('custom_menu/columns/integrate') && count($target)) {
            // --- combine consistently numerically small column ---
            // --- 1. calc length of each column ---
            $max = 0; $columnsLength = array();
            foreach ($target as $key => $child) {
                $count = 0;
                $this->_countChild($child, 1, $count);
                if ($max < $count) $max = $count;
                $columnsLength[$key] = $count;
            }
            // --- 2. merge small columns with next ---
            $xColumns = array(); $column = array(); $cnt = 0;
            $xColumnsLength = array(); $k = 0;
            foreach ($columnsLength as $key => $count) {
                $cnt+= $count;
                if ($cnt > $max && count($column)) {
                    $xColumns[$k] = $column;
                    $xColumnsLength[$k] = $cnt - $count;
                    $k++; $column = array(); $cnt = $count;
                }
                $column = array_merge($column, $target[$key]);
            }
            $xColumns[$k] = $column;
            $xColumnsLength[$k] = $cnt - $count;
            // --- 3. integrate columns of one element ---
            $target = $xColumns; $xColumns = array(); $nextKey = -1;
            if ($max > 1 && count($target) > 1) {
                foreach($target as $key => $column) {
                    if ($key == $nextKey) continue;
                    if ($xColumnsLength[$key] == 1) {
                        // --- merge with next column ---
                        $nextKey = $key + 1;
                        if (isset($target[$nextKey]) && count($target[$nextKey])) {
                            $xColumns[] = array_merge($column, $target[$nextKey]);
                            continue;
                        }
                    }
                    $xColumns[] = $column;
                }
                $target = $xColumns;
            }
        }
        $_rtl = Mage::getStoreConfigFlag('custom_menu/general/rtl');
        if ($_rtl) {
            $target = array_reverse($target);
        }
        return $target;
    }

    private function _countChild($children, $level, &$count)
    {
        foreach ($children as $child) {
            if ($child->getIsActive()) {
                $count++; $activeChildren = $this->_getActiveChildren($child, $level);
                if (count($activeChildren) > 0) $this->_countChild($activeChildren, $level + 1, $count);
            }
        }
    }

    private static function _explodeArrayByColumnsHorisontal($list, $num)
    {
        if ($num <= 0) return array($list);
        $partition = array();
        $partition = array_pad($partition, $num, array());
        $i = 0;
        foreach ($list as $key => $value) {
            $partition[$i][$key] = $value;
            if (++$i == $num) $i = 0;
        }
        return $partition;
    }

    private static function _explodeArrayByColumnsVertical($list, $num)
    {
        if ($num <= 0) return array($list);
        $listlen = count($list);
        $partlen = floor($listlen / $num);
        $partrem = $listlen % $num;
        $partition = array();
        $mark = 0;
        for ($column = 0; $column < $num; $column++) {
            $incr = ($column < $partrem) ? $partlen + 1 : $partlen;
            $partition[$column] = array_slice($list, $mark, $incr);
            $mark += $incr;
        }
        return $partition;
    }
}
