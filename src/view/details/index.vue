<template>
    <div class="main-content">
        <div class="spcial-content">
            <div class="item-top">
                <img src="~@/assets/worthit.png" alt="">
            </div>
            <div class="left-content">
                <div class="prod_img">
                    <img class="book-img" :src="testDetails.img"/>
                </div>
                <div class="detail-content">
                    <div class="prod_det_box">
                        <div class="detail">
                            <div class="brand-title">{{testDetails.brand}}/{{testDetails.goodsName}}</div>
                            <br>
                            <p class="brand-introduce" style="color: #666;line-height: 24px">{{testDetails.introduce}}</p>
                            <div class="price-requirement">
                                <span  class="good-price" >￥{{testDetails.price}}</span>
                                <span class="good-requirement">{{testDetails.requirement}}</span>
                            </div>
                            <a :href="testDetails.taoBaoUrl" class="good-buy" target="_blank">
                                <h2 style="color:#fff;">立即购买>>></h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="intro-content" >
                <Menu mode="horizontal"  active-name="1">
                    <MenuItem name="1" @click.native="selectMenu(1)">
                        <Icon type="ios-paper" />
                        详情介绍
                    </MenuItem>
                    <MenuItem name="2" @click.native="selectMenu(2)">
                        <Icon type="ios-people" />
                        相关评测
                        <Badge :count="commentsCount" class="demo-badge-alone"></Badge>
                    </MenuItem>
                    <MenuItem name="3" @click.native="selectMenu(3)">
                        <Icon type="ios-create" />
                        发表评测
                        <Badge :count="commentsCount" class="demo-badge-alone"></Badge>
                    </MenuItem>
                </Menu>
                <div class="content"> 
                    <!-- 简介区域-->
                    <div class="demo"  v-if="menuTab==1">
                        <Divider orientation="left" class="divider">商品介绍</Divider>
                        <p class="text">
                            {{testDetails.description}}
                        </p>
                        <Divider orientation="left" class="divider">使用方法</Divider>
                        <p class="text">
                            {{testDetails.usaging}}
                        </p>
                        
                    </div> 
                    <!-- 评论区域-->
                    <div class="demo" v-if="menuTab==2">
                        <div class="comment-container" v-for="item in testAllPc">
                            <div style="overflow:hidden;position:relative;">
                                <div class="user-message">
                                    <p class="user-name">{{item.userName}}</p>
                                    <p class="user-grade">点赞人数：{{item.likeNum||'无'}}</p>
                                    <p class="user-date">{{item.createTime}}</p>
                                </div>
                                <div class="comment-img">
                                    <img :src="item.imgUrl">
                                </div>
                                <div class="comment-message">
                                    {{item.content}}
                                </div>
                                <div class="comment-detaile">
                                    <router-link class="more" :to="{name:'testDetails',query:{commentId:item.commentId}}" >
                                        <span style="color: #f5a623;font-size:18px;">- 更多详情 -</span> 
                                    </router-link>
                                </div>
                            </div>
                            <Divider style="margin: 15px 0;"/>
                        </div>
                    </div>
                    <div class="demo" v-if="menuTab==3">
                        <Form :model="formTest"  :rules="ruleValidate"  ref="formValidateTest" :label-width="80">
                            <FormItem label="标题" prop="title" >
                                <Input v-model="formTest.title" placeholder="请输入标题(30字)" :maxlength='30' style="width: 500px" ></Input>
                            </FormItem>
                            
                            <FormItem label="商品图" prop="url" >
                                <div class="demo-upload-list"  v-if="formTest.imgUrl">
                                    <img :src="imgUrl" style="width:200px;height:200px;">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                                    </div>
                                </div>
                                <Upload
                                    v-else
                                    ref="upload"
                                    :on-success="handleSuccess"
                                    :before-upload="upload_handleUpload"
                                    type="drag"
                                    action="/upload"
                                    style="display: inline-block;width:200px;">
                                    <div style="width: 200px;height:200px;line-height: 200px;">
                                        <Icon type="ios-camera" size="20"></Icon>
                                    </div>
                                </Upload>
                            </FormItem>
                            <FormItem label="内容" prop="content" >
                                <Input v-model="formTest.content"  style="width: 1100px"  type="textarea"  :maxlength='1000' :autosize="{minRows: 6,maxRows: 15}" placeholder="说点什么吧...(1000字)"></Input>
                            </FormItem>
                        </Form>
                        
                                <!-- <form method="post" enctype="multipart/form-data">
                                    <input type="file" name="file">
                                    <input type="submit" value="上传">
                                </form> -->
                        <div style="text-align: center;"  >
                            <Button  style="width:300px;"  long @click="handleSubmitTest('formValidateTest')" type="primary">发表</Button>
                        </div>
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
                id:12345,
                commentsCount:0,
                valueCustomText: 0,
                // yourRateValue:0,
                testDetails:{
                    list:[]
                },
                testAllPc:[],
                menuTab:1,
                formTest:{
                    title: "",
                    content: "",
                    imgUrl:'',
                },
                imgUrl:'',
                uploadList:[],
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'change' }
                    ],
                },
                commentModal:false,
                commentText:'',
                collectValue:false,
                bookDetail:[
                    {
                        name:"小河西",
                        writer:'44',
                        date:'2010-10-22',
                        pages:"444",
                        piblish:"山东出版社",
                        price:'55',
                        grade:{
                            count:12548,
                            num:9.5
                        }
                    }
                ],
                bookId:'',
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
            handleRemove () {
                this.formTest.imgUrl=''
                this.imgUrl = ''
            },
            handleSuccess (res, file) {
                this.formTest.imgUrl = res.res
            },
            upload_handleUpload(file){
                window.URL = window.URL || window.webkitURL;
                var url = window.URL.createObjectURL
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                this.imgUrl = url
            },
            
            // 发表评测
            handleSubmitTest(name){
                console.log('rrrrr')
                if(!this.$cookies.get('userId')){
                    this.$Notice.error({
                        title: '请先登陆用户'
                    })
                    return 
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log('6666',this.$cookies.get('userId'),this.testDetails.goodsId,this.formTest)
                        this.$ajax({
                            method:'post',
                            url:'/comment/add',
                            params:{
                                commentPid:0,
                                userId:this.$cookies.get('userId'),
                                goodsId:this.testDetails.goodsId,
                                ...this.formTest
                            }
                        }).then(res=>{
                            if(res.code == 200){
                                this.$Notice.success({
                                    title: '发表成功'
                                })
                                this.formTest = {
                                    title: "",
                                    content: "",
                                    imgUrl:'',
                                }
                            }else if(res.code===500){
                                this.$Notice.error({
                                    title: '发表失败'
                                })
                            }
                        })
                    } else {
                        return 
                    }
                })
            },
            getCollect(index){
                if(index===1){//收藏
                    this.$ajax({
                        method:'post',
                        url:'/addCollect',
                        params:{
                            bookId:this.$route.query.bookId,
                            userId:this.$cookies.get('userId')
                        }
                    }).then(res=>{
                        if(res.code===200){
                            this.collectValue=true
                            this.$Notice.success({
                                title: '点赞成功'
                            })
                        }else if(res.code===500){
                            if(res.reason==="用户未登录"){
                                this.$Notice.error({
                                    title: '点赞失败，用户未登录' 
                                })
                            }
                        }
                    })
                }else{
                    this.$ajax({
                        method:'post',
                        url:'/deleteCollect',
                        params:{
                            bookId:this.$route.query.bookId,
                            userId:this.$cookies.get('userId')
                        }
                    }).then(res=>{
                        if(res.code===200){
                            this.collectValue = false
                            this.$Notice.success({
                                title: '已取消收藏'
                            })
                        }else if(res.code===500){
                            if(res.reason==="用户未登录"){
                            }
                        }
                    })
                }
            },
            getTestDeails(){
                this.$ajax({
                    method:'get',
                    url:'/goods/detail',
                    params:{
                        goodsId:this.$route.query.goodsId
                    }
                }).then(res=>{
                    this.testDetails=res.res
                })

                this.$ajax({
                    method:'get',
                    url:'/comment/allPc',
                    params:{
                        goodsId:this.$route.query.goodsId
                    }
                }).then(res=>{
                    this.testAllPc=res.res.list
                })
            },
            selectMenu(index){
                this.menuTab=index
                if(index==2){
                    this.getTestDeails()
                }
            },
            leaveComment(){
                this.commentModal=true
            },
            commentSend(){
                if(this.commentText===''){
                    this.$Notice.error({
                        title: '评论内容不能为空'
                    })
                }else{
                    this.$ajax({
                        method:'post',
                        url:'/applyComment',
                        params:{
                            bookId:this.$route.query.bookId,
                            userId:this.$cookies.get('userId'),
                            commentContent:this.commentText
                        }
                    }).then(res=>{
                        if(res.code===200){
                            this.$Notice.success({
                                title: '评论成功'
                            })
                            this.getTestDeails()
                        }
                    })
                }
                this.commentText=''
            },
            commentCancel(){
                this.commentText=''
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
    min-height: 770px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    padding: 20px 0 0 20px;
    .item-top{
        text-align: center;
        width:@win-width-xmin;
    }
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
        // height:280px;
        margin:0 20px 20px 0;
        overflow: hidden;
        .detail-content{
            .brand-title {
                color: #734633;
                font-size: 32px;
                line-height: 50px;
                margin: 20px 0;
            }
            .brand-introduce{
                height: 50px;
                // background-color: #37A;
                width: 100%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;   //只展示5行
                -webkit-box-orient: vertical;
            }
            .price-requirement{
                margin: 20px 0;
                height:36px;
            }
            .good-price{
                text-align: center;
                display:inline-block;
                margin-bottom: 20px;
                width:250px;
                border-right:1px solid #f5a623;
                height:36px;
                line-height:36px;
                font-size:30px;
            }
            .good-requirement{
                text-align: center;
                display:inline-block;
                width:250px;
                height:36px;
                line-height:36px;
                font-size:30px;
            }
            .good-buy{
                text-align: center;
                width: 145px;
                display: inline-block;
                line-height: 35px;
                background-color: #f5a623;
                margin-top: 30px;
                margin-left:350px;
            }
            // width: 93%;
            width: calc(100% - 610px);
            overflow: hidden;
            position:relative;
            display: inline-block;
            .prod_det_box{
                height: 400px;
                padding:25px 0 0 25px;
                border:1px solid rgb(209, 205, 205);
                border-radius:10px;
                .detail{
                    width: 100%;
                    display: inline-block;
                    span{
                        margin: 5px 0;
                        display: inline-block;
                    }
                }
                .rate{
                    display:inline-block;
                    // width: 50%;
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
    }
    .prod_img{
        display: inline-block;
        padding:0 5px 0 0;
        text-align:center;
        .book-img{
            border:1px solid rgb(209, 205, 205);
            width: 600px;
            height:400px;
            object-fit: contain;
        }
    }
    .intro-content{
        /deep/.ivu-menu-light{
            background: none;
        }
        /deep/.ivu-badge-count{
            background: #5cb85c;
        }
        .demolayout{
            list-style-type: none;
            float: left;
            margin:0px;
            padding:0px;
        }
        .content{
            width: 100%;
            .demo{
                overflow: hidden;
                position:relative; 
                margin:20px 0 ;
                .your-comment{
                    // float: right;
                    width: 100px;
                    height: 25px;
                    margin-left: 80%;
                    span{
                        color: #37A;
                    }
                    :hover{
                        cursor:pointer
                    }
                }
                .divider{
                    color: #1f8566;
                }
                .text{
                    white-space:pre-line;
                    width: 90%;
                    margin:0 auto;
                }
                .comment-container{
                    padding:10px 20px; 
                    margin:0 auto;
                    height: 100%;
                    .user-message{
                        text-align: center;
                        float: left;
                        p{
                            line-height: 30px;
                        }
                        width: 150px;
                        padding-bottom: 20px;
                        .user-name{
                            color:#37A;
                        }
                        .user-grade{
                            color:#f5a623;
                        }
                    }
                    .comment-img{
                        width: 90px;
                        height: 110px;
                        float: left;
                        img{
                            width: 100%;
                            height:100%;
                        }
                    }
                    .comment-message{
                        float: left;
                        margin-left:10px;
                        width: 750px;
                        font-size: 14px;
                        overflow: hidden; //超出隐藏
                        display: -webkit-box;
                        -webkit-line-clamp: 5;   //只展示5行
                        -webkit-box-orient: vertical;// 文本多行显示省略号的关键css语句
                    }
                    .comment-detaile{
                        float: right;
                    }
                }
            }
        }
    }
     .demo-upload-list{
        display: inline-block;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}
</style>

