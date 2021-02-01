import Vue from 'vue'
import App from './App.vue'
import ddForm from 'vue-dd-form'
Vue.use(ddForm)

Vue.config.productionTip = false

new Vue({
  // rendering the App component
  render: h => h(App),
    // 
    // This is sort of
    // 
    // render: function (h) {
    //  return h(App);
    //}
    //
    // Which is sort of this:
    // render: function (createElement) {
    //  return createElement(App);
    //}
    // App is the Component from the App.vue file.
    // import App from './App.vue'
    //
    // A render function does something like this:
    // render(h) {
    //  return h('div', {}, [...])
    //}
    //
    // <App>
    //  <div></div>
    // </app>

  //...App,
}).$mount('#app')

