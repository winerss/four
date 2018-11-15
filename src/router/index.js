import Vue from 'vue'
import Router from 'vue-router'
// 底部导航
import index from '@/views/Index'
// 首页
import home from '@/views/Home'
import balance from '@/views/Home/balance'
import transfer from '@/views/Home/transfer'
import receive from '@/views/Home/receive'
import noticeList from '@/views/Home/noticeList'
import noticeDetail from '@/views/Home/noticeDetail'

// 订单
import order from '@/views/Order'
import buyOrder from '@/views/Order/buyOrder'
import saleOrder from '@/views/Order/saleOrder'
import putup from '@/views/Order/putup'
import putsale from '@/views/Order/putsale'
import putbuy from '@/views/Order/putbuy'
import citys from '@/views/Order/citys'

// 信息
import message from '@/views/Message'
import messagedetail from '@/views/Message/detail'

// 我的
import about from '@/views/About'
import product from '@/views/About/product'
import qrcode from '@/views/About/qrcode'
import orderRecord from '@/views/About/orderRecord'
import myorder from '@/views/About/myorder'
import reward from '@/views/About/reward'
import release from '@/views/About/release'
import freeze from '@/views/About/freeze'
import user from '@/views/About/user'
import nickname from '@/views/About/nickname'
import avatar from '@/views/About/avatar'
import convert from '@/views/About/convert'

// 设置
import setting from '@/views/Setting'
// 登陆注册
import login from '@/views/Login/login'
import register from '@/views/Login/register'
import password from '@/views/Login/password'
// 设置新手机号
import changeTel from '@/views/Setting/changeTel'
import set from '@/views/Setting/changeTel/set'
// 设置密码
import changePass from '@/views/Setting/changePass'
import setpass from '@/views/Setting/changePass/set'
// 设置语言
import language from '@/views/Setting/language'
// 关于app
import aboutApp from '@/views/Setting/about'
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
          title: '仙草坊'
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
        path: '/about',
        name: 'about',
        component: about,
        meta: {
          title: '我的'
        }
      }]
    },
    /**
     * Home模块
     */
    // 余额
    {
      path: '/balance/:type',
      name: 'balance',
      component: balance,
      meta: {
        title: '仙草链余额'
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
