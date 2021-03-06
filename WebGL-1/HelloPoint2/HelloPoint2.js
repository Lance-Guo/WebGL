/**
 * Created by User on 2017/4/15.
 */
/**
 * Created by User on 2017/4/15.
 */
//设置定点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n ' +
    'gl_Position = a_Position; \n' + //设置坐标
    'gl_PointSize = a_PointSize; \n' +
    '}\n';

//设置片元着色器程序
var FSHADER_SOURCE =
    'void main(){\n' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0); \n'+ //设置颜色
    '}\n';
function main(){
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');

    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log("Failed to get the rending context for WebGL");
        return;
    }

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initialize shader.");
    }

    //获取attribute变量的存储位置、
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_Position < 0 || a_PointSize < 0){
        console.log("Failed to get the location of a_Position.");
    }

    //将顶点位置传给attribute变量
    gl.vertexAttrib1f(a_Position,0.0,0.0,0.0);
    //强顶点大小传给attribute变量
    gl.vertexAttrib1f(a_PointSize,20.0);

    //指定清空<canvas>的颜色也是设置背景颜色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.POINTS,0,1);
}