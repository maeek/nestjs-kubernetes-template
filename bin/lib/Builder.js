const path = require('path');
const child_proc = require('child_process');
const config = require('../../config/config');
const Command = require('./Command');

const isDev = config.mode === 'development';

class Builder extends Command {

  static DOCKERFILE_PATH = path.resolve(
    config.basePath,
    `deploy/docker/Dockerfile${isDev ? '.development' : ''}`
  );
  
  static getBuildCommandArguments = (
    serviceName,
    tag,
    dockerfilePath = Builder.DOCKERFILE_PATH
  ) => [
    '-f',
    `${dockerfilePath}`,
    '--build-arg',
    `SERVICE_NAME=${serviceName}`,
    '-t',
    `${tag}`,
    'production/'
  ];

  constructor(name, conf = {}) {
    super(name, conf);

    const registryUrl = config.registryUrl ? `${config.registryUrl}/` : '';
    const tag = `${registryUrl}${config.imgPrefix}${this.name}`;
    const commandArgs = Builder.getBuildCommandArguments(
      this.name, tag, this.config.dockerfilePath
    );

    this.config = {
      bin: config.dockerPath || 'docker',
      arguments: [
        'build',
        ...(this.config?.buildArgs || []),
        ...commandArgs
      ],
      cwd: config.basePath,
      tag,
      dockerfilePath: Builder.DOCKERFILE_PATH,
      ...conf
    };

    this.on('beforeFinish', (obj) => {
      const transformed = {
        ...obj
      };

      if (obj.code === 0) {
        const size = Builder.getImageSize(this.config.tag);

        transformed.image = {
          name: this.config.tag,
          published: false,
          size,
          humanSize: Builder.humanFileSize(size)
        }
      }

      return transformed;
    });
  }

  static getImageSize = (tag) => {
    return child_proc
      .execSync(`${config.dockerPath || 'docker'} image inspect ${tag} --format='{{.Size}}'`)
      .toString()
      .trim();
  }

  static humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };
}

module.exports = Builder;
