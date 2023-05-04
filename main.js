import {player} from './player.js';
import { inputHandeler } from './input.js';
import { Background } from './background.js';
import{ bat, monster,groundEnemy} from './enemies.js';
import{ UI } from './UI.js';

window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width  = 1000;
    canvas.height = 1000;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 550;
            this.speed = 0;
            this.maxSpeed = 10;
            this.background = new Background(this);
            this.player = new player(this);
            this.input = new inputHandeler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particals = [];
            this.colision = [];
            this.maxParticals = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 60000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion)this.enemies.splice(this.enemies.indexOf(enemy),1);
            });
            this.particals.forEach((particals, index) => {
                    particals.update();
                    if(particals.markedForDeletion) this.particals.splice(index, 1)
            });
            if(this.particals.length > this.maxParticals){
                this.particals = this.particals.slice(0,this.maxParticals);
            }
            

            
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.particals.forEach(particals =>{
                particals.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random()< 0.5) this.enemies.push(new groundEnemy(this));
            this.enemies.push(new bat(this));
            this.enemies.push(new monster(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(time){
        const deltaTime = time - lastTime;
        lastTime = time;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});