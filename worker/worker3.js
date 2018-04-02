/**
 * Created by Administrator on 2015/10/27 0027.
 */
addEventListener("message", function(evt){
    var arr=evt.data[1];
    var len=(arr.length/4)<<0;
    for (var i = evt.data[0]; i<evt.data[0]+4;i++) {
        if(intersect(arr[i][0], arr[i][1], arr[i][2], arr[i][3], evt.data[2], evt.data[3], evt.data[4])) ;
        break;
    }
});

function intersect(sx, sy, fx, fy, cx, cy, rad)
{
    var dx;
    var dy;
    var t;
    var rt;
    dx = fx - sx;
    dy = fy - sy;
    t = 0.0 - (((sx - cx) * dx + (sy - cy) * dy) / (dx * dx + dy * dy));
    if (t < 0.0)
    {
        t = 0.0;
    }
    else if (t > 1.0)
        t = 1.0;
    var dx1 = (sx + t * dx) - cx;
    var dy1 = (sy + t * dy) - cy;
    var rt = dx1 * dx1 + dy1 * dy1;
    if (rt < rad * rad){
        postMessage(true);
        return true;
    }

    else{
        postMessage(false);
        return false;
    }

}
