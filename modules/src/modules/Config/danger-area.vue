<template>
    <div class="MODULE-DangerArea">
        <div class="dangerarea-header">
            共有低风险&nbsp;<span>36</span>&nbsp;个区域，中风险&nbsp;<span style="color:orange;">3</span>&nbsp;个区域，高风险&nbsp;<span style="color:red;">2</span>&nbsp;个区域。
            <xui-button style="float:right;margin-top:20px;" color="primary" @click="save">完成</xui-button>
        </div>
        <div class="dangerarea-body">
            <xui-table ref="table" :options="tableOptions"></xui-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableOptions: {
                columns: [
                    {
                        title: "序号",
                        name: "index",
                        headAlign : 'center',
                        style: "text-align:center;width:80px",
                        align: "left",
                        format(v, record, col, parent, index) {
                            return index + 1;
                        },
                    },
                    {
                        title: "地区",
                        name: "name",
                        headAlign : 'left',
                        style: "padding-left:20px;width:160px",
                        align: "left",
                    },
                    {
                        title: "风险提示",
                        align: "center",
                        headAlign : 'center',
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
        };
    },
    methods: {
        list() {
            return [
                {
                    id: 1,
                    name: "北京市",
                    sort: 1,
                    remark: "直辖市",
                    dangerLevel: "1",
                },
                {
                    id: 2,
                    name: "天津市",
                    sort: 2,
                    remark: "直辖市",
                    dangerLevel: "2",
                },
                {
                    id: 3,
                    name: "河北省",
                    sort: 5,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 4,
                    name: "山西省",
                    sort: 6,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 5,
                    name: "内蒙古自治区",
                    sort: 32,
                    remark: "自治区",
                    dangerLevel: "1",
                },
                {
                    id: 6,
                    name: "辽宁省",
                    sort: 8,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 7,
                    name: "吉林省",
                    sort: 9,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 8,
                    name: "黑龙江省",
                    sort: 10,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 9,
                    name: "上海市",
                    sort: 3,
                    remark: "直辖市",
                    dangerLevel: "1",
                },
                {
                    id: 10,
                    name: "江苏省",
                    sort: 11,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 11,
                    name: "浙江省",
                    sort: 12,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 12,
                    name: "安徽省",
                    sort: 13,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 13,
                    name: "福建省",
                    sort: 14,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 14,
                    name: "江西省",
                    sort: 15,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 15,
                    name: "山东省",
                    sort: 16,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 16,
                    name: "河南省",
                    sort: 17,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 17,
                    name: "湖北省",
                    sort: 18,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 18,
                    name: "湖南省",
                    sort: 19,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 19,
                    name: "广东省",
                    sort: 20,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 20,
                    name: "海南省",
                    sort: 24,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 21,
                    name: "广西壮族自治区",
                    sort: 28,
                    remark: "自治区",
                    dangerLevel: "1",
                },
                {
                    id: 22,
                    name: "甘肃省",
                    sort: 21,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 23,
                    name: "陕西省",
                    sort: 27,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 24,
                    name: "新 疆维吾尔自治区",
                    sort: 31,
                    remark: "自治区",
                    dangerLevel: "1",
                },
                {
                    id: 25,
                    name: "青海省",
                    sort: 26,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 26,
                    name: "宁夏回族自治区",
                    sort: 30,
                    remark: "自治区",
                    dangerLevel: "1",
                },
                {
                    id: 27,
                    name: "重庆市",
                    sort: 4,
                    remark: "直辖市",
                    dangerLevel: "1",
                },
                {
                    id: 28,
                    name: "四川省",
                    sort: 22,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 29,
                    name: "贵州省",
                    sort: 23,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 30,
                    name: "云南省",
                    sort: 25,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 31,
                    name: "西藏自治区",
                    sort: 29,
                    remark: "自治区",
                    dangerLevel: "1",
                },
                {
                    id: 32,
                    name: "台湾省",
                    sort: 7,
                    remark: "省份",
                    dangerLevel: "1",
                },
                {
                    id: 33,
                    name: "澳门特别行政区",
                    sort: 33,
                    remark: "特别行政区",
                    dangerLevel: "1",
                },
                {
                    id: 34,
                    name: "香港特别行政区",
                    sort: 34,
                    remark: "特别行政区",
                    dangerLevel: "1",
                },
            ];
        },
        save() {
            var records = this.$refs.table.$refs.datapage.data;
            debugger;
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