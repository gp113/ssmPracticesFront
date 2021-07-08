import Vue from 'vue'
import router from 'vue-router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = router.prototype.push
router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(router)

export default new router({
  routes: [
    {
      path: '/facility',
      name: 'facility',
      component: () => import('@/views/facility'),
      children: [
        {
          path: 'vendorManager',
          name: 'vendorManager',
          component: () => import('@/components/vendorManager'),
          meta: {
            title: '厂商管理'
          }
          // children: [
          //   {
          //     path: 'vendorDetail',
          //     name: 'vendorDetail',
          //     component: () => import('@/components/vendorDetail'),
          //     meta: {
          //       title: '厂商详情'
          //     }
          //   }
          // ]
        },
        {
          path: 'deviceTypeManager',
          name: 'deviceTypeManager',
          component: () => import('@/components/deviceTypeManager'),
          meta: {
            title: '设备型号管理'
          }
        },
        {
          path: 'deviceTypeAdd',
          name: 'deviceTypeAdd',
          component: () => import('@/components/deviceTypeAdd'),
          meta: {
            title: '新增设备型号'
          }
        },
        {
          path: 'deviceTypeUpdate',
          name: 'deviceTypeUpdate',
          component: () => import('@/components/deviceTypeUpdate'),
          meta: {
            title: '编辑设备型号'
          }
        },
        {
          path: 'deviceTypeDetail',
          name: 'deviceTypeDetail',
          component: () => import('@/components/deviceTypeDetail'),
          meta: {
            title: '设备型号详情'
          }
        },
        {
          path: 'helloWorld',
          name: 'helloWorld',
          component: () => import('@/components/HelloWorld'),
          meta: {
            title: '设备列表'
          }
        },
        {
          path: 'tencentClouds',
          name: 'tencentClouds',
          component: () => import('@/components/tencentClouds'),
          meta: {
            title: '云服务器管理'
          }
        },
        {
          path: 'vendorDetail',
          name: 'vendorDetail',
          component: () => import('@/components/vendorDetail'),
          meta: {
            title: '厂商详情'
          }
        }
      ]
    },
    {
      path: '/', // 默认初始页
      name: 'Login',
      component: () => import('@/components/Login')
    },
    {
      path: '/tencentClouds',
      name: 'tencentClouds',
      component: () => import('@/components/tencentClouds')
    }
  ]
})
