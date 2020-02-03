<template>
    <div class="page-container">
        <Page
        :total="page.total"
        :page-size="page.pageSize"
        :current="page.pageNum" 
        show-elevator  
        @on-change="changePage"/>
    </div>
</template>

<script>
export default {
    props:{
        page: {
        type: Object,
        default () {
            return {
            pageSize: 10,
            total: 0,
            pageNum: 1
            }
        }
    }
    },
    data () {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.page-container{
    width: 100%;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-top: 10px;
    padding-bottom: 15px;
}
</style>
