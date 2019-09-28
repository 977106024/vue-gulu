import Vue from 'vue'
import App from './App.vue'

import GButton from './components/Button'
import GIcon from './components/Icon'


Vue.component('g-button',GButton)
Vue.component('g-icon',GIcon)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
