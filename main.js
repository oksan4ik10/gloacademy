const score=document.querySelector('.score'),
start=document.querySelector('.start'),
gameArea=document.querySelector('.gameArea'), //игровое поле
car=document.createElement('div');
car.classList.add('car');

start.addEventListener('click',startGame);
document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);

const keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}; //массив кнопок

const setting={
    start:false,
    score:0,
    speed:3
};// начальные данные



function startRun(event){
    event.preventDefault(); //для отмены стандартнго поведения при нажатии на кнопки в браузере
    keys[event.key]=true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key]=false;
  
}


function startGame(){
    start.classList.add('hide');
    setting.start=true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}


function playGame(){
    console.log('AAAA');
    if (setting.start){
    requestAnimationFrame(playGame);
    }
}