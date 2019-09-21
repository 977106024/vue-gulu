import Vue from 'vue'
import App from './App.vue'

import GButton from './components/Button'

Vue.component('g-button',GButton)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
