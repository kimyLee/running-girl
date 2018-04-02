/**
 * Created by Administrator on 2015/10/19 0019.
 */


function Wall(sx,sy,fx,fy,width,stylestring) {
    this.sx = sx;    //墙体绘制的起始点（sx,sy）
    this.sy = sy;
    this.fx = fx;    //墙体绘制的结束点(fx,fy)
    this.fy = fy;
    this.width = width;    //墙体的厚度
    this.draw = drawAline;    //墙体绘制方法
    this.strokestyle = stylestring;//设置墙体的描边样式
}

function drawAline() {
    //墙体的绘制方法很简单，就是绘制简单的线条
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.strokestyle;
    ctx.beginPath();
    ctx.moveTo(this.sx,this.sy);
    ctx.lineTo(this.fx,this.fy);
    ctx.stroke();
}
function intersect(sx,sy,fx,fy,cx,cy,rad) {
    var dx;
    var dy;
    var t;
    var rt;

    dx = fx-sx;
    dy = fy-sy;
    t =0.0-((sx-cx)*dx+(sy-cy)*dy)/((dx*dx)+(dy*dy));
    if (t<0.0) {
        t=0.0;
    }else if (t>1.0) {
        t = 1.0;
    }

    dx = (sx+t*(fx-sx))-cx;
    dy = (sy +t*(fy-sy))-cy;
    rt = (dx*dx) +(dy*dy);
    if (rt<(rad*rad)) {
        return true;
    }else {
        return false;
    }
}

