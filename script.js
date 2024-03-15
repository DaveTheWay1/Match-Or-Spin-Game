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
const confirmBtn = document.getElementById('confirm').addEventListener('click', handleConfim);
const colorButtons = document.querySelectorAll('main > div');
colorButtons.forEach(function(button){
    button.addEventListener('click', handleClick);
})

let randomizedPattern = [];
let selectedColors = [];