<template>
    <div class="menu"  :class="{'fixed':isfix}">
        <div class="menuList">
            <Menu class="selected" ref="side_menu" mode="horizontal" :active-name="activeName">
            <MenuItem name="index">
                <router-link to='/index' class="a-link">
                    首页
                </router-link>
            </MenuItem>
            <MenuItem name="recommend">
                <router-link to='/recommend' class="a-link">
                    彩妆
                </router-link>
            </MenuItem>
            <MenuItem name="newBook">
                <router-link to='/newBook' class="a-link">
                    护肤
                </router-link> 
            </MenuItem>
            <MenuItem name="special">
                <router-link to='/special' class="a-link">
                    香水
                </router-link>
            </MenuItem>
            <MenuItem name="center" >
                <router-link to='/center' class="a-link personer">
                    品牌中心
                </router-link>
            </MenuItem>
            <MenuItem name="center" >
                <router-link to='/center' class="a-link personer">
                    电子商城
                </router-link>
            </MenuItem>
            <MenuItem name="news">
                <router-link to='/news' class="a-link personer">
                    最新资讯
                </router-link>
            </MenuItem>
            <MenuItem name="center">
                <router-link to='/center' class="a-link personer">
                    会员中心
                </router-link>
            </MenuItem>
        </Menu>
        <div class="right-selected">
                <span class="login" v-if="ifLogin"  @click="loginOut">退出登录</span>
                <span class="notLogin"  v-else  @click="loginUser"> 
                    登录
                </span>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isfix:false,
            activeName: '',
            ifLogin:'false',
            menuList: [
                {
                    path: 'index',
                    name:'index'
                },
                {
                    path: '/recommend',
                    name:'recommend'
                },
                {
                    path: '/newBook',
                    name:'newBook'
                },
                {
                    path: '/special',
                    name:'special'
                },
                {
                    path: '/center',
                    name:'center'
                }
            ]
        }
    },
    mounted () {
    },
    created(){
        this.$route.name
    },
    watch: {
        init (v) {},
        '$route'(to){
            //做一些路由变化的响应
            this.activeName=to.name
        }
    },
    mounted () {
        this.init()
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        init () {
            this.ifLogin=(this.$cookies.get('userId')!==null)
            this.menuList.forEach(t => {
                if (t.name === this.$route.name) {
                    this.activeName = this.$route.name
                }
            })
            this.$nextTick(() => {
                this.$refs.side_menu.updateActiveName()
            })
        },
        handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.isfix=(scrollTop>170)
        },
        loginUser(){
            console.log('111')
            this.$cookies.remove('userId')
            this.$router.push({path:'/login'}); 
            this.ifLogin=true 
        },
        loginOut(){
            this.ifLogin=false
            this.$cookies.remove('userId')
        }
    }

}
</script>

<style lang="less" scoped>
@import "~@/style/basic.less";
.menu{
    a{
        font-size: 16px;
    }
    position:static;
    overflow: hidden;
    z-index: 999;
    -moz-background-size:100% 100%; 
    background-size:100% 100%;
    background-color: #000;
    width:100%;
    height:70px;
    .selected{
        width: 80%;
        float:left;
        padding-left: 20px;
    }
    .right-selected{
        font-size: 16px;
        float:right;
        height:30px;
        width: 20%;
        line-height: 30px;
        .notLogin{
            display: inline-block;
            width:50px;
            color: #fff;
            margin-left: 60%;
            cursor:pointer;
        }
        .login{
            display: inline-block;
            width: 50px;
            color:#f7a849;
            margin-left: 60%;
            cursor:pointer;
        }
        .personer{
            display: inline-block;
            width: 50px;
        }
    }
}
.menuList{
    width:@win-width-xmin;
    margin:  auto;
    margin-top:30px;
}
.fixed{
    position:fixed;
    top:0;
    z-index:9999;
}
/deep/.ivu-menu-horizontal{
        height:30px;
        line-height:30px;
    }
/deep/.ivu-menu-horizontal .ivu-menu-item{
    padding:0 30px;
}
/deep/.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
    color: #f7a849 !important;
    border-bottom: 2px solid #f7a849;
}
/deep/.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
    color: #f7a849 !important;
    border-bottom: 2px solid #f7a849;
}

/deep/.ivu-menu-light{
    background: none;
}
/deep/.ivu-menu-horizontal.ivu-menu-light:after{
    background: none;
}
.a-link{
    color: #fff;
}
.a-link:hover{
    color:#f7a849;
}
</style>

