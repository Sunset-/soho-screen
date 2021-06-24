const $http = $import("dag/common/http");
const URLS = {
    CHART_LEFT : "/api/m/device/info/left",
    CHART_RIGHT : "/api/m/device/info/right",
    CHART_BOTTOM : "/api/m/device/info/bottom",
    CHART_LEFT_1 : "/api/m/device/info/getProvinceStatistical",
    CHART_LEFT_2 : "/",
    CHART_LEFT_3 : "/",
    CHART_BOTTOM_1 : "/api/m/device/message_statistic/getDeviceDayLiveStatistical",
    CHART_BOTTOM_2 : "/api/m/device/info/getDeviceDailyAddStatistical",
    CHART_BOTTOM_3 : "/api/m/device/active_statistic/getDeviceDailyActiveStatistical",
    CHART_RIGHT_1 : "/api/m/device/signal_statistic/getSignalTypeStatistical",
    CHART_RIGHT_2 : "/api/m/device/message_statistic/getTotalMessageStatistical",
    CHART_RIGHT_3 : "/api/m/device/message_statistic/getSingleDeviceMessageStatistical",
};
//天气
//https://api.seniverse.com/v3/weather/daily.json?key=Sxg0w_vOCtTiSWD8n&location=xian&language=zh-Hans&unit=c&start=0&days=3
export default { 
    statistics(type,params){
        return $http({
            url : URLS[type],
            type : "POST",
            data : {
                version : '1.0'
            }
        });
    }
}