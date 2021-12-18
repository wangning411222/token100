<!-- home -->
<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="我的" right-text="按钮" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <div class="page-head">
        <div class="head-left">
          <van-image :src="require('../../assets/image/Bitmap@2x (1).png')" />
        </div>
        <div class="head-right">
          <div v-if="islogin">
            <div class="right-t">158****6743</div>
            <div class="right-b">欢迎来到TOKEN100</div>
          </div>
          <div v-else>
            <router-link :to="{ name: 'Login' }">
              <div class="right-t">欢迎登录TOKREN100</div>
              <div class="right-b">专注数字货币大数据分析</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="page-bottom" v-if="islogin">
        <ul>
          <li @click="changePhone">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/zhanghao-icon.png')"></van-image>
              <span>修改账号</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="changepassword">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/mima-icon.png')"></van-image>
              <span>修改密码</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <div class="li-l">
              <van-image :src="require('../../assets/icon/shijian-icon.png')"></van-image>
              <span>注册时间</span>
            </div>
            <div class="li-r">
              <span>2021-09-12 11:20</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="page-bottom">
        <ul>
          <li @click="handlerLanguage">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/yuyan-icon.png')"></van-image>
              <span>语言</span>
            </div>
            <div class="li-r">
              <span>{{ language }}</span>
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="toAboutus">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/guanyuwomen-icon.png')"></van-image>
              <span>关于我们</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="connectus">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/lianxi-icon.png')"></van-image>
              <span>联系我们</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </div>
      <div class="login-out">
        <van-button color="#fff" size="large">退出登陆</van-button>
      </div>
    </div>

    <van-action-sheet v-model="languageShow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      islogin: true, // 是否登陆
      wechat: `${this.$cdn}/wx/640.gif`,
      languageShow: false,
      actions: [{ name: '中文' }, { name: '英文' }],
      language: '中文'
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 联系我们
    connectus() {
      this.$router.push({
        name: 'connectus'
      })
    },
    // 关于我们
    toAboutus() {
      this.$router.push({
        name: 'aboutus'
      })
    },
    // 中英选中
    onSelect(item) {
      console.log(item, 'item``````````````')
      this.languageShow = false
      this.language = item.name
    },
    // 切换中英文
    handlerLanguage() {
      this.languageShow = true
    },
    // 去登陆页面
    toLogin() {
      this.$route
    },
    // 修改密码
    changepassword() {
      this.$router.push({
        name: 'findpassword'
      })
    },
    // 修改账号
    changePhone() {
      this.$router.push({
        name: 'changePhone'
      })
    },
    // 搜索页面
    onClickRight() {
      this.$router.push({
        name: 'search'
      })
    },
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const params = { user: 'sunnie' }
      getUserInfo(params)
        .then(() => {})
        .catch(() => {})
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  height:calc(100vh - 50px);
  overflow: hidden;
  background: #f5f5f5;
  .van-nav-bar {
    background: #ecedee;
    .van-icon {
      color: #666666;
    }
  }
  .page-content {
     background: #f5f5f5;
    .page-head {
      background: #fff;
      padding: 24px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .head-left {
        margin-right: 24px;
        .van-image {
          width: 121px;
          height: 121px;
        }
      }
      .head-right {
        div {
          display: flex;
          flex-direction: column;
          .right-t {
            height: 51px;
            font-size: 36px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 51px;
          }
          .right-b {
            margin-top: 5px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 40px;
          }
        }
      }
    }
    .page-bottom {
      margin-top: 22px;
      ul {
        background: #fff;
        padding: 0 33px 0 35px;
        & > :last-child {
          border: none;
        }
        li {
          @include flexbox;
          border-bottom: 1px solid #eeeeee;
          height: 96px;

          .li-l {
            .van-image {
              width: 32px;
              height: 32px;
            }
            span {
              padding-left: 38px;
              font-size: 34px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: #333333;
              line-height: 48px;
            }
          }
          .li-r {
            span {
              color: #999999;
              font-size: 30px;
              margin-right: 14px;
            }
            .van-icon {
              color: #ccc;
            }
          }
        }
      }
    }
    .login-out {
      margin-top: 113px;
      padding: 0 30px;
      .van-button {
        box-shadow: 4px 4px 15px 4px rgba(177, 177, 177, 0.3);
        border-radius: 10px;
        .van-button__text {
          font-size: 32px;
          color: #da5949;
        }
      }
    }
  }
}
</style>
