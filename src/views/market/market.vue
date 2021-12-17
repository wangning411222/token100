<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
            <van-tab title="关注 "> </van-tab>
            <van-tab title="市值排名"> </van-tab>
            <van-tab title="期货合约"> </van-tab>
            <van-tab title="热搜榜"> </van-tab>
            <van-tab title="历史高位"> </van-tab>
            <van-tab title="涨幅榜"> </van-tab>
            <van-tab title="跌幅榜"> </van-tab>
            <van-tab title="换手率榜"> </van-tab>
            <van-tab title="成交额榜"> </van-tab>
            <van-tab title="新币上市"> </van-tab>
            <van-tab title="概念行情"> </van-tab>
          </van-tabs>
        </div>
        <div class="head-right">
          <van-dropdown-menu>
            <van-dropdown-item :title="rate" v-model="rate" ref="item">
              <div class="rate-box">
                <van-row>
                  <van-col
                    class="rate-item"
                    v-for="(item, index) in rateArr"
                    :key="index"
                    span="8"
                    @click="selectRate(item)"
                    >{{ item.name }}&nbsp;{{ item.value }}</van-col
                  >
                </van-row>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
      <!-- 关注 -->
      <div v-if="active === 0">
        <div class="login-box">
          <van-image width="140px" height="169px" :src="require('../../assets/image/空@2x.png')"></van-image>
          <span>登陆查看更多</span>
          <van-button color="#E4BC31" @click="linkToLogin">立即登陆</van-button>
        </div>
      </div>

      <!-- 市值排名 -->
      <div class="table-head" v-if="active === 1">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>市值 (¥)</div>
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
      <!-- 期货合约 -->
      <div class="table-head" v-if="active === 2">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="10">币种</van-col>
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
      <!-- 热搜榜 -->
        <div class="table-head" v-if="active === 3">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="10">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>全球指数 (¥)</div>
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
            <div style="text-align:right">
              <div>24H热搜指数</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 历史高位 -->
       <div class="table-head" v-if="active === 4">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>全球指数 (¥)</div>
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
              <div>历史高位 (¥)</div>
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
              <div>ath跌幅</div>
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
      <!-- 涨幅榜 -->
      <div class="table-head" v-if="active === 5">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>全球指数 (¥)</div>
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
            <div style="text-align:right">
             24H涨幅
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 跌幅榜 -->
      <div class="table-head" v-if="active === 6">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>全球指数 (¥)</div>
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
            <div style="text-align:right">
             24H涨幅
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 换手率榜 -->
      <div class="table-head" v-if="active === 7">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div style="text-align:right">
             全球指数 (¥)

            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align:right">
            24H额 (¥)

            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align:right">
             24H换手率
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 成交额榜 -->
      <div class="table-head" v-if="active === 8">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="8">币种</van-col>
          <van-col span="8">
            <div style="text-align:left">
         流通量/发行量
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
        </van-row>
      </div>
      <!-- 新币上市 -->
      <div class="table-head" v-if="active === 9">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>全球指数 (¥)</div>
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
              <div>24H涨幅 (¥)</div>
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
            <div style="text-align:right">
              上市时间
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 概念行情 -->
       <div class="table-head" v-if="active === 10">
        <van-row type="flex" justify="space-between" cente="center">
          <van-col span="2">#</van-col>
          <van-col span="10">概念名称</van-col>
          <van-col span="6">
            <div style="text-align:left">
        领涨/领跌
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>24H涨幅 (¥)</div>
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
    </van-sticky>
    <div class="list-box">
      <!-- 市值排名 -->
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
       <van-list v-if="active === 2">
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
          <van-col span="10" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 热搜榜 -->
       <van-list v-if="active === 3">
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
          <van-col span="10" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
          <van-col span="6">
           <fire :num="2"></fire>
          </van-col>
        </van-row>
      </van-list>
      <!-- 历史高位 -->
      <van-list v-if="active ===4">
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
      <!-- 涨幅榜 -->
      <van-list v-if="active ===5">
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
      <!-- 跌幅榜 -->
      <van-list v-if="active ===6">
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
      <!-- 换手率榜 -->
        <van-list v-if="active ===7">
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
      <!-- 成交额榜 -->
      <van-list v-if="active ===8">
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
          <van-col span="8" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <div class="greenprogress">
              <greenprogress :num="30.2"></greenprogress>
              <div>345678909876545678987</div>
            </div>

          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 新币上市 -->
       <van-list v-if="active === 9">
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
      <!-- 概念行情 -->
       <van-list v-if="active === 10">
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
          <van-col span="10" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="6" style="text-align: left">
            <div>5</div>
          </van-col>
          <van-col span="6" style="text-align:right">
           <div>1111</div>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import greenprogress from '@/components/greenprogress'

import fire from '@/components/fire'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 1,
      rate: 'CNY', // 选择的汇率
      rateArr: [
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        }
      ], // 汇率数组
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
      ]
    }
  },
  components: { banner, search, fire, greenprogress },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  methods: {
    // 点击去登陆
    linkToLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 详情
    toDetail() {
      this.$router.push({
        name: 'marketDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  background: #fff;
  box-sizing: border-box;
  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-left{
     width:85%;
    }
    .head-right {
      height: 100%;
      /deep/ .van-dropdown-menu__bar {
        box-shadow: none;
        padding-right: 20px;
      }
      /deep/ .van-ellipsis{
        font-size:16px;
      }
      /deep/ .van-dropdown-menu__title {
        color: #909090;
        padding:0;
        margin-right:40px;
        z-index:1000;
        background:#fff;
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
  .login-box {
    margin: 117px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 37px;
    }
    .van-button {
      border-radius: 8px;
      margin-top: 19px;
      /deep/ .van-button__text {
        color: #fff;
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
      .greenprogress{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        &>div:last-child{
          margin-top:13px;
          color:#333;
          font-size:20px;
        }
      }
    }
  }
}
</style>
