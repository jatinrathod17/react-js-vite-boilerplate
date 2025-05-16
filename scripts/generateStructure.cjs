const fs = require('fs');
const path = require('path');

const EXCLUDED_DIRS = ['.git', 'node_modules', 'dist', 'build'];

function getDirectoryStructure(dir, depth = 0) {
  let result = '';
  const items = fs.readdirSync(dir).filter(item => !EXCLUDED_DIRS.includes(item));

  // Separate folders and files
  const folders = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());
  const files = items.filter(item => !fs.statSync(path.join(dir, item)).isDirectory());

  // Process folders first
  folders.forEach(folder => {
    const folderPath = path.join(dir, folder);
    result += '│  '.repeat(depth) + '├── ' + folder + '/\n';
    result += getDirectoryStructure(folderPath, depth + 1);
  });

  // Process files next
  files.forEach(file => {
    result += '│  '.repeat(depth) + '├── ' + file + '\n';
  });

  return result;
}

const projectRoot = path.resolve(__dirname, '..'); // go one level up from scripts/
const structure = 'Project Structure:\n' + getDirectoryStructure(projectRoot);

fs.writeFileSync(path.join(projectRoot, 'PROJECT_STRUCTURE.md'), structure, 'utf8');
console.log('✅ Project structure saved to PROJECT_STRUCTURE.md');