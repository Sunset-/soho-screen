const $http = $import("dag/common/http");
const URLS = {
	TOP_CITY: "/api/statistics/topCity",
	SUMMARY: "/api/statistics/summary",
	CHART_LEFT: "/api/m/device/info/left",
};
//天气
//https://api.seniverse.com/v3/weather/daily.json?key=Sxg0w_vOCtTiSWD8n&location=xian&language=zh-Hans&unit=c&start=0&days=3
export default {
	statistics(type, params) {
		return $http({
			url: URLS[type],
			type: "POST",
			data: {
				version: "1.0",
			},
		});
	},
	topCity() {
		return $http({
			url: URLS.TOP_CITY,
			type: "POST",
		});
	},
	summary() {
		return $http({
			url: URLS.SUMMARY,
			type: "POST",
		});
	},
};
