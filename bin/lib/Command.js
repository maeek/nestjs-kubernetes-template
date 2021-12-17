const child_proc = require('child_process');
const config = require('../../config/config');

class Command {
  #subscribers = [];

  running = false;

  proc = null;

  log = '';

  errors = [];

  constructor(name, conf = {}) {
    this.name = name;
    this.config = {
      bin: config.dockerPath || 'docker',
      arguments: [],
      cwd: config.basePath,
      ...conf
    };
  }

  get isRunning() {
    return this.running;
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  run = () => new Promise((resolve, reject) => {
    try {
      this.running = true;

      this.proc = child_proc.spawn(
        this.config.bin,
        this.config.arguments,
        {
          cwd: this.config.cwd
        }
      );

      this.notify('start', {
        name: this.name,
        config: this.config
      });

      this.proc.stdout.on('data', (data) => {
        this.log += data.toString();
        this.notify('progress', data.toString());
      });

      this.proc.stderr.on('data', (data) => {
        this.log += data.toString();
        this.errors.push(data);
        this.notify('error', data.toString());
      });

      this.proc.on('exit', (code) => {
        this.running = false;
        
        let exitResults = {
          name: this.name,
          code,
          config: this.config,
          proc: this.proc,
          log: this.log,
          errors: this.errors,
        }

        const beforeFinishHooks = this.#subscribers.filter(subscriber => subscriber.event === 'beforeFinish');
        const beforeFinishHooksData = beforeFinishHooks.reduce((acc, subscriber) => {
          return {
            ...acc,
            ...(subscriber.callback({ ...acc }) || {})
          };
        }, { ...exitResults });

        exitResults = {
          ...exitResults,
          ...beforeFinishHooksData
        }

        this.notify('finish', exitResults);

        resolve(exitResults);
      });
    }
    catch (e) {
      this.running = false;
      reject(e);
    }
  });

  /**
   * 
   * @param {string} event 'start' | 'progress' | 'beforeFinish' | 'finish' | 'error'
   * 
   * @param {*} callback 
   */
  on(event, callback) {
    this.#subscribers.push({
      event,
      callback
    });
  }

  off = (event, callback) => {
    this.#subscribers = this.#subscribers.filter(subscriber => {
      return subscriber.event !== event && subscriber.callback !== callback;
    });
  }

  offAll = () => {
    this.#subscribers = [];
  };

  notify = (event, data) => {
    this.#subscribers.forEach(subscriber => {
      if (subscriber.event === event) {
        subscriber.callback(data);
      }
    });
  }
}

module.exports = Command;
