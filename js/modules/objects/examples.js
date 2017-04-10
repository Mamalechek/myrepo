let { exampleField, operation, level } = require('../game/values');
let { createBalloons } = require('./balloons');


let exampleInField = false;
let answers = [];

const startExample = function() {
let style = getComputedStyle(exampleField);
    if(style.display != 'none') {
        if (!exampleInField)  {
            showExample();
            return answers;
        }
    }
    else {
        exampleInField = false;
    }
}

const showExample = function() {
    let operands = [];
    let n = 2;
    let example = '';
    let max = 10*level.num;
    if(level.num > 5)
        max = 10*5;
        


    function sorting(a, b) {
        if(a > b)
            return 1;
        else
            return -1;
    }

    function generateNum(max, answer) {
        let rand = Math.random();
        return Math.abs(rand*(2*max)-max) < rand*answer ? Math.round(rand*(2*max)-max) : Math.round(rand*answer);
    }

    function generator(sign) {
        switch(sign) {
            case '+':
                for(let i = 0; i < n; i++)
                    operands[i] = Math.round( Math.random() * max );
                example = `${operands[0]} + ${operands[1]} = ...`;
                answers = [
                    operands[0]+operands[1],
                    operands[0]+operands[1]+generateNum(10, operands[0]+operands[1]),
                    operands[0]+operands[1]+generateNum(10, operands[0]+operands[1])
                ];
                break;
            case '-':
                for(let i = 0; i < n; i++)
                    operands[i] = Math.round( Math.random() * max );
                operands.sort(sorting);
                example = `${operands[1]} - ${operands[0]} = ...`;
                answers = [
                    operands[1]-operands[0],
                    operands[1]-operands[0]+generateNum(10, operands[1]-operands[0]),
                    operands[1]-operands[0]+generateNum(10, operands[1]-operands[0])
                ];
                break;
            case '*':
                for(let i = 0; i < n; i++) {
                    operands[i] = Math.round( Math.random() * max + 1);
                    max = Math.floor(100 / operands[i])-1;
                }
                example =  `${operands[0]} &#215 ${operands[1]} = ...`;
                answers = [
                    operands[0]*operands[1],
                    operands[0]*operands[1]+generateNum(10, operands[0]*operands[1]),
                    operands[0]*operands[1]+generateNum(10, operands[0]*operands[1])
                ];
                break;
            case '/':
                max *= 2;
                for(let i = 0; i < n; i++) {
                    operands[i] = Math.round( Math.random() * max + i*1);
                    max = operands[i] / 2;
                }
                if(operands[0] % operands[1])
                    operands[0] = operands[1] * Math.round(operands[0] / operands[1]);
                example =  `${operands[0]} &#247 ${operands[1]} = ...`;
                answers = [
                    operands[0]/operands[1],
                    operands[0]/operands[1]+generateNum(10, operands[0]/operands[1]),
                    operands[0]/operands[1]+generateNum(10, operands[0]/operands[1])
                ];
            }
        }

    if(operation.sign.length === 1) {
        generator(operation.sign);
    }
    else {
        generator( operation.sign[ Math.round( Math.random()*3 )] );
    }

    for(let i = 0; i < answers.length; i++) {
        for(let j = i+1; j < answers.length; j++)
            if(answers[i] === answers[j])
                answers[j]++;
    }

    exampleField.innerHTML = example;
    exampleInField = true;
}



module.exports = {
    exampleField,
    startExample,
};
