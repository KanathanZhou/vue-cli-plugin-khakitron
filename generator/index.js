module.exports = function(api, options) {
  const { PresetLanguage } = options;

  api.extendPackage({
    dependencies: {
      'khakitron': '1.0.1'
    }
  });

  if (PresetLanguage === 'js') {
    api.render('./templates-js');
  } else if (PresetLanguage === 'ts') {
    api.render('./templates-ts');
  }

  // also part of chaining the main file. doc: https://cli.vuejs.org/dev-guide/plugin-dev.html#changing-main-file
  api.injectImports(api.entryFile, `import khakitron from './khakitron';`)
}

/**
 * Chaining main file, I am modifying the main file not templating it
 * @inheritDoc: https://cli.vuejs.org/dev-guide/plugin-dev.html#changing-main-file
 * @param api
 */
module.exports.hooks = (api) => {
  api.afterInvoke(() => {
    const { EOL } = require('os');
    const fs = require('fs');
    const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g);

    const renderIndex = lines.findIndex(line => line.match(/render/));
    lines[renderIndex] += `${EOL}  khakitron,`;

    fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' });
  })
}
