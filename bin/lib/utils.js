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

const getServiceConfig = (service) => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(config.basePath, config.servicesPath, service, 'package.json'), 'utf8')
  );

  if (packageJson.dockerBuildOptions) {
    return packageJson.dockerBuildOptions;
  }

  const configFilePath = path.resolve(config.basePath, config.servicesPath, service, config.customServiceConfig);
  const configFileExists = fs.existsSync(configFilePath);

  console.log(configFilePath, configFileExists);

  if (configFileExists) {
    return require(configFilePath);
  }
};

const humanFileSize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

module.exports = {
  getFolders,
  getServicesToBuild,
  getServiceConfig,
  humanFileSize
};
