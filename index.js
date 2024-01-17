function GetRandom (max) {
    return Math.floor(Math.random() * max);
}

function Main () {
    var values = [];
    var Result;

    for (let i = 0; i < GetRandom(10); i++) {
        let value = GetRandom(100);
        values.push(value);
    }

    Result = values.join(', ');

    var greaterThanAmount = 0;
    var lessThanAmount = 0;

    for (let i = 0; i < values.length; i++) {
        if (values[i] <= 50) {
            lessThanAmount++;
        }
        else { greaterThanAmount++; }
    }

    if (greaterThanAmount > lessThanAmount) {
        Result += '. Majority is greater than 50.';
    }
    else if (greaterThanAmount == lessThanAmount) {
        Result += '. Equal amount of less and greater than 50.';
    }
    else { Result += '. Majority is less than 50.'; }

    console.log(Result);

    const readline = require('readline');

    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInterface.question('Press \'y\' to exit, else to repeat. ', function (answer) {
        readlineInterface.close();
        
        if (answer.toLowerCase() != 'y') {
            Main();
        }
        else { process.exit(); }
    });
}

Main();