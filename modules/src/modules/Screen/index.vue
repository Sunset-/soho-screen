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
                        <div>
                            <div>上海&nbsp;&nbsp;&nbsp;&nbsp;16:30:02</div>
                            <div>june21 20℃~10℃~</div>
                        </div>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="screen-c1-r2 screen-panel ">
                    <div class="panel-content">
                        <div class="panel-title">年度总碳排</div>
                        <div>
                            <span class="statistics-number">527,243</span>
                            <span class="number-unit">kg</span>
                        </div>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="screen-c1-r3 screen-panel">
                    <div class="panel-content">
                        <div class="panel-title">年度差旅 (YDT)</div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行人数</div>
                            <div>
                                <div class="statistics-number-blue" unit="人">7,909</div>
                                <div>同比</div>
                                <div class="zengfu">177%</div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行人数</div>
                            <div>
                                <div class="statistics-number-blue" unit="晚">12,500</div>
                                <div>同比</div>
                                <div class="zengfu">177%</div>
                            </div>
                        </div>
                        <div class="c1-r3-item">
                            <div class="sub-title">累计飞行人数</div>
                            <div>
                                <div class="statistics-number-blue" unit="km">13,343,672</div>
                                <div>同比</div>
                                <div class="zengfu">177%</div>
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
                </div>
                <div class="screen-c2-r2">
                    <div class="weather-city" v-for="item in [1,2,3,4,5]" :key="item">
                        <div class="weather sun"></div>
                        <div>
                            <div class="city">沈阳</div>
                            <div class="temperature">20℃ ~ 10℃</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="screen-c3">
                <div class="screen-c3-r1 screen-panel">
                    <div class="panel-title">国内Top5目的地</div>
                    <div class="top-panel">
                        <div class="top-panel-item" v-for="item in c3r1Data" :key="item.label">
                            <div class="city">{{item.label}}</div>
                            <div class="chart ">
                                <div :style="'width:'+item.ratio+'%;'"></div>
                            </div>
                            <div class="number">{{item.value}}</div>
                        </div>
                    </div>
                </div>
                <div class="screen-c3-r2 screen-panel">
                    <div class="panel-title">国内Top5目的地</div>
                    <div class="top-panel">
                        <div class="top-panel-item" v-for="item in c3r2Data" :key="item.label">
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
    </div>
</template>
<script>
const $dictionary = $import("dag/common/dictionary");

import chart1 from "./chart1";
import chart2 from "./chart2";
import chart3 from "./chart3";
import chartMap from "./chartMap";
import worldMap from "./worldMap";

import Store from "./store";

export default {
    components: {
        IotChart: $import("dag/components/Charts").Component,
    },
    data() {
        return {
            chartOptionsLeft1: [],
            chartOptionsLeft2: {
                alarmDeviceCount: 0,
                deviceCount: 0,
                offlineDeviceCount: 0,
                onlineDeviceCount: 0,
                signalType: 0,
            },
            chartOptionsLeft3: chart3(this, { title: "设备报警量" }),
            chartOptionsBottom1: chart3(this, { title: "日活设备" }),
            chartOptionsBottom2: chart3(this, { title: "每日新增设备" }),
            chartOptionsBottom3: chart3(this, { title: "累计激活设备" }),
            chartOptionsRight1: chart2(this, { title: "接入信号类型" }),
            chartOptionsRight1Items: [],
            chartOptionsRight2: chart3(this, { title: "总设备消息总量" }),
            chartOptionsRight3: [],
            chartOptions1: chart1(this, { title: "日活设备" }),
            chartOptions2: chart2(this, { title: "日活设备" }),
            chartOptions3: chart3(this, { title: "日活设备" }),
            chartOptionsMap: chartMap(this, { title: "日活设备" }),
            chartOptionsWorldMap: worldMap(this, { title: "日活设备" }),
            c3r1Data : [{
                label : "北京",
                ratio : "80",
                value : "55"
            },{
                label : "沈阳",
                ratio : "55",
                value : "28"
            },{
                label : "昆明",
                ratio : "20",
                value : "24"
            },{
                label : "烟台",
                ratio : "18",
                value : "16"
            },{
                label : "呼和浩特",
                ratio : "15",
                value : "12"
            }],
            c3r2Data : [{
                label : "北京",
                ratio : "80",
                value : "55"
            },{
                label : "沈阳",
                ratio : "55",
                value : "28"
            },{
                label : "昆明",
                ratio : "20",
                value : "24"
            },{
                label : "烟台",
                ratio : "18",
                value : "16"
            },{
                label : "呼和浩特",
                ratio : "15",
                value : "12"
            }],
            c3r4Data : [{
                label : "今日出国",
                ratio : "50",
                value : "20"
            },{
                label : "今日回国",
                ratio : "20",
                value : "5"
            }]
        };
    },
    methods: {
        refresh() {
            this.refresh_left();

            this.refresh_bottom();

            this.refresh_right();
        },
        refresh_left() {
            Store.statistics("CHART_LEFT").then((res) => {
                this.refresh_left_1(res.left1);
            });
        },
        refresh_left_1(res) {
            var total = 0;
            if (res.length > 0) {
                total = res[0].deviceCount;
                res.forEach((item) => {
                    item.width = 0;
                });
            }
            if (res.length > 5) {
                res = res.slice(0, 5);
            }
            this.chartOptionsLeft1 = res;
            setTimeout(() => {
                res.forEach((item) => {
                    item.width = (item.deviceCount * 100.0) / total;
                });
            }, 0);
            //地图
            this.chartOptionsMap.setOption.series[0].data = res.map((item) => ({
                name: item.provinceName.replace("省", ""),
                value: item.deviceCount,
            }));
        },
        refresh_bottom() {
            Store.statistics("CHART_BOTTOM").then((res) => {
            });
        },
        refresh_right() {
            Store.statistics("CHART_RIGHT").then((res) => {
            });
        },
        toHex(v) {
            v = +v;
            if (v > 255) {
                v = 255;
            }
            v = v.toString(16);
            if (v.length == 1) {
                v = "0" + v;
            }
            return v;
        },
    },
    mounted() {
        this.refresh();
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
    .screen-logo {
        width: 175px;
    }
    .screen-logo-title{
        position: absolute;
        font-size:28px;
        top:100px;
        z-index: 10;
        left:50%;
        transform: translate(-50%,0);
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
        .statistics-number {
            font-size: 48px;
            color: #ecd225;
        }
        .number-unit {
            font-size: 20px;
        }
        .c1-r3-item {
            padding: 30px 0px 10px 0px;
            font-size: 20px;
            .sub-title {
                font-size: 18px;
                padding-bottom: 20px;
            }
            .statistics-number-blue {
                font-size: 36px;
                color: #31c4f5;
                padding-right: 20px;
                &:after {
                    content: attr(unit);
                    display: inline-block;
                    padding-left: 5px;
                    font-size: 20px;
                    color: #fff;
                }
            }
            .zengfu {
                background: #185987;
                padding: 3px;
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
        background: #30517D;
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
            .weather-city {
                width: 160px;
                & > div {
                    display: inline-block;
                    vertical-align: middle;
                }
                .weather {
                    width: 30px;
                    height: 30px;
                    padding: 5px 5px;
                    background-position: center center;
                    background-repeat: no-repeat;
                    &.sun {
                        background-image: url("/images/sun.png");
                    }
                }
                .city {
                    font-size: 16px;
                    padding-bottom: 5px;
                }
                .temperature {
                    font-size: 16px;
                    color: #92c3ff;
                }
            }
        }
    }
    .screen-c3 {
        flex: 0 0 16%;
        .screen-panel{
            padding-bottom:5px;
        }
        .panel-title{
            font-size:24px;
            padding-bottom:15px;
            border-bottom:1px solid #2D4C76;
        }
        .top-panel{
            padding-top:10px;
            padding-bottom:20px;
            .top-panel-item{
                padding:10px 0px;
                &>div{
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .city{
                font-size:20px;
                width:100px;
                color:#92C3FF;
            }
            .chart{
                width:126px;
                height:8px;
                background:#0B2651;
                border-radius: 3px;
                &>div{
                    height:8px;
                    border :1px solid #3264AB;
                    border-radius: 3px;
                    background: linear-gradient(to right, #23508B,#2387AF 20%, #23E0E9 50%, #23FFFE);
                }
                &.darkblue>div{
                    background: linear-gradient(to right, #234A88,#2358AE 20%, #236DE6 50%, #2380FF);
                }
            }
            .number{
                font-size:20px;
                color:#FFF;
                padding-left:10px;
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
        animation: IIV 3s linear 1s infinite;
    }
    .IIIV {
        animation: IIV 3s linear 1.4s infinite;
    }

    @keyframes IIV {
        from {
            transform: scale(0.1);
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: scale(2.1);
        }
    }
    .boss {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        margin-left: -150px;
        margin-top: -150px;
        position: absolute;
        display: inline-block;
        border: 0.0625rem solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        opacity: 0;
    }
}
</style>