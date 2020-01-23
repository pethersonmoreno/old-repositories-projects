const path = require('path');

const getTemplateInstallPackage = (template, originalDirectory) => {
  let templateToInstall = 'cjl-template';
  if (template) {
    if (template.match(/^file:/)) {
      templateToInstall = `file:${path.resolve(
        originalDirectory,
        template.match(/^file:(.*)?$/)[1],
      )}`;
    } else if (
      template.includes('://') ||
      template.match(/^.+\.(tgz|tar\.gz)$/)
    ) {
      // for tar.gz or alternative paths
      templateToInstall = template;
    } else {
      // Add prefix 'cjl-template-' to non-prefixed templates, leaving any
      // @scope/ intact.
      const packageMatch = template.match(/^(@[^/]+\/)?(.+)$/);
      const scope = packageMatch[1] || '';
      const templateName = packageMatch[2];

      if (
        templateName === templateToInstall ||
        templateName.startsWith(`${templateToInstall}-`)
      ) {
        // Covers:
        // - cjl-template
        // - @SCOPE/cjl-template
        // - cjl-template-NAME
        // - @SCOPE/cjl-template-NAME
        templateToInstall = `${scope}${templateName}`;
      } else if (templateName.startsWith('@')) {
        // Covers using @SCOPE only
        templateToInstall = `${templateName}/${templateToInstall}`;
      } else {
        // Covers templates without the `cjl-template` prefix:
        // - NAME
        // - @SCOPE/NAME
        templateToInstall = `${scope}${templateToInstall}-${templateName}`;
      }
    }
  }

  return Promise.resolve(templateToInstall);
};

module.exports = getTemplateInstallPackage;
