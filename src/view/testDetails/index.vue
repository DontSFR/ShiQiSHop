<template>
    <div class="main-content">
        <div class="spcial-content">
            <!-- <div class="title">
                <span class="title_icon">
                    <img src="~@/assets/index/bullet3.gif"
                    alt=""
                    title="" />
                </span>
                评论详情
            </div> -->
            <!-- what_news_02 -->
            <div class="item-top">
                <img src="~@/assets/worthit.png" alt="">
            </div>
            <div class="detail-box">
                <div class="detail-line"></div>                
                <div class="detail-time">{{this.testDetails.userName}}（著）</div>
                <div class="detail-line"></div> 
            </div>
            <div class="detail-title">
                {{this.testDetails.title}}
            </div>
            <div class="detail-box">
                <div class="detail-line"></div>                
                <div class="detail-time">{{this.testDetails.createTime}}</div>
                <div class="detail-line"></div> 
            </div>
            <div class="left-content">
                
                <div class="detail-content">
                    <div class="prod_det_box">
                        <div class="prod_img">
                            <img class="book-img" :src="testDetails.imgUrl"/>
                        </div>
                        <div class="test-details" style="padding-bottom:10px;pre-line;">
                            
                            {{this.testDetails.content}}
                        </div>
                        
                        <div class="your-rate">
                            <Button class="collect-button" v-if="collectValue"  type="warning" shape="circle" @click="getCollect()">已赞{{testDetails.likeNum}}人</Button>
                            <Button class="collect-button"   shape="circle"  v-else  @click="getCollect()">赞</Button>
                        </div>
                    </div>
                </div>
                <div class="detail-page">
                    <div v-if="!page.total">暂无相关留言~</div>
                    <div v-if="page.total">
                        <div class="comment-box">
                            ...相关留言...
                        </div>
                        <div class="comment-send">
                            <Input v-model="commentText" maxlength="500" show-word-limit type="textarea" placeholder="说点什么吧..." style="width: 270px" />
                            <Button type="primary" @click="commentSend">发送</Button>
                        </div>
                        <div v-for="item in commentAllList" class="comment-content">
                            <!-- <div> -->
                                <span class="comment-name">{{item.userName}}</span>
                                <span class="comment-time">{{item.createTime}}</span> 
                            <!-- </div> -->
                            <div class="comment-detail">{{item.content}}</div>
                        </div>
                        <Page 
                            style="float:right;"
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
    </div>
</template>
<script>
    export default{
        data () {
            return {
                testDetails:{},
                commentAllList:[],
                page: {
                    total:0,
                    pageSize:6,
                    pageNum:1
                },
                collectValue:false,
                commentModal:false,
                commentText:'',
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
                this.commentAllLy()
            },
            getCollect(){
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
            // 获取评测的留言
            commentAllLy(){
                this.$ajax({
                    method:'get',
                    url:'/comment/allLy',
                    params:{
                        commentId:this.$route.query.commentId,
                        userId:this.$cookies.get('userId'),
                        pageNum: this.page.pageNum,
                        pageSize:this.page.pageSize
                    }
                }).then(res=>{
                    this.commentAllList=res.res.list
                    this.page.total = res.res.total
                })
            },
            // leaveComment(){
            //     this.commentModal=true
            // },
            commentSend(){
                if(this.commentText===''){
                    this.$Notice.error({
                        title: '评论内容不能为空'
                    })
                }else{
                    this.$ajax({
                        method:'post',
                        url:'/comment/add',
                        params:{
                            commentPid:this.$route.query.commentId,
                            userId:this.$cookies.get('userId'),
                            content:this.commentText
                        }
                    }).then(res=>{
                        if(res.code===200){
                            this.$Notice.success({
                                title: '评论成功'
                            })
                            this.commentAllLy()
                        }
                    })
                }
                this.commentText=''
            },
            commentCancel(){
                this.commentText=''
            },
            changePage(num){
                this.page.pageNum=num
                this.commentAllLy()
            }
            
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
    min-height: 550px;
    // min-height: 1080px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    padding: 20px 0 0 20px;
    .item-top{
        // text-align: left;
        margin-left:-170px;
        width:@win-width-xxmin;
    }
    .detail-title{
        // display: inline-block;
        width: 500px;
        font-size: 22px;
        font-family: bold;
        text-align: center;
        margin: 0 auto;
        color: #000;
    }
    .detail-box{
        width: 810px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        .detail-time{
            white-space:nowrap;
            margin: 0 20px;
            flex: 1 1 auto;
            font-size: 18px;
        }
        .detail-line{
            flex: 0 0 auto;
            width: 350px;
            height: 3px;
            background-color: #f7a849;
        }
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
        margin:0 20px 20px 0;
        display: flex;
        flex-direction: row;
        .detail-content{
            min-height:300px;
            // float:left;
            margin-left: 25px;
            position:relative;
            
        }
        .detail-page{
            width:350px;
            height: 800px;
            padding:0 5px;
            position:relative;
            overflow:hidden;
             .comment-box{
                width: 340px;
                font-size: 18px;
                text-align: center;
                margin: 20px auto;
            }
            
            .comment-send{
                padding:5px;
                // vertical-align: top;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
            .comment-content{
                padding: 10px;
                .comment-name{
                    font-size: 14px;
                    font-weight: bold;
                    color: #2e2e2e;
                    display: inline-block;
                    vertical-align: top;
                }
                .comment-time{
                    font-size: 12px;
                    color: #999;
                    vertical-align: top;
                    display: inline-block;
                    margin-left:10px;
                }
                .comment-detail{
                    display: block;
                    margin-top: 8px;
                    padding-bottom:10px;
                    border-bottom: 1px dashed #ddd;
                }
            }
        }
        .prod_det_box{
            width:800px;
            min-height: 260px;
            // height: 260px;
            padding:25px 25px 10px 25px;
            border:1px solid rgb(209, 205, 205);
            border-radius:10px;
            font-size: 17px;
            color: rgb(100, 100, 100);
            overflow: hidden;
            .test-details{
                white-space:pre-line;
            }
            .prod_img{
                margin:10px auto;
                text-align:center;
                .book-img{
                    width: 500px;
                    // height:260px;
                    // border: 1px solid #ddd;
                    object-fit: contain;
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
            
            .your-rate{
                line-height: 50px;
                height:50px;
                float: right;
                .rate-container{
                    display: inline-block;
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
                // .collect-button{
                //     margin-top: 10px;
                // }
            }
        }
    }
}
</style>

