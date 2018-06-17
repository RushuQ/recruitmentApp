import axios from 'axios';
import { Indicator } from 'mint-ui';

axios.interceptors.request.use(function (config) {
  Indicator.open('加载中...');
  return config
})
axios.interceptors.response.use(function (config) {
  Indicator.close();
  return config
})
