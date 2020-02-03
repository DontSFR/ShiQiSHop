<template>
    <div class="left-content">
        <top-nav></top-nav>
        <content-nav></content-nav>
    </div>
</template>
<script>
import topNav from '@/components/center/topNav.vue';
import contentNav from '@/components/center/contentNav.vue';
export default {
    components:{topNav,contentNav},
    created(){
        this.$cookies.get('userId')
    },
    watch: {
        init (v) {},
        '$cookies'(){
            this.activeName=to.name
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
// .main-content{
//     width: 100%;
// }
.left-content{
    width: 65%;
    // height: 100%;
    min-height: 1251px;
    float: left;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
</style>

