export default {
  methods: {
    numUnti(num) {
      if (Number(num) >= 1000000000000) {
        return (num / 1000000000000).toFixed(2) + '万亿'
      } else if (Number(num) >= 100000000) {
        return (num / 100000000).toFixed(2) + '亿'
      } else if (Number(num) >= 10000) {
        return (num / 10000).toFixed(2) + '万'
      } else if (num < 1) {
        return (num - 0).toFixed(8)
      } else if (num >= 1) {
        return (num - 0).toFixed(4)
      } else {
        return (num - 0).toFixed(8)
      }
    }

  }
}
