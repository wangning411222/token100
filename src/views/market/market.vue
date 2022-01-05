<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" @click="clickTab">
            <van-tab :title="$t('market.follow')"> </van-tab>
            <van-tab :title="$t('market.marketvaluelist')"> </van-tab>
            <van-tab :title="$t('market.futurescontract')"> </van-tab>
            <van-tab :title="$t('market.hot')"> </van-tab>
            <van-tab :title="$t('market.historichigh')"> </van-tab>
            <van-tab :title="$t('market.performer')"> </van-tab>
            <van-tab :title="$t('market.droplist')"> </van-tab>
            <van-tab :title="$t('market.turnoverratelist')"> </van-tab>
            <van-tab :title="$t('market.turnoverlist')"> </van-tab>
            <van-tab :title="$t('market.newlisting')"> </van-tab>
            <van-tab :title="$t('market.conceptofmarket')"> </van-tab>
          </van-tabs>
        </div>
        <div class="head-right">
          <van-dropdown-menu>
            <van-dropdown-item :title="rate" v-model="rate" ref="item">
              <div class="rate-box">
                <van-row>
                  <van-col
                    class="rate-item"
                    v-for="(item, index) in globalRateArr"
                    :key="index"
                    span="8"
                    @click="selectRate(item)"
                    >{{ item.rateName }}&nbsp;{{ item.rateC }}</van-col
                  >
                </van-row>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
      <!-- 关注 -->
      <div v-if="active === 0">
        <div class="login-box" v-if="!isLogin">
          <van-image width="140px" height="169px" :src="require('../../assets/image/空@2x.png')"></van-image>
          <span>{{ $t('market.logintoseemore') }}</span>
          <van-button color="#E4BC31" @click="linkToLogin">{{ $t('market.loginnow') }}</van-button>
        </div>
        <div v-else>
          <div class="table-head">
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="2">#</van-col>
              <van-col span="4">{{ $t('market.currency') }}</van-col>
              <van-col span="7">
                <div class="arrow-box" @click="sortguanzhu('symbolMarketCapUsd')">
                  <div>{{ $t('market.globalindex') }}</div>
                  <div class="img-box">
                    <img v-if="sortguanzhuFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                    <img v-else-if="sortguanzhuFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                    <img v-else src="../../assets/icon/arrow_2.png" alt="" />
                  </div>
                </div>
              </van-col>
              <van-col span="7">
                <div class="arrow-box" @click="sortguanzhu('priceChange1d')">
                  <div>24H{{ $t('market.amountofincrease') }}</div>
                  <div class="img-box">
                    <img v-if="sortguanzhuFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                    <img v-else-if="sortguanzhuFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                    <img v-else src="../../assets/icon/arrow_2.png" alt="" />
                  </div>
                </div>
              </van-col>
              <van-col span="4"> </van-col>
            </van-row>
          </div>
          <div v-if="!guanzhuList.length">
            <noData></noData>
          </div>
          <van-list v-else>
            <div class="list-box">
              <van-row
                class="list-item"
                v-for="(item, index) in guanzhuList"
                :key="index"
                type="flex"
                justify="space-between"
                cente="center"
              >
                <van-col span="2">
                  <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
                  <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
                  <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
                  <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
                </van-col>
                <van-col span="4" class="icon-name">
                  <div class="icon-name-top">
                    <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                    <span class="base125">{{ item.symbolCode }}</span>
                  </div>
                  <div class="bicon-name-bottom base125">{{ item.symbolFullName }}</div>
                </van-col>
                <van-col span="7" style="text-align: right"> {{ enNumUnti(item.symbolMarketCapUsd * rateR) }} </van-col>
                <van-col span="7" style="text-align: right">
                  <div>{{ (item.priceChange1d * 100).toFixed(2) }}%</div>
                </van-col>
                <van-col span="4" style="text-align: right">
                  <van-image
                    @click="starClick(item.symbolId)"
                    width="15px"
                    height="14px"
                    :src="require('../../assets/image/星星2@2x.png')"
                  ></van-image>
                </van-col>
              </van-row>
            </div>
          </van-list>
        </div>
      </div>

      <!-- 市值排名 -->
      <div class="table-head" v-if="active === 1">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{ $t('market.currency') }}</van-col>
          <van-col span="4">
            <div class="arrow-box" @click="sortshizhi('symbolMarketCapUsd')">
              <div>{{ $t('market.marketvalue') }}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortshizhiFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortshizhiFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortshizhi('priceUsd')">
              <div>{{ $t('market.latestprice') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortshizhiFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortshizhiFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>24H{{ $t('market.amountofincrease') }}</div>
              <div class="img-box" @click="sortshizhi('priceChange1d')">
                <img v-if="sortshizhiFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortshizhiFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 期货合约 -->
      <div class="table-head" v-if="active === 2">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="9" offset="1">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortqihuo('price')">
              <div>{{ $t('market.latestprice') }}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortqihuoFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortqihuoFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortqihuo('percentChange')">
              <div>24H{{ $t('market.amountofincrease') }}</div>
              <div class="img-box">
                <img v-if="sortqihuoFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortqihuoFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 热搜榜 -->
      <div class="table-head" v-if="active === 3">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="3">#</van-col>
          <van-col span="8" offset="1">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortresou('currentPriceUsd')">
              <div>{{ $t('market.globalindex') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortresouFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortresouFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">
              <div>24H{{ $t('market.hotsearchindex') }}</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 历史高位 -->
      <div class="table-head" v-if="active === 4">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortlishi('priceUsd')">
              <div>{{ $t('market.globalindex') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortlishiFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortlishiFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortlishi('highPriceAll')">
              <div>{{ $t('market.historichigh') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortlishiFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortlishiFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortlishi('quoteChange')">
              <div>ath{{ $t('market.rangeofpricedrop') }}</div>
              <div class="img-box">
                <img v-if="sortlishiFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortlishiFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 涨幅榜 -->
      <div class="table-head" v-if="active === 5">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortzhangfu('price')">
              <div>{{ $t('market.globalindex') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortzhangfuFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortzhangfuFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortzhangfu('volume')">
              <div>24H{{ $t('market.limit') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortzhangfuFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortzhangfuFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H{{ $t('market.amountofincrease') }}</div>
          </van-col>
        </van-row>
      </div>
      <!-- 跌幅榜 -->
      <div class="table-head" v-if="active === 6">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortzhangfu('price')">
              <div>{{ $t('market.globalindex') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortzhangfuFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortzhangfuFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortzhangfu('volume')">
              <div>24H{{ $t('market.limit') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortzhangfuFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortzhangfuFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H{{ $t('market.amountofincrease') }}</div>
          </van-col>
        </van-row>
      </div>
      <!-- 换手率榜 -->
      <div class="table-head" v-if="active === 7">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div style="text-align: right">{{ $t('market.globalindex') }} ({{ rateCode }})</div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H{{ $t('market.limit') }} ({{ rateCode }})</div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H{{ $t('market.turnoverrate') }}</div>
          </van-col>
        </van-row>
      </div>
      <!-- 成交额榜 -->
      <div class="table-head" v-if="active === 8">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{ $t('market.currency') }}</van-col>
          <van-col span="10">
            <div style="text-align: left">{{ $t('market.turnover') }}/{{ $t('market.circulation') }}</div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortchengjiao('volume')">
              <div>24H{{ $t('market.limit') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortchengjiaoeFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortchengjiaoeFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 新币上市 -->
      <div class="table-head" v-if="active === 9">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">{{ $t('market.currency') }}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortxinbi('price')">
              <div>{{ $t('market.globalindex') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortxinbiFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortxinbiFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortxinbi('changePercent')">
              <div>24H{{ $t('market.amountofincrease') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortxinbiFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortxinbiFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">{{ $t('market.timetomarket') }}</div>
          </van-col>
        </van-row>
      </div>
      <!-- 概念行情 -->
      <div class="table-head" v-if="active === 10">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="10">{{ $t('market.nameofconcept') }}</van-col>
          <van-col span="6">
            <div style="text-align: left">{{ $t('market.leading') }}/{{ $t('market.ledby') }}</div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortgainian('change_percent')">
              <div>24H{{ $t('market.amountofincrease') }} ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortgainianFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortgainianFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <div class="list-box">
      <van-loading
        v-show="loading"
        style="width: 100%; height: 100%; position: absolute; top: 200px; text-align: center"
        color="rgb(228, 188, 49)"
      />
      <!-- 市值排名 -->
      <div v-if="active === 1">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in shizhiList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="6" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="4" style="text-align: right"> {{ enNumUnti(item.symbolMarketCapUsd * rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.priceUsd * rateR) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.priceChange1d.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.priceChange1d.toFixed(2) }}%</div>
            </van-col>
          </van-row>
          <div class="list-more" v-if="shizhiList.length" @click="listMore(active)">{{ $t('market.clickmore') }}</div>
        </van-list>
      </div>

      <!-- 期货合约 -->
      <div v-if="active === 2">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in qihuoList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="9" offset="1" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span
                  >{{ item.symbolCode }}/<span style="color: #92959c">{{ item.market }}</span></span
                >
              </div>
              <div class="bicon-name-bottom">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.price * rateR) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.percentChange.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.percentChange.toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 热搜榜 -->
      <div v-if="active === 3">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in resouList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="3">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="8" offset="1" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base218">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom resou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.currentPriceUsd * rateR) }}</div>
            </van-col>
            <van-col span="6">
              <fire :num="item.starLevel"></fire>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 历史高位 -->
      <div v-if="active === 4">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in lishigaoweiList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base125">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom huanshou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ enNumUnti(item.priceUsd * rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.highPriceAll * rateR) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.quoteChange && item.quoteChange.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ (item.quoteChange * 100).toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 涨幅榜 -->
      <div v-if="active === 5">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in zhangfuList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base125">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom huanshou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ enNumUnti(item.price * rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.volume * rateR) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.changePercent && item.changePercent.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>+{{ item.changePercent.toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 跌幅榜 -->
      <div v-if="active === 6">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in zhangfuList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base125">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom huanshou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ enNumUnti(item.price * rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.volume * rateR) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.changePercent && item.changePercent.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.changePercent.toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>
      <!-- 换手率榜 -->
      <div v-if="active === 7">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in huanshouList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base125">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom huanshou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ enNumUnti(item.price * rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.volume * rateR) }}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ item.turnoverPercent.toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 成交额榜 -->
      <div v-if="active === 8">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in chengjiaoeList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="6" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base185">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom huanshou">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="10" style="text-align: right">
              <div class="greenprogress">
                <greenprogress :num="(item.circulateAmount / item.totalSupply).toFixed(2) - 0"></greenprogress>
                <div>{{ item.circulateAmount }}/{{ item.totalSupply }}</div>
              </div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ enNumUnti(item.volume * rateR) }}</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 新币上市 -->
      <div v-if="active === 9">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in xinbiList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span class="base100">{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom xinbi-bottom">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              {{ item.price === 0 ? '--' : enNumUnti(item.price * rateR) }}
            </van-col>
            <van-col
              v-if="item.changePercent !== 0"
              span="6"
              style="text-align: right"
              :class="item.changePercent && item.changePercent.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.changePercent.toFixed(2) }}%</div>
            </van-col>
            <van-col v-else span="6" style="text-align: right" class="gray">
              <div>{{ item.changePercent.toFixed(2) }}%</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div v-if="item.day === 0">{{ $t('market.today') }}</div>
              <div v-else-if="item.day === 1">{{ $t('market.yesterday') }}</div>
              <div v-else-if="item.day === 2">{{ $t('market.beforeyesterday') }}</div>
              <div v-else>{{ item.day }}{{ $t('market.daysago') }}</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 概念行情 -->
      <div v-if="active === 10">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in gainianList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toConceptDetail(item.id)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            </van-col>
            <van-col span="10">
              <div>{{ item.name }}</div>
            </van-col>
            <van-col span="6" style="text-align: left">
              <div class="gainian">
                <span>{{ item.best }}</span>
                <span class="green">{{ item.best_percent.toFixed(2) }}%</span>
              </div>
              <div class="gainian">
                <span>{{ item.worst }}</span>
                <span class="red">{{ item.worst_percent.toFixed(2) }}%</span>
              </div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.change_percent && item.change_percent.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.change_percent.toFixed(2) }}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import mixin from '@/filters/mixin'
import banner from '@/components/banner'
import search from '@/components/search'
import noData from '@/components/noData'
import greenprogress from '@/components/greenprogress'
import {
  symbolRankPage,
  symbolFuturesPage,
  symbolHotList,
  symbolHignList,
  symbolSortList,
  symbolChangeList,
  symbolVolumeList,
  symbolNewsList,
  symbolConceptList,
  userSymbolPage,
  userSymbol
} from '@/api/market'
import fire from '@/components/fire'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      rateCode: null,
      active: 1,
      rate: 'CNY', // 选择的汇率
      guanzhuList: [],
      loading: false,
      shizhicurrent: 1,
      shizhisize: 100,
      shizhiList: [],
      qihuoList: [],
      resouList: [],
      lishigaoweiList: [],
      zhangfuList: [],
      huanshouList: [],
      chengjiaoeList: [],
      xinbiList: [],
      gainianList: [],
      sortshizhiFlag1: 0,
      sortshizhiFlag2: 0,
      sortshizhiFlag3: 0,
      sortqihuoFlag1: 0,
      sortqihuoFlag2: 0,
      sortresouFlag1: 0,
      sortlishiFlag1: 0,
      sortlishiFlag2: 0,
      sortlishiFlag3: 0,
      sortzhangfuFlag1: 0,
      sortzhangfuFlag2: 0,
      sortchengjiaoeFlag1: 0,
      sortxinbiFlag2: 0,
      sortxinbiFlag1: 0,
      sortgainianFlag1: 0,
      rateR: 0, // 选择汇率数值
      sortguanzhuFlag1: 0,
      sortguanzhuFlag2: 0,
      socket: null
    }
  },
  mixins: [mixin],
  components: { banner, search, fire, greenprogress, noData },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  mounted() {
    // 获取市值排名列表
    this.symbolRankPage()
    // 初始化页面汇率默认与语言版本有关.英文默认美元汇率,中文默认RMB汇率
    if (this.globalRateArr.length) {
      this.fn()
    }
    this.initSocket()
  },
  watch: {
    globalRateArr: {
      handler(val) {
        val.length && this.fn()
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.socket.close()
  },
  methods: {
    initSocket() {
      const that = this
      var opts = {}
      const languageid = this.languageId === 'CNY' ? 'zh-CN' : 'en-US'
      opts.transports = ['websocket']
      this.socket = io.connect(`http://43.252.160.205:9092?languageId=${languageid}&current=1&size=100`, opts)

      this.socket.on('symbol', function(data) {
        const sockData = JSON.parse(data)
        if (that.shizhiList.length) {
          if (JSON.stringify(that.shizhiList) === JSON.stringify(sockData)) {
            return
          } else {
            that.shizhiList = sockData.data
          }
        }
      })
    },

    // 关注排序
    sortguanzhu(key) {
      if (key === 'symbolMarketCapUsd') {
        this.sortguanzhuFlag1++
        if (this.sortguanzhuFlag1 === 1) {
          this.guanzhuList.sort((a, b) => {
            return a['symbolMarketCapUsd'] - b['symbolMarketCapUsd']
          })
        } else if (this.sortguanzhuFlag1 === 2) {
          this.guanzhuList.sort((a, b) => {
            return b['symbolMarketCapUsd'] - a['symbolMarketCapUsd']
          })
        } else {
          this.guanzhuList.sort((a, b) => {
            return a - b
          })
          this.sortguanzhuFlag1 = 0
        }
      } else {
        this.sortguanzhuFlag2++
        if (this.sortguanzhuFlag2 === 1) {
          this.guanzhuList.sort((a, b) => {
            return a['priceChange1d'] - b['priceChange1d']
          })
        } else if (this.sortguanzhuFlag2 === 2) {
          this.guanzhuList.sort((a, b) => {
            return b['priceChange1d'] - a['priceChange1d']
          })
        } else {
          this.guanzhuList.sort((a, b) => {
            return a - b
          })
          this.sortguanzhuFlag2 = 0
        }
      }
    },
    // 获取关注列表
    userSymbolPage() {
      const data = {
        current: 1,
        size: 100
      }
      userSymbolPage(data).then(res => {
        this.guanzhuList = res.records
      })
    },
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // 概念排序
    sortgainian() {
      this.sortgainianFlag1++
      if (this.sortgainianFlag1 === 1) {
        this.gainianList.sort((a, b) => {
          return a['change_percent'] - b['change_percent']
        })
      } else if (this.sortgainianFlag1 === 2) {
        this.gainianList.sort((a, b) => {
          return b['change_percent'] - a['change_percent']
        })
      } else {
        this.gainianList.sort((a, b) => {
          return a - b
        })
        this.sortgainianFlag1 = 0
      }
    },
    // 新币排序
    sortxinbi(key) {
      if (key === 'price') {
        this.sortxinbiFlag1++
        if (this.sortxinbiFlag1 === 1) {
          this.xinbiList.sort((a, b) => {
            return a['price'] - b['price']
          })
        } else if (this.sortxinbiFlag1 === 2) {
          this.xinbiList.sort((a, b) => {
            return b['price'] - a['price']
          })
        } else {
          this.xinbiList.sort((a, b) => {
            return a - b
          })
          this.sortxinbiFlag1 = 0
        }
      } else {
        this.sortxinbiFlag2++
        if (this.sortxinbiFlag2 === 1) {
          this.xinbiList.sort((a, b) => {
            return a['changePercent'] - b['changePercent']
          })
        } else if (this.sortxinbiFlag2 === 2) {
          this.xinbiList.sort((a, b) => {
            return b['changePercent'] - a['changePercent']
          })
        } else {
          this.xinbiList.sort((a, b) => {
            return a - b
          })
          this.sortxinbiFlag2 = 0
        }
      }
    },
    // 成交额排序
    sortchengjiao(key) {
      this.sortchengjiaoeFlag1++
      if (this.sortchengjiaoeFlag1 === 1) {
        this.chengjiaoeList.sort((a, b) => {
          return a['volume'] - b['volume']
        })
      } else if (this.sortchengjiaoeFlag1 === 2) {
        this.chengjiaoeList.sort((a, b) => {
          return b['volume'] - a['volume']
        })
      } else {
        this.chengjiaoeList.sort((a, b) => {
          return a - b
        })
        this.sortchengjiaoeFlag1 = 0
      }
    },
    // 涨幅排序
    sortzhangfu(key) {
      if (key === 'price') {
        this.sortzhangfuFlag1++
        if (this.sortzhangfuFlag1 === 1) {
          this.zhangfuList.sort((a, b) => {
            return a['price'] - b['price']
          })
        } else if (this.sortzhangfuFlag1 === 2) {
          this.zhangfuList.sort((a, b) => {
            return b['price'] - a['price']
          })
        } else {
          this.zhangfuList.sort((a, b) => {
            return a - b
          })
          this.sortzhangfuFlag1 = 0
        }
      } else {
        this.sortzhangfuFlag2++
        if (this.sortzhangfuFlag2 === 1) {
          this.zhangfuList.sort((a, b) => {
            return a['volume'] - b['volume']
          })
        } else if (this.sortzhangfuFlag2 === 2) {
          this.zhangfuList.sort((a, b) => {
            return b['volume'] - a['volume']
          })
        } else {
          this.zhangfuList.sort((a, b) => {
            return a - b
          })
          this.sortzhangfuFlag2 = 0
        }
      }
    },
    // 历史高位排序
    sortlishi(key) {
      if (key === 'priceUsd') {
        this.sortlishiFlag1++
        if (this.sortlishiFlag1 === 1) {
          this.lishigaoweiList.sort((a, b) => {
            return a['priceUsd'] - b['priceUsd']
          })
        } else if (this.sortlishiFlag1 === 2) {
          this.lishigaoweiList.sort((a, b) => {
            return b['priceUsd'] - a['priceUsd']
          })
        } else {
          this.lishigaoweiList.sort((a, b) => {
            return a - b
          })
          this.sortlishiFlag1 = 0
        }
      } else if (key === 'highPriceAll') {
        this.sortlishiFlag2++
        if (this.sortlishiFlag2 === 1) {
          this.lishigaoweiList.sort((a, b) => {
            return a['highPriceAll'] - b['highPriceAll']
          })
        } else if (this.sortlishiFlag2 === 2) {
          this.lishigaoweiList.sort((a, b) => {
            return b['highPriceAll'] - a['highPriceAll']
          })
        } else {
          this.lishigaoweiList.sort((a, b) => {
            return a - b
          })
          this.sortlishiFlag2 = 0
        }
      } else {
        this.sortlishiFlag3++
        if (this.sortlishiFlag3 === 1) {
          this.lishigaoweiList.sort((a, b) => {
            return a['quoteChange'] - b['quoteChange']
          })
        } else if (this.sortlishiFlag3 === 2) {
          this.lishigaoweiList.sort((a, b) => {
            return b['quoteChange'] - a['quoteChange']
          })
        } else {
          this.lishigaoweiList.sort((a, b) => {
            return a - b
          })
          this.sortlishiFlag3 = 0
        }
      }
    },
    // 热搜榜排名
    sortresou(key) {
      this.sortresouFlag1++
      if (this.sortresouFlag1 === 1) {
        this.resouList.sort((a, b) => {
          return a['currentPriceUsd'] - b['currentPriceUsd']
        })
      } else if (this.sortresouFlag1 === 2) {
        this.resouList.sort((a, b) => {
          return b['currentPriceUsd'] - a['currentPriceUsd']
        })
      } else {
        this.resouList.sort((a, b) => {
          return a - b
        })
        this.sortresouFlag1 = 0
      }
    },
    // 市值排名
    sortshizhi(key) {
      // sortshizhiFlag1 symbolMarketCapUsd 市值排名 sortshizhiFlag2 priceUsd 最新价排名 sortshizhiFlag3 priceChange1d24小时涨幅排名
      if (key === 'symbolMarketCapUsd') {
        this.sortshizhiFlag1++
        if (this.sortshizhiFlag1 === 1) {
          this.shizhiList.sort((a, b) => {
            return a['symbolMarketCapUsd'] - b['symbolMarketCapUsd']
          })
        } else if (this.sortshizhiFlag1 === 2) {
          this.shizhiList.sort((a, b) => {
            return b['symbolMarketCapUsd'] - a['symbolMarketCapUsd']
          })
        } else {
          this.shizhiList.sort((a, b) => {
            return a - b
          })
          this.sortshizhiFlag1 = 0
        }
      } else if (key === 'priceUsd') {
        this.sortshizhiFlag2++
        if (this.sortshizhiFlag2 === 1) {
          this.shizhiList.sort((a, b) => {
            return a['priceUsd'] - b['priceUsd']
          })
        } else if (this.sortshizhiFlag2 === 2) {
          this.shizhiList.sort((a, b) => {
            return b['priceUsd'] - a['priceUsd']
          })
        } else {
          this.shizhiList.sort((a, b) => {
            return a - b
          })
          this.sortshizhiFlag2 = 0
        }
      } else {
        this.sortshizhiFlag3++
        if (this.sortshizhiFlag3 === 1) {
          this.shizhiList.sort((a, b) => {
            return a['priceChange1d'] - b['priceChange1d']
          })
        } else if (this.sortshizhiFlag3 === 2) {
          this.shizhiList.sort((a, b) => {
            return b['priceChange1d'] - a['priceChange1d']
          })
        } else {
          this.shizhiList.sort((a, b) => {
            return a - b
          })
          this.sortshizhiFlag3 = 0
        }
      }
    },
    // 期货合约排名
    sortqihuo(key) {
      if (key === 'percentChange') {
        this.sortqihuoFlag2++
        if (this.sortqihuoFlag2 === 1) {
          this.qihuoList.sort((a, b) => {
            return a['percentChange'] - b['percentChange']
          })
        } else if (this.sortqihuoFlag2 === 2) {
          this.qihuoList.sort((a, b) => {
            return b['percentChange'] - a['percentChange']
          })
        } else {
          this.qihuoList.sort((a, b) => {
            return a - b
          })
          this.sortqihuoFlag2 = 0
        }
      } else {
        this.sortqihuoFlag1++
        if (this.sortqihuoFlag1 === 1) {
          this.qihuoList.sort((a, b) => {
            return a['price'] - b['price']
          })
        } else if (this.sortqihuoFlag1 === 2) {
          this.qihuoList.sort((a, b) => {
            return b['price'] - a['price']
          })
        } else {
          this.qihuoList.sort((a, b) => {
            return a - b
          })
          this.sortqihuoFlag1 = 0
        }
      }
    },
    // 概念详情
    symbolConceptList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolConceptList(data).then(res => {
        this.gainianList = res
        this.loading = false
      })
    },
    // 新币上市
    symbolNewsList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolNewsList(data).then(res => {
        this.xinbiList = res
        this.loading = false
      })
    },
    // 成交额榜
    symbolVolumeList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolVolumeList(data).then(res => {
        this.chengjiaoeList = res
        this.loading = false
      })
    },
    // 换手率list
    symbolChangeList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolChangeList(data).then(res => {
        this.huanshouList = res
        this.loading = false
      })
    },
    // 涨幅跌幅榜
    symbolSortList(value) {
      this.loading = true
      // 1 涨幅 0跌幅
      const data = {
        sort: value,
        current: 1,
        size: 100
      }
      symbolSortList(data).then(res => {
        this.zhangfuList = res
        this.loading = false
      })
    },
    // 历史高位list
    symbolHignList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolHignList(data).then(res => {
        this.lishigaoweiList = res
        this.loading = false
      })
    },
    // 切换tab
    clickTab(value) {
      if (value === 1) {
        this.symbolRankPage()
      } else if (value === 2) {
        this.symbolFuturesPage()
      } else if (value === 3) {
        this.symbolHotList()
      } else if (value === 4) {
        this.symbolHignList()
      } else if (value === 5) {
        this.symbolSortList(1)
      } else if (value === 6) {
        this.symbolSortList(0)
      } else if (value === 7) {
        this.symbolChangeList()
      } else if (value === 8) {
        this.symbolVolumeList()
      } else if (value === 9) {
        this.symbolNewsList()
      } else if (value === 10) {
        this.symbolConceptList()
      } else {
        this.userSymbolPage()
      }
    },
    // 热搜榜list
    symbolHotList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolHotList(data).then(res => {
        this.resouList = res
        this.loading = false
      })
    },
    // 期货合约list
    symbolFuturesPage() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolFuturesPage(data).then(res => {
        this.qihuoList = res.records
        this.loading = false
      })
    },
    // 点击加载更多
    listMore(index) {
      this.shizhicurrent++
      this.symbolRankPage()
    },
    // 获取市值排名列表
    symbolRankPage() {
      this.loading = true
      const data = {
        current: this.shizhicurrent,
        size: this.shizhisize
      }
      symbolRankPage(data).then(res => {
        this.shizhiList = [...this.shizhiList, ...res.records]
        this.loading = false
      })
    },
    // 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
      this.$refs.item.toggle()
    },
    // 关注点击小星星
    starClick(id) {
      userSymbol(id).then(res => {
        this.$toast(this.$t('market.unfollowed'))
        this.userSymbolPage()
      })
    },
    // 点击去登陆
    linkToLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 详情
    toDetail(id) {
      this.$router.push({
        path: '/marketDetail',
        query: {
          id
        }
      })
    },
    // 概念详情
    toConceptDetail(id) {
      this.$router.push({
        path: '/conceptDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  .red {
    color: #e86d7c;
  }
  .gray {
    color: #939ea9;
  }
  .green {
    color: #00a287;
  }
  background: #fff;
  box-sizing: border-box;

  .head {
    background: #fff;
    z-index: 10000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-left {
      padding-right: 30px;
      width: calc(100vw - 152px);
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
    background: #fff;
    z-index: 10000;
    color: #999;
    font-size: 22px;
    padding: 0 28px;
    .arrow-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      white-space: normal;
      .img-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          width: 24px;
          height: 28px;
        }
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
    position: relative;
    margin-bottom: 30px;
    .list-more {
      font-size: 26px;
      text-align: center;
      color: rgb(228, 188, 49);
      line-height: 80px;
      height: 80px;
    }
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
          justify-content: space-between;
          align-items: center;
          span {
            flex-grow: 1;
            margin-left: 11px;
            overflow: hidden; /* 溢出隐藏 */
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* ...代替隐藏的内容 */
          }
          .base125 {
            max-width: 125px;
          }
          .base100 {
            max-width: 100px;
          }
          .base185 {
            max-width: 120px;
          }
          .base218 {
            max-width: 250px;
          }
        }
        .bicon-name-bottom {
          margin-top: 6px;
          color: #92959c;
          font-size: 24px;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .xinbi-bottom {
          max-width: 185px;
        }
        .huanshou {
          max-width: 125px;
        }
        .resou {
          max-width: 250px;
        }
      }
      .gainian {
        span {
          color: #333;
          font-size: 22px;
        }
        .green {
          color: #00a287;
        }
        .red {
          color: #da5949;
        }
      }
      .greenprogress {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        & > div:last-child {
          margin-top: 13px;
          color: #333;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
