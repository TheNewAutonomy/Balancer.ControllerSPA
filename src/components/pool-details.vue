<template>
    <li>
      <h6>{{ address }}</h6>
      <button @click="toggleDetails">
        {{ detailsAreVisible ? "Hide" : "Show" }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Id: </strong><font size="1"> {{ id }}</font></li>
        <li><strong>Address: </strong> {{ address }}</li>
      </ul>
      <div v-if="detailsAreVisible">
      <button @click="$emit('trigger', address, id)">Trigger</button>
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
    }
  },
  data () {
    return {
      detailsAreVisible: false
    }
  },
  methods: {
    toggleDetails () {
      this.detailsAreVisible = !this.detailsAreVisible
    }
  }
}
</script>
