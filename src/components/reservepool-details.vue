<template>
  <li>
    <h6>{{ address }}</h6>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? "Hide" : "Show" }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li><strong>Id: </strong>
        <font size="1"> {{ id }}</font>
      </li>
      <li><strong>Address: </strong> {{ address }}</li>
      <li>
        <strong>Swap Enabled: </strong> {{ isSwapEnabled }}
        <button @click="toggleSwaps">
          {{ isSwapEnabled ? "Disable" : "Enable" }} Swaps
        </button>
      </li>
    </ul>
    <div v-if="detailsAreVisible">
      <div>
        <label>Trade Amount:</label>
        <input type="text" v-model="tradeAmount" />
      </div>
      <div>
        <label>Recipient Address:</label>
        <input type="text" v-model="recipientAddress" />
      </div>
      <div style="padding:10px;">
        <button @click="buy">Buy Reserve</button>
        <button @click="sell">Sell Reserve</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'reservepool-details',
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
  emits: ['SwitchSwapEnabled', 'buy', 'sell'],
  data () {
    return {
      detailsAreVisible: false,
      tradeAmount: '',
      recipientAddress: ''
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
    },
    buy () {
      this.$emit('buy',
        this.address,
        this.tradeAmount,
        this.recipientAddress)
    },
    sell () {
      this.$emit('sell',
        this.address,
        this.tradeAmount,
        this.recipientAddress)
    }
  }
}
</script>
