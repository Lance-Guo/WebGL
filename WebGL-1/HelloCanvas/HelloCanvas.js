/**
 * Created by User on 2017/4/15.
 */
function main(){
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');
    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log("Failed to get the rending context for WebGL");
        return;
    }
    //指定清空<canvas>的颜色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}