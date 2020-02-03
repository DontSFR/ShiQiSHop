<template>
    <div class="main-content">
        <div class="left-content">
            <category-books></category-books>
        </div>
    </div>
</template>
<script>
import categoryBooks from '@/components/categoryBooks/index.vue'
    export default{
        components: {categoryBooks}
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    
}
.left-content{
    width: 65%;
    // height: 100%;
    min-height: 1251px;
    float: left;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
</style>

