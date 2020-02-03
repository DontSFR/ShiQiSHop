<template>
    <div class="main-content">
        <div class="left-content">
            <more-new></more-new>
        </div>
    </div>
</template>
<script>
import moreNew from "@/components/moreNew/index.vue";
    export default{
        components:{moreNew}
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
    min-height: 1251px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
</style>

