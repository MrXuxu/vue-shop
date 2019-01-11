<template>
    <div class="numbox">
        <input type="button" name="" id="" value="-" @click="reduce">
        <input type="number" class="number" value="1" ref="numbox" v-model="nums" readonly>
        <input type="button" name="" id="" value="+" @click="add" >
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    props: {
        nums: {
            type: [Number, String],
            default: 1
        }
    },
    data() {
        return {
            num: 1,
        }
    },
    methods: {
        add() {
            this.$emit('add');
        },
        reduce() {
            if(this.nums <= 1) {
                Toast('商品数量最少为1')
                return;
            }
            this.$emit('reduce');
        }
    },
    watch: {
        nums(newVal, oldVal) {
            console.log(newVal);
        }
    }
}
</script>
<style lang="scss" scoped>
.numbox {
    font-size: 0;
    vertical-align: bottom;
    display: inline-block;
}
input {
    width: 35px;
    height: 30px;
    font-size: 13px;
    border: none;
    border: 1px solid #ccc;
}
input[type="number"] {
    text-align: center;
    // transform: translateY(-1px);
}
</style>


