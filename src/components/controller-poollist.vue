<template>
  <div class="controller container">
    <header>
      <h1>Welcome to Balancer controller</h1>
    </header>
    <h3>Managed pools</h3>

    <ul>
      <li>
        <pool-details
          v-for="pool in pools"
          :key="pool.id"
          :id="pool.id"
          :address="pool.address"
          @delete="deleteContact"
        ></pool-details>
      </li>
    </ul>

    <table id="fourthTable">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.id" @click="sortTable(col)">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in pools" :key="row.id">
          <td v-for="col in columns" :key="col.id">{{row[col]}}</td>
        </tr>
      </tbody>
    </table>
    <button @click="clickLoadPools">Load pools</button>

    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
    <div class="event" v-if="winEvent">
      <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congragulations, you have won {{winEvent._amount}} wei</p>
      <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> Sorry you lost, try again.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'controller',
  data () {
    return {
      amount: null,
      pending: false,
      winEvent: null,
      ascending: false,
      sortColumn: '',
      pools: [
      ]
    }
  },
  methods: {
    clickLoadPools (event) {
      this.$store.state.controllerContractInstance().getPoolsUnderManagement.call(
        {
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            this.pools = []
            result.forEach((item, index) => {
              this.pools.push({ address: item })
            })
          }
        }
      )
    },
    sortTable: function sortTable (col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending
      } else {
        this.ascending = true
        this.sortColumn = col
      }

      var ascending = this.ascending

      this.pools.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0
      })
    }
  },
  computed: {
    columns: function columns () {
      if (this.pools.length === 0) {
        return []
      }
      return Object.keys(this.pools[0])
    }
  }
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
