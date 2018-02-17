import Vue from 'vue';
import chartService from '@/services/ChartService';
import BarChartPage from '@/pages/BarChartPage';


describe('BarChartPage.vue', () => {
  let vm,mockdata;
  before(() => {
    mockdata = {
      "datasets": [
        {
          "label": "GitHub Commits",
          "backgroundColor": "#f87979",
          "data": [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ],
      "labels":["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
    const Constructor = Vue.extend(BarChartPage)
    vm = new Constructor({
      propsData: {
        chartService: chartService
      }
    }).$mount()
  })
  it('datacollection should', function () {
    console.log("----",vm.$data.title);
    expect(vm.$data.datacollection).to.equal(undefined);
  });
  it('service should match with mock data', (done) => {
    vm.getData().then(() => {
      console.log("--------------->> ",vm.$data.datacollection);
      expect(vm.$data.datacollection).to.equal(mockdata);
   }).then(done, done);
  });
  it('Title should', function () {
      expect(vm.$el.querySelector('h4').textContent).to.equal("Bar Chart");
  });
})
