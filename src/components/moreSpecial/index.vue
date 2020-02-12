<template>
    <div class="spcial-content">
        <div class="title">
            <span class="title_icon">
                <!-- <img src="~@/assets/index/bullet1.gif" alt="" title="" /> -->
            </span>
            评测中心
        </div>
        <div class="feat_prod_box" >
            <div class="prod_det_box" v-for="(item,t) in bookList">
                <div class="prod_img">
                    <img :src="item.img">
                </div>
                <div class="prod_title">{{item.name}}</div>
                <p class="details">{{item.introduce}}</p>
                <router-link class="more" :to="{name:'details',query:{bookId:item.bookId}}" >
                    <span  >- 更多详情 -</span> 
                </router-link>
                <div class="clear"></div>
            </div>
        </div>
        <div class="page-container">
            <Page 
                :total="page.total" 
                :page-size="page.pageSize" 
                :current="page.pageNum" 
                show-elevator 
                @on-change="changePage"
            />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            page:{
                pageNum: 1,
                pageSize:6,
                total: 0
            },
            bookList:[
                {name:'爱生命',introduce:'爱你就想爱生命',price:'34',src:'~@/assets/newbook/1.jpg'},
                {name:'Storm',introduce:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                {name:'ASKME',introduce:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'},
                {name:'爱生命',introduce:'爱你就想爱生命',price:'34',src:'~@/assets/newbook/1.jpg'},
                {name:'Storm',introduce:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'}
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
                url:'/getBooksByType',
                params:{
                    type:12,
                    ...this.page
                }
            }).then(res=>{
                this.page.total=res.res.total
                // this.bookList=res.res.list
            })
        },
        changePage(num){
            this.page.pageNum=num
            this.getBookList()
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.spcial-content{
    width:100%;
    height: 100%;
    overflow: hidden;
    padding: 20px 0 0 20px;
    .title{
        color:#734633;
        font-size:19px;
        height:30px;
        margin:10px 0 20px 0;
        .title_icon{
            float:left;
            padding:0 5px 0 0;
        }
    }
    .feat_prod_box{
        overflow: hidden;
        // display: flex;
        // flex-direction: row;
        // justify-content: space-around;
        padding-left:10px;
        height:100%;
        margin:0 20px 20px 0;
        .prod_title{
            color:#f8981d;
            padding:5px 0 0 15px;
            font-size:16px;
        }
        p.details{
            padding:5px 15px 5px 15px;
            font-size:14px;
        }
        .more{
            display: inline-block;
            height:20px;
            font-style:italic;
            color:#f8981d;
            float:right;
            text-decoration:none;
            font-size:11px;
            padding:0px 15px 0 0 ;
        }
    }
    .feat_prod_box_details{
        padding:10px 0 10px 0;
        margin:0 20px 10px 0;
        clear:both;
    }
    .prod_img{
        // float:left;
        margin-top:10px;
        padding:0 5px 0 0;
        text-align:center;
        img{
            width: 200px;
            height:260px;
        }
    }
    .prod_det_box{
        width: 269px;
        margin-top: 20px;
        height: 450px;
        border:1px solid rgb(209, 205, 205);
        border-radius:10px;
        float:left;
        margin-left: 25px;
        // padding:0 0 0 25px;
        position:relative;
    }
    .page-container{
        width: 100%;
        text-align: center;
        padding-bottom: 20px;
    }
}

</style>


