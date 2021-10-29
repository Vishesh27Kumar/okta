import Vue from 'vue';
import axios from 'axios';

body: {
  first_name: params["first_name"],
  middle_name: params["middle_name"],
  last_name: params["last_name"],
  email: params["email"],
  phone: params["phone"],
  zipcode: params["zipcode"],
  dob: params["dob"],
  ssn: params["ssn"],
  driver_license_number: params["driver_license_number"],
  driver_license_state: params["driver_license_state"]


const BASE_URI = process.env.NODE_ENV == 'production' ? 'https://vue-js-golang-backend.herokuapp.com' : 'http://localhost:4444';
console.info(BASE_URI)
const client = axios.create({
  baseURL: BASE_URI,
  json: true
});

const APIClient =  {
  createKudo(repo) {
    return this.perform('post', '/kudos', repo);
  },

  deleteKudo(repo) {
    return this.perform('delete', `/kudos/${repo.id}`);
  },

  updateKudo(repo) {
    return this.perform('put', `/kudos/${repo.id}`, repo);
  },

  getKudos() {
    return this.perform('get', '/kudos');
  },

  getKudo(repo) {
    return this.perform('get', `/kudo/${repo.id}`);
  },

  async perform (method, resource, data) {
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  }
}

export default APIClient;
