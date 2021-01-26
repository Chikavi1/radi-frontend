import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pets from '../views/Pets.vue'
import CreatePets from '../views/CreatePets.vue';
import Patrocinadores from '../views/Patrocinadores.vue';
import Signin from '../views/Signin.vue';
import Login from '../views/Login.vue';
import Donations from '../views/Donations';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/patrocinadores',
    name: 'Patrocinadores',
    component: Patrocinadores
  },
  {
    path: '/donaciones',
    name: 'Donaticiones',
    component: Donations
  },
  {
    path: '/mascotas',
    name: 'Pets',
    component: Pets
  },
  {
    path: '/mascotas/create',
    name: 'createPets',
    component: CreatePets
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
