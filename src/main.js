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

//单元测试
import chai from 'chai'
const expect = chai.expect
{
  const Constructor = Vue.extend(GButton)
  const button = new Constructor({
    propsData:{
      icon:'set'
    }
  })
  button.$mount()

  let svg = button.$el.querySelector('use')
  let svgHref = svg.getAttribute('xlink:href')
  expect(svgHref).to.eq('#i-set')
}