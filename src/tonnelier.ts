import glob from './glomise';
import * as path from 'path';
import * as fs from 'fs-extra';

async function getNames(dir: string) {
  const files = await glob(path.resolve(dir, '**/*.tsx'));

  return files
    .map(f => path.relative(dir, f))
    .filter(f => {
      const folderName = path.dirname(f).split(path.sep).pop();
      const fileName = path.basename(f, path.extname(f));

      return fileName === folderName;
    })
    .map(f => path.join(path.dirname(f), path.basename(f, path.extname(f))))
    ;
}

module.exports = async function (argv: any) {
  const names = await getNames(argv._[0]);

  const content = names.map(n => `export * from './${n}'`);

  return content.join('\n');
}
