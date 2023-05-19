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
          <b-form-select v-model="selectedTokenA" :options="tokenOptions"></b-form-select>
          <b-form-select v-model="selectedTokenB" :options="tokenOptions"></b-form-select>
        </div>
        <div>
          Normalised Weights
        </div>
        <div>
          <input type="text" v-model="tokenANormalisedWeight" />
          <input type="text" v-model="tokenBNormalisedWeight" />
        </div>
        <div>
          <label>Swap Fee %</label>
          <input type="text" v-model="enteredSwapFeePercentage" />
        </div>
        <div>
          <label>AUM Fee %</label>
          <input type="text" v-model="enteredManagementAumFeePercentage" />
        </div>
        <div>
          <b-form-checkbox
            id="swapEnabledOnStart"
            v-model="enteredSwapEnabledOnStart"
            name="swapEnabledOnStart"
            value="enabled"
            unchecked-value="disabled">
            Swap enabled on start
            </b-form-checkbox>
        </div>
        <div>
          <b-form-checkbox
            id="swapEnabledOnStart"
            v-model="enteredMustAllowListLPs"
            name="swapEnabledOnStart"
            value="enabled"
            unchecked-value="disabled">
            Must allow list LPs
          </b-form-checkbox>
        </div>
        <div>
            <button>Add Pool</button>
        </div>
    </form>
</template>

<script>
import { parseFixed } from '@ethersproject/bignumber'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default {
  name: 'new-pool',
  emits: ['add-pool'],
  data () {
    return {
      enteredName: '',
      enteredSymbol: '',
      enteredPoolTokens: [],
      enteredPoolNormalisedWeights: [parseFixed('0.4', 18).toString(), parseFixed('0.6', 18).toString()],
      enteredPoolAssetManagers: [ZERO_ADDRESS, ZERO_ADDRESS],
      enteredSwapFeePercentage: '0.2',
      enteredSwapEnabledOnStart: false,
      enteredMustAllowListLPs: false,
      enteredManagementAumFeePercentage: '0.25',
      enteredAumFeeId: 3,
      enteredSalt: '0x0000000000000000000000000000000000000000000000000000000000000001',
      selectedTokenA: null,
      selectedTokenB: null,
      tokenOptions: [
        { value: null, text: 'Please select token' },
        { value: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', text: 'WXDAI' },
        { value: '0xC45b3C1c24d5F54E7a2cF288ac668c74Dd507a84', text: 'SYMMETRIC' },
        { value: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e', text: 'STAKE' },
        { value: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb', text: 'GNOSIS' }
      ],
      tokenANormalisedWeight: '0.5',
      tokenBNormalisedWeight: '0.5'
    }
  },
  methods: {
    submitData () {
      this.enteredPoolTokens = [
        this.selectedTokenA,
        this.selectedTokenB
      ]
      this.enteredPoolTokens.sort()
      this.enteredPoolNormalisedWeights = [parseFixed(this.tokenANormalisedWeight, 18).toString(), parseFixed(this.tokenBNormalisedWeight, 18).toString()]

      this.$emit('add-pool',
        this.enteredName,
        this.enteredSymbol,
        this.enteredPoolTokens,
        this.enteredPoolNormalisedWeights,
        this.enteredPoolAssetManagers,
        parseFixed(this.enteredSwapFeePercentage, 18).toString(),
        this.enteredSwapEnabledOnStart,
        this.enteredMustAllowListLPs,
        parseFixed(this.enteredManagementAumFeePercentage, 18).toString(),
        this.enteredAumFeeId,
        this.enteredSalt)
    },
    tokenASelect (e) {
      e.preventDefault()
      this.enteredName = e
    }
  }
}
</script>
