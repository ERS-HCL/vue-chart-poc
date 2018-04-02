import { HTTP } from '@/http-common';
class PopulationService {
  getCountryPopulationData() {
    return new Promise((resolve, reject) => {
        //https://restcountries.eu/rest/v2/all
      HTTP.get('populationdata.json', {
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
const populationService = new PopulationService()
export default populationService;