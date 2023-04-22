<template>
  <div>
    <hello-metamask/>
    <controller-component/>
    <controller-createpool/>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import ControllerComponent from '@/components/controller-component'
import ControllerCreatePool from '@/components/controller-createpool'
export default {
  name: 'controller-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from controller-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'controller-component': ControllerComponent,
    'controller-createpool': ControllerCreatePool
  }
}
</script>
<style scoped>
</style>
