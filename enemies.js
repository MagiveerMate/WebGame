class Enemy{
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameInterval =0;
            if(this.frameX < this.maxFrame)this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        if(this.x + this.width < 0)this.markedForDeletion = true;
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
    }
}

export class bat extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 145;
        this.height = 101;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() +1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy1');
        this.angle = 45;
        this.va = Math.random() *0.1 +0.1;
    }
    update(deltaTime){
        super.update(deltaTime)
        this.angle += this.va;
        this.y = Math.sin(this.angle);
    }
}
export class monster extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 144.5;
        this.height = 101;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 4;
        this.image = document.getElementById('enemy2');
        this.angle = 30;
        this.va = Math.random() *0.3 +0.1;
    }
    update(deltaTime){
        super.update(deltaTime)
        this.angle += this.va;
        this.y = Math.sin(this.angle);
    }
}

export class groundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 120;
        this.x = this.game.width;
        this.y = this.game.height -this.height - this.game.groundMargin;
        this.image = document.getElementById('enemy3');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}