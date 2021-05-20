//获取最外面的div
function my$(br) {
    return document.getElementById(br);
}
var box = my$("box");
//获取相框
var screen = box.children[0];
//获取相框的宽度
var imgWidth = screen.offsetWidth;
//获取ul
var ulObj = screen.children[0];
//获取ul中的所有的li
var list = ulObj.children;
//获取ol
var olObj = screen.children[1];
//焦点的div
var arr = my$("arr");
var pic = 0;//全局变量
//创建小按钮----根据ul中的li个数
for (var i = 0; i < list.length; i++) {

    var liObj = document.createElement("li");
    olObj.appendChild(liObj);


    liObj.setAttribute("index", i);

    liObj.onmouseover = function () {

        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        //设置当前鼠标进来的li的背景颜色
        this.className = "bs";
        //获取鼠标进入的li的当前索引值
        pic = this.getAttribute("index");
        //移动ul
        animate(ulObj, -pic * imgWidth);
    };
}
//设置ol中第一个li有背景颜色
olObj.children[0].className = "";

//克隆一个ul中第一个li,加入到ul中的最后=====克隆
ulObj.appendChild(ulObj.children[0].cloneNode(true));

//自动播放
var timeId = setInterval(clickHandle, 3000);

//鼠标进入到box的div显示左右焦点的div
box.onmouseover = function () {
    arr.style.display = "block";
    //鼠标进入废掉之前的定时器
    clearInterval(timeId);
};
//鼠标离开到box的div隐藏左右焦点的div
box.onmouseout = function () {
    arr.style.display = "none";
    //鼠标离开自动播放
    timeId = setInterval(clickHandle, 3000);
};
//右边按钮
my$("right").onclick = clickHandle;
function clickHandle() {

    if (pic == list.length - 1) {
        //如何从第6个图,跳转到第一个图
        pic = 0;//先设置pic=0
        ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
    }
    pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
    animate(ulObj, -pic * imgWidth);
    if (pic == list.length - 1) {
        //第五个按钮颜色干掉
        olObj.children[olObj.children.length - 1].className = "";
        //第一个按钮颜色设置上
        olObj.children[0].className = "current";
    } else {
        //干掉所有的小按钮的背景颜色
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }

};
//左边按钮
my$("left").onclick = function () {
    if (pic == 0) {
        pic = 5;
        ulObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(ulObj, -pic * imgWidth);
    //设置小按钮的颜色---所有的小按钮干掉颜色
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    //当前的pic索引对应的按钮设置颜色
    olObj.children[pic].className = "current";

};

//设置任意的一个元素,移动到指定的目标位置
function animate(element, target) {
    clearInterval(element.timeId);

    element.timeId = setInterval(function () {

        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 10);
}