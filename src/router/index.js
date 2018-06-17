import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'

const FinishDetail = (resolve) => {
  import('@/components/FinishDetail/FinishDetail').then(module => {
    resolve(module)
  })
}
const Dashboard = (resolve) => {
  import('@/components/Dashboard/Dashboard').then(module => {
    resolve(module)
  })
}
const Boss = (resolve) => {
  import('@/base/Boss/Boss').then(module => {
    resolve(module)
  })
}
const Genius = (resolve) => {
  import('@/base/Genius/Genius').then(module => {
    resolve(module)
  })
}
const Center = (resolve) => {
  import('@/base/Center/Center').then(module => {
    resolve(module)
  })
}
const Message = (resolve) => {
  import('@/base/Message/Message').then(module => {
    resolve(module)
  })
}
const Chat = (resolve) => {
  import('@/components/Chat/Chat').then(module => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('@/components/DetailIntro/DetailIntro').then(module => {
    resolve(module)
  })
}


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/finishDetail',
      name: 'FinishDetail',
      component: FinishDetail
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'message',
          name: 'Message',
          component: Message
        },
        {
          path: 'center',
          name: 'Center',
          component: Center
        },
        {
          path: 'genius',
          name: 'Genius',
          component: Genius
        },
        {
          path: 'boss',
          name: 'Boss',
          component: Boss
        }
      ]
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
