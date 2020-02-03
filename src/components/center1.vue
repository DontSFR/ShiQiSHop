<template>
    <div class="center">
        <div class="selfinfo">
            <Menu active-name="我的个人中心" :open-names="['我的中心']" >
                <Submenu :name="item.name" v-for="(item,index) in menuList" :key="index">
                    <template slot="title">
                        <Icon :type="item.type" />
                        {{item.name}}
                    </template>
                    <router-link :to="'/'+item.path+'/'+v.path" v-for="(v,vindex) in item.children" :key="vindex">
                        <MenuItem :name="v.name">{{v.name}}</MenuItem>
                    </router-link>                
                </Submenu>
            </Menu>
        </div>
    </div>
</template>
<script>
import myHeader from '@/components/public/myHeader.vue'
import myBannerx from '@/components/public/myBannerx.vue'
export default {
    name: 'center',
    components:{myHeader,myBannerx},
    data () {
        return {
            menuList:[
                {
                    path:'personalCenter',
                    name:'个人中心',
                    type:'ios-analytics',
                    children:[
                    {
                        path:'myCenter',
                        name:'我的中心'
                    },
                    {
                        path:'receiveAddress',
                        name:'收货地址'
                    },
                    {
                        path:'messageNotice',
                        name:'消息通知'
                    },
                    {
                        path:'cart',
                        name:'购物车'
                    },
                    {
                        path:'goodCollect',
                        name:'商品收藏'
                    }
                    ]},
                {
                    path:'orderCenter',
                    name:'订单中心',
                    type:"ios-cog" ,
                    children:[
                    {
                        path:'',
                        name:'我的订单'
                    },
                    {
                        path:'',
                        name:'我的评价'
                    },
                    ]
                },
                {
                    path:'vallet',
                    name:'我的钱包',
                    type:"ios-filing",
                    children:[
                    {
                        path:'',
                        name:'我的优惠券'
                    },
                    {
                        path:'',
                        name:'我的积分'
                    },
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.center{
    margin: 0 auto;
    background: #aaaaaa;
    width: 1226px;
    }
.fl{float: left;}
    .lfnav{
        width: 234px;
        height: 500px;
        background: #aaaaaa;
        position: absolute;
    }
    .selfinfo{
        width: 1226px;
        margin: 0 auto;
    }

</style>

