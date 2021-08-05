<template>
    <div class="screen-container">
        <div class="screen-logo-title">国内航线及酒店入住情况</div>
        <div class="screen-major">
            <div class="screen-c1">
                <div class="screen-c1-r1">
                    <img class="screen-logo" src="images/Logo.png" />
                </div>
                <div class="screen-c1-r1 screen-panel">
                    <div class="panel-content">
                        <div class="weather-city">
                            <img class="weather" :src="weatherIcon(weather)" :title="weatherTitle(weather)" alt="">
                            <div>
                                <div class="city"><span>上海</span>&nbsp;&nbsp;&nbsp;<span>{{time}}</span></div>
                                <div class="temperature">{{date}}&nbsp;&nbsp;&nbsp;{{temperature(weather)}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="screen-c1-r2 screen-panel ">
                    <div class="panel-content">
                        <div class="panel-title">年度总碳排</div>
                        <div>
                            <div class="statistics-number">
                                <iot-counter :size="4.8" :number="summary.yearCarbon"></iot-counter>
                            </div>
                            <span class="number-unit">kg</span>
                        </div>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="screen-c1-r3 screen-panel">
                    <div class="panel-content">
                        <div class="panel-title">年度差旅 (YTD)</div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行人次</div>
                            <div>
                                <div class="statistics-number-blue" unit="人">
                                    <iot-counter :size="3.4" :number="summary.yearFlight"></iot-counter>
                                </div>
                                <div>同比</div>
                                <div class="zengfu" v-html="ratio(summary.yearFlight,summary.lastYearFlight)"></div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计入住间夜</div>
                            <div>
                                <div class="statistics-number-blue" unit="晚">
                                    <iot-counter :size="3.4" :number="summary.yearHotel"></iot-counter>
                                </div>
                                <div>同比</div>
                                <div class="zengfu" v-html="ratio(summary.yearHotel,summary.lastYearHotel)"></div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行里程</div>
                            <div>
                                <div class="statistics-number-blue" unit="km">
                                    <iot-counter :size="3.4" :number="summary.yearKtm"></iot-counter>
                                </div>
                                <div>同比</div>
                                <div class="zengfu" v-html="ratio(summary.yearKtm,summary.lastYearKtm)"></div>
                            </div>
                        </div>
                    </div>
                    <div class="underline"></div>
                </div>
            </div>
            <div class="screen-c2">
                <div class="screen-c2-r1 screen-panel">
                    <div class="boss IIV"></div>
                    <div class="boss IIIV"></div>
                    <iot-chart class="panel-chart" :option="chartOptionsMap"></iot-chart>
                    <div class="map-legends">
                        <div>
                            <span class="legend-flight"></span><span>飞机航线&nbsp;&nbsp;{{flightRange}}</span>
                        </div>
                        <div>
                            <span class="legend-hotel"></span><span>酒店入住</span>
                        </div>
                        <div>
                            <span class="legend-danger"></span><span>高风险</span>
                        </div>
                        <div>
                            <span class="legend-warning"></span><span>中风险</span>
                        </div>
                    </div>
                </div>
                <div class="screen-c2-r2">
                    <div class="weather-city" v-for="item in topFlightCity" :key="item.label">
                        <img class="weather" :src="weatherIcon(item.weather)" :title="weatherTitle(item.weather)"
                            alt="">
                        <div>
                            <div class="city">{{item.label}}</div>
                            <div class="temperature">{{temperature(item.weather)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="screen-c3">
                <div class="screen-c3-r1 screen-panel">
                    <div class="panel-title">国内Top5目的地</div>
                    <div class="top-panel">
                        <div class="top-panel-item" v-for="item in topFlightCity" :key="item.label">
                            <div class="city">{{item.label}}</div>
                            <div class="chart ">
                                <div :style="'width:'+item.ratio+'%;'"></div>
                            </div>
                            <div class="number">{{item.value}}</div>
                        </div>
                    </div>
                </div>
                <div class="screen-c3-r2 screen-panel">
                    <div class="panel-title">酒店入住城市Top5</div>
                    <div class="top-panel">
                        <div class="top-panel-item" v-for="item in topHotelCity" :key="item.label">
                            <div class="city">{{item.label}}</div>
                            <div class="chart ">
                                <div :style="'width:'+item.ratio+'%;'"></div>
                            </div>
                            <div class="number">{{item.value}}</div>
                        </div>
                    </div>
                </div>
                <div class="screen-c3-r3 screen-panel">
                    <iot-chart class="panel-chart" style="height:18.0rem;" :option="chartOptionsWorldMap"></iot-chart>
                    <div class="map-legends">
                        <div>
                            <span class="legend-flight"></span><span>当天飞机航线</span>
                        </div>
                        <div>
                            <span class="legend-hotel"></span><span>当天停留人数</span>
                        </div>
                    </div>
                </div>
                <div class="screen-c3-r4 screen-panel">
                    <div class="panel-title">
                        <span class="outer-num">{{foreignCount}}</span>
                        <span class="outer-text">人&nbsp;&nbsp;海外奔波中</span>
                    </div>
                    <div class="top-panel">
                        <div class="top-panel-item" v-for="item in c3r4Data" :key="item.label">
                            <div class="city">{{item.label}}</div>
                            <div class="chart darkblue">
                                <div :style="'width:'+item.ratio+'%;'"></div>
                            </div>
                            <div class="number">{{item.value}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <i class="config-trigger xui-icon xui-icon-setup_fill" @click="openConfig"></i>
    </div>
</template>
<script>
import chart1 from "./chart1";
import chart2 from "./chart2";
import chart3 from "./chart3";
import chartMap from "./chartMap";
import worldMap from "./worldMap";

import Store from "./store";
import ConfigStore from "../Config/store";
import cityLoc from "./cityLoc";

const $tools = $import("dag/common/tools");

const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const WEATHER = {
    100: { text: "晴", icon: "/images/weather/w0.png" },
    101: { text: "多云", icon: "/images/weather/w1.png" },
    102: { text: "少云", icon: "/images/weather/w3.png" },
    103: { text: "晴间多云", icon: "/images/weather/w2.png" },
    104: { text: "阴", icon: "/images/weather/w4.png" },
    150: { text: "晴", icon: "/images/weather/w0.png" },
    153: { text: "晴间多云", icon: "/images/weather/w2.png" },
    154: { text: "阴", icon: "/images/weather/w4.png" },

    300: { text: "阵雨", icon: "/images/weather/w19.png" },
    301: { text: "强阵雨", icon: "/images/weather/w19.png" },
    302: { text: "雷阵雨", icon: "/images/weather/w20.png" },
    303: { text: "雷阵雨", icon: "/images/weather/w20.png" },
    304: { text: "雷阵雨伴有冰雹", icon: "/images/weather/w22.png" },
    305: { text: "小雨", icon: "/images/weather/w5.png" },
    306: { text: "中雨", icon: "/images/weather/w6.png" },
    307: { text: "大雨", icon: "/images/weather/w7.png" },
    308: { text: "极端降雨", icon: "/images/weather/w7.png" },
    309: { text: "毛毛雨/细雨", icon: "/images/weather/w5.png" },
    310: { text: "暴雨", icon: "/images/weather/w8.png" },
    311: { text: "大暴雨", icon: "/images/weather/w9.png" },
    312: { text: "特大暴雨", icon: "/images/weather/w10.png" },
    313: { text: "雨夹雪", icon: "/images/weather/w15.png" },
    314: { text: "小到中雨", icon: "/images/weather/w6.png" },
    315: { text: "中到大雨", icon: "/images/weather/w7.png" },
    316: { text: "大到暴雨", icon: "/images/weather/w8.png" },
    317: { text: "暴雨到大暴雨", icon: "/images/weather/w9.png" },
    318: { text: "大暴雨到特大暴雨", icon: "/images/weather/w10.png" },
    399: { text: "雨", icon: "/images/weather/w6.png" },
    350: { text: "阵雨", icon: "/images/weather/w19.png" },
    351: { text: "强阵雨", icon: "/images/weather/w19.png" },

    400: { text: "小雪", icon: "/images/weather/w11.png" },
    401: { text: "中雪", icon: "/images/weather/w12.png" },
    402: { text: "大雪", icon: "/images/weather/w13.png" },
    403: { text: "暴雪", icon: "/images/weather/w14.png" },
    404: { text: "雨夹雪", icon: "/images/weather/w15.png" },
    405: { text: "雨雪天气", icon: "/images/weather/w15.png" },
    406: { text: "阵雨夹雪", icon: "/images/weather/w15.png" },
    407: { text: "阵雪", icon: "/images/weather/w21.png" },
    408: { text: "小到中雪", icon: "/images/weather/w12.png" },
    409: { text: "中到大雪", icon: "/images/weather/w13.png" },
    410: { text: "大到暴雪", icon: "/images/weather/w14.png" },
    499: { text: "雪", icon: "/images/weather/w12.png" },
    456: { text: "阵雨夹雪", icon: "/images/weather/w15.png" },
    457: { text: "阵雪", icon: "/images/weather/w21.png" },
    500: { text: "薄雾", icon: "" },
    501: { text: "雾", icon: "/images/weather/w4.png" },
    502: { text: "霾", icon: "/images/weather/w4.png" },
    503: { text: "扬沙", icon: "/images/weather/w16.png" },
    504: { text: "浮尘", icon: "/images/weather/w16.png" },
    507: { text: "沙尘暴", icon: "/images/weather/w17.png" },
    508: { text: "强沙尘暴", icon: "/images/weather/w17.png" },
    509: { text: "浓雾", icon: "/images/weather/w4.png" },
    510: { text: "强浓雾", icon: "/images/weather/w4.png" },
    511: { text: "中度霾", icon: "/images/weather/w4.png" },
    512: { text: "重度霾", icon: "/images/weather/w4.png" },
    513: { text: "严重霾", icon: "/images/weather/w4.png" },
    514: { text: "大雾", icon: "/images/weather/w4.png" },
    515: { text: "特强浓雾", icon: "/images/weather/w4.png" },
    900: { text: "热", icon: "/images/weather/w0.png" },
    901: { text: "冷", icon: "/images/weather/w4.png" },
    999: { text: "未知", icon: "/images/weather/default.png" },

    // 32: { text: "风", icon: "/images/weather/w16.png" },
    // 33: { text: "大风", icon: "/images/weather/w17.png" },
    // 19: { text: "冻雨", icon: "/images/weather/w18.png" },
    // 10: { text: "阵雨", icon: "/images/weather/w19.png" },
    // 21: { text: "阵雪", icon: "/images/weather/w21.png" },
    // 12: { text: "雷阵雨伴有冰雹", icon: "/images/weather/w22.png" },
};

export default {
    components: {
        IotChart: $import("dag/components/Charts").Component,
        IotCounter: $import("dag/components/Counter").Component,
    },
    data() {
        return {
            weather: null,
            mini: document.body.clientHeight < 920,
            summary: {
                yearCarbon: 0,
                yearFlight: 0,
                yearHotel: 0,
                lastYearFlight: 0,
                lastYearHotel: 0,
                yearKtm: 0,
                lastYearKtm: 0,
            },
            date: "",
            time: "",
            flightRange: "",
            chartOptionsMap: chartMap.chart(this, { title: "日活设备" }),
            chartOptionsWorldMap: worldMap(this, { title: "日活设备" }),
            topFlightCity: [],
            topHotelCity: [],
            foreignCount: 0,
            c3r4Data: [
                {
                    label: "今日出国",
                    ratio: "0",
                    value: "0",
                },
                {
                    label: "今日回国",
                    ratio: "0",
                    value: "",
                },
            ],
            flightTimer: null,
        };
    },
    methods: {
        openConfig() {
            window.open(
                `${location.protocol}//${location.host}${location.pathname}#/config`,
                "_blank"
            );
        },
        refresh() {
            this.refreshSummary();
            this.refreshTopCity();
            this.refreshDangerArea();
        },
        refreshSummary() {
            Store.summary().then((res) => {
                this.summary = res;
            });
        },
        refreshTopCity() {
            Store.topCity().then((res) => {
                // var totalFlight = res.totalFlight;
                // var totalHotel = res.totalHotel;
                this.weather = res.weather;
                var topFlightCity = res.topFlightCity.filter(
                    (item) => item.name != "上海"
                );
                var topHotelCity = res.topHotelCity.filter(
                    (item) => item.name != "上海"
                );
                var totalFlight = topFlightCity[0]
                    ? Math.round(Number(topFlightCity[0].count) * 1.2)
                    : 0;
                var totalHotel = topHotelCity[0]
                    ? Math.round(Number(topHotelCity[0].count) * 1.2)
                    : 0;
                this.topFlightCity = topFlightCity.slice(0, 5).map((item) => ({
                    label: item.name,
                    ratio: Math.floor((item.count * 100.0) / totalFlight),
                    value: item.count,
                    weather: item.weather,
                }));
                this.topHotelCity = topHotelCity.slice(0, 5).map((item) => ({
                    label: item.name,
                    ratio: Math.floor((item.count * 100.0) / totalHotel),
                    value: item.count,
                }));
            });
        },
        refreshDangerArea() {
            clearTimeout(this.flightTimer);
            Store.today().then((res) => {
                //酒店
                this.chartOptionsMap.setOption.series[1].data =
                    this.generateHotelSeries(res.hotCity);
                //国际航班
                this.generateForeignFlightSeries(res.foreignFlights);
                //国内航班
                if (res.flights.length < 50) {
                    this.flightRange = "";
                    this.generateFlightSeries(res.flights);
                } else {
                    var flights = res.flights;
                    var batchs = [];
                    //定量分批
                    // var step = 50;
                    // while (flights.length) {
                    //     var batch = flights.slice(0, step);
                    //     batchs.push(batch);
                    //     flights.splice(0, batch.length);
                    // }

                    //定时分批
                    var batch = [];
                    var timeStart = new Date();
                    timeStart.setHours(0);
                    timeStart.setMinutes(0);
                    timeStart.setSeconds(0);
                    timeStart.setUTCMilliseconds(0);
                    var rangeEnd = timeStart.getTime() + 4 * 60 * 60 * 1000;
                    while (flights.length) {
                        while (true) {
                            if (
                                flights.length > 0 &&
                                flights[0].absTime < rangeEnd
                            ) {
                                batch.push(flights.shift());
                            } else {
                                break;
                            }
                        }
                        if (batch.length > 0) {
                            var hour = new Date(rangeEnd).getHours();
                            if (hour == 0) {
                                hour = 24;
                            }
                            batchs.push({
                                range: `${hour - 4}~${hour}点`,
                                batch: batch.concat([]),
                            });
                            batch = [];
                        }
                        rangeEnd += 4 * 60 * 60 * 1000;
                    }
                    // batchs.forEach((b) => {
                    //     console.log(b.range);
                    //     b.batch.forEach((t) => {
                    //         console.log(Sunset.Dates.format(t.absTime));
                    //     });
                    // });

                    var index = 0;
                    this.flightRange = batchs[0].range;
                    var flightSeries = this.generateFlightSeries(
                        batchs[0].batch
                    );

                    this.flightTimer = setInterval(() => {
                        index++;
                        if (index == batchs.length) {
                            index = 0;
                        }
                        this.flightRange = batchs[index].range;
                        var flightSeries = this.generateFlightSeries(
                            batchs[index].batch
                        );
                    }, 40000);
                }
                // this.chartOptionsMap.setOption.series[1].data = series.flights;
                // this.chartOptionsMap.setOption.series[2].data = series.flights;
            });
            //风险区域
            ConfigStore.getDangerArea().then((res) => {
                //地图风险区域
                this.chartOptionsMap.setOption.series[0].data = res.map(
                    (item) => ({
                        name: item.name.replace("省", "").replace("市", ""),
                        value: item.dangerLevel,
                        itemStyle: {
                            areaColor: {
                                1: "rgba(27,72,121,1)",
                                2: "rgba(124,118,89,1)",
                                3: "rgba(125,53,92,1)",
                            }[item.dangerLevel],
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                            itemStyle: {
                                areaColor: {
                                    1: "rgba(50,90,133,1)",
                                    2: "rgba(137,131,105,1)",
                                    3: "rgba(98,74,112,1)",
                                }[item.dangerLevel],
                            },
                        },
                    })
                );
            });
        },
        generateHotelSeries(hotels) {
            var hots = [];
            Object.keys(hotels).forEach((name) => {
                if (!cityLoc.locMap[name]) {
                    return;
                }
                hots.push({
                    name: name,
                    value: cityLoc.locMap[name].concat(hotels[name]),
                });
            });
            return hots;
        },
        generateFlightSeries(flights) {
            var points = [],
                f1 = [],
                f2 = [],
                f3 = [],
                f4 = [];
            var pointMap = {};
            var flightMap = {};
            flights.forEach((item) => {
                var fromCoord = cityLoc.locMap[item.fromName]; //始发地
                var toCoord = cityLoc.locMap[item.toName]; //目的地
                if (!fromCoord || !toCoord) {
                    return;
                }
                if (!pointMap[item.fromName]) {
                    pointMap[item.fromName] = true;
                    points.push({
                        name: item.fromName,
                        value: fromCoord.concat([1]),
                    });
                }
                if (!pointMap[item.toName]) {
                    pointMap[item.toName] = true;
                    points.push({
                        name: item.toName,
                        value: toCoord.concat([1]),
                    });
                }
                var key = `${item.fromName}___${item.toName}`;
                if (!flightMap[key]) {
                    flightMap[key] = {
                        fromName: item.fromName,
                        toName: item.toName,
                        coords: [fromCoord, toCoord], //一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
                        count: 1,
                    };
                } else {
                    flightMap[key].count++;
                }
            });
            Object.keys(flightMap).forEach((k) => {
                if (flightMap[k].count <= 2) {
                    f1.push(flightMap[k]);
                } else if (flightMap[k].count <= 4) {
                    f2.push(flightMap[k]);
                } else if (flightMap[k].count <= 8) {
                    f3.push(flightMap[k]);
                } else {
                    f4.push(flightMap[k]);
                }
            });

            this.chartOptionsMap.setOption.series[2].data = points;
            this.chartOptionsMap.setOption.series[3].data = f1;
            this.chartOptionsMap.setOption.series[4].data = f2;
            this.chartOptionsMap.setOption.series[5].data = f3;
            this.chartOptionsMap.setOption.series[6].data = f4;
        },
        generateForeignFlightSeries(flights) {
            var points = [],
                lines = [];
            var pointMap = {};
            var flightMap = {};
            var out = 0;
            var back = 0;
            flights.forEach((item) => {
                var fromCoord = cityLoc.locMap[item.fromName]; //始发地
                var toCoord = cityLoc.locMap[item.toName]; //目的地
                if (!fromCoord || !toCoord) {
                    return;
                }
                if (cityLoc.zh[item.fromName]) {
                    out++;
                } else {
                    back++;
                }

                if (!pointMap[item.fromName]) {
                    pointMap[item.fromName] = true;
                    points.push({
                        name: item.fromName,
                        value: fromCoord.concat([1]),
                    });
                }
                if (!pointMap[item.toName]) {
                    pointMap[item.toName] = true;
                    points.push({
                        name: item.toName,
                        value: toCoord.concat([1]),
                    });
                }
                var key = `${item.fromName}___${item.toName}`;

                if (!flightMap[key]) {
                    flightMap[key] = true;
                    lines.push({
                        fromName: item.fromName,
                        toName: item.toName,
                        coords: [fromCoord, toCoord], //一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
                        count: 1,
                    });
                }
            });

            this.chartOptionsWorldMap.setOption.series[1].data = points;
            this.chartOptionsWorldMap.setOption.series[2].data = lines;

            var total = Math.ceil(Math.max(out, back) * 1.2);
 
            this.foreignCount = out + back;
            this.c3r4Data[0].ratio = Math.floor((out * 100.0) / total);
            this.c3r4Data[0].value = out;
            this.c3r4Data[1].ratio = Math.floor((back * 100.0) / total);
            this.c3r4Data[1].value = back;
        },
        temperature(weather) {
            if (!weather || !weather.code_day) {
                return "-";
            }
            return `${weather.low}℃ ~ ${weather.high}℃`;
        },
        weatherIcon(weather) {
            return (
                (weather &&
                    WEATHER[weather.code_day] &&
                    WEATHER[weather.code_day].icon) ||
                "/images/weather/default.png"
            );
        },
        weatherTitle(weather) {
            return (
                (weather &&
                    WEATHER[weather.code_day] &&
                    WEATHER[weather.code_day].text) ||
                ""
            );
        },
        ratio(year, lastYear) {
            if (lastYear == 0) {
                return "-";
            }
            var r = Math.round(((year - lastYear) * 100.0) / lastYear);
            return `<i class="xui-icon xui-icon-arrow-${
                r > 0 ? "up" : "down"
            }"></i>${Math.abs(r)}%`;
        },
    },
    mounted() {
        this.refresh();
        setInterval(() => {
            this.refresh();
        }, 5 * 60000);
        setInterval(() => {
            var now = new Date();
            this.time = Sunset.Dates.format(now, "HH:mm:ss");
            this.date = MONTH[now.getMonth()] + now.getDate();
        }, 50);
    },
};
</script>
<style lang="less">
@font-face {
    font-family: "DINPro";
    font-style: normal;
    font-weight: normal;
    src: local("DINPro"), url("/fonts/DIN-Pro-Regular-2.otf") format("truetype");
}

html {
    font-size: 62.5%;
}

.screen-container {
    position: absolute;
    top: 0rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    display: flex;
    flex-direction: column;
    background: #000;
    color: #fff;
    padding: 4rem;
    background: radial-gradient(#265899, #265899, #01183b, #01183b);
    overflow: hidden;
    .screen-logo {
        width: 50%;
    }
    .screen-logo-title {
        position: absolute;
        font-size: 2.8rem;
        top: 10rem;
        z-index: 10;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .config-trigger {
        position: absolute;
        font-size: 2.8rem;
        top: 1rem;
        right: 1rem;
        z-index: 10;
        color: #fff;
        font-size: 2.4rem;
        cursor: pointer;
        &:hover {
            color: #dedede;
        }
    }
    .screen-major {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        & > div {
            box-sizing: border-box;
        }
    }
    .screen-c1 {
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        .panel-content {
            padding: 3rem 0rem;
        }
        .panel-title {
            position: relative;
            font-size: 2.4rem;
            color: #fff;
            padding-bottom: 2rem;
            &:before {
                content: "";
                display: block;
                width: 6rem;
                height: 0.5rem;
                background: #10d2ff;
                margin-bottom: 2.2rem;
            }
        }
        .weather-city {
            padding-top: 2rem;
            width: auto;
            .city {
                font-size: 2.2rem;
                span {
                    display: inline-block;
                    vertical-align: bottom;
                    &:first-child {
                        font-size: 2.5rem;
                    }
                }
            }
        }
        .statistics-number {
            display: inline-block;
            color: #ecd225;
            font-family: "DINPro", serif;
        }
        .number-unit {
            font-size: 2rem;
        }
        .c1-r3-item {
            padding: 3rem 0rem 1rem 0rem;
            font-size: 1.8rem;
            .sub-title {
                font-size: 1.8rem;
                padding-bottom: 2rem;
            }
            .statistics-number-blue {
                color: #31c4f5;
                padding-right: 1.5rem;
                display: inline-block;
                vertical-align: bottom;
                &:after {
                    content: attr(unit);
                    display: inline-block;
                    vertical-align: bottom;
                    padding-left: 0.5rem;
                    font-size: 2rem;
                    color: #fff;
                }
            }
            .zengfu {
                background: #185987;
                font-size: 1.8rem;
                padding: 0.3rem 0.4rem 0.3rem 0rem;
                border-radius: 0.2rem;
                position: relative;
                bottom: -0.4rem;
                i {
                    font-size: 1.8rem;
                }
            }
            & > :last-child > div {
                display: inline-block;
                vertical-align: bottom;
            }
        }
    }
    .underline {
        height: 0.1rem;
        background: #30517d;
        width: calc(100% - 30px);
        margin: 0rem auto;
        position: relative;
        box-sizing: border-box;
        &:after,
        &:before {
            content: "";
            background: #92c3ff;
            width: 0.7rem;
            height: 0.7rem;
            position: absolute;
            top: -0.3rem;
        }
        &:before {
            left: -1.5rem;
        }
        &:after {
            right: -1.5rem;
        }
    }

    .weather-city {
        width: 16rem;
        & > * {
            display: inline-block;
            vertical-align: middle;
        }
        .weather {
            width: 4rem;
            height: 4rem;
            background-position: center center;
            background-repeat: no-repeat;
            padding-right: 0.5rem;
            &.sun {
                background-image: url("/images/sun.png");
            }
        }
        .city {
            font-size: 1.6rem;
            padding-bottom: 1rem;
        }
        .temperature {
            font-size: 1.6rem;
            color: #92c3ff;
        }
    }
    .screen-c2 {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        .screen-c2-r1 {
            position: relative;
            flex-grow: 1;
            // background: url(/images/space.png);
            // background-size: cover;
        }
        .screen-c2-r2 {
            flex: 0 0 10%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .map-legends {
            position: absolute;
            left: 76%;
            bottom: 28%;
            font-size: 1.6rem;
            & > div {
                padding-bottom: 2rem;
                & > span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .legend-flight {
                height: 0.3rem;
                width: 1.8rem;
                background: #fff;
                box-shadow: 0rem 0rem 0.5rem #fff;
                margin-right: 1rem;
            }
            .legend-hotel {
                position: relative;
                width: 1rem;
                height: 1rem;
                border-radius: 1rem;
                background: #fff;
                margin-left: 0.4rem;
                margin-right: 1.5rem;
                &:before {
                    content: "";
                    position: absolute;
                    top: -0.4rem;
                    left: -0.4rem;
                    bottom: -0.4rem;
                    right: -0.4rem;
                    border: 0.1rem solid #fff;
                    border-radius: 1rem;
                    box-shadow: 0rem 0rem 0.5rem #fff;
                }
            }
            .legend-warning {
                width: 1.4rem;
                height: 1.4rem;
                background: rgba(255, 165, 0, 0.5);
                border: 0.1rem solid rgba(255, 165, 0, 0.4);
                box-shadow: 0rem 0rem 0.1rem #fff;
                margin-left: 0rem;
                margin-right: 1.3rem;
            }
            .legend-danger {
                width: 1.4rem;
                height: 1.4rem;
                background: rgba(255, 0, 0, 0.5);
                border: 0.1rem solid rgba(255, 0, 0, 0.4);
                box-shadow: 0rem 0rem 0.1rem #fff;
                margin-left: 0rem;
                margin-right: 1.3rem;
            }
        }
    }
    .screen-c3 {
        flex: 0 0 18%;
        padding-top: 3rem;
        .screen-panel {
            padding-bottom: 0.5rem;
        }
        .panel-title {
            font-size: 2.4rem;
            padding-bottom: 1.5rem;
            border-bottom: 0.1rem solid #2d4c76;
        }
        .top-panel {
            padding-top: 1rem;
            padding-bottom: 1rem;
            .top-panel-item {
                padding: 1rem 0rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                & > div {
                    display: inline-block;
                }
            }
            .city {
                font-size: 2rem;
                width: 10rem;
                color: #92c3ff;
            }
            .chart {
                flex-grow: 1;
                height: 0.8rem;
                background: #0b2651;
                border-radius: 0.3rem;
                & > div {
                    height: 0.8rem;
                    border: 0.1rem solid #3264ab;
                    border-radius: 0.3rem;
                    background: linear-gradient(
                        to right,
                        #23508b,
                        #2387af 20%,
                        #23e0e9 50%,
                        #23fffe
                    );
                }
                &.darkblue > div {
                    background: linear-gradient(
                        to right,
                        #234a88,
                        #2358ae 20%,
                        #236de6 50%,
                        #2380ff
                    );
                }
            }
            .number {
                font-size: 2rem;
                color: #fff;
                padding-left: 1rem;
                font-family: "DINPro", serif;
            }
        }
        .screen-c3-r1 {
            padding-bottom: 2rem;
        }
        .screen-c3-r3 {
            position: relative;
        }
        .map-legends {
            position: absolute;
            right: 1rem;
            bottom: 2rem;
            font-size: 1.2rem;
            opacity: 0.9;
            & > div {
                padding-bottom: 1rem;
                & > span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .legend-flight {
                height: 0.2rem;
                width: 1.5rem;
                background: #fff;
                box-shadow: 0rem 0rem 0.5rem #fff;
                margin-right: 1rem;
            }
            .legend-hotel {
                position: relative;
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 1rem;
                background: #fff;
                margin-left: 0.3rem;
                margin-right: 1.3rem;
                box-shadow: 0rem 0rem 0.4rem #fff;
            }
        }
    }
    .screen-panel {
        display: flex;
        flex-direction: column;
        .panel-title {
            color: #fff;
            flex: 0 0 3rem;
            &:after {
                content: attr(sub);
                float: right;
                font-size: 1.2rem;
                color: #999;
            }
        }
        .panel-chart {
            flex-grow: 1;
        }
    }

    .screen-c3-r1 {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .screen-c3-r1-detail {
            flex-grow: 1;
            display: flex;
            flex-direction: row;
        }
        .screen-c3-r1-c1 {
            display: flex;
            flex-direction: row;
            flex: 0 0 40%;
        }
        .screen-c3-r1-c2 {
            flex-grow: 1;
        }
    }
    .outer-num {
        font-size: 2.6rem;
        font-family: "DINPro", serif;
        display: inline-block;
        vertical-align: bottom;
        padding-right: 0.5rem;
        position: relative;
        bottom: -0.3rem;
    }
    .outer-text {
        display: inline-block;
        vertical-align: bottom;
        font-size: 1.6rem;
    }

    .map-chart-summary {
        position: absolute;
        top: 2rem;
        left: 1rem;
        z-index: 10;
        font-size: 1.6rem;
        & > div {
            border-left: 0.4rem solid #0a73ff;
            padding: 0.5rem 1.5rem;
            margin-bottom: 2rem;
        }
        color: #72d6fe;
        .summary-title {
            padding-bottom: 1rem;
        }
        .summary-value {
            font-size: 3rem;
            color: #fff;
            font-weight: bold;
        }
        .summary-unit {
        }
    }

    .IIV {
        animation: IIV 6s linear 1s infinite;
    }
    .IIIV {
        animation: IIV 6s linear 1.6s infinite;
    }

    @keyframes IIV {
        1% {
            transform: scale(0.1);
            opacity: 0;
        }
        45% {
            transform: scale(0.1);
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scale(2.1);
        }
    }
    .boss {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60rem;
        height: 60rem;
        margin-left: -30rem;
        margin-top: -30rem;
        position: absolute;
        display: inline-block;
        border: 0.3925rem solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        opacity: 0;

        box-shadow: 0rem 0rem 3rem rgba(255, 255, 255, 0.2);
    }
}

@media screen and (max-height: 920px) {
    .screen-container {
        .screen-c1 {
            .panel-content {
                padding: 2rem 0rem;
            }
            .panel-title {
                font-size: 2.2rem;
            }
            .number-unit {
                font-size: 1.8rem;
            }
            .c1-r3-item {
                padding: 2rem 0rem 1rem 0rem;
                font-size: 1.6rem;
                .sub-title {
                    font-size: 1.8rem;
                    padding-bottom: 1.5rem;
                }
                .statistics-number-blue {
                    font-size: 3.4rem;
                    &:after {
                        font-size: 1.6rem;
                    }
                }
                .zengfu {
                    font-size: 1.6rem;
                }
            }
        }
        .screen-c3 {
            padding-top: 2.5rem;
            flex: 0 0 18%;
            .screen-panel {
                padding-bottom: 0.5rem;
            }
            .panel-title {
                font-size: 2rem;
                padding-bottom: 1rem;
            }
            .top-panel {
                padding-top: 0.8rem;
                padding-bottom: 0.5rem;
                .top-panel-item {
                    padding: 0.6rem 0rem;
                }
                .city {
                    font-size: 1.8rem;
                }
                .number {
                    font-size: 1.8rem;
                }
            }
            .screen-c3-r1 {
                padding-bottom: 2rem;
            }
        }
    }
}

@media screen and (min-height: 2000px) {
    html {
        font-size: 125%;
    }
    .screen-container {
        .screen-c1 {
            .panel-content {
                padding: 2rem 0rem;
            }
            .panel-title {
                font-size: 2.2rem;
            }
            .number-unit {
                font-size: 1.8rem;
            }
            .c1-r3-item {
                padding: 2rem 0rem 1rem 0rem;
                font-size: 1.6rem;
                .sub-title {
                    font-size: 1.8rem;
                    padding-bottom: 1.5rem;
                }
                .statistics-number-blue {
                    font-size: 3.4rem;
                    &:after {
                        font-size: 1.6rem;
                    }
                }
                .zengfu {
                    font-size: 1.6rem;
                }
            }
        }
        .screen-c3 {
            padding-top: 2.5rem;
            flex: 0 0 18%;
            .screen-panel {
                padding-bottom: 0.5rem;
            }
            .panel-title {
                font-size: 2rem;
                padding-bottom: 1rem;
            }
            .top-panel {
                padding-top: 0.8rem;
                padding-bottom: 0.5rem;
                .top-panel-item {
                    padding: 0.6rem 0rem;
                }
                .city {
                    font-size: 1.8rem;
                }
                .number {
                    font-size: 1.8rem;
                }
            }
            .screen-c3-r1 {
                padding-bottom: 2rem;
            }
        }
    }
}
</style>