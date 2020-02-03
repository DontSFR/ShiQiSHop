<template>
    <div class="person-top">
        <div class="user-massage">
            <Avatar class="user-img" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <div  class="message">
                <p class="name">{{userInfo.account}}</p>
                <p>{{userInfo.email}}</p>
            </div>
            <div  class="active">
                <span class="num-content">
                    <p class="num">{{collectNum}}</p>
                    <p class="title">收藏数</p>
                </span>
                <span class="num-content">
                    <p class="num">{{commendNum}}</p>
                    <p class="title">评论数</p>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userInfo:'',
            collectNum:0,
            commendNum:0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getUserInfo()
            this.geCollect()
            this.getBookComment()
        },
        getUserInfo(){
            this.$ajax({
                method:'post',
                url:'/userInfo',
                params:{
                    userId:this.$cookies.get('userId')
                }
            }).then(res=>{
                this.userInfo=res.res
            })
        },
        geCollect(){
            this.$ajax({
                method:'post',
                url:'/getCollections',
                params:{
                    userId:this.$cookies.get('userId')
                }
            }).then(res=>{
                this.collectNum=res.res.length
            })
        },
        getBookComment(){
            this.$ajax({
                method:'post',
                url:'/getUserComments',
                params:{
                    userId:this.$cookies.get('userId'),
                    pageSize:6,
                    pageNum:1
                }
            }).then(res=>{
                this.commendNum=res.res.total
            })
        },
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.person-top{
    width: 100%;
    height: 200px;
    overflow: hidden;
    .user-massage{
        width: 85%;
        height: 180px;
        line-height: 180px;
        margin: 0 auto;
        // margin-top:10%;
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
}
// .person-top::before{
//     content:"";
//     background: url("~@/assets/index/c4.jpg") center center;
//     background-size:cover;
//     opacity:0.5;//透明度设置
//     z-index:-1;
//     width: 100%;
//     height: 200px;
//     // position:absolute;
//     //一定要设置position:absolute,这样才能设置z-index，让背景处于内容的下一层
//     // top:0px;
//     // left:0px;
//     // border-radius:40px;
// }
</style>