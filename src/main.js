import Vue from 'vue'
import App from './App.vue'
import VueImgsPreview from 'vue-imgs-preview'
// import VueImgsPreview from './lib/index.js'

Vue.use(VueImgsPreview);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
