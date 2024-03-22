    const audio = document.getElementById('myAudio');

    function playAudioLoop() {
        audio.loop = true;
        audio.play();
    }

    playAudioLoop();

    setTimeout(() => {
        audio.play();
    }, 1000); 
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
    const start = document.getElementById('start');
    start.addEventListener('click', handleStart)
    const colorButtons = document.querySelectorAll('main > div');
    const confirmBtn = document.getElementById('confirm').addEventListener('click', handleConfim);
    const detonoate = document.getElementById('detonate').addEventListener('click', handleDetonate);
    const h2 = document.querySelector('h2');
    const levelDisplay = document.querySelector('h3');
    colorButtons.forEach(function(button){
        button.addEventListener('click', handleClick);
    });

    const click = document.getElementById('clickSound');
    const min = document.getElementById('minutes');
    const sec = document.getElementById('seconds');

    let randomizedPattern = [];
    let selectedColors = [];
    let currentBox;

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
    const levelThree = new level(3,3);
    const levelFour = new level(4,3);
    const levelFive = new level(5,3);

    let levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];
    let currentLevel = levels[0];
    let gameWon;
    let gameOver;
    let minutes;
    let seconds;

    function init(){
        gameWon = false;
        gameOver = false;
        levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];
        currentLevel = levels[0];
        currentBox = 0;
        minutes = 1;
        seconds = 60;

        render()

    }

    function render(){
        renderMessage();
        renderControls();
    }

    function renderMessage(){
        h2.innerHTML = '<h2>Welcome! Match The Colors Displayed!<br>Also... Be Careful..<img src="img/eyes/giphy-1.webp" alt="eyes"></h2>'
        levelDisplay.innerText = 'Level 1'
    }

    function renderControls() {
        if (gameOver || gameWon){
            start.style.visibility = "visible";
            start.innerText = 'Play Again';
        } else{
            start.style.visibility = "hidden";
        }
    }

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
        if(minutes === 0 && seconds === 0 && levelFive.isComplete === false){
            console.log('you lose')
            handleDetonate();
        }
        setTimeout(timer, 1000);
    }

    function levelUp(){
        if (levelFive.isComplete === true){
            console.log('you win!')
            levelDisplay.innerText = 'You Win!'
            gameWon = true;
            gameOver = true;
            renderControls();
            timer();
        }else{
            const upOne = levels.slice(1);
            levels = upOne;
            currentLevel = upOne[0]
            randomizedPattern = []
            selectedColors = []
            fillInTheColors();
        }
    }

    function boxesToBeFilled(cb){
        boxes.forEach(function(box){
            box.style.backgroundColor = 'white';
        })
        const box = boxes[currentBox];
        const selected = randomColor();
        const color = colorList[selected].color
        box.style.backgroundColor = color
        randomizedPattern.push(color);
        if (gameOver===true){
            box.style.backgroundColor = 'white';
        }else{
            setTimeout(cb, colorList[selected].time);
        }
    }

    function fillInTheColors(){
        if(currentBox < 3){
            boxesToBeFilled(fillInTheColors);
            currentBox = ++currentBox;
        } else if(currentBox === 3 && currentLevel.length === 6 && randomizedPattern.length < 6 
        || currentBox === 3 && currentLevel.length === 9 && randomizedPattern.length < 9){
        currentBox = 0;
        fillInTheColors()
        } else{
            currentBox = 0;
            boxes.forEach(function(box){
                box.style.backgroundColor = 'white';
                })
        }
    }

    function handleClick(e){
        let color;
        const tag = e.target.tagName;
        if (tag === 'DIV'){
            return;
        } else if(tag === 'IMG'){
            color = e.target.parentElement.id;
            selectedColors.push(color);
        }else{
            color = e.target.id;
            selectedColors.push(color);
        }
    }


    function handleDetonate(e){
        if(gameOver === false){
            gameOver = true;
            timer();
            randomizedPattern = [];
            selectedColors = [];
            currentBox = 0;
            levelDisplay.innerText = 'game over'
            renderControls();
            startRotation();
            return
        } else{
            detonoate.disable = true;
        }
    }
    


    function handleConfim(e){
        const allMatchArr = [];
        if(randomizedPattern.length !== selectedColors.length){
            handleDetonate();
        }else{
            for(i = 0; i < randomizedPattern.length; i++){
                let color = randomizedPattern[i].slice(1);
                if(color !== selectedColors[i]){
                    allMatchArr.push(false);
                }
                else{
                    allMatchArr.push(true)
                }
            }
            if(allMatchArr.includes(false)){
                levelDisplay.innerText = `Not A Match! Game Over!`
                handleDetonate();
            } else{
                currentLevel.levelComplete();
                levelUp();
                if (levelFive.isComplete === true){
                    levelDisplay.innerText = 'You Win!'
                }else {
                    levelDisplay.innerText = `Level: ${currentLevel.level} `
                }
            }
        }
    }

    function handleStart(e){
        console.log('Game Starts NOW!');
        if(gameWon){
            init();
            timer();
            renderMessage();
            fillInTheColors();
        }
        else if(gameOver){
            init();
            timer();
            renderMessage();
            fillInTheColors();
            stopRotation();
        } else{
            init();
            timer();
            fillInTheColors();
        }
    }

    function randomColor(e){
        const x = Math.floor(Math.random()*16);
        return x;
    }

    function startRotation() {
        const images = document.querySelectorAll('button > img');
        images.forEach(image => {
            image.classList.toggle('rotate');
        });
    }

    function stopRotation() {
        const images = document.querySelectorAll('button > img');
        images.forEach(image => {
            image.classList.toggle('rotate');
        });
    }