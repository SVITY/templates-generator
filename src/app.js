import fs from 'fs-extra';
import path from 'path';
import * as utils from './utils';

function generateTemplate(template) {
  const { files, filesPath } = template;
  const replacements = utils.getReplacements(template.config.regexp);
  // get new files path
  const newFiles = utils.getNewFilesPaths(files, replacements, filesPath);

  for (let i = 0; i < files.length; i += 1) {
    // open file
    const file = fs.readFileSync(files[i], 'utf8');
    // replace in file
    const newFile = utils.replaceInFile(file, replacements);
    // write file
    fs.outputFileSync(newFiles[i], newFile, 'utf8');
  }
}

export default function app() {
  const templatelName = process.argv[2];
  if (templatelName === undefined) {
    throw new Error('You have not entered a template name');
  }

  // template directory
  const templatelPath = path.join(__dirname, `../templates/${templatelName}`);
  // path to template config
  const templateConfigPath = path.join(templatelPath, 'config.json');

  const template = {
    // config
    config: JSON.parse(fs.readFileSync(templateConfigPath, 'utf8')),
    // path to directory of template files
    filesPath: path.join(templatelPath, 'files'),
    // paths to template files
    files: [],
  };

  fs.walk(template.filesPath)
    .on('data', (file) => {
      if (file.stats.isFile()) {
        template.files.push(file.path);
      }
    })
    .on('end', () => {
      generateTemplate(template);
    });
}
