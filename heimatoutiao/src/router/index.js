// 封装路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import EditPersonal from '@/views/editPersonal.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import ArticleDetail from '@/views/articleDetail.vue'
import MyFollow from '@/views/myFollow.vue'
import MyCollections from '@/views/myCollections.vue'
import Comments from '@/views/comments.vue'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    }, {
      name: 'editPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    }, {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'MyFollow',
      path: '/myFollow',
      component: MyFollow
    },
    {
      name: 'MyCollections',
      path: '/myCollections',
      component: MyCollections
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    }

  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('heima_40_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
