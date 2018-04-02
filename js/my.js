
var fps=55;
var boxx=0;
var boxy=0;
var gameTimeNum=3000;
var boxwidth= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var boxheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
var id;
var planeImage;
var planex;
var planey;
var planewidth=30;
var planeheight=80;
var sp=0;
var spe=0;
/*var bulletx=0;
var heroBullet;
var bullety=0;
var speed=10;
var enemyx=0;*/
var theEnemy;
var img;
var img2;
var img1posy=0;
var img2posy=-boxheight;
//var heroBullets=new Array();
var allEnemy=new Array();

var enemyImage=new Image();
var enemywidth=60;
var enemyheight=20;
var road1=((0.5+boxwidth*17/64)|0);
var road2=((0.5+boxwidth/2)|0);
var road3=((0.5+boxwidth*47/64)|0);
var right=((0.5+boxwidth*13/16)|0);
var left=((0.5+boxwidth*5/32)|0);

/*var bulletwidth=10;
var bulletheight=10;
var gameTimeer;*/
var score=0;
//var btimeer;
var etimeer;
//var total;
//var bingoImage=new Image();
var hero1;
var hero2;
var hero3;
var hero4;
var hero5;
var hero6;
var hero7;
var hero8;
//bingoImage.src="images/bingo.PNG";
enemyImage.src="image/zhanai.png";
//bulletImage=new Image();
//bulletImage.src="images/newbullet.PNG";

function beginPlane(){
  //  planeImage=new Image();
  //  planeImage.src="image/hero.png";
    hero1=new Image();
    hero1.src="image/hero1.png";
 hero2=new Image();
    hero2.src="image/hero2.png";
 hero3=new Image();
    hero3.src="image/hero3.png";
 hero4=new Image();
    hero4.src="image/hero4.png";
 hero5=new Image();
    hero5.src="image/hero5.png";
 hero6=new Image();
    hero6.src="image/hero6.png";
 hero7=new Image();
    hero7.src="image/hero7.png";
 hero8=new Image();
    hero8.src="image/hero8.png";


    planex=(boxwidth-planewidth)/2;
   // planey=boxheight-planeheight-20;
   planey=boxheight-100;
}
function beginback(){

    img = new Image();
    img2 = new Image();

    img.src = "image/back.png";
    img2.src = "image/back.png";

}
function init(){
    sp=0;

    ctx=document.getElementById('canvas').getContext('2d');
    ctx.lineWidth=2;
    canvas=document.getElementById('canvas');

    beginback();

    beginPlane();
    var body=document.getElementsByTagName("body")[0];
    //btimeer=setInterval(produceBullet, 500);
    //etimeer=setInterval(procuceEnemy, 2600);


    if (window && window.DeviceOrientationEvent)
        window.addEventListener("deviceorientation", orientationHandler, false);


    function orientationHandler(event) {

        if (planex >= left && (planex + planewidth) < right) {
            //sp = 3;
            if(event.gamma>8||event.gamma<-8)
            spe = event.gamma * 0.15;
            else
            spe=0;
          /*  if(planex==road1-planex/2||planex==road2-planex/2||planex==road3-planex/2){
                spe=0;
            }*/
            planex = planex + spe; //左右

        }
        else {
            //sp = 3;
            if ((planex >= left && event.gamma < 0) || ((planex + planewidth) < right && event.gamma > 0)) {
                spe = event.gamma * 0.2;
                planex = planex + spe; //左
                if(planex==road1-planex/2||planex==road2-planex/2||planex==road3-planex/2){
                    spe=0;
                }
            }


        }
    }
      /*  if(event.gamma<-10&&planex==(road2-planewidth/2)){
            while(planex>road1-planewidth/2)
            {
                planex=planex-0.1;
                console.log(planex);
            }
            planex=planex+0.1;
        }

        if(event.gamma<-10&&planex==(road3-planewidth/2)){
            while(planex>road2-planewidth/2)
            {
                planex=planex-0.1;
            }
        }
        if(event.gamma>10&&planex==(road2-planewidth/2)){
            while(planex<road3-planewidth/2)
            {
                planex=planex+0.1;
            }
        }
        if(event.gamma>10&&planex==(road1-planewidth/2)){
            while(planex<road2-planewidth/2)
            {
                planex=planex+0.1;
            }
        }




    }*/

    /*body.addEventListener("keydown",function(event){
        switch (event.keyCode){
            case 37:{if(planex>boxx){sp=8;}else{sp=0;}planex=planex-sp;break;}   //左
            case 39:{if((planex+planewidth)<boxwidth){sp=5;}else{sp=0;console.log(boxwidth);console.log(planewidth);console.log(planex);}planex=planex+sp;break;}  //右
            case 38:{if(planey>boxy){sp=4;}else{sp=8;}planey=planey-sp;break;}//上
            case 40:{if((planey+planeheight)<boxheight){sp=8;}else{sp=0;}planey=planey+sp;break;}  //下
            default :break;
        }
    },false);*/
    run();

 //   gameTimeer=setInterval(run,1000/fps);
}
function drawback(){
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    ctx.drawImage(img, 0, img1posy,boxwidth,boxheight);
    ctx.drawImage(img2, 0, img2posy,boxwidth,boxheight);
    img1posy+=1.3;
    img2posy+=1.3;
    if(img1posy>boxheight){
        img1posy=0;
    }
    if(img2posy>0){
        img2posy=-boxheight;
    }
}
function drawback2(){
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    ctx.drawImage(img, 0, img1posy,boxwidth,boxheight);
    ctx.drawImage(img2, 0, img2posy,boxwidth,boxheight);
    img1posy+=2.6;
    img2posy+=2.6;
    if(img1posy>boxheight){
        img1posy=0;
    }
    if(img2posy>0){
        img2posy=-boxheight;
    }
}
function drawPlane(){
    gameTimeNum--;
    var cout=(0.5 + gameTimeNum/5) | 0;
    switch (cout%6){
        case 0:ctx.drawImage(hero1,planex,planey,planewidth,80);break;
        case 1:ctx.drawImage(hero2,planex,planey,planewidth,80);break;
        case 2:ctx.drawImage(hero3,planex,planey,planewidth,80);break;
        case 3:ctx.drawImage(hero4,planex,planey,planewidth,80);break;
        case 4:ctx.drawImage(hero5,planex,planey,planewidth,80);break;
        case 5:ctx.drawImage(hero6,planex,planey,planewidth,80);break;
        case 6:ctx.drawImage(hero7,planex,planey,planewidth,80);break;
        case 7:ctx.drawImage(hero8,planex,planey,planewidth,80);break;
        default :break;

    }
   // ctx.drawImage(planeImage,planex,planey,planewidth,planeheight);
}



    function procuceEnemy() {
        var i= (0.5+(Math.random() * 3))|0;
        var x;
        switch (i){

            case 1:x=road1-enemywidth/2;break;
            case 2:x=road2-enemywidth/2;break;
            case 3:x=road3-enemywidth/2;break;
            default :break;
        }
        theEnemy = new Enemy(x, 10);
        allEnemy.push(theEnemy);
        console.log(allEnemy);
        allEnemy[(allEnemy.length - 1)].timer = setInterval(" if (allEnemy["+(allEnemy.length - 1)+"]) allEnemy["+(allEnemy.length - 1)+"].run()", 30);

    }
function procuceEnemy2() {
    var i= (0.5+(Math.random() * 3))|0;
    var x;
    switch (i){

        case 1:x=road1-enemywidth/2;break;
        case 2:x=road2-enemywidth/2;break;
        case 3:x=road3-enemywidth/2;break;
        default :break;
    }
    theEnemy = new Enemy(x, 10);
    allEnemy.push(theEnemy);
    console.log(allEnemy);
    allEnemy[(allEnemy.length - 1)].timer = setInterval(" if (allEnemy["+(allEnemy.length - 1)+"]) allEnemy["+(allEnemy.length - 1)+"].run()", 15);

}
    function Enemy(x, y) {
        this.x = x;
        this.y = y;
        this.timer = null;
        this.isLive = true;
        this.run = function run() {


            if (this.y > boxheight || this.isLive == false) {

                window.clearInterval(this.timer);

                this.isLive = false;
            }

            else {
                this.y += 2.5;

            }
        }
    }

    function drawEnemy() {
        for (var i = 0; i < allEnemy.length; i++) {
            if (allEnemy[i].isLive ==true) {
                ctx.drawImage(enemyImage, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);
            }
        }
    }




function stop(){
    // clearInterval(gameTimeer);
  //  clearInterval(timer);

   // clearInterval(etimeer);
     ctx.clearRect(boxx,boxy,boxwidth,boxheight);
   // alert(allEnemy.length);
    allEnemy.length=0;

    // 这里有问题
   // allEnemy.splice(1,1);          //这里有问题
   /* var start=document.getElementById("start");
    start.style.display="";
    document.getElementById("showScore").style.display="";
    document.getElementById("rules").style.display="";*/
    document.getElementById("menu").style.display="none";

    showScore();
    score=0;
}
    function checkPlane(){
        for (var j = 0; j < allEnemy.length; j++) {
            if (allEnemy[j].isLive) {
                var e = allEnemy[j];
                var dis=e.y+enemyheight-planey;
                    //  if(planex> e.x-planewidth&&planex< e.x+enemywidth&& e.y+enemyheight>planey){
                      if(planex> e.x-planewidth&&planex< e.x+enemywidth&& dis>0&& dis<50){
                          sp=1;
                         stop();
                      }
                        //else{ score+=0.1;}
            }}
    }


    function drawScore(){
      //  var score1=(0.5 + score) | 0;
       // var _gametime=(0.5 + gameTimeNum/1.2) | 0;
        var second=( gameTimeNum/50-0.5) | 0;
       // var second2=gameTimeNum%100;
     //  document.getElementById("time").innerHTML=second+"\'"+second2+"\"";
       document.getElementById("time").innerHTML=second;
    }
    function run() {
        /*if(gameTimeNum>=2000) {
            drawback();
            drawPlane();
            if (gameTimeNum % 100 == 0) {
                procuceEnemy();
            }
        }*/
     //   else {
            drawback2();
            drawPlane();
            if (gameTimeNum % 100 == 0) {
                procuceEnemy2();
            }
   //     }
        drawEnemy();
        drawScore();
        checkPlane();
        if(sp===0)
        window.requestAnimationFrame(run);

    }
