import {Meteor} from 'meteor/meteor'
import Vue from 'vue';

import store from './store/';

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import Vuetify from 'vuetify/dist/vuetify.js';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

import App from '../imports/ui/App.vue';


Meteor.startup(() => {
  new Vue({
    store,
    render: h => h(App),
  }).$mount('app');
});