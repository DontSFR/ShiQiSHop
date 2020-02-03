<template>
    <div class="spcial-content">
        <div class="title">
            <span class="title_icon">
                <img src="~@/assets/index/bullet4.gif" alt="" title="" />
            </span>
            热门标签
        </div>
        <div class="classify-box">
            <div class="classify-content" v-for="t in bookTypeList">
                <span class="name">
                    <router-link 
                        :to="{name:'category',query:{id:t.id,name:t.name}}"
                    > 
                    {{t.name}}
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
                bookTypeList: [
                    {id: '1',name: '小说文学馆' }, 
                    {id: '2', name: '经济馆'},
                    {id: '3', name: '管理馆'}, 
                    {id: '4', name: '教育馆'},
                    {id: '5', name: '文化馆'}, 
                    {id: '6', name: '历史馆'}, 
                    {id: '7', name: '文学馆'} , 
                    {id: '8', name: '名著馆'} , 
                    {id: '9', name: '军事馆'}  , 
                    {id: '10', name: '美食馆'}  
                ],
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.spcial-content{
    width:100%;
    padding: 20px 0 0 20px;
    .title{
        color:#734633;
        font-size:19px;
        height:30px;
        margin:10px 0 10px 0;
        .title_icon{
            float:left;
            padding:0 5px 0 0;
        }
    }
    .classify-box{
        padding:0 0 30px 10px;
        margin-right:20px;
        border-bottom:1px #b2b2b2 dashed;
        .title{
            color:#000000;
            font-size:14px;
        }
        .classify-content{
            width: 43%;
            display: inline-block;
            margin-top: 10px;
            margin-left: 7%;
            text-align: center;
            .name{
                width: 100%;
                height: 50px;
                line-height: 50px;
                display: inline-block;
                background-color:rgb(213, 219, 219);
                a{
                    color:#37A;
                }
                a:hover{
                    color: #f7a849 ;
                }
            }
        }
    }
}

</style>


