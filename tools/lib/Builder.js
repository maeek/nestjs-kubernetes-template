const path = require('path');
const child_proc = require('child_process');
const config = require('../../config/config');
const { humanFileSize } = require('./utils');
const Command = require('./Command');

const isDev = config.mode === 'development';

class Builder extends Command {

  static DOCKERFILE_PATH = path.resolve(
    config.basePath,
    `deploy/docker/Dockerfile${isDev ? '.development' : ''}`
  );

  constructor(name, conf = {}) {
    super(name, conf);

    const absoluteDockerfilePath = this._getDockerfilePath(name, conf);
    const registryUrl = config.registryUrl ? `${config.registryUrl}/` : '';
    const tag = `${registryUrl}${config.imgPrefix}${this.name}`;

    this.config = {
      bin: config.dockerPath || 'docker',
      cwd: config.basePath,
      tag,
      dockerfilePath: absoluteDockerfilePath,
      ...conf,
      realDockerfilePath: absoluteDockerfilePath ? absoluteDockerfilePath : undefined,
    };

    this.config.arguments = conf.arguments
      ? config.arguments
      : this._getDockerBuildCommand(conf);

    this._setupImageUtils();
  }
  
  _getDockerBuildCommand = (conf) => {
    return [
      'build',
      '-f',
      `${this.config.realDockerfilePath ? this.config.realDockerfilePath : this.config.dockerfilePath}`,
      '--build-arg',
      `SERVICE_NAME=${this.name}`,
      ...(conf.buildArgs || []).map(arg => ['--build-arg', arg]).flat(Infinity),
      ...(conf.environment || []).map(env => ['-e', env]).flat(Infinity),
      '-t',
      `${this.config.tag}`,
      'production/'
    ];
  };

  _getDockerfilePath = (name, conf) => {
    if (conf.dockerfilePath) {
      if (!path.isAbsolute(conf.dockerfilePath)) {
        return path.resolve(
          config.basePath,
          config.servicesPath,
          name,
          conf.dockerfilePath
        );
      }

      return conf.dockerfilePath;
    }

    return Builder.DOCKERFILE_PATH;
  }

  _setupImageUtils = () => {
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
          humanSize: humanFileSize(size)
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
}

module.exports = Builder;
