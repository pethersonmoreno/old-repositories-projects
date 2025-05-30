<?php

class WP_CustomMenu_Block_System_Config_Source_Topmenu
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        $html = parent::_getElementHtml($element);
        $html.= <<<HTML
        <script type="text/javascript">
        //<![CDATA[
            checkPosition = function() {
                var x1Row = $('custom_menu_general_topmenu_static_block').up(1);
                var x2Row = $('custom_menu_general_sibebar_draw_max_level').up(1);
                if ($('custom_menu_general_position').getValue() == 'top') {
                    x1Row.hide();
                    x2Row.hide();
                } else {
                    x1Row.show();
                    x2Row.show();
                }
            }
            Event.observe(window, 'load', function() {
                Event.observe('custom_menu_general_position', 'change', checkPosition);
                checkPosition();
            })
        //]]>
        </script>
HTML;
        return $html;
    }
}
