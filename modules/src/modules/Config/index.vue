<template>
    <div class="MODULE-Config">
        <div class="header">
            <img class="logo" src="images/config-logo.png" />
        </div>
        <div class="body">
            <div class="menu">
                <div :class="{'menu-item':true,active:componentId=='ConfigAlarm'}" @click="go('ConfigAlarm')">行政差旅</div>
                <div :class="{'menu-item':true,active:componentId=='DangerArea'}" @click="go('DangerArea')">风险地区录入</div>
            </div>
            <div class="major">
                <component :is="componentId"></component>
            </div>
        </div>
    </div>
</template>
<script>
import ConfigAlarm from "./config-alarm.vue";
import DangerArea from "./danger-area.vue";

export default {
    components: {
        ConfigAlarm,
        DangerArea,
    },
    data() {
        return {
            componentId: "DangerArea",
        };
    },
    methods: {
        go(r) {
            this.componentId = r;
        },
    },
};
</script>
<style lang="less">
.MODULE-Config {
    .header {
        box-sizing: border-box;
        height: 60px;
        background: #f7f7fb;
        border-bottom: 1px solid #e4e5ea;
        line-height: 60px;
        padding-left: 20px;
        .logo {
            width: 128px;
        }
    }
    .body {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 60px;
    }
    @side-width: 260px;
    .menu {
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: @side-width;
        border-right: 1px solid #e7e8ec;
        .menu-item {
            font-size: 20px;
            padding-left: 20px;
            height: 70px;
            line-height: 70px;
            box-sizing: border-box;
            border-bottom: 1px solid #e7e8ec;
            cursor: pointer;
            &:after {
                content: "\E70A";
                font-family: "xuiiconfont" !important;
                font-size: 20px;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                float: right;
                margin-right: 20px;
            }
            &:hover {
                background: #fafafa;
            }
            &.active {
                background: #f7f7fb;
            }
        }
    }
    .major {
        position: absolute;
        left: @side-width;
        right: 0px;
        bottom: 0px;
        top: 0px;
    }
}
</style>