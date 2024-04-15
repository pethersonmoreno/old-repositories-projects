const addToggleButtonContinousReloadExtensionToAllUnpackedExtensions=()=>{
  const firstShadowRoot=Array.from(document.body.children).find(i => i.shadowRoot != undefined).shadowRoot
  const secondShadowRoot=Array.from(firstShadowRoot.querySelectorAll('#container #viewManager #items-list')).find(i => i.shadowRoot != undefined).shadowRoot
  const thirdHostShadownRoots=Array.from(Array.from(secondShadowRoot.querySelectorAll('#container #content-wrapper .items-container')).find(i=> i.querySelector('extensions-item') != undefined).querySelectorAll('[id]'))
  const shadowRootsWithReloadExtension=thirdHostShadownRoots.filter(i => i.shadowRoot.querySelector('#card #button-strip .icon-refresh') != undefined);

  shadowRootsWithReloadExtension.reduce((prev,shadowRootExtension)=>{
    const toggleContinousReloadExtension = document.createElement('cr-button');
    toggleContinousReloadExtension.setAttribute('aria-describedby', 'a11yAssociation');
    toggleContinousReloadExtension.setAttribute('role', 'button');
    toggleContinousReloadExtension.setAttribute('tabindex', '0');
    toggleContinousReloadExtension.setAttribute('aria-disabled', 'false');
    toggleContinousReloadExtension.setAttribute('style', 'margin: 15px auto 0');
    toggleContinousReloadExtension.textContent="Enable Continous Reload"
    toggleContinousReloadExtension.enabledContinuousReload=false
    // 
    toggleContinousReloadExtension.shadowRootExtension=shadowRootExtension
    // 
    toggleContinousReloadExtension.runReloadExtension=function(){
      if (!this.enabledContinuousReload) { return; }
      this.shadowRootExtension.shadowRoot.querySelector('cr-icon-button[aria-label="Reload"]').shadowRoot.querySelector('#icon').click();
      setTimeout(()=>{this.runReloadExtension()}, 1000);
    };
    toggleContinousReloadExtension.runReloadExtension.bind(toggleContinousReloadExtension);
    // 
    toggleContinousReloadExtension.clickTriggerFunction=function(){
      if(!this.enabledContinuousReload) {
        this.enableContinuousReload();
      } else {
        this.disableContinuousReload();
      }
    };
    toggleContinousReloadExtension.clickTriggerFunction.bind(toggleContinousReloadExtension);
    toggleContinousReloadExtension.addEventListener('click', toggleContinousReloadExtension.clickTriggerFunction);
    // 
    toggleContinousReloadExtension.enableContinuousReload=function(){
      this.textContent="Disable Continous Reload"
      this.enabledContinuousReload=true;
      this.runReloadExtension();
    };
    toggleContinousReloadExtension.enableContinuousReload.bind(toggleContinousReloadExtension);
    // 
    toggleContinousReloadExtension.disableContinuousReload=function(){
      this.textContent="Enable Continous Reload"
      this.enabledContinuousReload=false;
    };
    toggleContinousReloadExtension.disableContinuousReload.bind(toggleContinousReloadExtension);
    // 

    shadowRootExtension.shadowRoot.querySelector('#card #main #content').appendChild(toggleContinousReloadExtension);
  },shadowRootsWithReloadExtension);
};
addToggleButtonContinousReloadExtensionToAllUnpackedExtensions();