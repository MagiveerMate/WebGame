
  export const dog = () => {
    
    let playerState = "idle";
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
});

const canva = document.getElementById('canvas2');
const ct = canva.getContext('2d');
const CANVAS_WIDTH = canva.width = 600;
const CANVAS_HEIGHT = canva.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_DogS.png';
const spriteWidth = 138.42;
const spriteHeight = 126.2;

let gameFrame = 0;
const staggerFrame = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 5,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state,index)=>{
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animation()
{
    ct.clearRect(0,0 ,CANVAS_WIDTH,CANVAS_HEIGHT);
    let possition = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth*possition;
    let frameY = spriteAnimations[playerState].loc[possition].y;
    ct.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);

    gameFrame++;
    requestAnimationFrame(animation);
};
animation();

  };


