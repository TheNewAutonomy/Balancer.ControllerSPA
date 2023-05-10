<template>
    <form @submit.prevent="submitData">
        <div>
            <label>Name</label>
            <input type="text" v-model="enteredName" />
        </div>
        <div>
            <label>Symbol</label>
            <input type="text" v-model="enteredSymbol" />
        </div>
        <div>
            <button>Add Pool</button>
        </div>
    </form>
</template>

<script>
export default {
  name: 'new-pool',
  emits: ['add-pool'],
  data () {
    return {
      enteredName: '',
      enteredSymbol: ''
    }
  },
  methods: {
    submitData
    () {
      this.$emit('add-pool', this.enteredName, this.enteredSymbol)
    }
  }
}
</script>
