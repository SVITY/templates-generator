import readLineSync from 'readline-sync';
// import replace from 'replace';

export function getReplacements(words) {
  const replacements = [];
  for (const word of words) {
    let replacement = readLineSync.question(`${word}: `);
    replacement = replacement.trim();
    const regexp = new RegExp(`###${word}###`, 'g');
    replacements.push({
      regexp,
      replacement,
    });
  }
  return replacements;
}

export function replaceInFile(file, replacements) {
  let buffer = file;
  for (const r of replacements) {
    buffer = buffer.replace(r.regexp, r.replacement);
  }
  return buffer;
}

export function getNewFilesPaths(files, replacements, rootFilesPath) {
  // current directory (where util runs)
  const currentPath = process.cwd();
  const newFiles = [];
  for (const file of files) {
    let newFile = file;
    for (const r of replacements) {
      newFile = newFile.replace(r.regexp, r.replacement);
    }
    newFile = newFile.replace(rootFilesPath, currentPath);
    newFiles.push(newFile);
  }
  return newFiles;
}
