function GetRandom (max) {
    return Math.floor(Math.random() * max);
}

function UsrInput () {
    const readline = require('readline');

    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInterface.question('Command: ', function (answer) {
        readlineInterface.close();
        
       if (answer == 'hello') {
            Hello();
       }
       else if (answer.toLowerCase().startsWith('my name is')) {
            let ans = answer.split(' ')[3];

            if (typeof ans != 'undefined' && ans != '') {
                console.log('Hello, ' + ans);
            }
            else { console.log('Hello, Guest'); }
       }
       else if (answer == 'end') {
            process.exit();
       }
       else { console.log('Unknown command.'); }

       UsrInput();
    });
}

function Hello () {
    const Hellos = ['Hi!', 'Hello!'];

    console.log(Hellos[GetRandom(2)]);
}

UsrInput();