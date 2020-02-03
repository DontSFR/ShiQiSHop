export  default {
    path:'orderCenter',
    name:'订单中心',
    component: r => require.ensure([], () => r(require('../view/center/orderCenter/index.vue')), 'index'),
    children:[
        // {
        //     path:'myJudge',
        //     name:'我的评价',
        //     component: r => require.ensure([], () => r(require('../view/center/orderCenter/myJudge/main.vue')), 'myJudge'),   
        // },
        // {
        //     path:'myOrder',
        //     name:'我的订单',
        //     component: r => require.ensure([], () => r(require('../view/center/orderCenter/myOrder/main.vue')), 'myOrder'),
        // }
    ]
}