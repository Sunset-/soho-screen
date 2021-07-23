import echarts from "echarts";
import "./worldZH";
import geo from "echarts/lib/component/geo";

// echarts.registerMap("china", chinaJson);

var SHData = [
    [{ name: "上海" }, { name: "包头", value: 95 }],
    [{ name: "上海" }, { name: "昆明", value: 90 }],
    [{ name: "上海" }, { name: "广州", value: 80 }],
    [{ name: "上海" }, { name: "郑州", value: 70 }],
    [{ name: "上海" }, { name: "长春", value: 60 }],
    [{ name: "上海" }, { name: "重庆", value: 50 }],
    [{ name: "上海" }, { name: "长沙", value: 40 }],
    [{ name: "上海" }, { name: "北京", value: 30 }],
    [{ name: "上海" }, { name: "丹东", value: 20 }],
    [{ name: "上海" }, { name: "大连", value: 10 }],
];
var geoCoordMap = {
    上海: [121.4648, 31.2891],
    丹东: [124.541, 40.4242],
    包头: [110.3467, 41.4899],
    北京: [116.4551, 40.2539],
    大连: [122.2229, 39.4409],
    广州: [113.5107, 23.2196],
    重庆: [107.7539, 30.1904],
    郑州: [14.467649, 8.512467],
    长沙: [22.553586, 49.679643],
    长春: [-116.313601 + 360, 65.042895],
    昆明: [-101.196414 + 360, 47.112682],
};
var planePath =
    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

function convertData(data) {
    var res = [];
    //console.log(data.length);长度为10
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name]; //始发地
        var toCoord = geoCoordMap[dataItem[1].name]; //目的地
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord], //一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
            });
        }
    }
    return res;
}

function loca() {
    let series = [];
    [["上海", SHData]].forEach((item, i) => {
        //console.log(item[1]);//得到上海数组
        series.push({
            type: "lines", //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
            zlevel: 1,
            effect: {
                //线特效的配置
                show: true,
                period: 3, //特效动画的时间
                trailLength: 0.9, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                color: "#fff",
                symbolSize: 2, //特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
            },
            lineStyle: {
                normal: {
                    color: "#46bee9",
                    width: 0,
                    curveness: 0.2, //边的曲度，支持从 0 到 1 的值，值越大曲度越大
                },
            },
            data: convertData(item[1]), //线数据集。
        });
    });
    return series;
}
export default function(ctx) {
    return {
        style: "width:100%",
        setOption: {
            tooltip: {
                trigger: "item",
                formatter(a, b, c) {
                    return `${a.name}<br/>${isNaN(a.value) ? 0 : a.value}`;
                },
            },
            // visualMap: {
            //     min: 800,
            //     max: 50000,
            //     text: ["High", "Low"],
            //     realtime: false,
            //     calculable: true,
            //     inRange: {
            //         color: ["#177EDB", "#0A5775"],
            //     },
            // },
            geo: {
                map: "world",
                label: {
                    show: false,
                },
                roam: false,
                zoom: "1.1",
                itemStyle: {
                    areaColor: "rgba(27,72,121,0.6)",
                    borderColor: "#ababab",
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: "transparent",
                    },
                },
            },
            series: [
                {
                    type: "map",
                    map: "world",
                    zoom: "1.1",
                    itemStyle: {
                        areaColor: "rgba(27,72,121,0.6)",
                        borderColor: "#ababab",
                    },
                    emphasis: {
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            areaColor: "transparent",
                        },
                    },
                    label: {
                        show: false,
                    },
                    data: [],
                },
            ].concat(loca()),
            // series: [
            // ].concat([{
            //     type: 'lines',//用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
            //     coordinateSystem : 'geo',
            //     zlevel: 1,
            //     effect: {//线特效的配置
            //         show: true,
            //         period: 3,//特效动画的时间
            //         trailLength: 0.7,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
            //         color: '#fff',
            //         symbolSize: 3,//特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
            //     },
            //     lineStyle: {
            //         normal: {
            //             color: '#46bee9',
            //             width: 0,
            //             curveness: 0.1,//边的曲度，支持从 0 到 1 的值，值越大曲度越大
            //         }
            //     },
            //     data: [
            //         {coords: [
            //             [121.4648,31.2891],  // 起点
            //             [116.405285,39.904989]   // 终点
            //         ],
            //         // 统一的样式设置
            //         lineStyle: {
            //         }
            //     }
            //     ]//线数据集。
            // }]),
        },
    };
}
