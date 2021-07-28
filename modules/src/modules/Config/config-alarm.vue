<template>
    <div class="MODULE-AlarmConfig">
        <div class="alarmconfig-header">
            共有&nbsp;<span>{{receivers.length}}</span>&nbsp;个告警接收人。
            <xui-button style="float:right;margin-top:20px;" color="primary" @click="$refs.form.submit()">完成
            </xui-button>
        </div>
        <div class="alarmconfig-body">
            <xui-form ref="form" :options="formOptions" @submit="save"></xui-form>
        </div>
    </div>
</template>
<script>
import Store from "./store";

const $tip = $import("dag/common/tip");

export default {
    data() {
        return {
            receivers: [],
            formOptions: {
                cols: 2,
                fields: [
                    {
                        group: "告警配置",
                        label: "告警接收人",
                        name: "receivers",
                        widget: "edittable",
                        fieldClass: "company-edit-table",
                        view: (v) => {
                            if (!v) {
                                return "";
                            }
                            v = JSON.parse(v);
                            return [
                                "<div class='xui-edittable xui-edittable-style xui-datatable xui-datatable-style xui-datapage xui-datapage-style'><table class='xui-datatable-table table table-bordered table-striped'>",
                                `<thead>
                                    <tr>
                                        <th class="text-center" style="width:80px;">序号</th>
                                        <th class="text-center">证券公司</th>
                                        <th class="text-center">营业部</th>
                                    </tr>
                                </thead>`,
                                v.map(
                                    (item, i) =>
                                        `<tr><td class="text-center">${
                                            i + 1
                                        }</td><td>${item.company}</td><td>${
                                            item.dept
                                        }</td></tr>`
                                ),
                                "</table></div>",
                            ].join("");
                        },
                        cols: [
                            {
                                title: "姓名",
                                name: "name",
                                widget: "input",
                                placeholder: "请输入姓名",
                            },
                            {
                                title: "收件邮箱",
                                name: "email",
                                widget: "input",
                                placeholder: "请输入邮箱",
                            },
                        ],
                    },
                ],
                cast(model) {
                    if (model.receiver) {
                        model.receiver = JSON.stringify(
                            model.receiver.split(";").map((item) => {
                                var ts = item.split(":");
                                return {
                                    name: ts[0],
                                    email: ts[1],
                                };
                            })
                        );
                    }
                },
                format(model) {
                    return model;
                },
                toolbar: false,
            },
        };
    },
    methods: {
        refresh() {
            Store.getAlarmReceiver().then((res) => {
                this.$refs.form.reset({
                    receivers: JSON.stringify((this.receivers = res || [])),
                });
            });
        },
        save(model) {
            var receivers = JSON.parse(model.receivers) || [];
            var saveReceivers = [];
            var emailT = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            for (var i = 0, item; (item = receivers[i++]); ) {
                if (!item.name && !item.email) {
                    continue;
                }
                if (!item.name) {
                    $tip("请填写收件人姓名", "warning");
                    return;
                }
                if (!emailT.test(item.email)) {
                    $tip("请填写合法邮箱地址", "warning");
                    return;
                }
                item.name = item.name.trim();
                item.email = item.email.trim();
                saveReceivers.push(item);
            }
            Store.saveAlarmReceiver(saveReceivers).then((res) => {
                $tip("保存成功", "success");
                this.refresh();
            });
        },
    },
    mounted() {
        this.refresh();
    },
};
</script>
<style lang="less">
.MODULE-AlarmConfig {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    .alarmconfig-header {
        height: 70px;
        line-height: 70px;
        padding: 0px 20px;
        background: #f7f7fb;
        box-sizing: border-box;
        border-bottom: 1px solid #e4e5ea;
    }
    .alarmconfig-body {
        position: absolute;
        top: 70px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 20px;
    }
}
</style>