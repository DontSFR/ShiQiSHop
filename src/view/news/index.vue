<template>
    <div class="main-content">
        <div class="left-content">
            <div class="item-top">
                <img src="~@/assets/pczx.png" alt="">
            </div>
            <div class="spcial-content">
                <!-- <div class="title">
                    <span class="title_icon">
                        <img src="~@/assets/index/bullet1.gif" alt="" title="" />
                    </span>
                    评测中心
                </div> -->
                <div class="feat_prod_box" >
                    <div class="prod_det_box" v-for="(item,t) in newsList">
                        <div class="prod_img">
                            <img :src="item.imgUrl">
                        </div>
                        <div class="prod_title">{{item.title}}</div>
                        <p class="details">{{item.content}}</p>
                        <p class="user-name">——{{item.userName}}</p>
                        <router-link class="more" :to="{name:'testDetails',query:{commentId:item.commentId}}" >
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
        </div>
    </div>
</template>
<script>
// import myTest from "@/components/moreTest/index.vue";
    export default{
        data () {
            return {
                page:{
                    pageNum: 1,
                    pageSize:8,
                    total: 0
                },
                newsList:[
                    // {title:'爱生命',content:'content',price:'34',src:'@/assets/newbook/1.jpg'},
                    // {title:'Storm',content:'暴风雨中的孩子',price:'46',src:'@/assets/newbook/3.jpg'},
                    // {title:'ASKME',content:'儿童百科百问百答',price:'65',src:'@/assets/newbook/2.jpg'},
                    // {title:'爱生命',content:'爱你就想爱生命',price:'34',src:'@/assets/newbook/1.jpg'},
                    // {title:'Storm',content:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'}
                ]
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                this.getNewsList()
            },
            getNewsList(){
                this.$ajax({
                    method:'get',
                    url:'/comment/allPc',
                    params:{
                        pageNum: this.page.pageNum,
                        pageSize: this.page.pageSize,
                        userId:this.$cookies.get('userId')
                    }
                }).then(res=>{
                    this.page.total=res.res.total
                    // console
                    this.newsList=res.res.list
                   
                })
            },
            changePage(num){
                this.page.pageNum=num
                this.getNewsList()
            }
        }
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
    min-height: 770px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    .item-top{
        text-align: center;
        width:@win-width-xmin;
        margin: 0 auto;
    }
}
.spcial-content{
    width:100%;
    height: 100%;
    overflow: hidden;
    padding: 0 0 0 20px;
    .title{
        color:#734633;
        font-size:19px;
        height:30px;
        margin:10px 0 20px 0;
        .title_icon{
            float:left;
            // padding:0 5px 0 0;
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
            overflow: hidden; 
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
        .user-name{
            display: inline-block;
            position:absolute;
            bottom: 40px;
            right: 10px;
            height:20px;
            font-style:italic;
            float:right;
            text-decoration:none;
            font-weight: bold;
            padding:0px 15px 0 0 ;
        }
        .more{
            display: inline-block;
            position:absolute;
            bottom: 10px;
            right: 0;
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
        text-align:center;
        img{
            width: 250px;
            height:270px;
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

