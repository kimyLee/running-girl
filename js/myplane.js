
var fps=55;
var boxx=0;
var boxy=0;
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
var planewidth=60;
var planeheight=60;
var sp=0;
var spe=0;
var bulletx=0;
var heroBullet;
var bullety=0;
var speed=10;
var enemyx=0;
var theEnemy;
//var heroBullets=new Array();
var allEnemy=new Array();

var enemyImage=new Image();
var enemywidth=30;
var enemyheight=30;
var bulletwidth=10;
var bulletheight=10;
var gameTimeer;
var score=0;
var btimeer;
var etimeer;
var total;
var bingoImage=new Image();
bingoImage.src="images/bingo.PNG";
enemyImage.src="images/newenemy.PNG";
bulletImage=new Image();
bulletImage.src="images/newbullet.PNG";

function beginPlane(){
    planeImage=new Image();
    planeImage.src="images/plane.png";
    planex=(boxwidth-planewidth)/2;
    planey=boxheight-planeheight-20;
}
function init(){
    sp=0;

    ctx=document.getElementById('canvas').getContext('2d');
    ctx.lineWidth=2;
    canvas=document.getElementById('canvas');
    beginPlane();
    var body=document.getElementsByTagName("body")[0];
    //btimeer=setInterval(produceBullet, 500);
    etimeer=setInterval(procuceEnemy, 2600);


    if (window && window.DeviceOrientationEvent)
        window.addEventListener("deviceorientation", orientationHandler, false);


    function orientationHandler(event) {
            if (planex >= boxx&&(planex + planewidth) < boxwidth) {
                //sp = 3;
                spe= event.gamma*0.22;
                planex = planex + spe; //左右

            }
        else {
            //sp = 3;
                if((planex >= boxx&&event.gamma<0)||((planex + planewidth) < boxwidth&&event.gamma>0))
                {  spe= event.gamma*0.2;
                    planex = planex + spe; //左
                     }


        }




    }

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

function drawPlane(){
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    ctx.drawImage(planeImage,planex,planey,planewidth,planeheight);
}



    function procuceEnemy() {
        var score1=(0.5 + score) | 0;

      //  var x = Math.ceil(Math.random() * (boxwidth - planewidth));
        var x = (0.5+(Math.random() * (boxwidth - planewidth)))|0;
        theEnemy = new Enemy(x, 33);
        allEnemy.push(theEnemy);
        console.log(allEnemy);

      //  var timer = window.setInterval("allEnemy[" + (allEnemy.length - 1) + "].run()", 30);   //？
        //   var timer = window.setInterval(function allrun() {

        allEnemy[(allEnemy.length - 1)].timer = setInterval(
              " if (allEnemy["+(allEnemy.length - 1)+"]) allEnemy["+(allEnemy.length - 1)+"].run()", 30);   //？


     //     allEnemy[(allEnemy.length - 1)].timer = timer;                  //？timer



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
                ctx.drawImage(enemyImage, allEnemy[i].x, allEnemy[i].y, enemywidth, enemyheight);
            }
        }
    }




function stop(){
    // clearInterval(gameTimeer);
  //  clearInterval(timer);

    clearInterval(etimeer);
     ctx.clearRect(boxx,boxy,boxwidth,boxheight);
   // alert(allEnemy.length);
    allEnemy.length=0;

    // 这里有问题
   // allEnemy.splice(1,1);          //这里有问题
    var start=document.getElementById("start");
    start.style.display="";
    document.getElementById("showScore").style.display="";
    document.getElementById("rules").style.display="";
    showScore();
    score=0;
}
    function checkPlane(){
        for (var j = 0; j < allEnemy.length; j++) {
            if (allEnemy[j].isLive) {
                var e = allEnemy[j];
                      if(planex> e.x-planewidth&&planex< e.x+enemywidth&& e.y+enemyheight>planey){
                          sp=1;
                         stop();
                      }
                        else{ score+=0.1;}
            }}
    }


    function drawScore(){
        var score1=(0.5 + score) | 0;
       document.getElementById("score").innerHTML=score1;
    }
    function run() {

        drawPlane();
       // drawBullet();
        drawEnemy();
        drawScore();
        checkPlane();
        if(sp===0)
        window.requestAnimationFrame(run);

    }
