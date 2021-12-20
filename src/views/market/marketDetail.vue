<template>
  <div>
    <van-sticky>
      <van-nav-bar title="详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 头部信息 -->
    <div class="detail-head">
      <div class="head-top">
        <div class="head-top-left">
          <van-image width="24px" height="24px" :src="require('../../assets//image/比特币@2x.png')"></van-image>
          <span>BTC</span>
          <span>比特币</span>
        </div>
        <div class="head-top-right">
          <div class="light">
            <van-image width="11px" height="10px" :src="require('../../assets/image/灯泡@2x.png')"></van-image>
            <div>NO.1</div>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="head-bottom-left">
          <div class="line-1">
            <span>¥</span>
            <span>34.77万</span>
          </div>
          <div class="line-2">
            <span>≈$ 54392.83</span>
            <span>（-5.92%）</span>
          </div>
          <div class="line-3">
            <span>市值</span>
            <span>¥6.57万亿</span>
          </div>
        </div>
        <div class="head-bottom-right">
          <div class="column-left">
            <span>最高 </span>
            <span>最低</span>
            <span>24H量 </span>
            <span>24H额</span>
            <span>24H换</span>
          </div>
          <div class="column-right">
            <span>¥6.95万 </span>
            <span>¥6.95万</span>
            <span>¥6.95万 </span>
            <span>¥1451.05亿</span>
            <span> 2.21%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="line-gray"></div>
    <!-- chart图标 -->
    <div class="charts">
      <div class="chart-select">
        <ul>
          <li
            v-for="(item, index) in timeArr"
            :key="index"
            :class="chartActive === item.value ? 'color-active' : 'color-inactive'"
            @click="selectTime(item.value)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="chart-box">
        <div class="tip" v-show="tipShow">
          <div>{{ chartTime }} 00:00</div>
          <div>成交额:${{ chartNum }}亿</div>
        </div>
        <div id="mychart"></div>
      </div>
    </div>
    <!-- tabs -->
    <div class="head">
      <div class="head-left">
        <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" :ellipsis="false">
          <van-tab title="行情 "> </van-tab>
          <van-tab title="期货合约"> </van-tab>
          <van-tab title="简况"> </van-tab>
          <van-tab title="持币"> </van-tab>
          <van-tab title="钱包"> </van-tab>
        </van-tabs>
      </div>
      <div class="head-right">
        <van-dropdown-menu v-show="active === 0 || active === 1">
          <van-dropdown-item :title="rate" v-model="rate" ref="item">
            <div class="rate-box">
              <van-row>
                <van-col
                  class="rate-item"
                  v-for="(item, index) in rateArr"
                  :key="index"
                  span="8"
                  @click="selectRate( item.rateC)"
                    >{{ item.rateName }}&nbsp;{{ item.rateC }}</van-col
                >
              </van-row>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <!-- 行情 -->
    <div class="table-head" v-if="active === 0">
      <van-row type="flex" justify="space-between" cente="center">
        <van-col span="2">#</van-col>
        <van-col span="4">交易对</van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>最新价 (¥)</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>24H额 (¥)</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>成交额占比</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 期货合约 -->
    <div class="table-head" v-if="active === 1">
      <van-row type="flex" justify="space-between" cente="center">
        <van-col span="2">#</van-col>
        <van-col span="6">币种</van-col>
        <van-col span="8">
          <div class="arrow-box">
            <div>最新价 (¥)</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
        <van-col span="8">
          <div class="arrow-box">
            <div>24小时涨幅</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="list-box">
      <!-- 行情 -->
      <van-list v-if="active === 0">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toDetail"
        >
          <van-col span="2">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
          </van-col>
          <van-col span="4" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="6" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 期货合约 -->
      <van-list v-if="active === 1">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toDetail"
        >
          <van-col span="2">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <div>5</div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <div>5</div>
          </van-col>
        </van-row>
      </van-list>
    </div>
    <div class="info-box" v-if="active === 2">
      <div class="info-txt">
        <h3>持币情况</h3>
        <div>
          <p>
            比特币(BitCoin) 的概念最初由中本聪在2008年提出, 根据中本聪的思路设计发布的开源软件以及建构其上的
            P2P网络。比特币是一种P2P形式的数字货币...
          </p>
          <span>查看更多</span>
        </div>
      </div>
      <div class="info-list">
        <div class="info-item">
          <div class="item-left">发行日期</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">历史最高价</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">历史最低价</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">流通市值</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">排名</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">全球总市值占比</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">最大供应量</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">总供应量</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">流通总量</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">流通率</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">核心算法</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">共识机制</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">上架交易所</div>
          <div class="item-right">2008-10-31</div>
        </div>
        <div class="info-item">
          <div class="item-left">持币地址数</div>
          <div class="item-right">2008-10-31</div>
        </div>
      </div>
      <!-- 团队信息 -->
      <div class="team-info">
        <h3>团队信息</h3>
        <div class="team-list">
          <div class="team-left">
            <van-image width="39px" height="37px" :src="require('../../assets/image/people.png')"></van-image>
            <div>互动的环节</div>
          </div>
          <div class="team-right">
            <div>Bitcoin Core开发团队 成员</div>
            <div class="team-icon">
              <van-image
                width="22px"
                height="22px"
                :src="require('../../assets/image/推特_twitter43@2x.png')"
              ></van-image>
              <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
            </div>
          </div>
        </div>
        <div class="team-list">
          <div class="team-left">
            <van-image width="39px" height="37px" :src="require('../../assets/image/people.png')"></van-image>
            <div>互动的环节</div>
          </div>
          <div class="team-right">
            <div>Bitcoin Core开发团队 成员</div>
            <div class="team-icon">
              <van-image
                width="22px"
                height="22px"
                :src="require('../../assets/image/推特_twitter43@2x.png')"
              ></van-image>
              <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
            </div>
          </div>
        </div>
        <div class="team-list">
          <div class="team-left">
            <van-image width="39px" height="37px" :src="require('../../assets/image/people.png')"></van-image>
            <div>互动的环节</div>
          </div>
          <div class="team-right">
            <div>Bitcoin Core开发团队 成员</div>
            <div class="team-icon">
              <van-image
                width="22px"
                height="22px"
                :src="require('../../assets/image/推特_twitter43@2x.png')"
              ></van-image>
              <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
            </div>
          </div>
        </div>
        <div class="team-list" v-if="teamMoreShow">
          <div class="team-left">
            <van-image width="39px" height="37px" :src="require('../../assets/image/people.png')"></van-image>
            <div>互动的环节</div>
          </div>
          <div class="team-right">
            <div>Bitcoin Core开发团队 成员</div>
            <div class="team-icon">
              <van-image
                width="22px"
                height="22px"
                :src="require('../../assets/image/推特_twitter43@2x.png')"
              ></van-image>
              <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
            </div>
          </div>
        </div>
        <div class="team-list" v-if="teamMoreShow">
          <div class="team-left">
            <van-image width="39px" height="37px" :src="require('../../assets/image/people.png')"></van-image>
            <div>互动的环节</div>
          </div>
          <div class="team-right">
            <div>Bitcoin Core开发团队 成员</div>
            <div class="team-icon">
              <van-image
                width="22px"
                height="22px"
                :src="require('../../assets/image/推特_twitter43@2x.png')"
              ></van-image>
              <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
            </div>
          </div>
        </div>
        <div class="more" v-if="!teamMoreShow" @click="teamMore">查看更多</div>
      </div>
      <!-- 投资机构 -->
      <div class="organization-info">
        <h3>投资机构</h3>
        <div class="b-p"></div>
        <div class="organization-list">
          <div class="icon-box">
            <van-image width="34px" height="34px" :src="require('../../assets/image/people.png')"></van-image>
          </div>
          <p class="organization-right">
            由David Williams创办的投资由David Williams创办的投资由David Williams创办的投资由David Williams创办的投资
          </p>
        </div>
        <div class="organization-list">
          <div class="icon-box">
            <van-image width="34px" height="34px" :src="require('../../assets/image/people.png')"></van-image>
          </div>
          <p class="organization-right">Williams创办的投资由David Williams创办的投资由David Williams创办的投资</p>
        </div>
        <div class="organization-list" v-show="organizationShow">
          <div class="icon-box">
            <van-image width="34px" height="34px" :src="require('../../assets/image/people.png')"></van-image>
          </div>
          <p class="organization-right">由David Williams创办的投资由David</p>
        </div>
        <div class="organization-list" v-show="organizationShow">
          <div class="icon-box">
            <van-image width="34px" height="34px" :src="require('../../assets/image/people.png')"></van-image>
          </div>

          <p class="organization-right">由David</p>
        </div>
        <div class="more" v-if="!organizationShow" @click="organizationMore">查看更多</div>
      </div>
      <!--路线 -->
      <div class="steps-box">
        <h3>发展路程和路线</h3>
        <div class="step-box">
          <van-steps direction="vertical" :active="0" active-icon="stop-circle" inactive-icon="stop-circle">
            <van-step>
              <div class="step-item">
                <div class="step-time">
                  <span>2021年10月16日</span>
                </div>
                <p>
                  据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有
                </p>
              </div>
            </van-step>
            <van-step>
              <div class="step-item">
                <div class="step-time">
                  <span>2021年10月16日</span>
                </div>
                <p>
                  据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有
                </p>
              </div>
            </van-step>
            <van-step>
              <div class="step-item">
                <div class="step-time">
                  <span>2021年10月16日</span>
                </div>
                <p>
                  据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有
                </p>
              </div>
            </van-step>
          </van-steps>
        </div>
      </div>
      <!-- 相关链接 -->
      <div class="link-box">
        <h3>相关链接</h3>
        <div class="link-item">
          <a class="link" href="https://bitcoin.org">
            <van-image width="21px" height="21px" :src="require('../../assets/image/首页@2x.png')"></van-image>
            <span>官网</span>
          </a>
          <a class="link" href="http://www.bitcoin.org/bitcoin.pdf">
            <van-image width="18px" height="22px" :src="require('../../assets/image/指标白皮书@2x.png')"></van-image>
            <span>白皮书</span>
          </a>
          <a class="link" href="https://www.facebook.com/buy.bitcoin.news">
            <van-image width="13px" height="22px" :src="require('../../assets/image/facebook@2x.png')"></van-image>
            <span>Facebook</span>
          </a>
          <a
            class="link"
            href="http://blockchain.info
https://live.blockcypher.com/btc
https://blockchair.com/bitcoin
https://explorer.viabtc.com/btc
https://btc.com/en"
          >
            <van-image width="22px" height="21px" :src="require('../../assets/image/bg-ie-browser@2x.png')"></van-image>
            <span>区块链</span>
          </a>
          <a class="link" href="https://www.reddit.com/r/Bitcoin">
            <van-image width="25px" height="21px" :src="require('../../assets/image/reddit@2x.png')"></van-image>
            <span>Reddit</span>
          </a>
          <a class="link" href="https://twitter.com/BTCTN">
            <van-image width="25px" height="21px" :src="require('../../assets/image/emi纸飞机@2x.png')"></van-image>
            <span>Twitter</span>
          </a>
        </div>
      </div>
      <!-- 声明 -->
      <div class="shengming">
        [免责声明]Token100所提供信息之目的在于方便用户操作，而非用户进行交易决策或交易相关操作之依据。用户应对独立作出交易或与交易相关操作的决策，Token100对于声明称依据上述信息所做交易以及交易相关的其他操作之决策导致的损失均不会以任何形式承担任何责任。简况信息如有缺失或错误，欢迎联系我们修正。
      </div>
    </div>
    <!-- 持币 -->
    <div class="cash-box" v-if="active === 3">
      <div class="cash-num">
        <h3>持币情况</h3>
        <div class="line-1">
          <div class="txt-left">
            <span>持币地址数</span>
            <span>39228597</span>
          </div>
          <div class="txt-right">2021-12-13 18：34</div>
        </div>
        <div class="line-2">
          <div class="txt-left">
            <span>持币前10名</span>
            <span>39228597</span>
          </div>
          <div class="txt-right">
            <span>持币前20名</span>
            <span>39228597</span>
          </div>
        </div>
        <div class="line-2">
          <div class="txt-left">
            <span>持币前50名</span>
            <span>39228597</span>
          </div>
          <div class="txt-right">
            <span>持币前100名</span>
            <span>39228597</span>
          </div>
        </div>
      </div>
      <div class="line-gray"></div>
      <div class="cash-30">
        <h3>BTC前30名持币明细</h3>
        <div class="table-head">
          <van-row type="flex" justify="space-between" cente="center">
            <van-col span="2">#</van-col>
            <van-col span="6">持仓占比</van-col>
            <van-col span="6">
              <div style="text-align: right">持仓数量</div>
            </van-col>
            <van-col span="10">
              <div style="text-align: right; padding-left: 30px">钱包地址</div>
            </van-col>
          </van-row>
        </div>
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in erList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
          >
            <van-col span="2">
              <van-tag color="#E4BC31">{{ item.index }}</van-tag>
            </van-col>
            <van-col span="6" style="text-align: left"> {{ item.money }}% </van-col>
            <van-col span="6" style="text-align: right"> {{ item.money }} </van-col>
            <van-col span="10" style="text-align: right; padding-left: 30px">
              <div>uytuyuy rtuytyuyt tyuyyuiuyt ghjhbvbnm bvbnm, gfdfghgfd ertyi7678i</div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
    <!-- 钱包 -->
    <div class="wallet-box" v-if="active === 4">
      <div class="tab-head">
        <div class="head-left">
          <div class="t-1">#</div>
          <div class="t-2">币种</div>
        </div>
        <div class="head-right">
          <div class="t-3">
            <div>安全性</div>
            <div class="img-box">
              <van-image :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
              <van-image :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
          <div class="t-4">
            <div>星级</div>
            <div class="img-box">
              <van-image :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
              <van-image :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </div>
      </div>
      <van-list>
        <van-cell v-for="(item, index) in list" :key="index" @click="toDetail">
          <div class="item-left">
            <van-tag color="#E4BC31">{{ index + 1 }}</van-tag>
            <div class="info-box">
              <van-image class="info-logo" :src="item.imgurl" />
              <div class="info">
                <div class="info-txt">BTC</div>
                <div class="info-img">
                  <van-image class="p" :src="item.phoneImg" />
                  <van-image class="c" :src="item.chipImg" />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <van-rate v-model="item.value" :size="18" gutter="3px" color="#FAD97E" void-icon="star" void-color="#eee" />
            <div class="right-txt">安全性:中等</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import { rateList } from '@/api/common'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      active: 0,
      timeArr: [
        {
          label: '所有',
          value: 0
        },
        {
          label: '24H',
          value: 1
        },
        {
          label: '1周',
          value: 2
        },
        {
          label: '3月',
          value: 3
        },
        {
          label: '今年',
          value: 4
        },
        {
          label: '一年',
          value: 5
        }
      ],
      tipShow: false,
      chartTime: null,
      chartNum: null,
      myChart: null,
      chartActive: 0,
      rate: 'CNY', // 选择的汇率
      rateArr: [], // 汇率数组
      erList: [
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        },
        {
          index: 1,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 4
        },
        {
          index: 3,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 9
        },
        {
          index: 4,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 1
        },
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        },
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        }
      ],
      teamMoreShow: false, // 团队更多
      organizationShow: false, // 机构更多
      list: [
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 1
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        }
      ]
    }
  },
  mounted() {
    // 获取汇率
    this.rateList()
    this.initChart()
  },
  methods: {
    // 选择汇率
    selectRate(value) {
      this.rate = value
      this.$refs.item.toggle()
    },
    // 获取汇率列表
    rateList() {
      rateList().then(res => {
        this.rateArr = res
      })
    },
    // 查看更多机构
    organizationMore() {
      this.organizationShow = true
    },
    // 查看更多团队
    teamMore() {
      this.teamMoreShow = true
    },
    // 去详情页
    toDetail() {},
    // 点击chart时间选择
    selectTime(value) {
      this.chartActive = value
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    // 搜索页面
    onClickRight() {
      this.$router.push({
        name: 'search'
      })
    },
    initChart() {
      const that = this
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('mychart'))

      var option
      this.result = [
        [1638979200000, 85140300611.68],
        [1639065600000, 87263983461.96],
        [1639152000000, 66799780134.02],
        [1639238400000, 52974988423.97],
        [1639324800000, 86217667968.22],
        [1639411200000, 79687401227.36],
        [1639497600000, 99287346121.66]
      ]
      const xArr = this.result.map(item => {
        return that.$moment(item[0]).format('MM-DD,YYYY')
      })
      const yArr = this.result.map(item => {
        return item[1]
      })
      option = {
        // 提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: false
            },
            type: 'cross'
          },
          showContent: false
        },

        grid: {
          left: '0', // 与容器左侧的距离
          right: '0', // 与容器右侧的距离
          top: '10%', // 与容器顶部的距离
          bottom: '0', // 与容器底部的距离
          borderWidth: 10,
          containLabel: true
        },
        xAxis: {
          // axisPointer:{
          //   show:true
          // },
          snap: true,
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },

          triggerEvent: false,
          data: xArr,
          axisLabel: {
            color: '#ccc',
            fontSize: 10,
            formatter: function(params) {
              return params.replace(',', '\n')
            },
            interval: 1
          }
        },
        yAxis: {
          //  axisPointer:{
          //   show:true
          // },
          scale: true,
          axisTick: {
            show: false // 展示刻度
          },
          axisLine: {
            show: false // 展示边线
          },
          splitLine: {
            show: false // 分割线
          },
          position: 'right',
          type: 'value',
          splitNumber: 2,
          axisLabel: {
            inside: true, // 文字朝向,true里面
            color: '#ccc',
            fontSize: 10,
            formatter: function(value) {
              if (value >= 100000000) {
                return Math.round(value / 100000000) + '亿'
              } else if (value >= 10000) {
                return Math.round(value / 10000) + '万'
              } else {
                return Math.round(value)
              }
            }
          }
        },
        series: [
          {
            data: yArr,
            type: 'line',
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 1,
            itemStyle: {
              color: '#3D8FFD'
            },
            lineStyle: {
              color: '#3D8FFD'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#CEF5FF'
                  },
                  {
                    offset: 1,
                    color: '#CEF5FF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
      option && this.myChart.setOption(option)

      this.myChart.getZr().on('click', params => {
        this.chartClick(params)
      })
    },
    // chart点击事件
    chartClick(params) {
      const pointInPixel = [params.offsetX, params.offsetY]
      // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点。获取点击位置对应的x轴数据的索引值，借助于索引值的获取到其它的信息
      const pointInGrid = this.myChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
      // 点击的坐标点
      const clickIndex = pointInGrid[0]
      // 获取当前点击位置要的数据
      const time = this.result[clickIndex][0]
      this.chartTime = this.$moment(time).format('YYYY-MM-DD')
      this.chartNum = (this.result[clickIndex][1] / 100000000).toFixed(2)
      this.tipShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-head {
  padding: 37px 27px 31px 17px;
  .head-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-top-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      .van-image {
        margin-right: 10px;
      }
      & > span:nth-child(2) {
        color: #333;
        font-size: 40px;
        font-weight: 600;
      }
      & > span:last-child {
        padding-left: 3px;
        font-size: 24px;
        color: #92959c;
      }
    }
    .head-top-right {
      .light {
        border-radius: 23px;
        border: 2px solid #4cb367;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 8px;
        color: #4cb367;
      }
    }
  }
  .head-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .head-bottom-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .line-1 {
        display: flex;
        align-items: center;
        color: #d64d40;
        & > span:first-child {
          font-size: 40px;
        }
        & > span:last-child {
          font-size: 56px;
        }
      }
      .line-2 {
        margin-top: 12px;
        font-size: 26px;
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        & > span:first-child {
          color: #333;
        }
        & > span:last-child {
          color: #d64d40;
        }
      }
      .line-3 {
        margin-top: 19px;
        font-size: 30px;
        & > span:first-child {
          color: #a3a6a7;
        }
        & > span:last-child {
          color: #333333;
        }
      }
    }
    .head-bottom-right {
      margin-top: 8px;
      margin-left: 125px;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .column-left,
      .column-right {
        display: flex;
        flex-direction: column;
        font-size: 22px;
        span {
          line-height: 36px;
        }
      }
      .column-left {
        color: #9799a0;
        align-items: flex-start;
      }
      .column-right {
        align-items: flex-end;

        color: #333333;
      }
    }
  }
}
.line-gray {
  width: 100%;
  height: 19px;
  background: #f3f3f3;
}
.charts {
  border-bottom: 24px solid #f3f3f3;
  padding-bottom: 10px;
  .chart-select {
    padding: 40px 24px 20px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      li {
        text-align: center;
        width: 119px;
        height: 55px;
        line-height: 55px;
        border: 1px solid #eeeeee;
        border-radius: 5px 0px 0px 5px;
      }
      .color-active {
        background: #e4bc31;
        color: #fff;
      }
      .clolor-inactive {
        background: #fff;
        color: #808080;
      }
    }
  }
  .chart-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // width: 100vw;
    // overflow-x: hidden;
    position: relative;
    .tip {
      position: absolute;
      top: 10px;
      left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #939ea9;
      font-size: 0.01rem;
    }
    #mychart {
      width: 100%;
      height: 304px;
      & > div {
        width: 100%;
      }
    }
  }
}
.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .head-left {
    padding-right: 30px;
    width: 597px;
  }
  .head-right {
    height: 100%;
    /deep/ .van-dropdown-menu__bar {
      box-shadow: none;
    }
    /deep/ .van-ellipsis {
      font-size: 16px;
      margin-right: 20px;
    }
    /deep/ .van-dropdown-menu__title {
      color: #909090;
      padding: 0;
      margin-right: 40px;
      z-index: 1000;
      background: #fff;
    }
    .rate-box {
      margin-top: 20px;
      padding: 30px 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 auto;
      .rate-item {
        padding: 15px 20px;
        color: #515a6e;
        text-align: center;
      }
    }
  }
}
.table-head {
  color: #999;
  font-size: 22px;
  padding: 0 28px;
  margin-top: 31px;
  .arrow-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .img-box {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
.list-box {
  padding: 0 28px;
  .list-item {
    border-bottom: 1px solid #eeeeee;
    padding: 22px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      .icon-name-top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span {
          margin-left: 11px;
          overflow: hidden; /* 溢出隐藏 */
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* ...代替隐藏的内容 */
        }
      }
      .bicon-name-bottom {
        margin-top: 6px;
        color: #92959c;
        font-size: 24px;
      }
    }
  }
}
.info-box {
  .info-txt {
    margin-bottom: 3px;
    h3,
    p {
      margin: 0;
    }
    h3 {
      padding-left: 28px;
      font-size: 32px;
      line-height: 45px;
      color: #4a4a4a;
      margin-bottom: 23px;
    }
    & > div {
      margin-left: 28px;
      position: relative;
      span {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #407ceb;
        line-height: 56px;
      }
      p {
        font-size: 26px;
        color: #333333;
        line-height: 56px;
      }
    }
  }
  .info-list {
    border-bottom: 26px solid #f3f3f3;
    .info-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eeeeee;
      font-size: 26px;
      line-height: 88px;
      .item-left {
        padding-left: 33px;
        color: #666;
      }
      .item-right {
        color: #333;
        padding-right: 44px;
      }
    }
  }
  .team-info {
    border-bottom: 29px solid #f3f3f3;
    h3 {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
      margin: 34px 0 34px 30px;
    }
    .team-list {
      margin: 0 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 26px;
      color: #333;
      padding: 25px 0 23px 0;
      .team-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 11px;
        .van-image {
          margin-right: 11px;
        }
      }
      .team-right {
        flex-grow: 1;
        margin-left: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .team-icon {
          margin-left: 15px;
          margin-right: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .team-icon > .van-image:first-child {
          margin-right: 27px;
        }
      }
    }
    .more {
      margin: 22px auto 29px;
      text-align: center;
      color: #999999;
      font-size: 28px;
    }
  }
  .organization-info {
    margin-left: 26px;
    .b-p {
      width: 100%;
      border-top: 1px solid #eeeeee;
    }
    p {
      margin: 0;
    }
    .organization-list {
      border-bottom: 1px solid #eeeeee;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      color: #333;

      padding: 30px 10px 30px 0;
      .organization-right {
        flex-grow: 1;
        line-height: 30px;
      }
      .icon-box {
        margin-right: 48px;
      }
    }
    h3 {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
      margin: 34px 0 34px 30px;
    }
    .more {
      margin: 22px auto 29px;
      text-align: center;
      color: #999999;
      font-size: 28px;
    }
  }
  .steps-box {
    border-bottom: 20px solid #f3f3f3;
    border-top: 17px solid #f3f3f3;
    & > h3 {
      font-size: 32px;
      margin: 34px 0 34px 30px;
      color: #4a4a4a;
    }
    .step-box {
      /deep/.van-step__icon {
        color: #e4bc31;
      }
      /deep/.van-step--vertical {
        padding-bottom: 40px;
        border-bottom: none;
      }
      .step-item {
        color: #333;
        font-size: 26px;
        .step-time {
          margin-bottom: 10px;
        }
        p {
          font-family: PingFangSC-Regular, PingFang SC;
          line-height: 48px;
          margin: 0;
        }
      }
    }
  }
  .link-box {
    h3 {
      margin: 34px 0 20px 30px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
    }
    .link-item {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 19px 35px 0 21px;
      .link {
        width: 20%;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          margin-top: 30px;
          color: #333;
        }
      }
    }
  }
  .shengming {
    background: #f3f3f3;
    padding: 18px 27px 40px 27px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 46px;
  }
}
.cash-box {
  .cash-num {
    margin: 35px 31px 17px 28px;
    h3 {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
    }
    .line-2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      .txt-left,
      .txt-right {
        width: 45%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        & > span:first-child {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        & > span:last-child {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
    }
    .line-1 {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .txt-left {
        width: 45%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        & > span:first-child {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        & > span:last-child {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      .txt-right {
        text-align: right;
        margin-left: 69px;
        color: #bbbbbb;
      }
    }
  }
  .cash-30 {
    margin-bottom: 40px;
    h3 {
      color: #4a4a4a;
      font-size: 32px;
      margin: 19px 0 23px 30px;
    }
    .list-item {
      border-bottom: 1px solid #eeeeee;
      padding: 22px 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
.wallet-box {
  padding: 0 19px 0 28px;
  .tab-head {
  background:#fff;
  z-index:10000;
  border-top: 1px solid #d8d8d8;
  font-size: 22px;
  color: #999;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 33px 19px 0 28px;
  justify-content: space-between;
  .head-left,
  .head-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .t-1 {
    margin-right: 52px;
  }
  .t-3 {
    margin-right: 80px;
  }
  .t-3,
  .t-4 {
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .img-box {
      margin-left: 20px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      .van-image {
        width: 12px;
        height: 6px;
      }
      & > .van-image:first-child {
        margin-bottom: 3px;
        transform: rotate(180deg);
      }
    }
  }
}
  .van-cell {
    padding: 24px 0;
    border-bottom: 1px solid #eee;
    .van-cell__value {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .info-box {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .info-logo {
            margin-left: 18px;
            width: 83px;
            height: 83px;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 19px;
            .info-txt {
              font-size: 28px;
              color: #333;
              font-weight: 500;
              text-align: left;
            }
            .info-img {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              .p {
                margin-right: 5px;
                width: 24px;
                height: 33px;
              }
              .c {
                width: 35px;
                height: 35px;
              }
            }
          }
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .right-txt {
          margin-top: 20px;
          font-size: 28px;
          color: #92959c;
          text-align: right;
        }
      }
    }
  }
}
</style>
