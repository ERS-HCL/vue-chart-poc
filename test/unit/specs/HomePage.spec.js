import Vue from 'vue'
import HomePage from '@/pages/HomePage'

describe('HomePage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HomePage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('div h1').textContent)
      .to.equal('Welcome to learn chart.js with Vue.js')
  })
})
