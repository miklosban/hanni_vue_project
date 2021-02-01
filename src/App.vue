<template>
  <div id="app">
    <div class="header">
      <h1 class="header__title"><strong>Commons</strong> form</h1>
      <div class="header__spacer"></div>
      <a href="https://github.com/marekmensa/vue-dd-form" class="header__button-wrapper" target="_blank">
      </a>
    </div>
    <Home />  
  </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0;
  background: #eeeeee;
}
</style>

