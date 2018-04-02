
var dis=3995;
var resdis=200;

/*$.ajax({
    type: "GET",
    //    url: "",
    dataType:'json',
    success: function(data){

         dis=data.dis;
         resdis=data.res;



    }

});*/

var temp=dis;
var discout=dis*50;
var maxdis=(0.5+(dis+60)/500)|0;
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
var planex;
var planey;
var planewidth=30;
var planeheight=80;
var sp=0;       //判断是否停止
var spe=0;

var img;
var img2;
var img1posy=0;
var img2posy=-boxheight;
var img3posy=-boxheight;
var img4posy=0;
var img5posy=-boxheight;
var img6posy=0;
var img7posy=-boxheight;

var img3;
var img4;
var img3_1;

var imgside1;
var imgside2;

var imgfix1;
//var imgfix2;

var theEnemy;
var allEnemy=new Array();

var enemywidth=60;
var enemyheight=20;
var road1=((0.5+boxwidth*17/64)|0);
var road2=((0.5+boxwidth/2)|0);
var road3=((0.5+boxwidth*47/64)|0);
var right=((0.5+boxwidth*13/16)|0);
var left=((0.5+boxwidth*5/32)|0);
var right1=((0.5+boxwidth*15/16)|0);


var hero1;
var hero2;
var hero3;
var hero4;
var hero5;
var hero6;
var hero7;
var hero8;
var enemyImage;
var enemyImage1;
var enemyImage2;
var cityimg;
var cityimg1;
var city=new Array("三雄·极光","香港","深圳","长沙","武汉","西安","不丹","卡塔尔","马尔代夫","马尔代夫");
//var time=new Array("","2015年<br/>11月17日<br/>香港", "2015年<br/>9月3日<br/>深圳","2015年<br/>11月12日<br/>长沙", "2016年<br/>3月24日<br/>武汉","2016年<br/>3月29日<br/>西安", "2015年<br/>11月12日<br/>不丹", "2015年<br/>9月8日<br/>马尔代夫","2015年<br/>9月8日<br/>马尔代夫");
function beginPlane(){

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
    planey=boxheight-100;
}
function beginback(){
    switch (maxdis){
        case 0:                     //<500
            img = new Image();
            img2 = new Image();
            img.src = "image/back.png";
            img2.src = "image/back.png";
             enemyImage1=new Image();

            enemyImage1.src="image/zhanai.png";
            break;
        case 1:                    //<940
            img = new Image();
            img2 = new Image();
                img.src =  "image/XG.png";
                img2.src =  "image/XG.png";
            enemyImage1=new Image();
            enemyImage2=new Image();

            enemyImage1.src="image/XG3.png";
            enemyImage2.src="image/XG4.png";
            cityimg=new Image();
            cityimg.src="image/city1.png";

            if(dis/500<=maxdis) {
                img3 = new Image();
                img4 = new Image();
                img3_1 = new Image();
                img3.src = "image/back.png";
                img4.src = "image/back.png";
                img3_1.src = "image/XG1.png";
                enemyImage = new Image();

                enemyImage.src = "image/zhanai.png";

            }
            break;
        case 2:                               //<1440
            img = new Image();
            img2 = new Image();
                img.src = "image/shengzhen.png";       //缺
                img2.src = "image/shengzhen.png";
            enemyImage1=new Image();

            enemyImage1.src="image/XG3.png";
            cityimg=new Image();
            cityimg.src="image/city2.png";
            if(dis/500<=maxdis){
                img3 = new Image();
                img4 = new Image();
                img3_1 = new Image();
                img3.src = "image/XG.png";
                img4.src = "image/XG.png";
                img3_1.src = "image/shengzhen1.png";
                enemyImage=new Image();

                enemyImage.src="image/XG3.png";
            cityimg1=new Image();
            cityimg1.src="image/city1.png";}
            break;
        case 3:                                 //<1940
            img = new Image();
            img2 = new Image();
            img.src = "image/changsha.png";
            img2.src = "image/changsha.png";
            enemyImage1=new Image();

            enemyImage1.src="image/tree.png";
            cityimg=new Image();
            cityimg.src="image/city3.png";
            if(dis/500<=maxdis){
                img3 = new Image();
            img4 = new Image();
            img3_1 = new Image();
            img3.src = "image/shengzhen.png";      //缺
            img4.src = "image/shengzhen.png";
            img3_1.src = "image/changsha1.png";
            enemyImage=new Image();

            enemyImage.src="image/XG3.png";
            cityimg1=new Image();
            cityimg1.src="image/city2.png";}
            break;
        case 4:                              //2440
            img = new Image();
            img2 = new Image();
            img.src = "image/wuhan.png";
            img2.src = "image/wuhan.png";
            enemyImage1=new Image();

            enemyImage1.src="image/tree.png";
            cityimg=new Image();
            cityimg.src="image/city4.png";
            if(dis/500<=maxdis){
                img3 = new Image();
            img4 = new Image();
            img3_1 = new Image();
            img3.src = "image/changsha.png";
            img4.src = "image/changsha.png";
            img3_1.src = "image/wuhan1.png";
            enemyImage=new Image();

            enemyImage.src="image/tree.png";
            cityimg1=new Image();
            cityimg1.src="image/city3.png";}
            break;
        case 5:                                   //<2940
            img = new Image();
            img2 = new Image();
            img.src = "image/xian.png";
            img2.src = "image/xian.png";
            enemyImage1=new Image();

            enemyImage1.src="image/xian3.png";
            cityimg=new Image();
            cityimg.src="image/city5.png";
            if(dis/500<=maxdis){
                img3 = new Image();
            img4 = new Image();
            img3_1 = new Image();
            img3.src = "image/wuhan.png";
            img4.src = "image/wuhan.png";
            img3_1.src = "image/xian1.png";

            enemyImage=new Image();

            enemyImage.src="image/tree.png";
                cityimg1=new Image();
                cityimg1.src="image/city4.png";
            }
            break;
        case 6:                             //<3440     //缺
            img = new Image();
            img2 = new Image();
            img.src = "image/budan.png";
            img2.src = "image/budan.png";
            enemyImage1=new Image();

            enemyImage1.src="image/budan3.png";
            cityimg=new Image();
            cityimg.src="image/city6.png";
            if(dis/500<=maxdis) {
                img3 = new Image();
                img4 = new Image();
                img3_1 = new Image();
                img3.src = "image/xian.png";
                img4.src = "image/xian.png";
                img3_1.src = "image/budan1.png";
                enemyImage = new Image();

                enemyImage.src = "image/xian3.png";
                cityimg1=new Image();
                cityimg1.src="image/city5.png";
            }
            break;
        case 7:                                 //<3940    //缺
            img = new Image();
            img2 = new Image();
            img.src = "image/kataer.png";
            img2.src = "image/kataer.png";
            enemyImage1=new Image();

            enemyImage1.src="image/kataer3.png";
            cityimg=new Image();
            cityimg.src="image/city7.png";
            if(dis/500<=maxdis){
                img3 = new Image();
            img4 = new Image();
            img3_1 = new Image();
            img3.src = "image/budan.png";
            img4.src = "image/budan.png";
            img3_1.src = "image/kataer1.png";
            enemyImage=new Image();

            enemyImage.src="image/budan3.png";
                cityimg1=new Image();
                cityimg1.src="image/city6.png";
            }
            break;
        case 8:                               // <4440
            img = new Image();
            img2 = new Image();
            img.src = "image/ma.png";
            img2.src = "image/ma.png";
            enemyImage1=new Image();

            enemyImage1.src="image/ma3.png";
            cityimg=new Image();
            cityimg.src="image/city8.png";
            if(dis/500<=maxdis) {
                img3 = new Image();
                img4 = new Image();
                img3_1 = new Image();
                img3.src = "image/kataer.png";
                img4.src = "image/kataer.png";
                img3_1.src = "image/ma1.png";
                enemyImage = new Image();

                enemyImage.src = "image/kataer3.png";
                cityimg1=new Image();
                cityimg1.src="image/city7.png";

            }
            break;
        case 9:
            img = new Image();
            img2 = new Image();
            img.src = "image/ma.png";
            img2.src = "image/ma.png";
            enemyImage1=new Image();

            enemyImage1.src="image/ma3.png";
            cityimg=new Image();
            cityimg.src="image/city8.png";

            break;


    }


}
function init(){
    sp=0;

    ctx=document.getElementById('canvas').getContext('2d');
    ctx.lineWidth=2;
    canvas=document.getElementById('canvas');
    document.getElementById("place").innerHTML =city[ dis/500 | 0];
//    document.getElementById("fixtime").innerHTML =time[dis/500| 0];


    beginback();
     imgside1=new Image();
     imgside2=new Image();
    imgside1.src="image/side.png";
    imgside2.src="image/side.png";

    imgfix1=new Image();
    imgfix1.src="image/fixpic.png";

    beginPlane();
    var body=document.getElementsByTagName("body")[0];

        if (window && window.DeviceOrientationEvent)
        window.addEventListener("deviceorientation", orientationHandler, false);

    function orientationHandler(event) {

        if (planex >= left && (planex + planewidth) < right) {
            if(event.gamma>8||event.gamma<-8)
            spe = event.gamma * 0.15;
            else
            spe=0;

            planex = planex + spe; //左右

        }
        else {
            if ((planex >= left && event.gamma < 0) || ((planex + planewidth) < right && event.gamma > 0)) {
                spe = event.gamma * 0.2;
                planex = planex + spe; //左
                if(planex==road1-planex/2||planex==road2-planex/2||planex==road3-planex/2){
                    spe=0;
                }
            }


        }
    }



    run();

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


    if(dis>maxdis*500-5) {
        ctx.drawImage(img, 0, img4posy, boxwidth, boxheight);
        ctx.drawImage(img2, 0, img5posy, boxwidth, boxheight);

        img4posy += 2.6;
        img5posy += 2.6;
        if (img4posy > boxheight) {
            img4posy = 0;
        }
        if (img5posy > 0) {
            img5posy = -boxheight;
        }
    }



            if (dis<500*maxdis) {
                ctx.drawImage(img3, 0, img1posy, boxwidth, boxheight);
                ctx.drawImage(img4, 0, img2posy, boxwidth, boxheight);


                img1posy += 2.6;
                img2posy += 2.6;
                if (img1posy > boxheight) {
                    img1posy = 0;
                }
                if (img2posy > 0) {
                    img2posy = -boxheight;
                }
            }
                if ( dis < maxdis * 500 +5 &&dis >= maxdis * 500 - 5&&maxdis>0) {

                    ctx.drawImage(img3_1, 0, img3posy, boxwidth, boxheight);
                    img3posy += 2.6;
                    document.getElementById("place").innerHTML =city[dis/500| 0];
               //     document.getElementById("fixtime").innerHTML =time[dis/500| 0];


                }
    ctx.drawImage(imgside1, right+20, img6posy, boxwidth-right-20, boxheight);
    ctx.drawImage(imgside2, right+20, img7posy, boxwidth-right-20, boxheight);
    img6posy += 2.6;
    img7posy += 2.6;
    if (img6posy >boxheight) {
        img6posy = 0;
    }
    if (img7posy >0) {
        img7posy = -boxheight;
    }

    if(dis>maxdis*500-3)
        if(maxdis>0)
        ctx.drawImage(cityimg,road2-enemywidth/2-5, 120, road2-road1-10, boxheight/8);
    else
        if(maxdis>0)
        ctx.drawImage(cityimg1,road2-enemywidth/2-5, 120, road2-road1-10, boxheight/8);

    ctx.drawImage(imgfix1,road2-enemywidth/2-5, 40, road2-road1-10, boxheight/8);

    /* if (img7posy > 0) {
         img7posy = -boxheight*2/3;
     }*/

}
function drawback3(){
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    ctx.drawImage(img, 0, img1posy,boxwidth,boxheight);
    ctx.drawImage(img2, 0, img2posy,boxwidth,boxheight);
    img1posy+=3.6;
    img2posy+=3.6;
    if(img1posy>boxheight){
        img1posy=0;
    }
    if(img2posy>0){
        img2posy=-boxheight;
    }
}
function drawPlane(){
    gameTimeNum--;               //时间
    if(gameTimeNum==0){
        stop();
    }
    discout++;
    dis=(0.5 + discout/50) | 0;              //距离
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
    var i2= (0.5+(Math.random() * 3))|0;
    var x;
    var y;
    switch (i){

        case 1:x=road1-enemywidth/2;break;
        case 2:x=road2-enemywidth/2;break;
        case 3:x=road3-enemywidth/2;break;
        default :break;
    }
    switch (i2){

        case 1:y=road1-enemywidth/2;break;
        case 2:y=road2-enemywidth/2;break;
        case 3:y=road3-enemywidth/2;break;
        default :break;
    }
    if(dis>maxdis*500||dis<maxdis*500-4) {
        theEnemy = new Enemy(x, 0);
        allEnemy.push(theEnemy);
       // allEnemy[(allEnemy.length - 1)].timer = setInterval(" if (allEnemy[" + (allEnemy.length - 1) + "]) allEnemy[" + (allEnemy.length - 1) + "].run()", 12);

        theEnemy = new Enemy(y, 0);
        allEnemy.push(theEnemy);
        //allEnemy[(allEnemy.length - 1)].timer = setInterval(" if (allEnemy[" + (allEnemy.length - 1) + "]) allEnemy[" + (allEnemy.length - 1) + "].run()", 12);

    }
}

    function Enemy(x, y) {
        this.x = x;
        this.y = y;
        this.timer = null;
        this.isLive = true;
        this.run = function run() {


            if (this.y > boxheight || this.isLive == false) {

            //    window.clearInterval(this.timer);

                this.isLive = false;

            }

            else {
               // this.y+=2.5;
                //console.log(this.y);

            }
        }
    }

    function drawEnemy() {
        if(maxdis!=1) {
            if(dis>maxdis*500) {

                for (var i = 0; i < allEnemy.length; i++) {
                    allEnemy[i].y+=2.6;
                    if (allEnemy.y > boxheight){
                        allEnemy[i].isLive=false;
                    }
                    if (allEnemy[i].isLive == true) {
                        ctx.drawImage(enemyImage1, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);
                    }
                }
            }
           else {
                for (var i = 0; i < allEnemy.length; i++) {
                    allEnemy[i].y+=2.6;
                    if (allEnemy.y > boxheight){
                        allEnemy[i].isLive=false;
                    }
                    if (allEnemy[i].isLive == true) {
                        ctx.drawImage(enemyImage, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);
                    }
                }
            }
        }

        else{
            if(dis>=maxdis*500) {

                for (var i = 0; i < allEnemy.length; i++) {
                    allEnemy[i].y+=2.6;
                    if (allEnemy.y > boxheight){
                        allEnemy[i].isLive=false;
                    }
                    if (allEnemy[i].isLive == true) {
                        if(i%2==0)
                        ctx.drawImage(enemyImage1, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);
                        else
                            ctx.drawImage(enemyImage2, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);

                    }
                }
            }
            else{

                    for (var i = 0; i < allEnemy.length; i++) {
                        allEnemy[i].y+=2.6;
                        if (allEnemy.y > boxheight){
                            allEnemy[i].isLive=false;
                        }

                        if (allEnemy[i].isLive == true) {
                            ctx.drawImage(enemyImage, allEnemy[i].x, allEnemy[i].y, enemywidth, 60);
                        }
                    }

            }

        }

    }




function stop(){
    if(dis<temp+resdis) {
        sp = 1;
        // ctx.clearRect(boxx,boxy,boxwidth,boxheight);
        allEnemy.length = 0;
        /*  var result="您为XXX助跑了<b style='color:red'>"+(dis-temp)+"</b>公里，到达了<b style='color:red'>"+city[parseInt(dis/500)]+"</b>站";
         //document.getElementById("menu").style.display="none";
         document.getElementById("info").innerHTML=result;
         document.getElementById("alert1").style.display="block";*/
        var result = "您跑了<b style='color:red'>" + dis + "</b>公里，到达了<b style='color:red'>" + city[parseInt(dis / 500)] + "</b>站";
        document.getElementById("info2").innerHTML = result;
        document.getElementById("alert2").style.display = "block";
        //document.getElementById("menu").style.display="none";
    }
    else {
        sp = 1;
        allEnemy.length = 0;


        dis=temp+resdis;
        var result = "您与好友今天挑战里程已达上限，共跑了<b style='color:red'>" +dis + "</b>公里，到达了<b style='color:red'>" + city[parseInt(dis / 500)] + "</b>站,请明天加油！";
        document.getElementById("info3").innerHTML = result;
        document.getElementById("alert3").style.display = "block";
    }
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
            }}
    }


    function drawScore(){

        var second=( gameTimeNum/50-0.5) | 0;

       // var second2=gameTimeNum%100;
     //  document.getElementById("time").innerHTML=second+"\'"+second2+"\"";
       document.getElementById("time").innerHTML=second;
    }
    function run() {

            drawback2();
            drawPlane();
            if (gameTimeNum % 70 == 0) {
                procuceEnemy2();
           }


        drawEnemy();
        drawScore();
        checkPlane();
        if(sp===0)
        window.requestAnimationFrame(run);

    }
function drawRole(circle,current,arr) {
    for (var i = arr.length; i--;) {
        if (intersect(arr[i][0], arr[i][1], arr[i][2], arr[i][3], circle.x + circle.xspeed * 5, circle.y + circle.yspeed * 5, circle.r)) {
            circle.xspeed = 0;
            circle.yspeed = 0;
            circle.begin_x = 0;
            break;
        }
    }
    circle.begin_x = (circle.xspeed == 0 && circle.yspeed == 0) ? 0 : ((current / 9) << 0) % 4 * 120;
    circle.x += circle.xspeed;
    circle.y += circle.yspeed;
    //开始剪切x ,开始剪切y,被剪切宽度,被剪切高度,画布上x坐标,画布上y坐标,图像的宽度,图像的高度
    context.drawImage(image, circle.begin_x, circle.direct, 120, 120, circle.x - 15, circle.y - 15, 30, 30);
}
function drawEnemy(enemys,current) {
    enemys.y = enemys.y + enemys.yspeed;
    if (enemys.y >= 170) {
        enemys.yspeed = -1 * enemys.yspeed;
        enemys.enemy_y = 374;
    }
    if (enemys.y <= 110) {
        enemys.yspeed = -1 * enemys.yspeed;
        enemys.enemy_y = 0;
    }
    context.drawImage(en, ((current / 9) << 0) % 4 * 143, enemys.enemy_y, 126, 128, enemys.x - 10, enemys.y - 10, 50, 50);
}
function drawWall(arr,wall) {
    for (var i = arr.length; i--;) {
        var begin;
        var len;
        if (arr[i][0] - arr[i][2] == 0) {
            if (arr[i][1] > arr[i][3]) {
                begin = arr[i][3];
                len = arr[i][1] - arr[i][3];
            } else {
                begin = arr[i][1];
                len = arr[i][3] - arr[i][1];
            }
            for (var k = 0; k <= len; k += 20) {
                context.drawImage(wall, 0, 0, 30, 30, arr[i][0] - 10, begin + k - 10, 20, 20);
            }
        }
        else {
            if (arr[i][0] > arr[i][2]) {
                begin = arr[i][2];
                len = arr[i][0] - arr[i][2];
            } else {
                begin = arr[i][0];
                len = arr[i][2] - arr[i][0];
            }
            for (var j = 0; j <= len; j += 20) {
                context.drawImage(wall, 0, 0, 30, 30, begin + j - 10, arr[i][1] - 10, 20, 20);
            }
        }

    }
}