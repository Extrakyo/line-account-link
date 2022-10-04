// var now = new Date();
// var month = ("0" + (now.getMonth() + 1)).slice(-2);
// var day = ("0" + now.getDate()).slice(-2);
// var today = now.getFullYear() + "-" + (month) + "-" + (day);
// var past = now.getFullYear() + "-" + (month) + "-" + ("0" + (parseInt(day, 10) - 6).toString()).slice(-2);
// // console.log(now);
// // console.log(month);
// // console.log(day);
// console.log(now.getFullYear() + "-" + (month) + "-" + ("0" + (parseInt(day, 10) - 6).toString()).slice(-2));
// $('#endD').val(today);
// $('#startD').val(past);

// const ctx = document.getElementById('oneWeekLineChart');
// const ctx2 = ctx.getContext("2d");

// // let gradient = ctx2.createLinearGradient(0, 0, 0, 300);
// // gradient.addColorStop(0, "rgba(56, 129, 212, 0.8)");
// // gradient.addColorStop(1, "rgba(56, 129, 212, 0)");

// function getGradient(ctx, chartArea) {
//     let gradient = ctx2.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//     gradient.addColorStop(0, "rgba(56, 129, 212, 0.8)");
//     gradient.addColorStop(1, "rgba(56, 129, 212, 0)");
//     return gradient;
// }

// let delayed;
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10'],
//         datasets: [{
//             label: '',
//             data: [12000, 19000, 5000, 8000, 16000, 10000, 7000],
//             backgroundColor: function (context) {
//                 const chart = context.chart;
//                 const {
//                     ctx,
//                     chartArea
//                 } = chart;
//                 if (chartArea) {
//                     return getGradient(ctx, chartArea);
//                 }
//             },
//             borderColor: [
//                 'rgba(56, 129, 212, 1)'
//             ],
//             borderWidth: 1,
//             fill: true
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 // beginAtZero: true,
//                 beginAtZero: false,
//                 ticks: {
//                     callback: function (value) {
//                         return (value >= 1000) ? (value / 1000) + "K" : value;
//                     }
//                 }
//             },
//             xAxes: {
//                 ticks: {
//                     autoSkip: false,
//                     maxRotation: 45,
//                     minRotation: 0
//                 }
//             }
//         },
//         // transitions: {
//         //     duration: 400,
//         // },
//         // animations: {
//         //     tension: {
//         //         duration: 1000,
//         //         easing: 'linear',
//         //         from: 1,
//         //         to: 0,
//         //         loop: false
//         //     }
//         // },
//         animation: {
//             onComplete: () => {
//                 delayed = true;
//             },
//             delay: (context) => {
//                 let delay = 0;
//                 if (context.type === 'data' && context.mode === 'default' && !delayed) {
//                     delay = context.dataIndex * 300 + context.datasetIndex * 100;
//                 }
//                 return delay;
//             },
//         },
//         plugins: {
//             legend: {
//                 display: false
//             },
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         resizeDelay: 100,
//     }
// });

// // window.addEventListener('beforeprint', () => {
// //     myChart.resize(100, 100);
// // });

// // window.addEventListener('afterprint', () => {
// //     myChart.resize();
// // });

// window.onresize = () => {
//     console.log('resizing');
//     myChart.resize();
// };

var chartDom = document.getElementById('oneWeekLineChart');
var myChart = echarts.init(chartDom);
var option;

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
// let date = ['05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10'];
let date = [];

var now = dayjs().format('MM-DD');
for (i = 6; i >= 0; i--) {
    var past = dayjs(now).subtract(i, 'day').format('MM-DD');
    date.push(past);
}

let data = [12000, 19000, 5000, 8000, 16000, 10000, 7000];
option = {
    toolbox: {
        top: 10,
        right: 55,
        itemSize: 16,
        itemGap: 16,
        feature: {
            dataZoom: {
                yAxisIndex: "none",
                title: {
                    zoom: '區域縮放',
                    back: '還原縮放'
                },
                icon: {
                    zoom: 'path://M12 4H4V12H12V4Z M44 36H36V44H44V36Z M12 36H4V44H12V36Z M44 4H36V12H44V4Z M8 36V12 M40 36V12 M12 8H36 M12 40H36',
                    back: 'path://M30 6H42V18 M18 6H6V18 M30 42H42V30 M18 42H6V30 M42 6L29 19 M19 29L6 42'
                }
            },
            saveAsImage: {
                show: true,
                excludeComponents: ['toolbox', 'dataZoom'],
                title: '保存為圖片',
                name: '營業額折線圖',
                icon: 'path://M6 24.0083V42H42V24 M33 23L24 32L15 23 M23.9917 6V32'
            }
        },
        iconStyle: {
            borderWidth: 2
        }
    },
    tooltip: {
        trigger: 'axis',
        valueFormatter: function (value) {
            // return 'NT$ ' + value
            return 'NT$ ' + value.toLocaleString('en-US')
        }
        // position: function (pt) {
        //     return [pt[0], '10%'];
        // }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
        axisLabel: {
            fontSize: '0.75rem',
            margin: 20,
            rotate: 25
        },
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
            formatter: function (value) {
                return value >= 1000 ? value / 1000 + 'K' : value;
            },
            fontSize: '0.75rem',
            margin: 20
        },
        min: function (value) {
            return value.min - 2000;
        },
        max: function (value) {
            return value.max + 2000;
        }
    },
    // dataZoom: [{
    //         type: 'slider',
    //         show: true,
    //         xAxisIndex: [0],
    //         start: 0,
    //         end: 100
    //     },
    //     {
    //         type: 'slider',
    //         show: false,
    //     }
    // ],
    grid: {
        top: 75,
        left: 20,
        right: 10,
        // bottom: 60, // With dataZoom
        bottom: 20,
        containLabel: true
    },
    series: [{
        name: '營業額',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 10,
        sampling: 'lttb',
        itemStyle: {
            color: 'rgba(56, 129, 212, 1)'
        },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(56, 129, 212, 0.8)'
                },
                {
                    offset: 1,
                    color: 'rgba(56, 129, 212, 0)'
                }
            ])
        },
        data: data
    }]
};

option && myChart.setOption(option);

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme == 'dark') {
    myChart.setOption({
        yAxis: {
            splitLine: {
                lineStyle: {
                    color: ['#333']
                }
            }
        },
        // dataZoom: {
        //     fillerColor: 'rgba(17, 17, 17, 0.4)',
        //     moveHandleStyle: {
        //         color: '#333',
        //     }
        // },
        toolbox: {
            feature: {
                saveAsImage: {
                    backgroundColor: '#222',
                }
            },
            emphasis: {
                iconStyle: {
                    // color: '#fff',
                    textBackgroundColor: '#111',
                    textPadding: [5, 5, 5, 5],
                    textBorderRadius: [5, 5, 5, 5],
                    borderColor: '#fff'
                }
            },
            iconStyle: {
                borderColor: '#aaa'
            }
        }
    });
} else {
    myChart.setOption({
        yAxis: {
            splitLine: {
                lineStyle: {
                    color: ['#e3e3e3']
                }
            }
        },
        // dataZoom: {
        //     fillerColor: 'rgba(227, 227, 227, 0.4)',
        //     moveHandleStyle: {
        //         color: '#e3e3e3',
        //     }
        // },
        toolbox: {
            feature: {
                saveAsImage: {
                    backgroundColor: '#fff',
                }
            },
            emphasis: {
                iconStyle: {
                    // color: '#111',
                    textBackgroundColor: '#e3e3e3',
                    textPadding: [5, 5, 5, 5],
                    textBorderRadius: [5, 5, 5, 5],
                    borderColor: '#111'
                }
            },
            iconStyle: {
                borderColor: '#444'
            }
        }
    });
}

// None debounce
window.onresize = function () {
    myChart.resize();
};

// Debounce with 500ms
// var resizeFunc = debounce(500);

// function debounce(delay) {
//     var timerId;
//     return function () {
//         clearTimeout(timerId);
//         timerId = setTimeout(function () {
//             myChart.resize();
//         }, delay);
//     }
// }

// window.onresize = resizeFunc;