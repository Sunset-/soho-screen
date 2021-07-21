<template>
    <div class="component-counter">
        <div class="numberScroll">
            <div class="screenMini" :style="'height:'+size+'px;'" v-for="(item,index) in numberToArray" :key="index">
                <div :style="reStyle(item)">
                    <div v-for="(v,i) in numberBox" :style="'height:'+size+'px;font-size:'+size+'px;'" :key="i">{{v}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        /**
         * 传入值String, Number
         */
        number: {
            type: [String, Number],
            default: 0,
        },
        size: {
            type: [String, Number],
            default: 24,
        },
    },
    data() {
        return {
            lastN: 0,
            currentN: 0,
            numberBox: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ","],
            numberToArray: [],
        };
    },
    methods: {
        reStyle(number) {
            return `transform:translate(0,-${
                (isNaN(number) ? 10 : +number) * this.size
            }px)`;
        },
    },
    watch: {
        number: {
            immediate: true,
            deep: true,
            handler(n) {
                this.lastN = this.currentN;
                this.currentN = n;
                var arr = n.toString().split("");
                arr.reverse();
                var barr = [];
                arr.forEach((t, i) => {
                    if (i > 0 && i % 3 == 0) {
                        barr.unshift(",");
                    }
                    barr.unshift(t);
                });
                if (n == 0 || this.lastN == 0) {
                    this.numberToArray = new Array(barr.length).fill(0);
                }
                setTimeout(() => {
                    this.numberToArray = barr;
                }, 10);
            },
        },
    },
};
</script>
<style lang="less">
.component-counter {
    display: inline-block;
    .numberScroll {
        display: flex;
        align-items: center;
        .screenMini {
            // height: 1.42rem;
            // width: 1.26rem;
            overflow: hidden;
            & > div {
                display: flex;
                flex-direction: column;
                transform: translate(0, 0);
                transition: all 0.6s;
                & > div {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    line-height: 1;
                    overflow: hidden;
                    // height: 1.42rem;
                }
            }
        }
    }
}
</style>