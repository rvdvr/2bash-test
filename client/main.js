import {Meteor} from 'meteor/meteor'
import Vue from 'vue';

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import Vuetify from 'vuetify/dist/vuetify.js';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

import App from '../imports/ui/App.vue';


Meteor.startup(() => {
  new Vue({
    render: h => h(App),
  }).$mount('app');
});