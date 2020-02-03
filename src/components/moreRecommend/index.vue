
<template>
    <div class="spcial-content">
        <div class="title">
            <span class="title_icon">
                <img src="~@/assets/index/bullet1.gif" alt="" title="" />
            </span>
            好书推荐
        </div>
        <div class="feat_prod_box" >
            <div class="remen" v-for="(item,t) in bookList">
                <router-link 
                    :to="{name:'details',query:{bookId:item.bookId}}"
                >
                    <div  class="tu">
                       <img :src="`https://images.weserv.nl/?url=${item.img}`">
                    </div>
                    <div class="detail">
                        <span>书名：</span><span class="text name">{{item.name}}</span>
                        <br>
                        <span>作者：</span><span class="text name">{{item.writer}}</span>
                        <br>
                        <span>评分：</span><span class="text grade-num">{{item.grade}}</span>
                        <br>
                        <span>{{item.people}}人评价</span>
                        <br>
                        <Rate  allow-half disabled v-model="item.gradeNum" ></Rate>
                        
                    </div>
                    <div class="intro">
                        <span class="intro-title">内容简介：</span>
                        <span class="intro-content">
                            {{item.introduce}}
                        </span>
                    </div>
                </router-link>
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
                pageSize: 10,
                total: 0,
                pageNum: 1
            },
            bookList:[
                {name:'爱生命',grade:9.4,content:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'},
                {name:'Storm',grade:9.3,content:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                {name:'ASKME',grade:9.2,content:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'},
                {name:'爱生命',grade:9.1,content:'爱你就想爱生命',price:'34',src:'~@/assets/index/prod1.gif'},
                {name:'Storm',grade:9.4,content:'暴风雨中的孩子',price:'46',src:'~@/assets/newbook/3.jpg'},
                {name:'ASKME',grade:9.4,content:'儿童百科百问百答',price:'65',src:'~@/assets/newbook/2.jpg'}
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
                this.page.total=res.res.total
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
        padding-left:10px;
        margin-bottom: 20px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .remen{
            float: left;
            width: 100%;
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
                margin-top: 1%;
                width: 30%;
                height: 90%;
                // background-color: aquamarine;
                border-left:1px dashed #b2b2b2;
                line-height: 20px;
                .text{
                    // font-size: 14px;
                }
                .name{
                    // display: inline-block;
                    height: 30px;
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
