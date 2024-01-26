function Main () {
    const readline = require('readline');

    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInterface.question('Command: ', function (cmd) {
        readlineInterface.close();

        let cmds = cmd.split(' ');

        if (cmds[0].toLowerCase() == 'end') {
            process.exit();
        }
        else if (cmds[0].toLowerCase() == 'try') {
            last = [];
            addToLast('./path/path2');
        }

        Main();
    });
}

var last = [];

function addToLast (full) {
    let fulls = full.split('/');
    let directory = '';

    let fs = require('fs');

    for (let i = 0; i < fulls.length; i++) {
        last.push(`${fulls[i]}`);
        directory = last.join('/');
        
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
    }

    createFile(directory, 'hello')
}

function createFile (dir, fileName) {
    let fs = require('fs');

    fs.writeFile(`${dir}/${fileName}.txt`, 'Hello, World!', (err) => {
        if (err) { console.log(err); }
    });
}

Main();