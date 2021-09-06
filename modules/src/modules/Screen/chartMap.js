import echarts from "echarts";
import "./china";
import geo from "echarts/lib/component/geo";
import cityLoc from "./cityLoc";

function getSize() {
	return Math.floor(window.outerHeight / 600) || 1;
}

// echarts.registerMap("china", chinaJson);

var SHData = [
	// [{ name: "上海" }, { name: "包头", value: 95 }],
	// [{ name: "上海" }, { name: "昆明", value: 90 }],
	// [{ name: "上海" }, { name: "广州", value: 80 }],
	// [{ name: "上海" }, { name: "郑州", value: 70 }],
	// [{ name: "上海" }, { name: "长春", value: 60 }],
	// [{ name: "上海" }, { name: "重庆", value: 50 }],
	// [{ name: "上海" }, { name: "长沙", value: 40 }],
	// [{ name: "上海" }, { name: "北京", value: 30 }],
	// [{ name: "北京" }, { name: "西安", value: 30 }],
	// [{ name: "上海" }, { name: "丹东", value: 20 }],
	// [{ name: "拉萨" }, { name: "大连", value: 10 }],
];

var planePath =
	"path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

function convertData(data) {
	var res = [];
	//console.log(data.length);长度为10
	for (var i = 0; i < data.length; i++) {
		var dataItem = data[i];
		var fromCoord = cityLoc[dataItem[0].name]; //始发地
		var toCoord = cityLoc[dataItem[1].name]; //目的地
		if (fromCoord && toCoord) {
			res.push({
				fromName: dataItem[0].name,
				toName: dataItem[1].name,
				coords: [fromCoord, toCoord], //一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
				absTime: dataItem[2],
			});
		}
	}
	return res;
}

export default {
	chart(ctx) {
		return {
			style: "width:100%",
			setOption: {
				tooltip: {
					trigger: "item",
					// formatter(a, b, c) {
					// 	return `${a.name}<br/>${isNaN(a.value) ? 0 : a.value}`;
					// },
				},
				// visualMap: {
				//     min: 800,
				//     max: 50000,
				//     text: ["High", "Low"],
				//     realtime: false,
				//     calculable: true,
				//     inRange: {
				//         color: ["#F9FBDF", "#0A5775"],
				//     },
				// },
				geo: {
					map: "china",
					label: {
						show: false,
					},
					roam: false,
					zoom: "1.1",
					left: "120",
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
						map: "china",
						name: "风险等级",
						zoom: "1.1",
						left: "120",
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
					{
						type: "effectScatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
						coordinateSystem: "geo", //该系列使用的坐标系
						name: "酒店入住人数",
						zlevel: 2,
						encode: {
							value: 2,
						},
						rippleEffect: {
							//涟漪特效相关配置
							period: 4,
							scale: 2.5,
							brushType: "stroke",
						},
						label: {
							//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
							show: false,
							position: "right",
							formatter: "{b}",
						},
						symbolSize: function(val) {
							//标记的大小
							return Math.min(val[2] * getSize(), 15 * getSize());
						},
						itemStyle: {
							color: "#FFF",
						},
						data: [],
					},
					{
						type: "scatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
						coordinateSystem: "geo", //该系列使用的坐标系
						zlevel: 3,
						label: {
							//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
							show: false,
						},
						symbolSize: 1,
						itemStyle: {
							color: "#FFF",
						},
						data: [],
					},
					{
						type: "lines", //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
						zlevel: 4,
						effect: {
							//线特效的配置
							show: true,
							period: 8, //特效动画的时间
							constantSpeed: 25,
							trailLength: 0.6, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
							color: "#fff",
							symbolSize: getSize() * 2, //特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
						},
						lineStyle: {
							normal: {
								color: "#46bee9",
								width: 0,
								curveness: 0.2, //边的曲度，支持从 0 到 1 的值，值越大曲度越大
							},
						},
						data: [], //线数据集。
					},
					{
						type: "lines", //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
						zlevel: 5,
						effect: {
							//线特效的配置
							show: true,
							period: 5, //特效动画的时间
							constantSpeed: 80,
							trailLength: 0.6, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
							color: "#FFF",
							symbolSize: getSize() * 2, //特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
						},
						lineStyle: {
							normal: {
								color: "#46bee9",
								width: 0,
								curveness: 0.2, //边的曲度，支持从 0 到 1 的值，值越大曲度越大
							},
						},
						data: [], //线数据集。
					},
					{
						type: "lines", //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
						zlevel: 6,
						effect: {
							//线特效的配置
							show: true,
							period: 2.5, //特效动画的时间
							constantSpeed: 130,
							trailLength: 0.6, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
							color: "#FFF",
							symbolSize: getSize() * 2, //特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
						},
						lineStyle: {
							normal: {
								color: "#46bee9",
								width: 0,
								curveness: 0.2, //边的曲度，支持从 0 到 1 的值，值越大曲度越大
							},
						},
						data: [], //线数据集。
					},
					{
						type: "scatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
						coordinateSystem: "geo", //该系列使用的坐标系
						zlevel: 10,
						label: {
							//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
							show: false,
						},
						tooltip: {
							formatter: "{b0}",
						},
						symbolSize: 3,
						itemStyle: {
							color: "#ababab",
						},
						data: [
							{
								name: "钓鱼岛",
								value: [123.475155, 25.775378, "钓鱼岛"],
							},
							{
								name: "赤尾屿",
								value: [124.59739, 25.925208, "赤尾屿"],
							},
						],
					},
					// {
					// 	type: "lines",
					// 	zlevel: 2,
					// 	symbol: ["none", "arrow"], //线两端的标记类型，可以是一个数组分别指定两端
					// 	symbolSize: 10,
					// 	effect: {
					// 		show: true,
					// 		period: 6,
					// 		trailLength: 0,
					// 		symbol: planePath,
					// 		symbolSize: 12,
					// 	},
					// 	lineStyle: {
					// 		color: "#46bee9",
					// 		width: 0,
					// 		opacity: 0.6,
					// 		curveness: 0.2,
					// 	},
					// 	data: convertData(SHData),
					// },
				],
			},
		};
	},
	generateData(flights, hotCity) {
		var hots = [];
		Object.keys(hotCity).forEach((name) => {
			if (!cityLoc[name]) {
				return;
			}
			hots.push({
				name: name,
				value: cityLoc[name].concat(hotCity[name]),
			});
		});
		return {
			flights: convertData(flights),
			hotCity: hots,
		};
	},
};
