<template>
  <div class="no-data">
    <img src="../assets/image/空@2x.png" alt="" />
    <span>暂无数据</span>
  </div>
</template>
<style lang="scss" scoped>
.no-data {
    margin-top:100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 281px;
    height: 233px;
  }
  span {
    margin-top: 15px;
    height: 37px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 37px;
  }
}
</style>
