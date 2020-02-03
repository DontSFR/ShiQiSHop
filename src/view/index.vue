<template>
    <div class="main-content">
        <my-header></my-header><!--头-->
        <my-bannerx></my-bannerx><!--搜索-->
        <router-view></router-view>
        <!-- <right-content></right-content> -->
    </div>
</template>
<script>
import myHeader from '@/components/public/myHeader.vue'
import myBannerx from '@/components/public/myBannerx.vue'
import rightContent from '@/components/public/rightContent/index.vue'
    export default{
        components: {myHeader,myBannerx,rightContent},
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    // width:@win-width-xmin;
    width:100%;
    margin: 0 auto;
    position: relative;
}
</style>
