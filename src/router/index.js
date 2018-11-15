import Vue from 'vue'
import Router from 'vue-router'
// 底部导航
const index = resolve => require(['@/views/Index'], resolve)
// 首页
const home = resolve => require(['@/views/Home'], resolve)
const balance = resolve => require(['@/views/Home/balance'], resolve)
const transfer = resolve => require(['@/views/Home/transfer'], resolve)
const receive = resolve => require(['@/views/Home/receive'], resolve)
const noticeList = resolve => require(['@/views/Home/noticeList'], resolve)
const noticeDetail = resolve => require(['@/views/Home/noticeDetail'], resolve)

// 订单
const order = resolve => require(['@/views/Order'], resolve)
const buyOrder = resolve => require(['@/views/Order/buyOrder'], resolve)
const saleOrder = resolve => require(['@/views/Order/saleOrder'], resolve)
const putup = resolve => require(['@/views/Order/putup'], resolve)
const putsale = resolve => require(['@/views/Order/putsale'], resolve)
const putbuy = resolve => require(['@/views/Order/putbuy'], resolve)
const citys = resolve => require(['@/views/Order/citys'], resolve)

// 信息
const message = resolve => require(['@/views/Message'], resolve)
const messagedetail = resolve => require(['@/views/Message/detail'], resolve)
// 我的
const about = resolve => require(['@/views/About'], resolve)
const product = resolve => require(['@/views/About/product'], resolve)
const qrcode = resolve => require(['@/views/About/qrcode'], resolve)
const orderRecord = resolve => require(['@/views/About/orderRecord'], resolve)
const myorder = resolve => require(['@/views/About/myorder'], resolve)
const reward = resolve => require(['@/views/About/reward'], resolve)
const release = resolve => require(['@/views/About/release'], resolve)
const freeze = resolve => require(['@/views/About/freeze'], resolve)
const user = resolve => require(['@/views/About/user'], resolve)
const nickname = resolve => require(['@/views/About/nickname'], resolve)
const avatar = resolve => require(['@/views/About/avatar'], resolve)
const convert = resolve => require(['@/views/About/convert'], resolve)
const productOrder = resolve => require(['@/views/Mall/productOrder'], resolve)
const tixian = resolve => require(['@/views/About/tixian'], resolve)
// 设置
const setting = resolve => require(['@/views/Setting'], resolve)

// 登陆注册
const login = resolve => require(['@/views/Login/login'], resolve)
const register = resolve => require(['@/views/Login/register'], resolve)
const password = resolve => require(['@/views/Login/password'], resolve)

// 设置新手机号
const changeTel = resolve => require(['@/views/Setting/changeTel'], resolve)
const set = resolve => require(['@/views/Setting/changeTel/set'], resolve)
// 设置密码
const changePass = resolve => require(['@/views/Setting/changePass'], resolve)
const setpass = resolve => require(['@/views/Setting/changePass/set'], resolve)
// 设置语言
const language = resolve => require(['@/views/Setting/language'], resolve)
// 关于app
const aboutApp = resolve => require(['@/views/Setting/about'], resolve)
// 商城
const mall = resolve => require(['@/views/Mall'], resolve)
const mallDetail = resolve => require(['@/views/Mall/detail'], resolve)
const cart = resolve => require(['@/views/Mall/cart'], resolve)
const confirm = resolve => require(['@/views/Mall/confirm'], resolve)
const addressEdit = resolve => require(['@/views/Mall/addressEdit'], resolve)
const address = resolve => require(['@/views/Mall/address'], resolve)
const mallOrder = resolve => require(['@/views/Mall/mallOrder'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: index,
      children: [{
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: 'GDC资产通证'
        }
      }, {
        path: '/order',
        redirect: '/order/saleOrder',
        component: order,
        children: [{
          path: '/order/buyOrder',
          name: 'buyOrder',
          component: buyOrder
        }, {
          path: '/order/saleOrder',
          name: 'saleOrder',
          component: saleOrder
        }]
      }, {
        path: '/about',
        name: 'about',
        component: about,
        meta: {
          title: '我的'
        }
      }]
    },
    // 商城
    {
      path: '/mall',
      name: 'mall',
      component: mall
    },
    {
      path: '/mallDetail/:id',
      name: 'detail',
      component: mallDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: addressEdit
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/mallOrder',
      name: 'mallOrder',
      component: mallOrder
    },
    /**
     * Home模块
     */
    // 余额
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        title: '消息'
      }
    }, {
      path: '/messagedetail/:id',
      name: 'messagedetail',
      component: messagedetail,
      meta: {
        title: '消息'
      }
    }, {
      path: '/balance/:type',
      name: 'balance',
      component: balance,
      meta: {
        title: 'GDC资产通证余额'
      }
    }, {
      path: '/transfer',
      name: 'transfer',
      component: transfer,
      meta: {
        title: '发送'
      }
    }, {
      path: '/receive',
      name: 'receive',
      component: receive,
      meta: {
        title: '接收'
      }
    }, {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList,
      meta: {
        title: '公告'
      }
    }, {
      path: '/noticeDetail/:id',
      name: 'noticeDetail',
      component: noticeDetail,
      meta: {
        title: '新闻详情'
      }
    },
    /**
     * 订单
     */
    {
      path: '/putup',
      redirect: '/putup/putbuy',
      component: putup,
      children: [{
        path: '/putup/putbuy',
        name: 'putbuy',
        component: putbuy
      }, {
        path: '/putup/putsale',
        name: 'putsale',
        component: putsale
      }]
    }, {
      path: '/citys',
      name: 'citys',
      component: citys,
      meta: {
        title: '城市'
      }
    },
    /**
     * 我的模块
     */
    {
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: qrcode
    },
    {
      path: '/orderRecord',
      name: 'orderRecord',
      component: orderRecord
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/reward',
      name: 'reward',
      component: reward
    },
    {
      path: '/freeze/:id',
      name: 'freeze',
      component: freeze
    },
    {
      path: '/release/:id',
      name: 'release',
      component: release
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: nickname
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: avatar
    },
    {
      path: '/productOrder',
      name: 'productOrder',
      component: productOrder
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: tixian
    },
    {
      path: '/convert',
      name: 'convert',
      component: convert
    },
    // setting
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    /**
     * 登录注册
     */
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/password',
      name: 'password',
      component: password
    },
    // 更改手机号
    {
      path: '/changeTel',
      name: 'changeTel',
      component: changeTel
    }, {
      path: '/changeTel/set',
      name: 'set',
      component: set
    },
    // 设置密码
    {
      path: '/changePass/:type',
      name: 'changePass',
      component: changePass
    }, {
      path: '/changePass/setpass/:type',
      name: 'setpass',
      component: setpass
    },
    {
      path: '/language',
      name: 'language',
      component: language
    },
    {
      path: '/aboutapp',
      name: 'aboutApp',
      component: aboutApp
    }
  ]
})
