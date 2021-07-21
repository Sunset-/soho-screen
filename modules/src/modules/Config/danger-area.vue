<template>
    <div class="MODULE-DangerArea">
        <div class="dangerarea-header">
            共有低风险&nbsp;<span>{{normalCount}}</span>&nbsp;个区域，中风险&nbsp;<span
                style="color:orange;">{{warnCount}}</span>&nbsp;个区域，高风险&nbsp;<span
                style="color:red;">{{dangerCount}}</span>&nbsp;个区域。
            <xui-button style="float:right;margin-top:20px;" color="primary" @click="save">完成</xui-button>
        </div>
        <div class="dangerarea-body">
            <xui-table ref="table" :options="tableOptions"></xui-table>
        </div>
    </div>
</template>
<script>
import Store from "./store";

const $tip = $import("dag/common/tip");

export default {
    data() {
        return {
            tableOptions: {
                columns: [
                    {
                        title: "序号",
                        name: "index",
                        headAlign: "center",
                        style: "text-align:center;width:80px",
                        align: "left",
                        format(v, record, col, parent, index) {
                            return index + 1;
                        },
                    },
                    {
                        title: "地区",
                        name: "name",
                        headAlign: "left",
                        style: "padding-left:20px;width:160px",
                        align: "left",
                    },
                    {
                        title: "风险提示",
                        align: "center",
                        headAlign: "center",
                        toolbar: {
                            tools: [
                                {
                                    widget: "radio",
                                    data: [
                                        {
                                            text: "低风险",
                                            value: "1",
                                        },
                                        {
                                            text: "中风险",
                                            value: "2",
                                        },
                                        {
                                            text: "高风险",
                                            value: "3",
                                        },
                                    ],
                                    default(record) {
                                        return record.dangerLevel;
                                    },
                                    operate(record, v) {
                                        record.dangerLevel = v;
                                    },
                                },
                            ],
                        },
                    },
                ],
                lazy: false,
                pageNumberStart: 0,
                pageSize: 9999,
                localPageSize: 10,
                format: {
                    list: "",
                    count: "length",
                    currentPage: "pageNumber",
                    pageSize: "pageSize",
                },
                datasource: (filter) => {
                    this.loading = false;
                    return this.list(filter);
                },
            },
            allAreas: [],
        };
    },
    computed: {
        normalCount() {
            return this.allAreas.filter((item) => item.dangerLevel == "1")
                .length;
        },
        warnCount() {
            return this.allAreas.filter((item) => item.dangerLevel == "2")
                .length;
        },
        dangerCount() {
            return this.allAreas.filter((item) => item.dangerLevel == "3")
                .length;
        },
    },
    methods: {
        list() {
            return Store.getDangerArea().then((res) => {
                this.allAreas =
                    res && res.length
                        ? res
                        : JSON.parse(JSON.stringify(Store.defaultAreas));

                return JSON.parse(JSON.stringify(this.allAreas));
            });
        },
        save() {
            var records = this.$refs.table.$refs.datapage.data;
            Store.saveDangerArea(records).then((res) => {
                $tip("保存成功", "success");
                this.$refs.table.refresh();
            });
        },
    },
};
</script>
<style lang="less">
.MODULE-DangerArea {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    .dangerarea-header {
        height: 70px;
        line-height: 70px;
        padding: 0px 20px;
        background: #f7f7fb;
        box-sizing: border-box;
        border-bottom: 1px solid #e4e5ea;
    }
    .dangerarea-body {
        position: absolute;
        top: 70px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 20px;
    }
}
</style>