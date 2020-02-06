<template>
    <div class="main-content">
        <div class="left-content">
            <my-special></my-special>
        </div>
    </div>
</template>
<script>
import mySpecial from "@/components/moreSpecial/index.vue";
    export default{
        components:{mySpecial}
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    
}
.left-content{
      width:@win-width-xmin;
    margin: 0 auto;
    min-height: 1080px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
</style>

