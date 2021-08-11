import echarts from "echarts";
import "./worldZH";
import geo from "echarts/lib/component/geo";

function getSize() {
	return Math.floor(window.outerHeight / 600) || 1;
}

export default function(ctx) {
	return {
		style: "width:100%",
		setOption: {
			tooltip: {
				trigger: "item",
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
				{
					type: "scatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
					coordinateSystem: "geo", //该系列使用的坐标系
					zlevel: 2,
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
						period: 9, //特效动画的时间
						trailLength: 0.8, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
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
					type: "scatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
					coordinateSystem: "geo", //该系列使用的坐标系
					name: '出差人数',           
					encode: {
						value: 2
					},
					zlevel: 3,
					label: {
						//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
						show: false,
					},
					symbolSize: function(val) {
						//标记的大小
						return Math.min(val[2] * getSize() * 3, 15 * getSize());
					},
					itemStyle: {
						color: "#FFF",
					},
					data: [],
				},
			],
		},
	};
}
