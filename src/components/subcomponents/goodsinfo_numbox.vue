<template>
    <div class="numbox">
        <input type="button" name="" id="" value="-" @click="reduce">
        <input type="number" value="1" ref="numbox" v-model="num">
        <input type="button" name="" id="" value="+" @click="add" >
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    props: ['max'],
    data() {
        return {
            num: 1,
        }
    },
    methods: {
        add() {
            this.num++;
        },
        reduce() {
            this.num--;
        }
    },
    watch: {
        num(newVal, oldVal) {
            // console.log(newVal);
            if(newVal > this.max) {
                Toast('数量超出最大了')
                this.num = this.max;
            }
            if(newVal === NaN) {
                this.num = 1
            }else if(newVal <=0 ) {
                this.num = 1;
                Toast('数量不能小于0');
            }
            this.$emit('getcount', parseInt(newVal));
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
    transform: translateY(-1px);
}
</style>


