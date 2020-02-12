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
    width:100%;
    margin: 0 auto;
    min-height: 620px;
    // height: 100%;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    .item-top{
        text-align: center;
    }
}
</style>

