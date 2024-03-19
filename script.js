const colorList = [
    {color:'#9F2D2D', time:3000}, 
    {color:'#DBEA2C', time:3000}, 
    {color:'#187C3A', time:3000}, 
    {color:'#252DE2', time:3000}, 
    {color:'#19B3E4', time:3000}, 
    {color:'#BF26D8', time:3000},
    {color:'#666441', time:3000},
    {color:'#B81A5C', time:3000},
    {color:'#C9AAA2', time:3000},
    {color:'#93D551', time:3000},
    {color:'#17424F', time:3000},
    {color:'#6C0D53', time:3000}, 
    {color:'#6F413E', time:3000}, 
    {color:'#F8EDED', time:3000},
    {color:'#E54949', time:3000},
    {color:'#73A07A', time:3000}
];

const firstBox = document.getElementById('color1');
const secondBox = document.getElementById('color2');
const thirdBox = document.getElementById('color3');
const boxes = document.querySelectorAll('.colorFlash');
const start = document.getElementById('start').addEventListener('click', handleStart)
const colorButtons = document.querySelectorAll('main > div');
const confirmBtn = document.getElementById('confirm').addEventListener('click', handleConfim);
const detonoate = document.getElementById('detonate').addEventListener('click', handleDetonate);
colorButtons.forEach(function(button){
    button.addEventListener('click', handleClick);
})
const click = document.getElementById('clickSound');
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');

let randomizedPattern = [];
let selectedColors = [];
let currentBox = 0;

class level{
    constructor(level, length){
        this.level = level,
        this.length = length,
        this.isComplete = false;
    }
    levelComplete(){
        this.isComplete = true;
    }
}
const levelOne = new level(1, 3);
const levelTwo = new level(2,3);
const levelThree = new level(3,6);
const levelFour = new level(4,6);
const levelFive = new level(5,9);

let levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];
let currentLevel = levels[0];

function levelUp(){
    const upOne = levels.slice(1);
    levels = upOne;
    currentLevel = upOne[0]
    console.log(currentLevel.level);
    randomizedPattern = []
    selectedColors = []
    if (gameOver === false){
        fillInTheColors();
    }
}

let gameOver = false;

let minutes = 1;
let seconds = 60;

function setTime(){
    min.innerText = minutes;
    sec.innerText = seconds < 10 ? '0' + seconds : seconds;
}

function timer(){
    if (gameOver === true){
        return
    }
    seconds = seconds - 1;
    if (seconds < 0) {
        seconds = 59;
        minutes = minutes - 1;
    }
    if (minutes < 0) {
        return;
    }
    setTime();
    setTimeout(timer, 1000);
}

function handleClick(e){
    let color;
    const tag = e.target.tagName;
    // click.play()
    if(tag === 'IMG'){
        console.log(e.target.tagName)
        console.log(e.target.parentElement.id);
        color = e.target.parentElement.id;
        selectedColors.push(color);
        console.log(selectedColors);
    }else{
        console.log(e.target.tagName)
        color = e.target.id;
        console.log(color)
        selectedColors.push(color);
        console.log(selectedColors);
    }
}


function handleDetonate(e){
    gameOver = true;
    timer();
    console.log('game over..')
    return
}

function handleConfim(e){
    console.log('Confirming Match..')
    if(randomizedPattern.length !== selectedColors.length){
        boomGameOver();
    }else{
        for(i = 0; i < randomizedPattern.length; i++){
            let color = randomizedPattern[i].slice(1);
            if(color !== selectedColors[i]){
                boomGameOver();
                break;
            }else{
                console.log(`color: ${color} selected color: ${selectedColors[i]}`);
                console.log(`Match!`)
            }
            currentLevel.levelComplete();
            console.log(currentLevel.isComplete)
            console.log(`Level ${currentLevel.level} Complete!`);
            levelUp();
        }
    }
}
function boxesToBeFilled(cb){
    boxes.forEach(function(box){
        box.style.backgroundColor = 'black';
    })
    const box = boxes[currentBox];
    console.log(box);
    const selected = randomColor();
    const color = colorList[selected].color
    box.style.backgroundColor = color
    randomizedPattern.push(color);
    console.log(randomizedPattern);
    console.log(colorList[selected].color);
    if (gameOver===true){
        // boxes.forEach(function(box){
        box.style.backgroundColor = 'black';
    }else{
        setTimeout(cb, colorList[selected].time);
    }
}

function fillInTheColors(){
    if(currentBox < 3){
        boxesToBeFilled(fillInTheColors);
        currentBox = ++currentBox;
        console.log(currentBox);
    } else if(currentBox === 3 && currentLevel.length === 6 && randomizedPattern.length < 6 
    || currentBox === 3 && currentLevel.length === 9 && randomizedPattern.length < 9){
    currentBox = 0;
    fillInTheColors()
    } else{
        currentBox = 0;
        boxes.forEach(function(box){
            box.style.backgroundColor = 'black';
            })
        }
    }

function handleStart(e){
    console.log('Game Starts NOW!');
    timer();
    fillInTheColors();
}

function boomGameOver(){
    gameOver = true;
    timer();
    console.log('game over..')
    return
}

function randomColor(e){
    const x = Math.floor(Math.random()*16);
    return x;
}