<template>
    <div class="new-content">
        <a class="title">
            <span class="title_icon">
                <img src="~@/assets/index/bullet1.gif" alt="" title="" />
            </span>
            <router-link to='/newBook' >
                <span  class="title-color">新书上架/更多</span>
            </router-link>
        </a>
        <div class="new_products">
            <div class="new_prod_box" v-for="item in newbookList">
                <router-link 
                    :to="{name:'details',query:{bookId:item.bookId}}"
                >
                    <a>{{item.name}}</a>
                    <div class="new_prod_bg">
                        <span class="new_icon"><img src="~@/assets/index/new_icon.gif" alt="" title="" /></span>
                        <img class="thumb" :src="`https://images.weserv.nl/?url=${item.img}`">
                        <a>{{item.writer}}</a>
                    </div> 
                </router-link>           
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            newbookList:[
                {name:'爱生命',content:'爱你就想爱生命',price:'34',src:'~@/assets/newbook/1.jpg'},
                {name:'Storm',content:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                {name:'ASKME',content:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'},
                {name:'松子',content:'被嫌弃的松子的一生',price:'32',src:'~@/assets/newbook/4.jpg'},
                {name:'坚强',content:'不慌不忙的坚强',price:'26',src:'`@/assets/newbook/5.jpg'},
                {name:'松子',content:'被嫌弃的松子的一生',price:'32',src:'~@/assets/newbook/4.jpg'}
            ]
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getBookList()
        },
        getBookList(){
            this.$ajax({
                method:'post',
                url:'/getBooksOrderByDate',
                params:{
                    num:6
                }
            }).then(res=>{
                this.newbookList=res.res
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.new-content{
    width:100%;
    padding: 20px 0 20px 20px;
    .title{
        display: inline-block;
        color:#734633;
        font-size:19px;
        height:30px;
        margin:10px 0 10px 0;
        .title-color{
            color:#734633;
            font-size:19px;
        }
        .title_icon{
            float:left;
            padding:0 5px 0 0;
        }
    }
    .new_products{
         width: 100%;
        padding:10px 0;
        overflow:hidden;
        height: 100%;
        .new_prod_box{
            float:left;
            text-align:center;
            padding:10px;
            a{
                padding:5px 0 5px 0;
                color:#b5b5b6;
                text-decoration:none;
                display:block;
            }
            .new_prod_bg{
                width:188px;
                height:238px;
                text-align:center;
                background-image:url("~@/assets/index/new_prod_box.gif");
                background-size: 100% 100%;
                position:relative;
            }
            .new_icon{
                position:absolute;
                top:0px;
                right:0px;
                z-index:200;
            }
            .thumb{
                display: inline-block;
                width: 130px;
                height:200px;
                padding:30px 0 0 0;
            }
        }
    }
}
</style>


