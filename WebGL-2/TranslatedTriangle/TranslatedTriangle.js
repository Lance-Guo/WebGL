/**
 * Created by User on 2017/4/15.
 */
//设置定点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform vec4 u_translation;\n' +
    'void main() {\n ' +
    'gl_Position = a_Position + u_translation; \n' + //设置坐标
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

    //设置顶点位置
    var n = initVertexBuffers(gl);
    if(n < 0){
        console.log('Failed to set position of vertex');
    }

    //记录偏移量
    var Tx = 0.5, Ty = 0.5, Tz =0.0;

    //将平移距离传给顶点着色器
    var u_translation = gl.getUniformLocation(gl.program, 'u_translation');
    if(!u_translation){
        console.log('Failed to get the location of u_translation');
    }
    gl.uniform4f(u_translation,Tx,Ty,Tz,0.0);

    //指定清空<canvas>的颜色也是设置背景颜色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三个点
    gl.drawArrays(gl.TRIANGLES,0,n);
}
function initVertexBuffers(gl) {
    var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
    var n = 3;//点的个数

    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create vertex buffer.');
        return -1;
    }

    //绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //向缓冲区写数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //获取attribute变量的存储位置、
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log("Failed to get the location of a_Position.");
    }

    //将缓冲区对象分配给attribute变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //开启attribute对象
    gl.enableVertexAttribArray(a_Position);

    return n;

}