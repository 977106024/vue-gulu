import Vue from 'vue'
import App from './App.vue'

import GButton from './components/Button'
import GIcon from './components/Icon'
import ButtonGroup from './components/button-group'


Vue.component('g-button',GButton)
Vue.component('g-icon',GIcon)
Vue.component('button-group', ButtonGroup)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
