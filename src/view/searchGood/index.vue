<template>
<div class="main-content">
    <div class="left-content">
        <div class="item-top">
            <img src="~@/assets/sycp.png" alt="">
        </div>
        <div class="new-content">
            <div class="new_products" v-if="shopList.length!==0">
                <div class="new_prod_box"  v-for="item in shopList">
                    <router-link 
                        :to="{name:'details',query:{goodsId:item.goodsId}}"
                    >
                        <div class="book-name">{{item.goodsName}}</div>
                        <div class="new_prod_bg">
                            <img :src="item.img"alt="" title="" class="thumb" border="0" />
                            <div style="#f5a623" class="book-name">{{item.brand}}</div>
                        </div>
                    </router-link>       
                </div>
            </div>
            <div class="new_products" v-else>
                <p class="notice">书库里暂时找不到你想要的书!</p>
            </div>
            <div class="page-container" v-show="shopList.length!==0">
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
export default {
    data () {
        return {
            page:{
                pageSize: 12,
                total: 0,
                pageNum: 1
            },
            shopList:[
                {name:''},
            ]
        }
    },
    mounted(){
        this.init()
    },
    create(){
        //首先,当你修改了路由参数的时候,会发现你的页面数据并没有改变,数据是通过created这个生命周期从ajax获取到的.
        this.$route.query.keyword,
        this.getCategoryList()
    },
    watch:{
        //监听相同路由下参数变化的时候，从而实现异步刷新
        //通过监听路由参数的改变来重新获取数据,这样,你只要改变了路由参数,数据也会跟着变化啦
        "$route":"getCategoryList"
    },
    methods:{
        init(){
            this.getCategoryList()
        },
        getCategoryList(){
            this.$ajax({
                method:"get",
                url:"/goods/search",
                params:{
                    keyword:this.$route.query.keyword
                }
            }).then(res=>{
                this.page.total=res.res.total
                this.shopList=res.res.list
            })
        },
        changePage(num){
            this.page.pageNum=num
            this.getCategoryList()
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
.left-content{
    width:@win-width-xmin;
    margin: 0 auto;
    min-height: 770px;
    background-size:100% 100%;
    .item-top{
        text-align: center;
        width:@win-width-xmin;
        margin: 0 auto;
    }
}
.new-content{
    width:100%;
    height:100%;
    .title{
        color:#734633;
        font-size:19px;
        height:30px;
        // margin:10px 0 10px 0;
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
        .notice{
            text-align: center;
            font-size: 20px;
            padding-bottom: 50px;
            color: #f5a623;
        }
        .new_prod_box{
            height: 290px;
            float:left;
            text-align:center;
            padding:0 10px;
            .book-name{
                // padding:5px 0 5px 0;
                // color:#b5b5b6;
                // text-decoration:none;
                // display: inline-block;
                width: 150px;
                margin: 0 auto;
                font-size:16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
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
    .page-container{
        width: 100%;
        text-align: center;
    }
}
</style>


