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

let randomizedPattern = [];
let selectedColors = [];
let currentBox = 0;

let gameOver = false;
let level1 = false;
let level2 = false;
let level3 = false;
let level4 = false;
let level5 = false;

function handleClick(e){
    const color = e.target.id
    selectedColors.push(color);
    console.log(selectedColors);
}


function handleConfim(e){
    console.log('Confirming Match..')
    for(i = 0; i < randomizedPattern.length; i++){
        let color = randomizedPattern[i].slice(1);
        console.log(color);
        if(color !== selectedColors[i]){
            console.log('not a match!');
        }else{
            console.log(`color: ${color} selected color: ${selectedColors[i]}`);
            console.log('Match!')
        }
    }
}

function handleDetonate(e){
    console.log('BOOM! Game over..')
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
    setTimeout(cb, colorList[selected].time);
}

function fillInTheColors() {
    if(currentBox < 3){
        boxesToBeFilled(fillInTheColors);
        currentBox = ++currentBox;
    }else{
        currentBox = 0;
        boxes.forEach(function(box){
            box.style.backgroundColor = 'black';
        })
    }
}

function handleStart(e){
    console.log('Game Starts NOW!');
    fillInTheColors();
}

function randomColor(e){
    const x = Math.floor(Math.random()*16);
    return x;
}