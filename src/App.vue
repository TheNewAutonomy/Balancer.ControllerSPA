<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/styles.css'
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
 padding-right: 15px;
 padding-left: 15px;
 margin-right: auto;
 margin-left: auto;
}
@media (min-width: 768px) {
 .container {
 width: 750px;
 }
}
</style>
