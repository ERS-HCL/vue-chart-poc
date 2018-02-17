import { HTTP } from '@/http-common';
class ChartService {
  getChartData() {
    return new Promise((resolve, reject) => {
      HTTP.get('gitdata.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        mode: 'no-cors'
      }).then(response => {
        const data = JSON.parse(JSON.stringify(response.data));
        resolve(data)
      })
      .catch(e => {
        reject(e);
      });
    });
  };
  getBubbleChartData() {
    return new Promise((resolve, reject) => {
      HTTP.get('products.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        mode: 'no-cors'
      }).then(response => {
        const data = JSON.parse(JSON.stringify(response.data));
        resolve(data)
      })
      .catch(e => {
        reject(e);
      });
    });
  };
  getPieChartData() {
    return new Promise((resolve, reject) => {
      HTTP.get('gitdata1.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        mode: 'no-cors'
      }).then(response => {
        const data = JSON.parse(JSON.stringify(response.data));
        resolve(data)
      })
      .catch(e => {
        reject(e);
      });
    });
  };
  getPolarChartData() {
    return new Promise((resolve, reject) => {
      HTTP.get('gitdata2.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        mode: 'no-cors'
      }).then(response => {
        const data = JSON.parse(JSON.stringify(response.data));
        resolve(data)
      })
      .catch(e => {
        reject(e);
      });
    });
  };
  getMixedChartData() {
    return new Promise((resolve, reject) => {
      HTTP.get('gitdata3.json', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        mode: 'no-cors'
      }).then(response => {
        const data = JSON.parse(JSON.stringify(response.data));
        resolve(data)
      })
      .catch(e => {
        reject(e);
      });
    });
  };
}

const chartService = new ChartService()
export default chartService;