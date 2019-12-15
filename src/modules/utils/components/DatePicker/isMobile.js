
const hasTouchEvent = () => {
  try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
};
const hasDesktopStorage = () => !!sessionStorage.desktop;
const hasMobileStorage = () => !!localStorage.mobile;

const hasUserAgentMobile = () => {
  const mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
  return !!mobile.find(agent => navigator.userAgent.toLowerCase().indexOf(agent.toLowerCase()) > 0);
};

const isMobile = () => {
  if (!hasTouchEvent()) {
    return false;
  }

  if (hasDesktopStorage()) { return false; }
  if (hasMobileStorage()) { return true; }

  // alternative
  return hasUserAgentMobile();
};

export default isMobile;
