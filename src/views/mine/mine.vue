<!-- home -->
<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar :title="$t('mine.mine')" @click-right="onClickRight">
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
          <div v-if="isLogin">
            <div class="right-t">{{userName}}</div>
            <div class="right-b">{{$t('mine.welcome')}}TOKEN100</div>
          </div>
          <div v-else>
            <router-link :to="{ name: 'Login' }">
              <div class="right-t">{{$t('mine.welcomelogin')}}TOKREN100</div>
              <div class="right-b">{{$t('mine.welcometxt')}}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="page-bottom" v-if="isLogin">
        <ul>
          <li @click="changePhone">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/zhanghao-icon.png')"></van-image>
              <span>{{$t('mine.changephone')}}</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="changepassword">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/mima-icon.png')"></van-image>
              <span>{{$t('mine.changepwd')}}</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <div class="li-l">
              <van-image :src="require('../../assets/icon/shijian-icon.png')"></van-image>
              <span>{{$t('mine.registtime')}}</span>
            </div>
            <div class="li-r">
              <span>{{$moment(createTime).format('YYYY-MM-DD hh:mm')}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="page-bottom">
        <ul>
          <li @click="handlerLanguage">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/yuyan-icon.png')"></van-image>
              <span>{{$t('mine.language')}}</span>
            </div>
            <div class="li-r">
              <span>{{ language }}</span>
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="toAboutus">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/guanyuwomen-icon.png')"></van-image>
              <span>{{$t('mine.aboutus')}}</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
          <li @click="connectus">
            <div class="li-l">
              <van-image :src="require('../../assets/icon/lianxi-icon.png')"></van-image>
              <span>{{$t('mine.connectus')}}</span>
            </div>
            <div class="li-r">
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </div>
      <div class="login-out" v-if="isLogin">
        <van-button color="#fff" size="large" @click="logout">{{$t('mine.logout')}}</van-button>
      </div>
    </div>

    <van-action-sheet v-model="languageShow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
// 请求接口
import { getUser } from '@/api/mine.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      languageShow: false,
      actions: [
        { name: this.$t('language.languagezn'), value: 'CNY' },
        { name: this.$t('language.languageen'), value: 'USD' }
      ],
      language: null,
      userName: null,
      createTime: null
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'languageId', 'globalRate', 'globalRateArr'])
  },
  mounted() {
    this.getUser()
    this.language = this.languageId === 'CNY' ? '中文' : 'English'
  },
  methods: {
    // 退出登陆
    logout() {
      this.$dialog.confirm({
        title: this.$t('mine.logout'),
        message: this.$t('mine.logoutmsg')
      })
        .then(() => {
          this.$store.dispatch('setIsLogin', false)
          localStorage.setItem('token', '')
        }).catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    getUser() {
      getUser().then(res => {
        const {
          userName,
          createTime
        } = res
        this.userName = userName
        this.createTime = createTime
      })
    },
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
      this.languageShow = false
      this.language = item.name
      this.$store.dispatch('setLanguageId', item.value)
      const obj = this.globalRateArr.filter(items => {
        return items.rateC === item.value
      })
      this.$store.dispatch('setRate', obj[0].rateR)
      this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh' // 设置中英文模式
      localStorage.setItem('languageSet', this.$i18n.locale)
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
        name: 'findpassword',
        params: { type: 2 }
      })
    },
    // 修改账号
    changePhone() {
      this.$router.push({
        path: '/changePhone',
        query: {
          userName: this.userName
        }
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
  height: calc(100vh - 50px);
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
