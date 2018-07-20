<template>
  <div id="app">
    <img src="./assets/logo.png">
    <wysiwyg file-upload-url="/"></wysiwyg>
  </div>
</template>

<script>
import wysiwyg from './components/wysiwyg.vue'

export default {
  name: 'app',
  components: {
    wysiwyg
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
