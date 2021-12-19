const path = require('path');

module.exports = {
  // Build mode: 'development' or 'production'
  mode: process.env.NODE_ENV || 'production',
  // The base directory (absolute path!) for resolving the entry option
  basePath: path.resolve(__dirname, '..'),
  // Services folder
  servicesPath: 'production',
  // Registry URL to push images to
  registryUrl: process.env.REGISTRY_URL || 'localhost:5000',
  // Prefix for all images
  imgPrefix: process.env.BUILD_IMAGE_PREFIX || '',
  // Exclude folders from build
  excludedFolders: [
    'node_modules',
    'types',
  ],
  // Custom service config file to override default build config
  customServiceConfig: 'docker-build.config.js',
  // Docker binary path
  // dockerPath: '/usr/bin/docker',
};
