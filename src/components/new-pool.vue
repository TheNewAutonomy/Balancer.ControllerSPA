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
import { parseFixed } from '@ethersproject/bignumber'
const MANAGEMENT_AUM_FEE_PERCENTAGE = parseFixed('0.5', 18).toString()
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default {
  name: 'new-pool',
  emits: ['add-pool'],
  data () {
    return {
      enteredName: '',
      enteredSymbol: '',
      enteredPoolTokens: [],
      enteredPoolNormalisedWeights: [],
      enteredPoolAssetManagers: [ZERO_ADDRESS, ZERO_ADDRESS],
      enteredSwapFeePercentage: 1000000000000,
      enteredSwapEnabledOnStart: true,
      enteredMustAllowListLPs: false,
      enteredManagementAumFeePercentage: MANAGEMENT_AUM_FEE_PERCENTAGE,
      enteredAumFeeId: 2,
      enteredSalt: '0x0000000000000000000000000000000000000000000000000000000000000000'
    }
  },
  methods: {
    submitData () {
      this.enteredPoolTokens = [
        '0xC45b3C1c24d5F54E7a2cF288ac668c74Dd507a84',
        '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
      ]

      this.enteredPoolNormalisedWeights = [800000000000000000, 200000000000000000]

      this.$emit('add-pool',
        this.enteredName,
        this.enteredSymbol,
        this.enteredPoolTokens,
        this.enteredPoolNormalisedWeights,
        this.enteredPoolAssetManagers,
        this.enteredSwapFeePercentage,
        this.enteredSwapEnabledOnStart,
        this.enteredMustAllowListLPs,
        this.enteredManagementAumFeePercentage,
        this.enteredAumFeeId,
        this.enteredSalt)
    }
  }
}
</script>
