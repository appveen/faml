var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var inquirer = require('inquirer');
var program = require('commander');

program
    .version('1.0.0', '-v, --version')
    .option('-p, --prefix [prefix]', 'Placeholder prefix', '__')
    .option('-s, --suffix [suffix]', 'Placeholder suffix', '__')
    .option('-f, --file [file]', 'File')
    .option('-d, --directory [directory]', 'Directory with files')
    .parse(process.argv);

if (!program.file && !program.directory) {
    console.log('Please provide a file or directory');
    console.log('fill-yaml --help for more info');
    process.exit(0);
}

var location = path.join(process.cwd(), path.relative(process.cwd(), program.file || program.directory));
if (program.file) {
    program.filePath = location;
    readFile(program);
} else if (program.directory) {
    var files = fs.readdirSync(location, 'utf8');
    files.forEach(file => {
        if (file.endsWith('.yaml')) {
            answers.filePath = path.join(location, file);
            readFile(answers);
        }
    })
}

function readFile(answers) {
    var content = fs.readFileSync(answers.filePath, 'utf8');
    var regex = new RegExp(`${answers.prefix}[a-zA-Z0-9_]*${answers.suffix}`, 'g');
    var matches = content.match(regex);
    if (!matches || matches.length == 0) {
        console.log('No Placeholders found');
        process.exit(0);
    }
    var placeholders = matches.filter((e, i, a) => i === a.indexOf(e));
    var questions = [];
    placeholders.forEach(e => {
        questions.push({
            name: e,
            type: 'input',
            message: `Enter value for ${e} : `
        });
    });
    inquirer.prompt(questions).then(final => {
        Object.keys(final).forEach(key => {
            if (final[key]) {
                shell.sed('-i', key, final[key], answers.filePath);
            }
        });
    }).catch(err => {
        console.error(err);
    });
}