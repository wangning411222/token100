<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <div class="title">联系我们</div>
      <p>工作时间:周一至周五 上午9:00-12:00 下午13:00-18:00</p>
      <p>提示:因添加人数过多,为了沟通的高效进行,请您添加微信时备注来意,否则将不予通过</p>
      <ul>
        <li>
          <div>TOKEN100官方客服:</div>
          <div class="light">  jjjjjjjjjjjjjjjj</div>
        </li>
        <li>
          <div>项目方/交易所收录:</div>
          <div class="light"> jjjjjjjjjjjjjjjj</div>
        </li>
        <li class="column">
          <div class="jiqi">
            <div>TOKEN100智能机器人:</div>
            <div class="light">  jjjjjjjjjjjjjjjj</div>
          </div>
          <div>想在自己社区群上加入TOKEN100报价机器人,请联系我.</div>
        </li>
        <li>
          <div>商务合作:</div>
          <div class="light">  jjjjjjjjjjjjjjjj</div>
        </li>
        <li>
          <div>TOKEN100telegram交流群:</div>
          <div class="light">  jjjjjjjjjjjjjjjj</div>
        </li>
        <li>
          <div>TOKEN100官方推特:</div>
          <div class="light">  jjjjjjjjjjjjjjjj</div>
        </li>
        <li>
          <div class="center">公司邮箱/地址:</div>
          <div>
            <div class="adress">
              <p>公司邮箱:9393993993</p>
              <p>公司地址:几点睡觉啊几点结束啊的</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({
        name: 'Mine'
      })
    },
    // 搜索页面
    onClickRight() {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  background: #fff;
  .van-nav-bar {
    background: #fff;
    .van-icon {
      color: #666666;
    }
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }

  .page-content {
    margin: 64px 32px 0 29px;
    font-size: 28px;
    color: #333;
    .title {
      margin-bottom: 50px;
    }
    p {
    //   line-height: 40px;
    }
    ul {
      li {

        padding: 30px 20px;
        margin-bottom: 10px;
        background: rgba(246, 247, 251, 1);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .light {
          color: #2d8cf0;
        }

      }
      &>li:last-child{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
           align-items: flex-start;
          .center{
             width:100%;
              text-align: center;
          }
          .adress{
              font-size:20px;
              color:#666;
              flex-grow: 1;
              text-align:left;

          }
      }
      .column {
          display: flex;
          flex-direction: column;
          align-items: center;
          .jiqi {
            display: flex;
            flex-direction: row;
          }
        }
    }
  }
}
</style>
