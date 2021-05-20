function addScript(url) {
    document.write("<script language=javascript src='../Ajax/ajax1.js'></script>");
}

let xAxis1, series;


// 柱状图形
ajax("week").then(res => {
    xAxis1 = res.data.xAxis;
    series = res.data.series
    // console.log(option.xAxis.data)

    var chartDom = document.getElementById('main3');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        xAxis: {
            type: 'category',
            data: xAxis1
        },
        tooltip: {
            show: true
        },
        title: {
            left: 'center',
            text: '柱状图形展示',
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: series,
            type: 'bar'
        }]
    };

    option && myChart.setOption(option);
})

//曲线图
ajax("month").then(res => {
    const series1 = res.data.series
    const xAxis1 = res.data.xAxis
    var chartDom = document.getElementById('main1');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        xAxis: {
            type: 'category',
            data: xAxis1
        },
        tooltip: {
            show: true
        },
        title: {
            left: 'center',
            text: '曲线图数据展示',
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: series1,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                }
            }
        }]
    };

    option && myChart.setOption(option);
})

// 饼状状图数据
ajax("week").then(res => {
    let kk = [];
    for (let i = 0; i < series.length; i++) {
        kk.push({ value: series[i], name: xAxis1[i] })
    }
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '饼状状图数据展示',

            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: kk,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

})


// 事件绑定
var int1 = document.getElementById("navbottright").getElementsByTagName("li");
for (var i = 0; i < int1.length; i++) {
    int1[i].onclick = function () {
        for (var j = 0; j < int1.length; j++) {
            int1[j].style.borderBottom = "2px #f5f8f9 solid";
        }
        this.style.borderBottom = "2px #999 solid";
    }
}




















// function ajax(url) {
//     const baseURL = "https://edu.telking.com/api/?type=";
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", baseURL + url, true);
//         xhr.send();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if (xhr.status >= 200 && xhr.status < 300) {
//                     //把json数据转换为对象
//                     resolve(JSON.parse(xhr.response))
//                 } else { reject(xhr.status); }
//             }
//         }
//     })
// }