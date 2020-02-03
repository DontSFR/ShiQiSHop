<template>
    <div class="selfinfo">
        <Menu mode="horizontal"  active-name="1">
            <MenuItem name="1" @click.native="selectMenu(1)">
                <Icon type="ios-heart"/>
                我的收藏
            </MenuItem>
            <MenuItem name="2" @click.native="selectMenu(2)">
                <Icon type="ios-create" />
                我的评论
            </MenuItem>
        </Menu>
        <div class="content">
            <!-- 简介区域-->
            <div class="demo" v-if="menuTab">
                <div class="new_products">
                    <div class="new_prod_box" v-for="item in newbookList">
                        
                            <p class="book-name">{{item.name}}</p>
                            <div class="new_prod_bg">
                                <span class="new_icon" @click="cancleCollect(item.bookId)">
                                    <Tooltip content="点击取消收藏" placement="top-start">
                                        <img  src="~@/assets/index/collect.png" alt="" title="" />
                                    </Tooltip>
                                </span>
                                <router-link 
                                    :to="{name:'details',query:{bookId:item.bookId}}"
                                >
                                    <img  class="thumb"  :src="`https://images.weserv.nl/?url=${item.img}`"/>
                                </router-link>
                                <span class="book-writer">著：{{item.writer}}</span>
                            </div>
                    </div>          
                </div>
            </div> 
            <!-- 评论区域-->
            <div class="demo" v-else>
                <div class="feat_prod_box" >
                    <div class="remen" v-for="(item,t) in personalComments">
                        <router-link 
                            :to="{name:'details',query:{bookId:item.bookId}}"
                        >
                            <div  class="tu">
                                <span class="text">书名：</span><span class="text name">{{item.name}}</span>
                                <br>
                                <span class="text">作者：</span><span class="text writer">{{item.writer}}</span>
                                <br>
                                <span class="text">总评分：</span><span class="text grade">{{item.grade}}</span>
                                <br>
                                <img :src="`https://images.weserv.nl/?url=${item.img}`">
                            </div>
                        </router-link>
                        <div class="intro">
                            <p class="title">评论详情</p>
                            <span class="date">{{item.commentDate}}</span>
                            <span class="title-color">我的评分：</span><span class="commentGrade">{{item.commentGrade}}</span>
                            <br>
                            <span class="title-color intro-title">内容：</span>
                            <p class="intro-content">
                                {{item.commentContent||'无'}}
                            </p>
                            <br>
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            textname:"内容简介",
            catalog:"目录",
            writerIntro:"作者简介",
            menuTab:true,
            personalComments:[],
            newbookList:[],
            page:{
                pageSize:6,
                pageNum:1,
                total:0
            }
        }
    },
    
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getBookList()
            this.getBookComment()
        },
        cancleCollect (bookId){
            this.$ajax({
                method:'post',
                url:'/deleteCollect',
                params:{
                    bookId:bookId,
                    userId:this.$cookies.get('userId')
                }
            }).then(res=>{
                if(res.code===200){
                    this.$Notice.success({
                        title: '已取消收藏'
                    })
                }
                this.getBookList()
            })
        },
        getBookList(){
            this.$ajax({
                method:'post',
                url:'/getCollections',
                params:{
                    userId:this.$cookies.get('userId')
                }
            }).then(res=>{
                this.newbookList=res.res
            })
        },
        getBookComment(){
            this.$ajax({
                method:'post',
                url:'/getUserComments',
                params:{
                    userId:this.$cookies.get('userId'),
                    ...this.page
                }
            }).then(res=>{
                this.personalComments=res.res.list
                this.page.total=res.res.total
            })
        },
        selectMenu(index){
            this.menuTab=(index===1)
        },
        changePage(num){
            this.page.pageNum=num
            this.getBookComment()
        }
    }
}
</script>
<style lang="less" scoped>
.title-color{
    // color: rgb(83, 83, 83);
    // font-size: 14px;
}
.selfinfo{
    width: 100%;
    .content{
        width: 100%;
        .demo{
            margin:20px 0 ;
            .new_products{
                width: 100%;
                padding:10px 0;
                overflow:hidden;
                height: 100%;
                .new_prod_box{
                    float:left;
                    text-align:center;
                    padding:10px;
                    .book-name{
                        color: #37A;
                    }
                    a{
                        color:#b5b5b6;
                        // color:#f34f4f;
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
                        .book-writer{
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            overflow: hidden;
                        }
                    }
                    .new_icon{
                        position:absolute;
                        cursor: pointer;
                        // top:6px;
                        // right:6px;
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
            // .text{
            //     width: 90%;
            //     margin:0 auto;
            // }
            .feat_prod_box{
                padding-left:10px;
                margin-bottom: 20px;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .remen{
                    float: left;
                    width: 100%;
                    // height:250px;
                    padding: 15px 0 10px 10px;
                    // background-color: #f8981d;
                    margin-right:1.25%;
                    border-bottom:1px #b2b2b2 dashed;
                    .tu{
                        float: left;
                        img{
                            width:125px;
                            height:170px;
                        }
                        .text{
                            display: inline-block;
                            height: 18px;
                            overflow: hidden;
                        }
                        .name{
                            width:98px;
                            color: #37A;
                        }
                        .writer{
                            width:98px;
                        }
                        .grade{
                            color: #f8981d;
                            width:98px;
                        }
                    }
                    .intro{
                        width: 60%;
                        // background-color: #b5b5b6;
                        font-size: 14px;
                        margin-left:10%;
                        padding-top:5px;
                        // height: 85%;
                        float: left;
                        /deep/.ivu-rate{
                            font-size: 16px;
                        }
                        .date{
                            float: right;
                        }
                        .title{
                            height: 50px;
                            color: lightslategray;
                            font-size: 16px;
                            text-align: center;
                        }
                        .commentGrade{
                            color: #f8981d;
                        }
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
        }
    }
    /deep/.ivu-menu-light{
        background: none;
    }
    .page-container{
        width: 100%;
        float: left;
        text-align: center;
        padding: 20px 0;
    }
}

</style>

