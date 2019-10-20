import Vue from 'vue'
import App from './App.vue'

import '@/assets/svg'
import plugin from './components/toast/plugin'

Vue.use(plugin)

import GButton from './components/Button'
import GIcon from './components/Icon'
import ButtonGroup from './components/button-group'
import GInput from './components/Input'
import Grow from './components/row'
import Gcol from './components/col'
import GLayout from './components/layout/Layout'
import GHeader from './components/layout/Header'
import GSider from './components/layout/Sider'
import GContent from './components/layout/Content'
import GFooter from './components/layout/Footer'
import GToast from './components/toast/Toast'
import GTabs from './components/tabs/Tabs'
import GTabsBody from './components/tabs/Tabs-body'
import GTabsHead from './components/tabs/Tabs-head'
import GTabsItem from './components/tabs/Tabs-item'
import GTabsPane from './components/tabs/Tabs-pane'
import GPopover from './components/popover'

Vue.component('g-button',GButton)
Vue.component('g-icon',GIcon)
Vue.component('button-group', ButtonGroup)
Vue.component('g-input',GInput)
Vue.component('g-row',Grow)
Vue.component('g-col',Gcol)
Vue.component('g-layout',GLayout)
Vue.component('g-header',GHeader)
Vue.component('g-sider',GSider)
Vue.component('g-content',GContent)
Vue.component('g-footer',GFooter)
Vue.component('g-toast',GToast)
Vue.component('g-tabs',GTabs)
Vue.component('g-tabs-body',GTabsBody)
Vue.component('g-tabs-head',GTabsHead)
Vue.component('g-tabs-item',GTabsItem)
Vue.component('g-tabs-pane',GTabsPane)
Vue.component('g-popover',GPopover)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//单元测试
import chai from 'chai'
import spies from 'chai-spies'
const expect = chai.expect
chai.use(spies)

{
  const Constructor = Vue.extend(GButton) //组件构造器
  const vm = new Constructor({ //new一下生产实例
    propsData:{
      icon:'set'
    }
  })
  vm.$mount()

  let svg = vm.$el.querySelector('use')
  let svgHref = svg.getAttribute('xlink:href')
  expect(svgHref).to.eq('#i-set')
  vm.$el.remove()
  vm.$destroy()
}
{
  const Constructor = Vue.extend(GButton)
  const vm = new Constructor({
    propsData:{
      loading:true
    }
  })
  vm.$mount()

  let svg = vm.$el.querySelector('use')
  let svgHref = svg.getAttribute('xlink:href')
  expect(svgHref).to.eq('#i-loading')
  vm.$el.remove()
  vm.$destroy()
}
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(GButton)
  const vm = new Constructor({
    propsData:{
      loading:true
    }
  })
  vm.$mount(div)

  let svg = vm.$el.querySelector('.icon') //我的svg外面多一层div.icon 为了布局对齐
  let {order} = window.getComputedStyle(svg) //可以获取style里的css
  expect(order).to.eq('1') //equal 同样的 相等的 order：1 2
  vm.$el.remove()
  vm.$destroy()
}
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(GButton)
  const vm = new Constructor({
    propsData:{
      loading:true,
      iconPosition: 'right'
    }
  })
  vm.$mount(div)

  let svg = vm.$el.querySelector('.icon') //我的svg外面多一层div.icon 为了布局对齐
  let {order} = window.getComputedStyle(svg) //可以获取style里的css
  expect(order).to.eq('2') //equal 同样的 相等的 order：1 2
  vm.$el.remove() //删除dom
  vm.$destroy() //销毁对象 实例
}
{
  const Constructor = Vue.extend(GButton)
  const vm = new Constructor({
    propsData:{
      loading:true
    }
  })
  vm.$mount()

  let spy = chai.spy(function(){console.log(1)}) //间谍函数
  vm.$on('click',spy)

  let button = vm.$el
  button.click()
  expect(spy).to.have.been.called() //是否被调用了
}