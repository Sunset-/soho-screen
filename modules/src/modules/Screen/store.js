const $http = $import("dag/common/http");
const URLS = {
	TOP_CITY: "/api/statistics/topCity",
	SUMMARY: "/api/statistics/summary",
	TODAY: "/api/statistics/today",
	FOREIGN: "/api/statistics/foreign",
};

const ORDER_TYPE_FLIGHT = 2;
const ORDER_TYPE_HOTEL = 4;

//天气
//https://api.seniverse.com/v3/weather/daily.json?key=Sxg0w_vOCtTiSWD8n&location=xian&language=zh-Hans&unit=c&start=0&days=3
export default {
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
	foreign() {
		return $http({
			url: URLS.FOREIGN,
			type: "POST",
		});
	},
	today(params) {
		return $http({
			url: URLS.TODAY,
			type: "POST",
			formdata: true,
			data: params,
		}).then((res) => {
			var hotCity = {};
			var flights = [];
			var foreignFlights = [];
			res.forEach((item) => {
				if (item.orderType == ORDER_TYPE_FLIGHT) {
					if (item.isForeign == 0) {
						flights.push({
							fromName: item.dCityName,
							toName: item.aCityName,
							absTime: new Date(item.absTime).getTime(),
						});
					} else if (item.isForeign == 2) {
						foreignFlights.push({
							fromName: item.dCityName,
							toName: item.aCityName,
							absTime: new Date(item.absTime).getTime(),
						});
					}
				} else if (item.orderType == ORDER_TYPE_HOTEL) {
					if (!hotCity[item.dCityName]) {
						hotCity[item.dCityName] = item.rooms;
					} else {
						hotCity[item.dCityName] += item.rooms;
					}
				}
			});
			flights.sort((a, b) => {
				return a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0;
			});
			foreignFlights.sort((a, b) => {
				return a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0;
			});
			return {
				hotCity,
				flights,
				foreignFlights,
			};
		});
	},
};
