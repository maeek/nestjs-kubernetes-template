const { getServicesToBuild, getServiceConfig } = require('./lib/utils');
const Builder = require('./lib/Builder');

const run = async () => {
  console.time('\nBuild duration ');

  const services = getServicesToBuild();
  const builders = services.map(service => new Builder(service, getServiceConfig(service)));
  const builds = [];
  
  builders.forEach(builder => {
    builder.on('start', info => {
      console.log(`[${new Date(Date.now()).toISOString()}] - ${info.name} - build started`);
      console.log('   Build config:');
      Object.keys(info.config).forEach(key => {
        console.log(`     ${key}: ${info.config[key]}`);
      });
      console.log('\n');
    });
    builder.on('progress', log => {
      console.log(
        log.split('\n')
          .map(line => `[${new Date(Date.now()).toISOString()}] - ${builder.name} - ${line}`)
          .join('\n')
      );
    });
    builder.on('error', error => console.error(error));
    builder.on('finish', obj => {
      console.log(
        `[${new Date(Date.now()).toISOString()}] - ${builder.name} - Build finished with exit code ${obj.code}`
      );
      builds.push(obj);
      builder.offAll();
    });
  });

  await Promise.all(builders.map(builder => builder.run()));

  console.timeEnd('\nBuild duration ');

  if (builders.some(builder => builder.hasErrors)) {
    const failedBuilds = builders.filter(builder => builder.hasErrors).map(builder => builder.name);
    console.error(`${failedBuilds.length} build${failedBuilds.length > 1 ? 's' : ''} failed`);
    console.error(
      'Failed builds: ',
      failedBuilds
    );
    process.exit(1);
  }

  console.table(builds.map(build => ({
    name: build.name,
    tag: build.image.name,
    isPublished: build.image.published,
    imageSize: build.image.humanSize
  })));

  process.exit(0);
};

try {
  run();
} catch (e) {
  console.timeEnd('\nBuild duration ');
  console.error(e);
  process.exit(1);
}
