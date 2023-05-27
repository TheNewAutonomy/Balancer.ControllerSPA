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
          <label>Tolerance %</label>
          <input type="text" v-model="enteredTolerance" />
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
      enteredTolerance: 15,
      enteredSalt: '0x0000000000000000000000000000000000000000000000000000000000000001',
      selectedTokenA: null,
      selectedTokenB: null,
      tokenOptions: [
        /*
        { value: null, text: 'Please select token' },
        { value: '0x3a97704a1b25F08aa230ae53B352e2e72ef52843', text: 'AGVE' },
        { value: '0x177127622c4A00F3d409B75571e12cB3c8973d3c', text: 'COW' },
        { value: '0x44fA8E6f47987339850636F88629646662444217', text: 'DAI' },
        { value: '0x2bF2ba13735160624a0fEaE98f6aC8F70885eA61', text: 'FRACTION' },
        { value: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb', text: 'GNO' },
        { value: '0xb0C5f3100A4d9d9532a4CfD68c55F1AE8da987Eb', text: 'HAUS' },
        { value: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9', text: 'HNY' },
        { value: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2', text: 'LINK' },
        { value: '0x63e62989D9EB2d37dfDB1F93A22f063635b07d51', text: 'MIVA' },
        { value: '0xA4eF9Da5BA71Cc0D2e5E877a910A37eC43420445', text: 'SGNO' },
        { value: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e', text: 'STAKE' },
        { value: '0xC45b3C1c24d5F54E7a2cF288ac668c74Dd507a84', text: 'SYMM' },
        { value: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', text: 'USDC' },
        { value: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252', text: 'WBTC' },
        { value: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1', text: 'WETH' },
        { value: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', text: 'WXDAI' }
        */
        { value: null, text: 'Please select token' },
        { value: '0x20677d4f3d0F08e735aB512393524A3CfCEb250C', text: 'ARI' },
        { value: '0xD629eb00dEced2a080B7EC630eF6aC117e614f1b', text: 'CBTC' },
        { value: '0xA287A3722c367849eFA5c76e96BE36efd65C290e', text: 'CDEFI' },
        { value: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', text: 'CEUR' },
        { value: '0x471EcE3750Da237f93B8E339c536989b8978a438', text: 'CELO' },
        { value: '0x2DEf4285787d58a2f811AF24755A8150622f4361', text: 'CETH' },
        { value: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787', text: 'CREAL' },
        { value: '0x765DE816845861e75A25fCA122bb6898B8B1282a', text: 'CUSD' },
        { value: '0x9995cc8F20Db5896943Afc8eE0ba463259c931ed', text: 'ETHIX' },
        { value: '0xa81D9a2d29373777E4082d588958678a6Df5645c', text: 'KNX' },
        { value: '0xE273Ad7ee11dCfAA87383aD5977EE1504aC07568', text: 'MCEUR' },
        { value: '0x9802d866fdE4563d088a6619F7CeF82C0B991A55', text: 'MCREAL' },
        { value: '0x918146359264C492BD6934071c6Bd31C854EDBc3', text: 'MCUSD' },
        { value: '0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B', text: 'MOBI' },
        { value: '0x17700282592D6917F6A73D0bF8AcCf4D578c131e', text: 'MOO' },
        { value: '0x46c9757C5497c5B1f2eb73aE79b6B67D119B0B58', text: 'PACT' },
        { value: '0x00400FcbF0816bebB94654259de7273f4A05c762', text: 'POOF' },
        { value: '0x2C98Ebada737f6f75B410c0eaa66A19B110796b5', text: 'PRIME' },
        { value: '0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1', text: 'SUSHI' },
        { value: '0x8427bD503dd3169cCC9aFF7326c15258Bc305478', text: 'SYMM' },
        { value: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC', text: 'UBE' },
        { value: '0x2A3684e9Dc20B857375EA04235F2F7edBe818FA7', text: 'USDC' }
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
        this.enteredTolerance,
        this.enteredSalt)
    },
    tokenASelect (e) {
      e.preventDefault()
      this.enteredName = e
    }
  }
}
</script>
