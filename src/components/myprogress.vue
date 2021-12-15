<template>
  <div>
    <span class="max">
      <span class="num" :style="{width:num*10+'%',background:bgColorClass}"></span>
    </span>
    <span>{{num}}</span>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  computed: {
    bgColorClass() {
      let bgclass = ''
      switch (this.num) {
        case this.num >= 10:
          bgclass = 'rgb(10, 180, 90)'
          break
        case 9:
          bgclass = 'rgb(10, 180, 90)'
          break
        case 8:
          bgclass = 'rgb(100, 200, 51)'
          break
        case 7:
          bgclass = 'rgb(100, 200, 51)'
          break
        case 6:
          bgclass = 'rgb(167, 211, 90)'
          break
        case 5:
          bgclass = 'rgb(167, 211, 90)'
          break
        case 4:
          bgclass = 'rgb(217, 209, 20)'
          break
        case 3:
          bgclass = 'rgb(217, 209, 20)'
          break
        case 2:
          bgclass = 'rgb(250, 173, 20)'
          break
        case 1:
          bgclass = 'rgb(255, 96, 89)'
          break
        case 0:
          bgclass = '#F2F3F4'
          break
      }
      return bgclass
    }
  }
}
</script>
<style lang="scss" scoped>
.max {
  margin-right: 17px;
  width: 150px;
  height: 18px;
  position: relative;
  display: inline-block;
  background: #F2F3F4;
  border-radius:8px;
  .num {
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width: 90%;
    display: inline-block;
    border-radius:8px;
  }
}
</style>
