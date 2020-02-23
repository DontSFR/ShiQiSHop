<template>
    <div class="left-content">
        <div class="user-massage">
            <Avatar class="user-img" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <div  class="message">
                <p class="name">{{userInfo.userName}}</p>
                <p>{{userInfo.email}}</p>
            </div>
            <div  class="active">
                <span class="num-content">
                    <p class="num">{{totalLikeNum}}</p>
                    <p class="title">收藏数</p>
                </span>
                <span class="num-content">
                    <p class="num">{{commendNum}}</p>
                    <p class="title">评论数</p>
                </span>
            </div>
        </div>
        <div class="selfinfo">
            <Menu style="250px" active-name="1">
                <!-- <MenuItem name="1" @click.native="selectMenu(1)">
                    <Icon type="ios-heart"/>
                    我的收藏
                </MenuItem> -->
                <MenuItem name="1" @click.native="selectMenu(1)">
                    <Icon type="md-document" />
                    我的评测
                </MenuItem>
                <MenuItem name="2" @click.native="selectMenu(3)">
                    <Icon type="ios-create" />
                    修改个人信息
                </MenuItem>
            </Menu>
            
            <div class="content">
                <!-- 评论区域-->
                <div class="demo"  v-if="menuTab">
                    <div class="feat_prod_box" >
                        <div class="remen" v-for="(item,t) in personalComments">
                            <router-link 
                                :to="{name:'testDetails',query:{commentId:item.commentId}}"
                            >
                                <div  class="tu">
                                    <!-- <span class="text writer">{{item.goodsName}}</span>
                                    <br> -->
                                    <img :src="item.imgUrl">
                                </div>
                            </router-link>
                            <div class="intro">
                                <p class="title">{{item.title}}</p>
                                <span class="title-color intro-title">内容：</span>
                                <p class="intro-content">
                                    {{item.content||'无'}}
                                </p>
                                
                                <span class="date">{{item.createTime}}</span>
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
                <!-- 修改个人信息-->
                <div class="demo" v-else>
                     <div class="mudify-msg" >
                          <Form :model="formItem" ref="formValidate" :label-width="80">
                            <FormItem label="用户名" prop="userName" required>
                                <Input v-model="formItem.userName" placeholder="请输入你的用户名"></Input>
                            </FormItem>
                            <FormItem label="密码"  prop="password" required>
                                <Input type="password" v-model="formItem.password" placeholder="请输入密码"></Input>
                            </FormItem>
                            <FormItem label="确认密码"  prop="rePassword" required>
                                <Input type="password" v-model="formItem.rePassword" placeholder="请再次输入密码"></Input>
                            </FormItem>
                            <FormItem label="邮箱"  prop="email" required>
                                <Input v-model="formItem.email" placeholder="请输入你的邮箱"></Input>
                            </FormItem>
                            <FormItem label="个性签名"  prop="signature">
                                <Input v-model="formItem.signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入你的个性签名"></Input>
                            </FormItem>
                            <FormItem label="关注内容"   prop="favourite">
                                <Select multiple v-model="formItem.favourite">
                                    <Option v-for="item in favouriteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    <!-- <Option value="beijing">New York</Option>
                                    <Option value="shanghai">London</Option>
                                    <Option value="shenzhen">Sydney</Option> -->
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button style="with:150px;" @click="handleSubmit('formValidate')" type="primary">提交</Button>
                            </FormItem>
                        </Form>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import topNav from '@/components/center/topNav.vue';
import contentNav from '@/components/center/contentNav.vue';
export default {
    components:{topNav,contentNav},
    data(){
        return{
            userInfo:{},
            totalLikeNum:0,
            commendNum:0,
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
            },
            formItem: { 
                userName: "",
                password: "",
                rePassword:'',
                email: "",
                favourite: [],
                signature: "",
            },
            favouriteList:[
                {
                    value: '彩妆',
                    label: '彩妆'
                },
                {
                    value: '护肤',
                    label: '护肤'
                },
                {
                    value: '香水',
                    label: '香水'
                },
                {
                    value: '评测',
                    label: '评测'
                }
            ]
        }
    },
    created(){
        this.$cookies.get('userId')
    },
    watch: {
        init (v) {},
        '$cookies'(){
            this.activeName=to.name
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getUserInfo()
            // this.geCollect()
            this.getBookComment()
            // this.getBookList()
        },
        getUserInfo(){
            this.$ajax({
                method:'get',
                url:'/user/info',
                params:{
                    userId:this.$cookies.get('userId')
                }
            }).then(res=>{
                this.userInfo=res.res
                this.totalLikeNum=res.res.totalLikeNum
                this.formItem = {
                    userName: this.userInfo.userName,
                    password:  '',
                    rePassword: '',
                    email: this.userInfo.email,
                    favourite: this.userInfo.favourite,
                    signature: this.userInfo.signature,
                }
            })
        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$ajax({
                        method:'post',
                        url:'/user/update',
                        // dataType:'json',
                        isFormData:true,
                        data:{
                            userId:this.$cookies.get('userId'),
                            ...this.formItem
                        }
                    }).then(res=>{
                        if(res.code == 200){
                            this.$Notice.success({
                                title: '修改成功'
                            })
                        }
                    })
                } else {
                    return 
                }
            })
        },
        // geCollect(){
        //     this.$ajax({
        //         method:'post',
        //         url:'/getCollections',
        //         params:{
        //             userId:this.$cookies.get('userId')
        //         }
        //     }).then(res=>{
        //         this.totalLikeNum=res.res.totalLikeNum
        //     })
        // },
        getBookComment(){
            this.$ajax({
                method:'get',
                url:'/comment/myPc',
                params:{
                    userId:this.$cookies.get('userId'),
                    pageSize:6,
                    pageNum:1
                }
            }).then(res=>{
                this.commendNum=res.res.total
                this.personalComments=res.res.list
                this.page.total=res.res.total
            })
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
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
}
.left-content{
    width:@win-width-xxmin;
    margin: 0 auto;
    min-height: 770px;
    .user-massage{
        width: 100%;
        height: 180px;
        line-height: 180px;
        margin: 0 auto;
        overflow: hidden;
        .user-img{
            display: inline-block;
        }
        .message{
            display: inline-block;
            height: 80px;
            line-height:80px;
            vertical-align: middle;
            margin-left:20px;
            .name{
                font-weight: 600;
            }
            p{
                line-height:40px;
                font-size: 18px;
            }
        }
        .active{
            display: inline-block;
            float: right;
            text-align: center;
            font-size: 16px;
            margin-right: 20px;
            .num-content{
                display: inline-block;
                vertical-align: middle;
                width: 60px;
                // height:80px;
                .title{
                    font-size: 13px;
                }
                .num{
                    color:#f5a623;
                    font-size: 24px;
                    font-weight: 700;
                }
            }
        }
    }
    /deep/.ivu-avatar-large {
        width: 80px;
        height: 80px;
        line-height:80px;
        border-radius: 80px;
    }
    .selfinfo{
        width: 100%;
        display: flex;
        flex-direction: row;
        .content{
            width: calc(100% - 250px);
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
                        .new_icon{
                            position:absolute;
                            cursor: pointer;
                            // top:6px;
                            // right:6px;
                            top:0px;
                            right:0px;
                            z-index:200;
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
                .mudify-msg{
                    padding-left:10px;
                    margin-bottom: 20px;
                    width: 100%;
                    height: 100%;
                }
                .feat_prod_box{
                    padding-left:10px;
                    margin-bottom: 20px;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    .remen{
                        // float: left;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        width: 100%;
                        // height:250px;
                        padding: 15px 0 10px 10px;
                        // background-color: #f8981d;
                        margin-right:1.25%;
                        border-bottom:1px #b2b2b2 dashed;
                        .tu{
                            // float: left;
                            width: 200px;
                            img{
                                width:150px;
                                height:220px;
                                object-fit: contain;
                                border: 1px solid #ddd;
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
                                color: #f8981d;
                            }
                            .grade{
                                width:98px;
                            }
                        }
                        .intro{
                            width:550px;
                            // background-color: #b5b5b6;
                            font-size: 14px;
                            // margin-left: 30px;
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
                                color: #f7a849;
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
}
</style>

