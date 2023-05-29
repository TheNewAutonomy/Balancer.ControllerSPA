<template>
    <div>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? "Hide" : "Show" }} Pool Registration
      </button>
      <form @submit.prevent="submitData">
        <div v-if="detailsAreVisible">
          <div>
              <label>Pool Address</label>
              <input type="text" v-model="poolAddress" />
          </div>
          <div>
              <label>Reserve Token Address</label>
              <input type="text" v-model="reserveTokenAddress" />
          </div>
          <div>
              <button @click="registerPool">Register Pool</button>
          </div>
          <div>
              <button @click="deregisterPool">Deregister Pool</button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>

export default {
  name: 'register-selfmanaged-pool',
  emits: ['register-selfmanaged-pool'],
  data () {
    return {
      detailsAreVisible: false,
      poolAddress: '',
      reserveTokenAddress: ''
    }
  },
  methods: {
    toggleDetails () {
      this.detailsAreVisible = !this.detailsAreVisible
    },
    registerPool () {
      this.$emit('register-selfmanaged-pool',
        this.poolAddress,
        this.reserveTokenAddress)
    },
    deregisterPool () {
      this.$emit('deregister-selfmanaged-pool',
        this.poolAddress,
        this.reserveTokenAddress)
    },
    submitData () {
    }
  }
}
</script>
