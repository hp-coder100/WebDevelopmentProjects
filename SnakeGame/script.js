Hscore =0;
function init(){
    var canvas = document.getElementById('mainCanvas');
    W = H = canvas.width = canvas.height= 500;
    pen = canvas.getContext('2d');
    gameOver = false;
    cs=30;
    score =0;
    foodImg = new Image();
    foodImg.src ="appleimg.png";
    food = getRandomFood();

    snake = {
        len:5,
        cell:[],
        direction:"right",
        color:"blue",
        creatSnake:function(){
            for(var i=this.len;i>0;i--){
                this.cell.push({x:i,y:0});
            }
        },

        drawSanke:function(){
            for(var i=0;i<this.cell.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cell[i].x*cs,this.cell[i].y*cs,cs-2,cs-2);

            }
        },
        updateSnake:function () {

            var headX = this.cell[0].x;
            var headY = this.cell[0].y;

            if(headX==food.x && headY == food.y){
                console.log("food eaten update score");
                score = score+1;
                food = getRandomFood();
            }
            else{
                this.cell.pop();
            }

            var X,Y;
            var dir = snake.direction;
            if(dir=="right"){
                X = headX+1;
                Y = headY;
            }
            else if(dir=="left"){
                X = headX-1;
                Y = headY;
            }
            else if(dir=="up"){
                X = headX;
                Y= headY-1;

            }
            else if(dir=="down"){
                X = headX;
                Y = headY+1;
            }

            this.cell.unshift({x:X,y:Y});

            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);

            if(this.cell[0].y < 0 || this.cell[0].y > lastY || this.cell[0].x < 0 || this.cell[0].x > lastX){
                gameOver =true;
            }

            document.getElementById("score").innerHTML=score;

            document.getElementById("Hscore").innerHTML=Hscore;
        },

    };
    snake.creatSnake();

    function keyPressed(e) {
        if(e.key=="ArrowRight"){
            if(snake.direction != "left")
                snake.direction="right";
        }

        else if(e.key=="ArrowLeft"){
            if(snake.direction!="right")
            snake.direction="left";
        }
        else if(e.key=="ArrowUp"){
            if(snake.direction!="down")
            snake.direction="up";
        }
        else if(e.key=="ArrowDown"){
            if(snake.direction!="up")
            snake.direction="down";
        }
        else{
            console.log("wrong key pressed");
        }
    }
    document.getElementById("goContent").classList.add("hidden");
    document.addEventListener('keydown',keyPressed);


}

function getRandomFood() {
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"green"
    }
    return food;
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSanke();
    pen.drawImage(foodImg,food.x*cs,food.y*cs,cs,cs);
}

function update(){
    console.log("updating snake");
    snake.updateSnake();
}

function gameLoop(){
    if(gameOver==true){
        console.log("Game over");
        clearInterval(f);
        alert("Game over.\nYour tatalScor is "+score);
        document.getElementById("goContent").classList.remove("hidden");
        if(score > Hscore){
            Hscore = score;
        }
    }
    draw();
    update();
}
function loadGame(){
    init();
    f = setInterval(gameLoop,200);
}
loadGame();