<template>
  <div class="controller container">
    <h1>Welcome to the Balancer controller</h1>
    <h3>Managed pools</h3>
    <table id="fourthTable">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.id" @click="sortTable(col)">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col.id">{{row[col]}}</td>
        </tr>
      </tbody>
    </table>
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
      rows: [
        {
          id: 1,
          pool: 'Pool 1',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        },
        {
          id: 2,
          pool: 'Pool 2',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        },
        {
          id: 3,
          pool: 'Pool 3',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        },
        {
          id: 4,
          pool: 'Pool 4',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        },
        {
          id: 5,
          pool: 'Pool 5',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        },
        {
          id: 6,
          pool: 'Pool 6',
          address: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
        }
      ]
    }
  },
  methods: {
    sortTable: function sortTable (col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending
      } else {
        this.ascending = true
        this.sortColumn = col
      }

      var ascending = this.ascending

      this.rows.sort(function (a, b) {
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
      if (this.rows.length === 0) {
        return []
      }
      return Object.keys(this.rows[0])
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
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
