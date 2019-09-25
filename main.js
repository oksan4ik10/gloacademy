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
    speed:3,
    traffic:3
};// начальные данные



//определяет сколько линий поместится на странице
function getElements(heightEl){
 return document.documentElement.clientHeight/heightEl+1;
}

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
    gameArea.innerHTML='';
    


    //проприсовка разделительной полосы
    for (let i=0;i<getElements(100);i++){
        const line=document.createElement('div');
        line.classList.add('line');
        line.style.top=i*150+'px';
        line.y=i*100;
        gameArea.appendChild(line);
    }

    for (let i=0;i<getElements(100*setting.traffic);i++){
        const enemy=document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y=-100*setting.traffic*(i+1);
        enemy.style.left=Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px';
        enemy.style.top=enemy.y+'px';
        enemy.style.background='transparent url("img/enemy.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    }


    setting.start=true;
    setting.score=0;



    gameArea.appendChild(car);
    car.style.left=gameArea.offsetWidth/2-car.offsetWidth/2;
    car.style.top='auto';
    car.style.bottom='10px';

    setting.x=car.offsetLeft; //для добавления свойства Х в объект сеттинг - перемещение влево см. css .car left
    setting.y=car.offsetTop;
    requestAnimationFrame(playGame);
}


function playGame(){
   
    if (setting.start){

        setting.score+=setting.speed;
        score.innerHTML='Очки:<br> '+setting.score;

        moveRoad();//движение разделительной полосы
        moveEnemy();//движение других машинок

        if (keys.ArrowLeft && setting.x>0){
           setting.x-=setting.speed;
        }

        if (keys.ArrowRight&& setting.x<(gameArea.offsetWidth-50)){ //ширирна дороги - ширина автомобиля
            setting.x+=setting.speed;
        }

        if (keys.ArrowUp&&setting.y>0){
            setting.y-=setting.speed;
        }

        if (keys.ArrowDown&&setting.y<(gameArea.offsetHeight-car.offsetHeight)){
            setting.y+=setting.speed;
        }

        car.style.left=setting.x+'px'; //меняем положение автомобиля
        car.style.top=setting.y+'px';


    requestAnimationFrame(playGame);
    }
}
function moveRoad(){
    let lines=document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y+=setting.speed;
        item.style.top=item.y+'px';

        if (item.y>= document.documentElement.clientHeight){
            item.y=-100;
        }
    }

    )
}


function moveEnemy(){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect=car.getBoundingClientRect();//получение позиции автомобиля
        let enemyRect=item.getBoundingClientRect();
        
        //проверка на столкновение с другими машинами смотри paint
        if ((carRect.top<=enemyRect.bottom)&&(carRect.right>=enemyRect.left)&&
        (carRect.left<=enemyRect.right)&&(carRect.bottom>=enemyRect.top)
        ){
            setting.start=false;
            start.classList.remove('hide');
           score.style.top=start.offsetHeight;
        }
        
        item.y+=setting.speed/2;
        item.style.top=item.y+'px';
        if (item.y>= document.documentElement.clientHeight){
            item.y=-100*setting.traffic;
            item.style.left=Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px';
        }
    })
}