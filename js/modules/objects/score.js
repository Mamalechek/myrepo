import { scoreField } from '../game/values';

const count = { left: 0 };
const changes = {};
const endOfGame = { end: false };
const score = { curScore: parseInt(scoreField.textContent, 10) };

const changeScore = function (change) {
    if (!Object.keys(changes).length) {
        changes.curScore = score.curScore;
        changes.change = change;
    }

    if (changes.curScore + changes.change >= 0) {
        const style = getComputedStyle(scoreField);
        if (style.display !== 'none') {
            if (count.left === changes.change || !changes.change) {
                count.left = 0;
                delete changes.curScore;
                delete changes.change;
            } else {
                score.curScore = changes.curScore +
                                count.left +
                                (changes.change / Math.abs(changes.change));
                const scoreLength = score.curScore.toString(10).length;
                const times = Math.max(3 - scoreLength, 0);
                scoreField.textContent = '0'.repeat(times) + score.curScore;

                count.left += (changes.change / Math.abs(changes.change));
            }
        }
    } else {
        endOfGame.end = true;
        delete changes.curScore;
        delete changes.change;
    }
};

export {
    changeScore,
    score,
    changes,
    endOfGame,
    count,
};
