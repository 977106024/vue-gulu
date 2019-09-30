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
  vm.$on('click',function(){
    console.log(1);
  })

  let button = vm.$el
  button.click()

}