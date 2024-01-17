function GetRandom (max) {
    return Math.floor(Math.random() * max);
}

var cardsType = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //0 - not active | 1 - player main | 2 player secondary | 3 AI main | 4 AI secondary
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var gameEnded = false;
var aiTotal = 0;
var aiPass = false;

function Start () {
    const readline = require('readline');

    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInterface.question('Command: ', function (command) {
        readlineInterface.close();
        
        if (command == 'end') {
            process.exit();
        }
        else if (command == 'desc' || command == 'description') {
            console.clear();
            console.log(description);

            Start();
        }
        else if (command.startsWith('start')) {
            let aiLevel = command.split(' ')[1];

            if (aiLevel == 0 || typeof aiLevel == 'undefined') { 
                aiLevel = 2;
            }
            aiLevel = 2;

            InnitCards();
            console.clear();
            Game(aiLevel);
        }
        else { 
            console.clear();
            Start();
        }
    });
}

function InnitCards () {
    for (let i = 1; i <= 4; i++) {
        let rng = GetRandom(11);
        if (cardsType[rng] == 0) {
            cardsType[rng] = i;
        }
        else { i--; }
    }

    //let vars = [];
    //
    //for (let i = 0; i < cards.length; i++) {
    //    if (cardsType[i] != 0) {
    //        vars.push(cards[i] + ' as ' + cardsType[i])
    //    }
    //}
    //console.log(vars.join('\n'));
}

function Game (aiLevel) {
    aiTotal = 0;
    if (gameEnded == false) {
        let gameDescPlayerAmount = 0;
        let gameDescPlayerHiddenCard = 0;
        let gameDescPlayer = 'Your cards: ';
        
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 1) {
                gameDescPlayer += `${cards[i]}* `;
                gameDescPlayerAmount += cards[i];
                gameDescPlayerHiddenCard = cards[i];
            }
            else if (cardsType[i] == 2) {
                gameDescPlayer += `${cards[i]} `;
                gameDescPlayerAmount += cards[i];
            }
        }
        gameDescPlayer += `(${gameDescPlayerAmount})`
    
        let gameDescAI = 'AI cards: ';
    
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 3) {
                gameDescAI += '?* ';
                aiTotal += cards[i];
            }
        }
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 4) {
                gameDescAI += `${cards[i]} `;
                aiTotal += cards[i];
            }
        }
    
        var gameDesc = `${gameDescPlayer}\n---------\n${gameDescAI}`
    
        console.log(gameDesc);
    
        const readline = require('readline');
    
        const readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readlineInterface.question('action (hit/pass): ', function (action) {
            readlineInterface.close();

            if (action.toLowerCase() == 'hit') {
                if (gameDescPlayerAmount < 22) {
                    playerHit();
                    aiHitLogic(aiLevel, gameDescPlayerAmount, gameDescPlayerHiddenCard, false);
                    console.clear();
                    Game(aiLevel);
                }
                else {
                    console.clear();
                    console.log('Cannot take more!');
                    Game(aiLevel);
                }
            }
            else if (action.toLowerCase() == 'pass') {
                if (aiPass == true) {
                    gameEnded = true;
                    console.clear();
                    Game(aiLevel);
                }
                else {
                    aiHitLogic(aiLevel, gameDescPlayerAmount, gameDescPlayerHiddenCard, true);
                    console.clear();
                    Game(aiLevel);
                }
            }
            else if (action == 'end') {
                process.exit();
            }
        });
    }
    else {
        let gameDescPlayerAmount = 0;
        let gameDescPlayerHiddenCard = 0;
        let gameDescPlayer = 'Your cards: ';

        let isVictory;
        
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 1) {
                gameDescPlayer += `${cards[i]}* `;
                gameDescPlayerAmount += cards[i];
                gameDescPlayerHiddenCard = cards[i];
            }
            else if (cardsType[i] == 2) {
                gameDescPlayer += `${cards[i]} `;
                gameDescPlayerAmount += cards[i];
            }
        }
        gameDescPlayer += `(${gameDescPlayerAmount})`
    
        let gameDescAI = 'AI cards: ';
    
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 3) {
                gameDescAI += `${cards[i]}* `;
                aiTotal += cards[i];
            }
        }
        for (let i = 0; i < cards.length; i++) {
            if (cardsType[i] == 4) {
                gameDescAI += `${cards[i]} `;
                aiTotal += cards[i];
            }
        }

        gameDescAI += `(${aiTotal})`
    
        var gameDesc = `${gameDescPlayer}\n---------\n${gameDescAI}`
    
        if ((gameDescPlayerAmount < aiTotal && aiTotal <= 21) || (gameDescPlayerAmount > aiTotal && aiTotal >= 22)) {
            isVictory = 'Defeat.';
        }
        else if (aiTotal == gameDescPlayerAmount) {
            isVictory = 'Draw!';
        }
        else { isVictory = 'Victory!'; }

        console.log(`${gameDesc}\n${isVictory}`);

        const readline = require('readline');
    
        const readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readlineInterface.question('press Enter to return to main...', () => {
            readlineInterface.close();
            console.clear();
            cardsType = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            gameEnded = false;
            aiTotal = 0;
            aiPass = false;
            Start();
        })
    }
}

function playerHit () {
    for (let i = 0; i < 1; i++) {
        let rng = GetRandom(11);

        if (cardsType[rng] == 0) {
            cardsType[rng] = 2;
        }
        else { i--; }
    }
}

function aiHitLogic (aiLevel, playerTotal, playerHiddenCard, playerPass) {
    if (aiLevel == 2) {
        let rng = GetRandom(100);

        if (CanTakeSmallerCards(aiTotal) && aiTotal < 16) {
            aiHit();
        }
        else if (rng > 49 && playerTotal - playerHiddenCard < 21 && aiTotal < 21) {
            for (let i = 0; i < cards.length; i++) {
                if (cardsType[i] < 2 && aiTotal + cards[i] <= 21) {
                    aiHit();
                    break;
                }
            }
        }
        else { aiPassAction(playerPass); }
    }
    else { 
        aiPassAction(playerPass);
    }
}

function CanTakeSmallerCards (ownSum) {
    let toReturn = false;
    let maxNum = 21 - ownSum;

    for (let i = 0; i < cards.length; i++) {
        if (cardsType[i] < 2 && cards[i] < maxNum) {
            toReturn = true;
        }
    }
    
    return toReturn;
}

function aiHit (aiLevel) {
    for (let i = 0; i < 1; i++) {
        let rng = GetRandom(11);

        if (cardsType[rng] == 0) {
            cardsType[rng] = 4;
        }
        else { i--; }
    }
}

function aiPassAction (playerPass) {
    aiPass = true;
    if (playerPass) {
        gameEnded = true;
    }
}
Start();