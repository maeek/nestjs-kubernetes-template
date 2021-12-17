const fs = require('fs');
const path = require('path');
const config = require('../../config/config');

const getFolders = (source, exclude = config.excludedFolders) => {
  return fs.readdirSync(path.resolve(config.basePath, source), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !exclude.includes(dirent.name))
    .map(dirent => dirent.name);
};

const getServicesToBuild = () => {
  const services = getFolders(config.servicesPath);
  return services.filter(service => (
    !config.excludedFolders.includes(service)
    && fs.existsSync(path.resolve(config.basePath, config.servicesPath, service, 'package.json')))
  );
};

module.exports = {
  getFolders,
  getServicesToBuild
};
