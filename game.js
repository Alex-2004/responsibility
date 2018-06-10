class Tank{
    constructor (x_, y_, color_){
        this.x = x_;
        this.y = y_;
        this.color = color_;
        this.health = 200;
    }
    
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 25, 0, 2*Math.PI);
        context.fill();
        if (this.health >= 0){context.fillRect(this.x - this.health/2, this.y-35, this.health, 5);}
    }
    
    isShot(){
        if (this.health <= 0){return;}
        for (let i=0; i<bullet.length; ++i){
            if (bullet[i].color != this.color && areCircleColliding(bullet[i].x, bullet[i].y, 5, this.x, this.y, 25)){
                this.health -= 0.1;
                bullet[i] = bullet[bullet.length-1];
                bullet.pop();
                --i;
            }
        }
    }
    
    shoot(targetX, targetY){
        if (this.health <= 0){return;}
        let dist = Math.sqrt( (this.x-targetX)*(this.x-targetX) + (this.y-targetY)*(this.y-targetY) )
        let dx = (targetX - this.x)*10/dist;
        let dy = (targetY - this.y)*10/dist;
        bullet.push( new Bullet(this.x, this.y, this.color, dx, dy) );
    }
}

class Bullet{
    constructor(x_, y_, color_, dx_, dy_){
        this.x = x_;
        this.y = y_;
        this.dx = dx_;
        this.dy = dy_;
        this.color = color_;
    }
    
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI);
        context.fill();
    }
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
}

function areCircleColliding(x1, y1, r1, x2, y2, r2){
    let dist = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    return dist <= r1+r2;
}
var player = []
for(let t=0;t<2;++t)
{
    player[0] = new Tank(400, 300, '#00ff00'); 
    player[1] = new Tank(200, 400, '#1400ff'); 
}

var enemy = [];
for (let i=0; i<4; ++i){
    enemy[i] = new Tank(Math.random()*800, Math.random()*600, 'yellow');
}

var bullet = [];

function update() {
    for(let t=0;t<2;++t)
    {
        if (player[t].health > 0){
                if (isKeyPressed[87])
                {
                    player[0].y -= 3;
                }
                if (isKeyPressed[83])
                {
                    player[0].y += 3;
                }
                if (isKeyPressed[65])
                {
                    player[0].x -= 3;
                }
                if (isKeyPressed[68])
                {
                    player[0].x += 3;
                }
            
                if (isKeyPressed[38])
                {
                    player[1].y -= 3;
                }
                if (isKeyPressed[40])
                {
                    player[1].y += 3;
                }
                if (isKeyPressed[37])
                {
                    player[1].x -= 3;
                }
                if (isKeyPressed[39])
                {
                    player[1].x += 3;
                }
            }
            player[t].isShot();
            player[t].shoot(mouseX, mouseY);
        }
    for (let i=0; i<enemy.length; ++i){
            if (enemy[i].health > 0){
                enemy[i].isShot();
                if(player[0].health > 0)
                {
                    enemy[i].shoot(player[0].x, player[0].y);
                }else{
                    enemy[i].shoot(player[1].x, player[1].y);
                }
            }
        }

        for (let i=0; i<bullet.length; ++i){
            bullet[i].update();
            if (bullet[i].x > 800 || bullet[i].x < 0 || bullet[i].y > 600 || bullet[i].y < 0){
                bullet[i] = bullet[bullet.length-1];
                bullet.pop();
                i--;
            }
        }
}
function draw() {
    for (let i=0; i<enemy.length; ++i){
        enemy[i].draw();
    }
    for (let i=0; i<bullet.length; ++i){
        bullet[i].draw();
    }
    for(let t=0;t<2;++t)
    {
        player[t].draw();
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mousedown() {
    
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
