export default {
    path:'personalCenter',
    name:'个人中心',
    component: r => require.ensure([], () => r(require('../view/center/personalCenter/index.vue')), 'personalCenter'),
    children:[
        {
            path:'myCenter',
            name:'我的中心',
            component: r => require.ensure([], () => r(require('../view/center/personalCenter/myCenter/index.vue')), 'myCenter'),
        },
        {
            path:'goodCollect',
            name:'商品收藏',
            component: r => require.ensure([], () => r(require('../view/center/personalCenter/goodCollect/index.vue')), 'goodCollect'),
        },
        {
            path:'myJudge',
            name:'我的评价',
            component: r => require.ensure([], () => r(require('../view/center/personalCenter/myJudge/index.vue')), 'myJudge'),   
        },
        // {
        //     path:'messageNotice',
        //     name:'消息通知',
        //     component: r => require.ensure([], () => r(require('../view/center/personalCenter/messageNotice/main.vue')), 'messageNotice'),
        // },
        // {
        //     path:'receiveAddress',
        //     name:'收货地址',
        //     component: r => require.ensure([], () => r(require('../view/center/personalCenter/receiveAddress/main.vue')), 'receiveAddress')
        // }
    ]
}