import { exampleField, operation, level } from '../game/values';

let exampleInField = false;
let answers = [];

const startExample = function () {
    const style = getComputedStyle(exampleField);
    if (style.display !== 'none') {
        if (!exampleInField) {
            showExample();
            return answers;
        }
    } else {
        exampleInField = false;
    }
};

const showExample = function () {
    const n = 2;
    let example = '';
    let max = 10 * level.num;
    if (level.num > 5) {
        max = 10 * 5;
    }

    function sorting(a, b) {
        if (a > b) {
            return 1;
        }
        return -1;
    }

    function generateNum(m, answer) {
        const rand = Math.random();
        return Math.abs(Math.min(
                Math.round((rand * (2 * m)) - m), Math.round(rand * answer)));
    }

    function generator(sign) {
        const operands = [];
        let answer = 0;
        switch (sign) {
            case '+': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round(Math.random() * max);
                }
                example = `${operands[0]} + ${operands[1]} = ...`;
                answer = operands[0] + operands[1];
                break;
            }
            case '-': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round(Math.random() * max);
                }
                operands.sort(sorting);
                example = `${operands[1]} - ${operands[0]} = ...`;
                answer = operands[1] - operands[0];
                break;
            }
            case '*': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round((Math.random() * max) + 1);
                    max = Math.floor(100 / operands[i]) - 1;
                }
                example = `${operands[0]} &#215 ${operands[1]} = ...`;
                answer = operands[0] * operands[1];
                break;
            }
            case '/': {
                max *= 2;
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round((Math.random() * max) + i);
                    max = operands[i] / 2;
                }
                if (operands[0] % operands[1]) {
                    operands[0] = operands[1] *
                                    Math.round(operands[0] / operands[1]);
                }
                example = `${operands[0]} &#247 ${operands[1]} = ...`;
                answer = operands[0] / operands[1];
                break;
            }
            default:
                break;
        }

        return [
            answer,
            answer + generateNum(10, answer),
            answer + generateNum(10, answer),
        ];
    }

    if (operation.sign.length === 1) {
        answers = generator(operation.sign);
    } else {
        answers = generator(operation.sign[Math.round(Math.random() * 3)]);
    }

    for (let i = 0; i < answers.length; i++) {
        for (let j = i + 1; j < answers.length; j++) {
            if (answers[i] === answers[j]) {
                answers[j]++;
            }
        }
    }

    exampleField.innerHTML = example;
    exampleInField = true;
};

export {
    exampleField,
    startExample,
};
