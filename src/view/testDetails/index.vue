<template>
    <div class="main-content">
        <div class="spcial-content">
            <div class="title">
                <span class="title_icon">
                    <img src="~@/assets/index/bullet3.gif"
                    alt=""
                    title="" />
                </span>
                评论详情
            </div>
            <span class="detail-title">{{this.testDetails.title}}</span>
            <div class="left-content">
                <div class="prod_img">
                    <img class="book-img" :src="testDetails.imgUrl"/>
                </div>
                <div class="detail-content">
                    <div class="prod_det_box">
                    </div>
                    <div class="your-rate">
                        <Button class="collect-button"  type="warning" shape="circle" v-if="collectValue" @click="getCollect()">爱心</Button>
                        <Button class="collect-button"   shape="circle"  v-else  @click="getCollect()">灰心</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                testDetails:{},
                collectValue:false,
            }
        },
        create(){
            this.$route.query.bookId
            this.getTestDeails()
        },
        watch:{
            "$route":"getTestDeails"
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                this.getTestDeails()
            },
            getCollect(){
                console.log('22121')
                this.$ajax({
                    method:'post',
                    url:'/comment/like',
                    params:{
                        commentId:this.$route.query.commentId,
                        userId:this.$cookies.get('userId')
                    }
                }).then(res=>{
                    if(res.code===200){
                        this.collectValue=true
                        this.$Notice.success({
                            title: '操作成功'
                        })
                        this.getTestDeails()
                    }else if(res.code===500){
                        if(res.reason==="用户未登录"){
                            this.$Notice.error({
                                title: '收藏失败，用户未登录' 
                            })
                        }
                    }
                })
            },
            getTestDeails(){
                console.log('this.$route.query.commentId',this.$route.query.commentId,this.$cookies)
                this.$ajax({
                    method:'get',
                    url:'/comment/one',
                    params:{
                        commentId:this.$route.query.commentId,
                        userId:this.$cookies.get('userId')
                    }
                }).then(res=>{
                    this.testDetails=res.res
                    this.collectValue = res.res.zan
                })
            },
        }
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    
}
.spcial-content {
    
    width:@win-width-xmin;
    margin: 0 auto;
    min-height: 1080px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    padding: 20px 0 0 20px;
    .detail-title{
        display: inline-block;
        width: 100%;
        font-size: 20px;
        text-align: center;
    }
    .title {
        color: #734633;
        font-size: 19px;
        height: 30px;
        margin: 10px 0 10px 0;
        .title_icon {
            float: left;
            padding: 0 5px 0 0;
        }
    }
    .left-content{
        padding-left:10px ;
        height:300px;
        margin:0 20px 20px 0;
        .detail-content{
            width:80%;
            float:left;
            margin-left: 25px;
            position:relative;
            .your-rate{
                line-height: 50px;
                height:50px;
                .rate-container{
                    display: inline-block;
                    // background-color: #37A;
                    line-height: 16px;
                }
                /deep/.ivu-btn-circle{
                    width: 66px;
                }
                /deep/.ivu-btn{
                    padding:5px 8px 6px;
                }
                /deep/.ivu-btn.active, .ivu-btn:active {
                    color: #F91;
                    background-color: #fff;
                    border-color: #F91;
                }
                /deep/.ivu-btn:hover {
                    color: #F91;
                    background-color: #fff;
                    border-color: #F91;
                }
                .collect-button{
                    margin-right: 20px;
                }
            }
            
        }
        .prod_det_box{
            height: 260px;
            padding:25px 0 0 25px;
            border:1px solid rgb(209, 205, 205);
            border-radius:10px;
            .detail{
                width: 50%;
                float: left;
                display: inline-block;
                span{
                    margin: 5px 0;
                    display: inline-block;
                }
            }
            .rate{
                display:inline-block;
                width: 50%;
                span{
                    margin: 5px 0;
                    display: inline-block;
                }
                .rate-num{
                    font-size: 50px;
                    line-height: 60px;
                }
            }
        }
    }
    .prod_img{
        float:left;
        padding:0 5px 0 0;
        text-align:center;
        .book-img{
            width: 200px;
            height:260px;
        }
    }
}
</style>

