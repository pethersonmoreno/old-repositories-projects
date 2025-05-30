/* -------------------- */
/* --- Default view --- */
/* -------------------- */

var wpMenuLoaded = false;

function wpInitPopupContent()
{
    var xMenu = null;
    if (wpMenuLoaded) return;
    xMenu = $('custommenu');
    if (wpPopupMenuContent && xMenu) xMenu.innerHTML = wpPopupMenuContent + xMenu.innerHTML;
    xMenu = $('wp-sidebar-nav-container-content');
    if (wpPopupMenuSidebarContent && xMenu) xMenu.innerHTML = wpPopupMenuSidebarContent + xMenu.innerHTML;
    wpMenuLoaded = true;
}

function wpShowMenuPopup(objMenu, event, popupId)
{
    wpInitPopupContent();
    if (typeof wpCustommenuTimerHide[popupId] != 'undefined') clearTimeout(wpCustommenuTimerHide[popupId]);
    objMenu = $(objMenu.id); var popup = $(popupId); if (!popup) return;
    if (!!wpActiveMenu) {
        wpHideMenuPopup(objMenu, event, wpActiveMenu.popupId, wpActiveMenu.menuId);
    }
    wpActiveMenu = {menuId: objMenu.id, popupId: popupId};
    if (!objMenu.hasClassName('active')) {
        wpCustommenuTimerShow[popupId] = setTimeout(function() {
            objMenu.addClassName('active');
            // --- Position ---
            if (wpMenuPosition == CUSTOMMENU_POSITION_TOP) {        // --- Top Position
                var popupWidth = CUSTOMMENU_POPUP_WIDTH;
                if (!popupWidth) popupWidth = popup.getWidth();
                var pos = wpPopupPos(objMenu, popupWidth);
                popup.style.top = pos.top + 'px';
                popup.style.left = pos.left + 'px';
                wpSetPopupZIndex(popup);
                if (CUSTOMMENU_POPUP_WIDTH) {
                    popup.style.width = CUSTOMMENU_POPUP_WIDTH + 'px';
                }
            } else {                                                // --- Sidebar Position
                var popupWidth = 0;
                if (CUSTOMMENU_POPUP_SB_WIDTH) {
                    popupWidth = CUSTOMMENU_POPUP_SB_WIDTH;
                    popup.style.width = popupWidth + 'px';
                } else if (!popup.style.width) {
                    // --- get auto width of Popup ---
                    var popupContent = document.createElement('div');
                    $(popupContent).setStyle({'float' : 'left', 'display': 'none'});
                    $(popupContent).addClassName($('wp-sidebar-nav-container-content').readAttribute('class'));
                    popupContent.innerHTML = popup.innerHTML;
                    var pageBody = document.getElementsByTagName('BODY')[0];
                    pageBody.appendChild(popupContent);
                    popupWidth = popupContent.getWidth();
                    pageBody.removeChild(popupContent);
                    // --- / get auto width of Popup ---
                    popup.style.width = popupWidth + 'px';
                } else {
                    popupWidth = popup.getWidth();
                }
                if (CUSTOMMENU_POPUP_SB_HEIGHT) popup.style.height = CUSTOMMENU_POPUP_SB_HEIGHT + 'px';
                var pos = wpPopupPosSidebar(objMenu, popup.getHeight());
                popup.style.top = pos.top + 'px';
                if (wpMenuPosition == CUSTOMMENU_POSITION_LEFT) {
                    popup.style.left = pos.left + 'px';
                } else if (wpMenuPosition == CUSTOMMENU_POSITION_RIGHT) {
                    popup.style.left = -popupWidth + 'px';
                }
            }
            // --- / Position ---
            // --- Static Block width ---
            var block2 = $(popupId).select('div.block2');
            if (typeof block2[0] != 'undefined') {
                var wStart = block2[0].id.indexOf('_w');
                if (wStart > -1) {
                    var w = block2[0].id.substr(wStart+2);
                } else {
                    var w = 0;
                    $(popupId).select('div.block1 div.column').each(function(item) {
                        w += $(item).getWidth();
                    });
                }
                if (w) block2[0].style.width = w + 'px';
            }
            // --- change href ---
            var wpMenuAnchor = $(objMenu.select('a')[0]);
            wpChangeTopMenuHref(wpMenuAnchor, true);
            // --- show popup ---
            if (typeof jQuery == 'undefined' ||
                (wpMenuPosition != CUSTOMMENU_POSITION_TOP)
            ) {
                popup.style.display = 'block';
            } else {
                jQuery('#' + popupId).stop(true, true).fadeIn();
            }
        }, CUSTOMMENU_POPUP_DELAY_BEFORE_DISPLAYING);
    }
}

function wpHideMenuPopup(element, event, popupId, menuId)
{
    if (typeof wpCustommenuTimerShow[popupId] != 'undefined') clearTimeout(wpCustommenuTimerShow[popupId]);
    var element = $(element); var objMenu = $(menuId) ;var popup = $(popupId); if (!popup) return;
    var wpCurrentMouseTarget = getCurrentMouseTarget(event);
    if (!!wpCurrentMouseTarget) {
        if (!wpIsChildOf(element, wpCurrentMouseTarget) && element != wpCurrentMouseTarget) {
            if (!wpIsChildOf(popup, wpCurrentMouseTarget) && popup != wpCurrentMouseTarget) {
                if (objMenu.hasClassName('active')) {
                    wpCustommenuTimerHide[popupId] = setTimeout(function() {
                        objMenu.removeClassName('active');
                        // --- change href ---
                        var wpMenuAnchor = $(objMenu.select('a')[0]);
                        wpChangeTopMenuHref(wpMenuAnchor, false);
                        // --- hide popup ---
                        if (typeof jQuery == 'undefined' ||
                            (wpMenuPosition != CUSTOMMENU_POSITION_TOP)
                        ) {
                            popup.style.display = 'none';
                        } else {
                            jQuery('#' + popupId).stop(true, true).fadeOut();
                        }
                    }, CUSTOMMENU_POPUP_DELAY_BEFORE_HIDING);
                }
            }
        }
    }
}

function wpPopupOver(element, event, popupId, menuId)
{
    if (typeof wpCustommenuTimerHide[popupId] != 'undefined') clearTimeout(wpCustommenuTimerHide[popupId]);
}

function wpPopupPos(objMenu, w)
{
    var pos = objMenu.cumulativeOffset();
    var wraper = $('custommenu');
    var posWraper = wraper.cumulativeOffset();
    var xTop = pos.top - posWraper.top
    if (CUSTOMMENU_POPUP_TOP_OFFSET) {
        xTop += CUSTOMMENU_POPUP_TOP_OFFSET;
    } else {
        xTop += objMenu.getHeight();
    }
    var res = {'top': xTop};
    if (CUSTOMMENU_RTL_MODE) {
        var xLeft = pos.left - posWraper.left - w + objMenu.getWidth();
        if (xLeft < 0) xLeft = 0;
        res.left = xLeft;
    } else {
        var wWraper = wraper.getWidth();
        var xLeft = pos.left - posWraper.left;
        if ((xLeft + w) > wWraper) xLeft = wWraper - w;
        if (xLeft < 0) xLeft = 0;
        res.left = xLeft;
    }
    return res;
}

function wpPopupPosSidebar(objMenu, h)
{
    var xTop = 0;
    var wraper = $('wp-sidebar-nav-container-content');
    var bottomOffset = (CUSTOMMENU_POPUP_SB_BOTTOM_OFFSET > 0) ? CUSTOMMENU_POPUP_SB_BOTTOM_OFFSET : 0;
    var posWraper = wraper.cumulativeOffset();
    // ---
    if (wpPopupMenuSbType == CUSTOMMENU_POPUP_SB_TYPE_RELATIVE) {
        var pos = objMenu.cumulativeOffset();
    } else {
        var pos = {top: posWraper.top};
    }
    var xTop1 = pos.top - posWraper.top;
    var winHeight = wpGetClientHeight();
    var scrollTop = wpGetScrollTop();
    var xTop2 = scrollTop + winHeight - (posWraper.top + h) - bottomOffset;
    if ((winHeight-bottomOffset) < h || xTop1 < xTop2) {
        xTop = xTop1; // --- beside with item of menu
    } else {
        xTop = xTop2; // --- pinned to the bottom of the window
    }
    var xLeft = wraper.getWidth();
    return {'top': xTop, 'left': xLeft};
}

function wpChangeTopMenuHref(wpMenuAnchor, state)
{
    if (state) {
        wpMenuAnchor.href = wpMenuAnchor.rel;
    } else if (wpIsMobile.any()) {
        wpMenuAnchor.href = 'javascript:void(0);';
    }
}

function wpIsChildOf(parent, child)
{
    if (child != null) {
        while (child.parentNode) {
            if ((child = child.parentNode) == parent) {
                return true;
            }
        }
    }
    return false;
}

function wpSetPopupZIndex(popup)
{
    $$('.wp-custom-menu-popup').each(function(item){
       item.style.zIndex = '9999';
    });
    popup.style.zIndex = '10000';
}

function getCurrentMouseTarget(xEvent)
{
    var wpCurrentMouseTarget = null;
    if (xEvent.toElement) {
        wpCurrentMouseTarget = xEvent.toElement;
    } else if (xEvent.relatedTarget) {
        wpCurrentMouseTarget = xEvent.relatedTarget;
    }
    return wpCurrentMouseTarget;
}

function wpGetScrollTop()
{
    scrollY = 0;
    if (typeof window.pageYOffset == 'number') {
        scrollY = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollY = document.documentElement.scrollTop;
    } else if (document.body && document.body.scrollTop) {
        scrollY = document.body.scrollTop;
    } else if (window.scrollY) {
        scrollY = window.scrollY;
    }
    return scrollY;
}

function wpFilterResults (n_win, n_docel, n_body)
{
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel))) n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function wpGetClientHeight()
{
    return wpFilterResults (
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}


/* ------------------- */
/* --- Mobile view --- */
/* ------------------- */


var wpMobileMenuLoaded = false;

function wpInitMobileMenuContent()
{
    if (wpMobileMenuLoaded) return;
    var xMenu = $('menu-content');
    if (typeof wpMobileMenuContent != 'undefined') xMenu.innerHTML = wpMobileMenuContent;
    wpMobileMenuLoaded = true;
}

function wpMenuButtonToggle()
{
    $('menu-content').toggle();
}

function wpGetMobileSubMenuLevel(id)
{
    var rel = $(id).readAttribute('rel');
    return parseInt(rel.replace('level', ''));
}

function wpSubMenuToggle(obj, activeMenuId, activeSubMenuId)
{
    var currLevel = wpGetMobileSubMenuLevel(activeSubMenuId);
    // --- hide submenus ---
    $$('.wp-custom-menu-submenu.mobile').each(function(item) {
        if (item.id == activeSubMenuId) return;
        var xLevel = wpGetMobileSubMenuLevel(item.id);
        if (xLevel >= currLevel) {
            $(item).hide();
        }
    });
    // --- reset button state ---
    $('custommenu-mobile').select('span.button').each(function(xItem) {
        var subMenuId = $(xItem).readAttribute('rel');
        if (!$(subMenuId).visible()) {
            $(xItem).removeClassName('open');
        }
    });
    // ---
    if ($(activeSubMenuId).getStyle('display') == 'none') {
        $(activeSubMenuId).show();
        $(obj).addClassName('open');
    } else {
        $(activeSubMenuId).hide();
        $(obj).removeClassName('open');
    }
}

function wpResetMobileMenuState()
{
    $('menu-content').hide();
    $$('.wp-custom-menu-submenu.mobile').each(function(item) {
        $(item).hide();
    });
    $('custommenu-mobile').select('span.button').each(function(item) {
        $(item).removeClassName('open');
    });
}

function wpCustomMenuMobileToggle()
{
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    if ((x < CUSTOMMENU_MOBILE_MENU_WIDTH_INIT || wpIsMobile.any()) && wpMobileMenuEnabled) {
        wpInitMobileMenuContent();
        if ($('custommenu')) $('custommenu').hide();
        if ($('wp-sidebar-nav-container')) $('wp-sidebar-nav-container').hide();
        $('custommenu-mobile').show();
        // --- ajax load ---
        if (wpMoblieMenuAjaxUrl) {
            new Ajax.Request(
                wpMoblieMenuAjaxUrl, {
                    asynchronous: true,
                    method: 'post',
                    onSuccess: function(transport) {
                        if (transport && transport.responseText) {
                            try {
                                response = eval('(' + transport.responseText + ')');
                            } catch (e) {
                                response = {};
                            }
                        }
                        wpMobileMenuContent = response;
                        wpMobileMenuLoaded  = false;
                        wpInitMobileMenuContent();
                    }
                }
            );
            wpMoblieMenuAjaxUrl = null;
        }
    } else {
        $('custommenu-mobile').hide();
        wpResetMobileMenuState();
        if ($('custommenu')) {
            if (!(wpMenuPosition != CUSTOMMENU_POSITION_TOP && !wpTopmenuStaticBlockId)) {
                $('custommenu').show();
            }
        }
        if ($('wp-sidebar-nav-container')) $('wp-sidebar-nav-container').show();
        if ($('wp-sidebar-nav-container-content')) $('wp-sidebar-nav-container-content').show();
        // --- ajax load ---
        if (wpMenuAjaxUrl) {
            new Ajax.Request(
                wpMenuAjaxUrl, {
                    asynchronous: true,
                    method: 'post',
                    onSuccess: function(transport) {
                        if (transport && transport.responseText) {
                            try {
                                response = eval('(' + transport.responseText + ')');
                            } catch (e) {
                                response = {};
                            }
                        }
                        if ($('custommenu')) $('custommenu').update(response.topMenu);
                        if ($('wp-sidebar-nav-container-content')) {
                            $('wp-sidebar-nav-container-content').update(response.topMenuSidebar);
                            $('wp-sidebar-nav-container-content').show();
                        }
                        wpPopupMenuContent = response.popupMenu;
                        wpPopupMenuSidebarContent = response.popupMenuSidebar;
                    }
                }
            );
            wpMenuAjaxUrl = null;
        }
    }

    if ($('custommenu-loading')) $('custommenu-loading').remove();
    if ($('custommenu-sidebar-loading')) $('custommenu-sidebar-loading').remove();
}

var wpIsMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (wpIsMobile.Android() || wpIsMobile.BlackBerry() || wpIsMobile.iOS() || wpIsMobile.Opera() || wpIsMobile.Windows());
    }
};
