<template>
    <div class="right-content" >
        <!-- :class="{'fixed':isfix}" -->
        <div class="splid"></div>
        <input-search></input-search>
        <div class="splid"></div>
        <hot-tag></hot-tag>
        <hot-books></hot-books>
    </div>
</template>
<script>
import hotTag from './hotTag.vue'
import hotBooks from './hotBooks.vue'
import inputSearch from './inputSearch.vue'
export default{
    components: {hotTag,hotBooks,inputSearch},
    data () {
        return {
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.right-content{
    position:static;
    width:35%;
    float: right;
    background: url("~@/assets/index/center_bg_2.png") repeat-y;
    background-size:100% 100%;
    .splid{
        width: 100%;
        height: 50px;
        background: url("~@/assets/index/border.gif") no-repeat bottom center;
    }
}
// .fixed{
//     position: fixed;
//     top:35;
//     right:0;
//     width:35%;
//     background: url("~@/assets/index/center_bg_2.png") repeat-y;
//     background-size:100% 100%;
//     .splid{
//         width: 100%;
//         height: 50px;
//         background: url("~@/assets/index/border.gif") no-repeat bottom center;
//     }
// }
</style>


