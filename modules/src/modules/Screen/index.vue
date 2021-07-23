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
                                <div class="city">上海&nbsp;&nbsp;&nbsp;{{time}}</div>
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
                            <span class="statistics-number">
                                <iot-counter :size="48" :number="summary.yearCarbon"></iot-counter>
                            </span>
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
                                    <iot-counter :size="34" :number="summary.yearFlight"></iot-counter>
                                </div>
                                <div>同比</div>
                                <div class="zengfu" v-html="ratio(summary.yearFlight,summary.lastYearFlight)"></div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计入住间夜</div>
                            <div>
                                <div class="statistics-number-blue" unit="晚">
                                    <iot-counter :size="34" :number="summary.yearHotel"></iot-counter>
                                </div>
                                <div>同比</div>
                                <div class="zengfu" v-html="ratio(summary.yearHotel,summary.lastYearHotel)"></div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行里程</div>
                            <div>
                                <div class="statistics-number-blue" unit="km">
                                    <iot-counter :size="34" :number="summary.yearKtm"></iot-counter>
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
                            <span class="legend-flight"></span><span>飞机航线</span>
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
                        <img class="weather" :src="weatherIcon(item.weather)" :title="weatherTitle(weather)" alt="">
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
                    <iot-chart class="panel-chart" style="height:200px;" :option="chartOptionsWorldMap"></iot-chart>
                </div>
                <div class="screen-c3-r4 screen-panel">
                    <div class="panel-title">国内Top5目的地</div>
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
    0: { text: "晴", icon: "/images/weather/w0.png" },
    1: { text: "晴", icon: "/images/weather/w0.png" },
    4: { text: "多云", icon: "/images/weather/w1.png" },
    5: { text: "晴间多云", icon: "/images/weather/w1.png" },
    6: { text: "晴间多云", icon: "/images/weather/w1.png" },
    7: { text: "大部多云", icon: "/images/weather/w1.png" },
    8: { text: "大部多云", icon: "/images/weather/w1.png" },
    9: { text: "阴", icon: "/images/weather/w2.png" },
    13: { text: "小雨", icon: "/images/weather/w7.png" },
    14: { text: "中雨", icon: "/images/weather/w8.png" },
    15: { text: "大雨", icon: "/images/weather/w6.png" },
    16: { text: "暴雨", icon: "/images/weather/w9.png" },
    17: { text: "大暴雨", icon: "/images/weather/w10.png" },
    18: { text: "特大暴雨", icon: "/images/weather/w10.png" },
    22: { text: "小雪", icon: "/images/weather/w7.png" },
    23: { text: "中雪", icon: "/images/weather/w8.png" },
    24: { text: "大雪", icon: "/images/weather/w9.png" },
    25: { text: "暴雪", icon: "/images/weather/w10.png" },
    20: { text: "雨夹雪", icon: "/images/weather/w9.png" },
    32: { text: "风", icon: "/images/weather/w2.png" },
    33: { text: "大风", icon: "/images/weather/w2.png" },
    19: { text: "冻雨", icon: "/images/weather/w6.png" },
    10: { text: "阵雨", icon: "/images/weather/w3.png" },
    11: { text: "雷阵雨", icon: "/images/weather/w4.png" },
    21: { text: "阵雪", icon: "/images/weather/w3.png" },
    12: { text: "雷阵雨伴有冰雹", icon: "/images/weather/w5.png" },
};

export default {
    components: {
        IotChart: $import("dag/components/Charts").Component,
        IotCounter: $import("dag/components/Counter").Component,
    },
    data() {
        return {
            weather: null,
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
            chartOptionsMap: chartMap.chart(this, { title: "日活设备" }),
            chartOptionsWorldMap: worldMap(this, { title: "日活设备" }),
            topFlightCity: [],
            topHotelCity: [],
            c3r4Data: [
                {
                    label: "今日出国",
                    ratio: "50",
                    value: "20",
                },
                {
                    label: "今日回国",
                    ratio: "20",
                    value: "5",
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
                var series = chartMap.generateData(res.flights, res.hotCity);
                this.chartOptionsMap.setOption.series[2].data = series.hotCity;
                if (series.flights.length < 50) {
                    this.chartOptionsMap.setOption.series[1].data =
                        series.flights;
                } else {
                    var flights = series.flights;
                    var batchs = [];
                    var step = 50;
                    while (flights.length) {
                        var batch = flights.slice(0, step);
                        batchs.push(batch);
                        flights.splice(0, batch.length);
                    }
                    this.chartOptionsMap.setOption.series[1].data = batchs[0];
                    var index = 0;
                    this.flightTimer = setInterval(() => {
                        index++;
                        if (index == batchs.length) {
                            index = 0;
                        }
                        this.chartOptionsMap.setOption.series[1].data =
                            batchs[index];
                    }, 30000);
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
                                1: "rgba(27,72,121,0.6)",
                                2: "rgba(255,165,0,0.4)",
                                3: "rgba(255,0,0,0.4)",
                            }[item.dangerLevel],
                        },
                    })
                );
            });
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
                ""
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
.screen-container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    background: #000;
    color: #fff;
    padding: 40px;
    background: radial-gradient(#265899, #265899, #01183b, #01183b);
    overflow: hidden;
    .screen-logo {
        width: 175px;
    }
    .screen-logo-title {
        position: absolute;
        font-size: 28px;
        top: 100px;
        z-index: 10;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .config-trigger {
        position: absolute;
        font-size: 28px;
        top: 10px;
        right: 10px;
        z-index: 10;
        color: #fff;
        font-size: 24px;
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
            padding: 30px 0px;
        }
        .panel-title {
            position: relative;
            font-size: 24px;
            color: #fff;
            padding-bottom: 10px;
            &:before {
                content: "";
                display: block;
                width: 60px;
                height: 5px;
                background: #10d2ff;
                margin-bottom: 15px;
            }
        }
        .weather-city {
            width: auto;
            .city {
                font-size: 22px;
            }
        }
        .statistics-number {
            font-size: 48px;
            color: #ecd225;
        }
        .number-unit {
            font-size: 20px;
        }
        .c1-r3-item {
            padding: 30px 0px 10px 0px;
            font-size: 18px;
            .sub-title {
                font-size: 18px;
                padding-bottom: 20px;
            }
            .statistics-number-blue {
                font-size: 34px;
                color: #31c4f5;
                padding-right: 15px;
                &:after {
                    content: attr(unit);
                    display: inline-block;
                    vertical-align: bottom;
                    padding-left: 5px;
                    font-size: 20px;
                    color: #fff;
                }
            }
            .zengfu {
                background: #185987;
                font-size: 18px;
                padding: 3px 4px 3px 0px;
                border-radius: 2px;
                position: relative;
                bottom: -4px;
            }
            & > :last-child > div {
                display: inline-block;
                vertical-align: bottom;
            }
        }
    }
    .underline {
        height: 1px;
        background: #30517d;
        width: calc(100% - 30px);
        margin: 0px auto;
        position: relative;
        box-sizing: border-box;
        &:after,
        &:before {
            content: "";
            background: #92c3ff;
            width: 7px;
            height: 7px;
            position: absolute;
            top: -3px;
        }
        &:before {
            left: -15px;
        }
        &:after {
            right: -15px;
        }
    }

    .weather-city {
        width: 160px;
        & > * {
            display: inline-block;
            vertical-align: middle;
        }
        .weather {
            width: 40px;
            height: 40px;
            background-position: center center;
            background-repeat: no-repeat;
            padding-right: 5px;
            &.sun {
                background-image: url("/images/sun.png");
            }
        }
        .city {
            font-size: 16px;
            padding-bottom: 10px;
        }
        .temperature {
            font-size: 16px;
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
            right: 13%;
            bottom: 25%;
            font-size: 18px;
            opacity: 0.8;
            & > div {
                padding-bottom: 20px;
                & > span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .legend-flight {
                height: 3px;
                width: 18px;
                background: #fff;
                box-shadow: 0px 0px 5px #fff;
                margin-right: 10px;
            }
            .legend-hotel {
                position: relative;
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background: #fff;
                margin-left: 4px;
                margin-right: 15px;
                &:before {
                    content: "";
                    position: absolute;
                    top: -25%;
                    left: -25%;
                    width: 140%;
                    height: 140%;
                    border: 1px solid #fff;
                    border-radius: 10px;
                    box-shadow: 0px 0px 5px #fff;
                }
            }
            .legend-danger {
                width: 14px;
                height: 14px;
                background: rgba(255, 165, 0, 0.5);
                border: 1px solid rgba(255, 165, 0, 0.4);
                box-shadow: 0px 0px 1px #fff;
                margin-left: 0px;
                margin-right: 13px;
            }
            .legend-warning {
                width: 14px;
                height: 14px;
                background: rgba(255, 0, 0, 0.5);
                border: 1px solid rgba(255, 0, 0, 0.4);
                box-shadow: 0px 0px 1px #fff;
                margin-left: 0px;
                margin-right: 13px;
            }
        }
    }
    .screen-c3 {
        flex: 0 0 16%;
        .screen-panel {
            padding-bottom: 5px;
        }
        .panel-title {
            font-size: 24px;
            padding-bottom: 15px;
            border-bottom: 1px solid #2d4c76;
        }
        .top-panel {
            padding-top: 10px;
            padding-bottom: 20px;
            .top-panel-item {
                padding: 10px 0px;
                & > div {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .city {
                font-size: 20px;
                width: 100px;
                color: #92c3ff;
            }
            .chart {
                width: 126px;
                height: 8px;
                background: #0b2651;
                border-radius: 3px;
                & > div {
                    height: 8px;
                    border: 1px solid #3264ab;
                    border-radius: 3px;
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
                font-size: 20px;
                color: #fff;
                padding-left: 10px;
            }
        }
    }
    .screen-panel {
        display: flex;
        flex-direction: column;
        .panel-title {
            color: #fff;
            flex: 0 0 30px;
            &:after {
                content: attr(sub);
                float: right;
                font-size: 12px;
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

    .map-chart-summary {
        position: absolute;
        top: 20px;
        left: 10px;
        z-index: 10;
        font-size: 16px;
        & > div {
            border-left: 4px solid #0a73ff;
            padding: 5px 15px;
            margin-bottom: 20px;
        }
        color: #72d6fe;
        .summary-title {
            padding-bottom: 10px;
        }
        .summary-value {
            font-size: 30px;
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
        width: 600px;
        height: 600px;
        margin-left: -300px;
        margin-top: -300px;
        position: absolute;
        display: inline-block;
        border: 0.3925rem solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        opacity: 0;

        box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.2);
    }
}
</style>