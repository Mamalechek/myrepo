let { field, scoreField } = require('../game/values');

let count = {left: 0};
let changes = {};
let endOfGame = {end: false};
let score = {curScore: parseInt(scoreField.textContent)};

const changeScore = function(change) {
    if(!Object.keys(changes).length) {
        changes.curScore = score.curScore;
        changes.change = change;
    }

    if(changes.curScore + changes.change >= 0) {
            
        let style = getComputedStyle(scoreField);
        if(style.display != 'none') {
            if( count.left == changes.change || !changes.change) {
                count.left = 0;
                delete changes.curScore;
                delete changes.change;
            }
            else {
                score.curScore = changes.curScore + count.left + ( changes.change / Math.abs(changes.change) );
                let times = (100).toString(10).length-score.curScore.toString(10).length > 0 ? (100).toString(10).length-score.curScore.toString(10).length : 0;
                scoreField.textContent = '0'.repeat(times) + score.curScore;

                count.left += ( changes.change / Math.abs(changes.change) );
            }
        }
    }
    else {
        endOfGame.end = true;
        delete changes.curScore;
        delete changes.change;
    }
}

module.exports = {
    changeScore,
    score,
    changes,
    endOfGame,
    count,
};
