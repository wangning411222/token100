
import { mapGetters } from 'vuex'
export default {
  methods: {
    cnNumUnti(num) {
      const nums = num * this.globalRate
      if (Number(nums) >= 1000000000000) {
        return (nums / 1000000000000).toFixed(2) + this.$t('global.trillion')
      } else if (Number(nums) >= 100000000) {
        return (nums / 100000000).toFixed(2) + this.$t('market.million')
      } else if (Number(nums) >= 10000) {
        return (nums / 10000).toFixed(2) + this.$t('market.thousand')
      } else if (nums >= 1) {
        return nums.toFixed(2) + this.$t('global.yuan')
      } else if (num < 1) {
        return num.toFixed(6) + this.$t('global.yuan')
      } else if (nums === 0) {
        return '--'
      }
    },
    enNumUnti(num) {
      if (Number(num) >= 1000000000000) {
        return (num / 1000000000000).toFixed(2) + this.$t('global.trillion')
      } else if (Number(num) >= 100000000) {
        return (num / 100000000).toFixed(2) + this.$t('market.million')
      } else if (Number(num) >= 10000) {
        return (num / 10000).toFixed(2) + this.$t('market.thousand')
      } else if (num >= 1) {
        return num.toFixed(2) + this.$t('global.yuan')
      } else if (num < 1) {
        return num.toFixed(6) + this.$t('global.yuan')
      } else if (num === 0) {
        return '--'
      }
    }

  },
  computed: {
    ...mapGetters(['globalRate'])
  }
}
