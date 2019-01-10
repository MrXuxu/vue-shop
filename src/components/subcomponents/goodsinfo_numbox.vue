<template>
    <div class="numbox">
        <input type="button" name="" id="" value="-">
        <input type="number" value="1" ref="numbox">
        <input type="button" name="" id="" value="+" @change="countChanged">
    </div>
</template>
<script>;/
export default {
    methods: {
        countChanged() {
            console.log(this.$refs.numbox.value);
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


