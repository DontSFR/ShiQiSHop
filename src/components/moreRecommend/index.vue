
<template>
    <div class="spcial-content">
        <div class="item-top">
            <img src="~@/assets/rqxp.png" alt="">
        </div>
        <div class="feat_prod_box" >
            <div class="remen" v-for="(item,t) in bookList">
                <div  class="tu">
                    <Poptip trigger="hover" content="点击查看详情">
                        <router-link :to="{name:'details',query:{goodsId:item.goodsId}}">
                            <img :src="item.img">
                        </router-link>
                    </Poptip>
                </div>
                <div class="detail">
                    <span class="text brand">{{item.brand}}</span>
                    <br>
                    <span class="text name">{{item.goodsName}}</span>
                    <br>
                    <span  class="text description">{{item.introduce}}</span>
                    <br>
                    <span class="text grade-num">￥{{item.price}}</span>
                </div>
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
            gradeValue:"",
            valueCustomText:0,
            page:{
                pageSize: 6,
                total: 0,
                pageNum: 1
            },
            bookList:[
                // {name:'爱生命',grade:9.4,introduce:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'},
                // {name:'Storm',grade:9.3,introduce:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                // {name:'ASKME',grade:9.2,introduce:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'},
                // {name:'爱生命',grade:9.1,introduce:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'},
                // {name:'Storm',grade:9.4,introduce:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                // {name:'ASKME',grade:9.4,introduce:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'}
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
                method:'get',
                url:'/goods/all?type=彩妆',
                params:{
                    ...this.page
                }
            }).then(res=>{
                this.bookList=res.res.list
                this.page.total=res.res.total
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
    width:@win-width-xxmin;
    margin: 0 auto;
    height: 100%;
    padding: 20px 0 0 20px;
    .item-top{
        text-align: center;
        width:@win-width-xxmin;
    }
    .title{
        display: inline-block;
        color:#734633 !important;
        font-size:19px;
        height:30px;
        margin:10px 0 10px 0;
        .title_icon{
            float:left;
            padding:0 5px 0 0;
        }
        
        .title-color{
            color:#734633 !important;
            font-size:19px;
        }
    }
    .feat_prod_box{
        padding-left:10px;
        margin-bottom: 20px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .remen{
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 48%;
            // height:180px;
            overflow: hidden;
            padding: 15px 0 10px 10px;
            margin-right:1.25%;
            border-bottom:1px #b2b2b2 dashed;
            .tu{
                float: left;
                img{
                    width:200px;
                    height:230px;
                }
            }
            .detail{
                float: left;
                padding-left: 10px;
                margin-left: 20px;
                width: 230px;
                text-align: center;
                height: 230px;
                border-left:1px dashed #b2b2b2;
                line-height: 20px;
                .text{
                    // font-size: 14px;
                }
                .brand{
                    line-height: 60px;
                    font-weight: bold;
                    font-size: 22px;
                    width: 100%;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;   //只展示5行
                    -webkit-box-orient: vertical;
                }
                .name{
                    line-height: 40px;
                    width: 100%;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;   //只展示5行
                    -webkit-box-orient: vertical;
                    font-size: 17px;
                }
                .description{
                    color: #999;
                    font-size: 12px;
                    width: 100%;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;   //只展示5行
                    -webkit-box-orient: vertical;
                }
                .grade-num{
                    color:#f5a623;
                    font-size: 14px;
                }
            }
            .intro{
                width: 44%;
                font-size: 14px;
                margin-left:10px;
                height: 85%;
                float: left;
                // background-color: rgb(170, 220, 243);
                .intro-title{
                    display: inline-block;
                    width: 100px;
                }
                .intro-content{
                    height:84%;
                    width: 100%;
                    padding-left: 20px;
                    overflow: hidden;
                    display: inline-block;
                }
            }
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
    .page-container{
        width: 100%;
        text-align: center;
        padding-bottom: 20px;
    }
}

</style>
