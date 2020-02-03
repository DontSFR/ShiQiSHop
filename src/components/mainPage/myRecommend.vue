
<template>
    <div class="spcial-content">
        <div class="title">
            <span class="title_icon">
                <img src="~@/assets/index/bullet1.gif" alt="" title="" />
            </span>
            <router-link to='/recommend' >
                <span  class="title-color">好书推荐/更多</span>
            </router-link>
        </div>
        <div class="feat_prod_box" >
            <div class="remen" v-for="(item,t) in bookList" :class="{lastOne:t%2===1}">
                <router-link 
                    :to="{name:'details',query:{bookId:item.bookId}}"
                >
                    <div  class="tu">
                        <img :src="`https://images.weserv.nl/?url=${item.img}`">
                    </div>
                    <div class="detail">
                        <span>书名：{{item.name}}</span>
                        <br>
                        <span>作者：{{item.writer}}</span>
                        <br>
                        <span>评分：</span><span class="text grade-num">{{item.grade}}</span>
                        <br>
                        <span>{{item.people}}人评价</span>
                        <br>
                        <Rate  allow-half disabled v-model="item.gradeNum" ></Rate>
                    </div>
                </router-link> 
            </div>
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
                pageNum: 1,
                pageSize:4
            },
            bookList:[
                {name:'爱生命',grade:9.4,content:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'},
                {name:'Storm',grade:9.3,content:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                {name:'ASKME',grade:9.2,content:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'},
                {name:'爱生命',grade:9.1,content:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'}
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
                    type:11,
                    ...this.page
                }
            }).then(res=>{
                this.bookList=res.res.list
                this.bookList=this.bookList.map(t=>{
                    let gradeNum=t.grade 
                    gradeNum=parseFloat(gradeNum)//字符串转化为数字
                    gradeNum =parseFloat((gradeNum/2).toFixed(1))//数字除以2再转化为number类型
                    return{
                        ...t,
                        gradeNum:gradeNum
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.spcial-content{
    width:100%;
    height: 100%;
    padding: 20px 0 0 20px;
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
        padding-left:10px ;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .remen{
            float: left;
            width: 46%;
            height:180px;
            padding: 15px 0 10px 10px;
            margin-right:1.25%;
            border-bottom:1px #b2b2b2 dashed;
            .tu{
                float: left;
                img{
                    width:98px;
                    height:150px;
                }
            }
            .detail{
                float: left;
                padding-left: 10px;
                margin-left: 20px;
                margin-top: 5%;
                width: 55%;
                height: 80%;
                border-left:1px dashed #b2b2b2;
                line-height: 20px;
                span{
                    display: inline-block;
                    line-height: 20px;
                }
                .text{
                    font-size: 14px;
                }
                .name{
                    display: inline-block;
                    width:100px;
                    // line-height: 20px;
                    height: 20px;
                    overflow: hidden;
                }
                /deep/.ivu-rate{
                    font-size:15px;
                }
                /deep/.ivu-rate-star{
                    margin-right: 5px;
                }
                .grade-num{
                    color:#f5a623;
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

</style>
