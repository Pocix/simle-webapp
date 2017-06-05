import Vue from 'vue';
import App from './App';
import router from './router';
import Resource from 'vue-resource';
import Vuex from 'vuex';
import Iview from 'iview';
import store from './vuex/store';
import 'iview/dist/styles/iview.css';
import "babel-polyfill";

Vue.use(Vuex);
Vue.use(Iview);
Vue.use(Resource);
new Vue({
        router,
        store,
        render: h => h(App)
}).$mount('#app');
