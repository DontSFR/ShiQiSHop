<template>
    <div class="main-content">
        <div class="left-content">
            <more-recommend></more-recommend>
        </div>
    </div>
</template>
<script>
import moreRecommend from "@/components/moreRecommend/index.vue";
    export default{
        components:{moreRecommend}
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
}
.left-content{
    width: 65%;
    min-height: 1251px;
    // height: 100%;
    float: left;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
</style>

