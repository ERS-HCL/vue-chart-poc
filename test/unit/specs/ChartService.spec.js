import chartService from '@/services/ChartService';
describe('BarChartPage.vue', () => {
    let mockdata;
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
     
    })

    it('service should match with mock data', (done) => {
        chartService.getChartData().then((data) => {
        console.log(">>--------------->> ",data);
        expect(data).to.equal(mockdata);
     },(e)=>{
        console.log("<<---------------<< ",e);

     }
    ).then(done, done);
    });
   
  })