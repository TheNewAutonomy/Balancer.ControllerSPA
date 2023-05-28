<template>
    <li>
      <h6>{{ address }}</h6>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? "Hide" : "Show" }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Id: </strong><font size="1"> {{ id }}</font></li>
        <li><strong>Address: </strong> {{ address }}</li>
        <li>
          <strong>Swap Enabled: </strong> {{ isSwapEnabled }}
          <button @click="toggleSwaps">
            {{ isSwapEnabled ? "Disable" : "Enable" }} Swaps
          </button>
        </li>
      </ul>
      <div v-if="detailsAreVisible">
      <button @click="$emit('trigger', address, id)">Trigger</button>
      <div style="padding:10px;">
          <label>Reserve Token</label>
          <input type="text" v-model="enteredReserveToken" />
      </div>
      <button @click="$emit('register', address, enteredReserveToken)">Register</button>
      <br>
      <div style="padding:10px;">
        <button @click="$emit('buy', address, id)">Buy Reserve</button>
        <button @click="$emit('sell', address, id)">Buy Collateral</button>
      </div>
      </div>
    </li>
  </template>

<script>
export default {
  name: 'pool-details',
  props: {
    id: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isSwapEnabled: {
      type: Boolean,
      required: true
    }
  },
  emits: ['trigger', 'SwitchSwapEnabled'],
  data () {
    return {
      detailsAreVisible: false,
      enteredReserveToken: ''
    }
  },
  methods: {
    toggleDetails () {
      this.detailsAreVisible = !this.detailsAreVisible
    },
    toggleSwaps () {
      this.isSwapEnabled = !this.isSwapEnabled

      this.$emit('SwitchSwapEnabled',
        this.isSwapEnabled,
        this.address)
    }
  }
}
</script>
