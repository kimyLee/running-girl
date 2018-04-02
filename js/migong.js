/**
 * Created by Administrator on 2015/10/19 0019.
 */
var locx=0;   //当前行坐标
var locy=0;   //当前列坐标
var zuobiaoarr = new Array(1);   //坐标数组
var tobearr = new Array();       //等待数组
var migongrow = 1;               //迷宫行数
var migongcol = 1;               //迷宫列数
var roadwidth = 10;              //道路宽度
var wallwidth = 2;               //墙厚度
var personwidth = 5;             //行走方块厚度
/*
 * 坐标类
 */
function zuobiao(x,y,f){
    this.x=x;
    this.y=y;
    this.visited=f;  /* 0 not visit  1 tobevisit  2 visit*/
    this.wall = new Array(0,0,0,0); //wall left->top->right->bottom  0:closed  1:open
}
/*
 *  功能： 创建迷宫对象
 *  @param  r: 迷宫行数
 *     c: 迷宫列数
 *     s: 入口行数
 *     e: 出口行数
 *     road: 道路宽度
 *     wall: 墙体宽度
 *     psn:  行者宽度
 */
function MiGong(r,c,s,e,road,wall,psn){
    migongrow = r;
    migongcol = c;
    roadwidth = road;
    wallwidth = wall;
    personwidth = psn;
    zuobiaoarr = new Array(1);
    var migong = document.createElement("table");
    migong.setAttribute("border",0);
    migong.setAttribute("cellPadding",0);
    migong.setAttribute("cellSpacing",0);
    migong.setAttribute("id","migong");
    document.getElementsByTagName("center")[0].appendChild(migong);
    for(var i=0;i<migongrow*2+1;i++){
        var r = migong.insertRow(-1);
        for(var j=0;j<migongcol*2+1;j++){
            var cell = r.insertCell(-1);
            if(i%2){
                if(j%2)
                    cell.style.cssText="height:" + roadwidth + "px;width:" + wallwidth + "px;background-color:#eeeeee";
                else
                    cell.style.cssText="height:" + roadwidth + "px;width:" + wallwidth + "px;background-color:#333333";
            }else{
                if(j%2)
                    cell.style.cssText="height:" + wallwidth + "px;width:" + roadwidth + "px;background-color:#333333";
                else
                    cell.style.cssText="height:" + wallwidth + "px;width:" + wallwidth + "px;background-color:#333333";
            }
        }
    }
    //初始化坐标
    for(var i=1;i<=migongrow;i++)
        for(var j=1;j<=migongcol;j++){
            var len = zuobiaoarr.length;
            zuobiaoarr[len] = new zuobiao(i,j,0);
            zuobiaoarr[len].index=(i-1) * migongcol + j;
            //zuobiaoarr[len].index = (i-1) * migongrow + j;
            //顶层设置不可开
            if(i==1)
                zuobiaoarr[len].wall[1]=1;
            //底层设置不可开
            if(i==migongrow)
                zuobiaoarr[len].wall[3]=1;
            //左边设置不可开
            if(j==1)
                zuobiaoarr[len].wall[0]=1;
            //右边设置不可开
            if(j==migongcol)
                zuobiaoarr[len].wall[2]=1;
        }
    CreateMG(s,1,e,migongcol);

}
/*
 * 功能: 把节点加入等待队列
 * @param  zuo: 要加入的节点
 */
function AddTobe(zuo){
    if(!zuo) return;
    zuo.visited=1;
    tobearr[tobearr.length] = zuo;
}

/*
 * 功能: 取出等待队列最后一个节点
 */
var  RemoveTobe=function(){
    var zuo = tobearr[tobearr.length-1];
    if(tobearr.length>0)
        tobearr.length -= 1;
    return zuo;
}
/*
 * 功能： 打墙
 * @param : zuo  当前位置节点
 */
function hole(zuo){
    var tobehole = new Array();
    var x = zuo.x;
    var y = zuo.y;
    zuo.flag=2;
    var aflag = new Array();

    var len = 0;
    if(zuo.visited==2)
        return;
    zuo.visited=2;
    //选择可打墙
    var ztmp=null;
    for(var i=0;i<4;i++){
        switch(i){
            case 0:
                ztmp = zuobiaoarr[zuo.index-1];
                if(ztmp && !ztmp.visited)
                    ztmp.wall[2]=1;
                break;
            case 1:
                ztmp = zuobiaoarr[zuo.index-migongcol];
                if(ztmp  && !ztmp.visited )
                    ztmp.wall[3]=1;
                break;
            case 2:
                ztmp = zuobiaoarr[zuo.index+1];
                if(ztmp  && !ztmp.visited)
                    ztmp.wall[0]=1;
                break;
            case 3:
                ztmp = zuobiaoarr[zuo.index+migongcol];
                if(ztmp  && !ztmp.visited)
                    ztmp.wall[1]=1;
                break;
        }
        if(ztmp && !zuo.wall[i] && !ztmp.visited){
            len = aflag.length;
            zuo.wall[i] = 1;
            aflag[len] = ztmp;
            MakeHole(i,zuo);
        }
    }
    len = aflag.length;
    var xx=0;
    if(len>0){
        xx = Math.floor(Math.random()*10);
        for(var i=0;i<len;i++){
            AddTobe(aflag[xx%len]);
            xx++;
        }
        xx = Math.floor(Math.random()*len);
    }
}
/*
 * 功能： 开墙
 * @param : xx 哪一面    0 left  1 top  2 right  3 bottom
 *          zuo 需要打墙的坐标
 */
function MakeHole(xx,zuo){
    var tbl = document.getElementById("migong");
    switch (xx) {
        case 0: //left
            tbl.rows[zuo.x * 2 - 1].cells[(zuo.y - 1) * 2].style.backgroundColor = "#eeeeee";
            break;
        case 1: //top
            tbl.rows[(zuo.x - 1) * 2].cells[zuo.y * 2 - 1].style.backgroundColor = "#eeeeee";
            break;
        case 2: //right
            tbl.rows[zuo.x * 2 - 1].cells[zuo.y * 2].style.backgroundColor = "#eeeeee";
            break;
        case 3: //bottom
            tbl.rows[zuo.x * 2].cells[zuo.y * 2 - 1].style.backgroundColor = "#eeeeee";
            break;
    }

}
/*
 *  功能：创建迷宫
 *  @param  startx: 开始位置x坐标
 *     starty: 开始位置y坐标
 *     endx  : 结束位置x坐标
 *     endy  : 结束位置y坐标
 */
function CreateMG(startx,starty,endx,endy){
    var xx = startx;
    var yy = starty;
    locx = endx;
    locy = endy;
    var zuo = zuobiaoarr[(startx-1) * migongcol + starty];
    zuo.visited = 2;

    MakeHole(0,zuo);
    MakeHole(2,zuobiaoarr[(endx-1) * migongcol + endy]);
    AddTobe(zuo);
    while(1){
        var node = RemoveTobe();
        if(!node) break;
        hole(node);
    }
    var tbl = document.getElementById("migong");
    var obj = tbl.rows[endx*2-1].cells[endy*2-1];
    var xx = getAbsLoc(obj);
    var left = xx[0]+(roadwidth-personwidth)/2;
    var top = xx[1]+(roadwidth-personwidth)/2;

    //创建行走方块
    var oper = document.createElement("div");
    oper.style.cssText="lineheight:" + personwidth + "px;width:" + personwidth + "px;height:" + personwidth + "px;background:#ff2222;position:absolute;left:"+ left + "px;top:" + top + "px";
    oper.setAttribute("id","migperson");
    document.body.appendChild(oper);
    tbl.rows[startx*2-1].cells[starty*2-1].style.backgroundColor="#ffcc22";

}
/*
 * 功能: 按键事件
 */
document.onkeydown = function(){
    var oper = document.getElementById("migperson");
    switch(event.keyCode){
        case 37:
            if (locy > 1 && zuobiaoarr[(locx-1) * migongcol + locy].wall[0]) {
                oper.style.left = parseInt(oper.style.left) - (roadwidth+wallwidth);
                locy -= 1;
            }
            break;
        case 39:
            if (locy < migongcol && zuobiaoarr[(locx - 1) * migongcol + locy].wall[2]) {
                oper.style.left = parseInt(oper.style.left) + (roadwidth+wallwidth);
                locy += 1;
            }
            break;
        case 38:
            if (locx > 1 && zuobiaoarr[(locx - 1) * migongcol + locy].wall[1]) {
                oper.style.top = parseInt(oper.style.top) - (roadwidth+wallwidth);
                locx -= 1;
            }
            break;
        case 40:
            if (locx < migongrow && zuobiaoarr[(locx - 1) * migongcol + locy].wall[3]) {
                oper.style.top = parseInt(oper.style.top) + (roadwidth+wallwidth);
                locx += 1;
            }
            break;
    }
}
/*
 *  功能: 获取绝对位置
 *  @param  obj: 待获取地址的对象
 */
function getAbsLoc(obj){
    var xx = new Array(2);
    xx[0] = 0;
    xx[1] = 0;
    while(obj){
        xx[0] += obj.offsetLeft;
        xx[1] += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return xx;

}