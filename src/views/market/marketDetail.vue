<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="$t('market.details')" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 头部信息 -->
    <div class="detail-head" v-if="symbolInfoObj">
      <div class="head-top">
        <div class="head-top-left">
          <van-image width="24px" height="24px" :src="symbolInfoObj.symbolLogoUrl"></van-image>
          <span>{{ symbolInfoObj.symbolCode }}</span>
          <span>{{ symbolInfoObj.symbolName }}</span>
        </div>
        <div class="head-top-right">
          <div class="light">
            <van-image width="11px" height="10px" :src="require('../../assets/image/灯泡@2x.png')"></van-image>
            <div>NO.{{ symbolInfoObj.symbolRank }}</div>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="head-bottom-left">
          <div class="line-1">
            <span>{{ rateCode }}</span>
            <span>{{ symbolInfoObj.priceUsd && cnNumUnti(symbolInfoObj.priceUsd) }}</span>
          </div>
          <div class="line-2">
            <span>≈$ {{ symbolInfoObj.priceUsd && enNumUnti(symbolInfoObj.priceUsd) }}</span>
            <span
              :class="
                symbolInfoObj.priceChange1d && symbolInfoObj.priceChange1d.toString().indexOf('-') >= 0
                  ? 'red'
                  : 'green'
              "
              >{{ symbolInfoObj.priceChange1d }}%</span
            >
          </div>
          <div class="line-3">
            <span>{{ $t('market.marketvalue') }}</span>
            <span>{{ rateCode }}{{ symbolInfoObj.marketCapUsd && cnNumUnti(symbolInfoObj.marketCapUsd) }}</span>
          </div>
        </div>
        <div class="head-bottom-right">
          <div class="column-left">
            <span>{{ $t('market.highest') }} </span>
            <span>{{ $t('market.lowest') }}</span>
            <span>{{ $t('market.amount24h') }} </span>
            <span>{{ $t('market.forehead24h') }}</span>
            <span>{{ $t('market.hand24h') }}</span>
          </div>
          <div class="column-right">
            <span>{{ rateCode }}{{ symbolInfoObj.highPrice1d && cnNumUnti(symbolInfoObj.highPrice1d) }} </span>
            <span>{{ rateCode }}{{ symbolInfoObj.lowPrice1d && cnNumUnti(symbolInfoObj.lowPrice1d) }}</span>
            <span>{{ rateCode }}{{ symbolInfoObj.volumeUsd && cnNumUnti(symbolInfoObj.volumeUsd) }} </span>
            <span>{{ rateCode }}{{ symbolInfoObj.volumeDay && cnNumUnti(symbolInfoObj.volumeDay) }}</span>
            <span>{{ symbolInfoObj && (symbolInfoObj.volumeRate * 100).toFixed(2) }}%</span>
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
            :class="classify === item.value ? 'color-active' : 'color-inactive'"
            @click="selectTime(item.value)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="chart-box">
        <div class="tip" v-show="tipShow">
          <div>{{ chartTime }} 00:00</div>
          <div>
            <span>{{ $t('market.priceofUSdollar') }}:${{ priceUsd }}&nbsp;&nbsp;</span>
            <span>{{ $t('market.RMBprice') }}:{{ rateCode }}{{ priceCN }}&nbsp;&nbsp;</span>
            <span>BTC{{ $t('market.price') }}:${{ priceBtc }}&nbsp;&nbsp;</span>
          </div>
        </div>
        <div id="mychart"></div>
      </div>
    </div>
    <!-- tabs -->
    <div class="head">
      <div class="head-left">
        <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" :ellipsis="false" @click="clickTab">
          <van-tab :title="$t('market.market')"> </van-tab>
          <van-tab :title="$t('market.futurescontract')"> </van-tab>
          <van-tab :title="$t('market.briefing')"> </van-tab>
          <van-tab :title="$t('market.moneyholder')"> </van-tab>
          <van-tab :title="$t('market.wallet')"> </van-tab>
        </van-tabs>
      </div>
      <div class="head-right">
        <van-dropdown-menu v-show="active === 0 || active === 1">
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
    <!-- 行情 -->
    <div class="table-head" v-if="active === 0">
      <van-row type="flex" justify="space-between" cente="center">
        <van-col span="2">#</van-col>
        <van-col span="4" style="padding-right: 5px">{{ $t('market.tradingon') }}</van-col>
        <van-col span="6" style="padding-left: 5px">
          <div class="arrow-box" @click="sorthangqing('changeDaily')">
            <div>{{ $t('market.latestprice') }} ({{ rateCode }})</div>
            <div class="img-box">
              <img v-if="sorthangqingFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sorthangqingFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box" @click="sorthangqing('baseVolume')">
            <div>{{ $t('market.forehead24h') }} ({{ rateCode }})</div>
            <div class="img-box">
              <img v-if="sorthangqingFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sorthangqingFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box" @click="sorthangqing('marketScale')">
            <div>{{ $t('market.percentageturnover') }}</div>
            <div class="img-box">
              <img v-if="sorthangqingFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sorthangqingFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 期货合约 -->
    <div class="table-head" v-if="active === 1">
      <van-row type="flex" justify="space-between" cente="center">
        <van-col span="2">#</van-col>
        <van-col span="6">{{ $t('market.tradingon') }}</van-col>
        <van-col span="8">
          <div class="arrow-box" @click="sorthangqing('changeDaily')">
            <div>{{ $t('market.latestprice') }} ({{ rateCode }})</div>
            <div class="img-box">
              <img v-if="sorthangqingFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sorthangqingFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
        <van-col span="8">
          <div class="arrow-box" @click="sorthangqing('baseVolume')">
            <div>{{ $t('market.forehead24h') }} ({{ rateCode }})</div>
            <div class="img-box">
              <img v-if="sorthangqingFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sorthangqingFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
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
          v-for="(item, index) in hangqingList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toPlatformDetail(item.marketId)"
        >
          <van-col span="2">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index + 1 }}</van-tag>
          </van-col>
          <van-col span="4" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
              <span class="base125">{{ item.marketName }}</span>
            </div>
            <div class="bicon-name-bottom hangqing">{{ item.symbolName }}/{{ item.rateName }}</div>
          </van-col>
          <van-col span="6" style="text-align: right"> {{ enNumUnti(item.lastPrice * rateR) }}</van-col>
          <van-col span="6" style="text-align: right">
            <div>{{ enNumUnti(item.quoteVolume * rateR) }}</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>{{ (item.marketScale * 100).toFixed(2) }}%</div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 期货合约 -->
      <van-list v-if="active === 1">
        <van-row
          class="list-item"
          v-for="(item, index) in hangqingList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toPlatformDetail(item.marketId)"
        >
          <van-col span="2">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index + 1 }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
              <span>{{ item.marketName }}</span>
            </div>
            <div class="bicon-name-bottom base185">{{ item.symbolName }}/{{ item.rateName }}</div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <div>{{ enNumUnti(item.lastPrice * rateR) }}</div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <div>{{ enNumUnti(item.quoteVolume * rateR) }}</div>
          </van-col>
        </van-row>
      </van-list>
    </div>
    <!-- 简况 -->
    <div class="info-box" v-if="active === 2">
      <div v-if="symbolDetailObj">
        <div class="info-txt">
          <h3>{{ $t('market.cashsituation') }}</h3>
          <div>
            <p>
              {{ symbolDetailObj.symbolDetails }}
            </p>
            <span
              ><a :href="symbolDetailObj.symbolExplorerUrls">{{ $t('market.lookmore') }}</a></span
            >
          </div>
        </div>
        <div class="info-list">
          <div class="info-item">
            <div class="item-left">{{ $t('market.dateofissue') }}</div>
            <div class="item-right">{{ $moment(symbolDetailObj.symbolIssueDate).format('YYYY-MM-DD hh:mm') }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.alltimehigh') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolPriceMax - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.alltimelow') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolPriceMin - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.circulationmarketvalue') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolMarketCapUsd - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.ranking') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolRank }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.shareglobalmarketcapitalization') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolMarketValue }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.maximumsupply') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolMaxSupply - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.totalsupply') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolTotalSupply - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.totalcirculation') }}</div>
            <div class="item-right">{{ enNumUnti(symbolDetailObj.symbolAvailableSupply - 0) }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.flowrate') }}</div>
            <div class="item-right">
              {{ symbolDetailObj.symbolAvailableSupply - 0 / symbolDetailObj.symbolMaxSupply - 0 }}%
            </div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.corealgorithm') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolAlgorithm }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.consensusmechanism') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolConsensusMechanism }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.listingexchange') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolMarketNum }}</div>
          </div>
          <div class="info-item">
            <div class="item-left">{{ $t('market.numbercoinholdingaddresses') }}</div>
            <div class="item-right">{{ symbolDetailObj.symbolAddress }}</div>
          </div>
        </div>
        <!-- 团队信息 -->
        <div class="team-info" v-if="symbolTeamObj">
          <h3>{{ $t('market.teaminformation') }}</h3>
          <div
            class="team-list"
            v-for="(item, index) in teamMoreShow ? symbolTeamObj.team : symbolTeamObj.team.slice(0, 5)"
            :key="index"
          >
            <div class="team-left">
              <van-image width="39px" height="37px" :src="item.logo"></van-image>
              <div>{{ item.name }}</div>
            </div>
            <div class="team-right">
              <div>{{ item.intro }}</div>
              <div class="team-icon">
                <a :href="item.twitterlink">
                  <van-image
                    width="22px"
                    height="22px"
                    :src="require('../../assets/image/推特_twitter43@2x.png')"
                  ></van-image>
                </a>
                <a :href="item.linkinlink">
                  <van-image width="22px" height="22px" :src="require('../../assets/image/in@2x.png')"></van-image>
                </a>
              </div>
            </div>
          </div>
          <div class="more" v-if="!teamMoreShow" @click="teamMore">{{ $t('market.lookmore') }}</div>
        </div>
        <!-- 投资机构 -->
        <div class="organization-info" v-if="symbolTeamObj">
          <h3>{{ $t('market.institutionalinvestor') }}</h3>
          <div class="b-p"></div>
          <div
            class="organization-list"
            v-for="(item, index) in organizationShow ? symbolTeamObj.agency : symbolTeamObj.agency.slice(0, 5)"
            :key="index"
          >
            <div class="icon-box">
              <van-image width="34px" height="34px" :src="item.logo"></van-image>
            </div>
            <p class="organization-right">
              {{ item.intro }}
            </p>
          </div>
          <div class="more" v-if="!organizationShow" @click="organizationMore">{{ $t('market.lookmore') }}</div>
        </div>
        <!--路线 -->
        <div class="steps-box">
          <h3>{{ $t('market.developmentpathroute') }}</h3>
          <div class="step-box">
            <van-steps direction="vertical" :active="0" active-icon="stop-circle" inactive-icon="stop-circle">
              <van-step v-for="(item, index) in symbolEventList" :key="index">
                <div class="step-item">
                  <div class="step-time">
                    <span>{{ item.eventDate }}</span>
                  </div>
                  <p>
                    {{ item.title }}
                  </p>
                </div>
              </van-step>
            </van-steps>
          </div>
        </div>
        <!-- 相关链接 -->
        <div class="link-box">
          <h3>{{ $t('market.relatedlinks') }}</h3>
          <div class="link-item">
            <a class="link" href="https://bitcoin.org">
              <van-image width="21px" height="21px" :src="require('../../assets/image/首页@2x.png')"></van-image>
              <span>{{ $t('market.officialwebsite') }}</span>
            </a>
            <a class="link" href="http://www.bitcoin.org/bitcoin.pdf">
              <van-image width="18px" height="22px" :src="require('../../assets/image/指标白皮书@2x.png')"></van-image>
              <span>{{ $t('market.whitebook') }}</span>
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
              <van-image
                width="22px"
                height="21px"
                :src="require('../../assets/image/bg-ie-browser@2x.png')"
              ></van-image>
              <span>{{ $t('market.blockchain') }}</span>
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
          {{ $t('market.token100disclaimer') }}
        </div>
      </div>
    </div>
    <!-- 持币 -->
    <div class="cash-box" v-if="active === 3">
      <div v-if="symbolHolderObj">
        <div class="cash-num">
          <h3>{{ $t('market.cashsituation') }}</h3>
          <div class="line-1">
            <div class="txt-left">
              <span>{{ $t('market.numbercoinholdingaddresses') }}</span>
              <span>{{ symbolHolderObj.totalHolders }}</span>
            </div>
            <div class="txt-right">{{ symbolHolderObj.updateTime }}</div>
          </div>
          <div class="line-2">
            <div class="txt-left">
              <span>{{ $t('market.Top10coinholders') }}</span>
              <span>{{ symbolHolderObj.percentageTop10 }}</span>
            </div>
            <div class="txt-right">
              <span>{{ $t('market.Top20coinholders') }}</span>
              <span>{{ symbolHolderObj.percentageTop20 }}</span>
            </div>
          </div>
          <div class="line-2">
            <div class="txt-left">
              <span>{{ $t('market.Top50coinholders') }}</span>
              <span>{{ symbolHolderObj.percentageTop50 }}</span>
            </div>
            <div class="txt-right">
              <span>{{ $t('market.Top100coinholders') }}</span>
              <span>{{ symbolHolderObj.percentageTop100 }}</span>
            </div>
          </div>
        </div>
        <div class="line-gray"></div>
        <div class="cash-30">
          <h3>{{ $t('MARKET.Top30BTCcurrencyholders') }}</h3>
          <div class="table-head">
            <van-row type="flex" justify="space-between" cente="center">
              <van-col span="2">#</van-col>
              <van-col span="6">{{ $t('market.positionof') }}</van-col>
              <van-col span="6">
                <div style="text-align: right">{{ $t('market.positionthenumber') }}</div>
              </van-col>
              <van-col span="10">
                <div style="text-align: right; padding-left: 30px">{{ $t('market.walletaddress') }}</div>
              </van-col>
            </van-row>
          </div>
          <van-list>
            <van-row
              class="list-item"
              v-for="(item, index) in symbolHolderObj.holdersList"
              :key="index"
              type="flex"
              justify="space-between"
              cente="center"
            >
              <van-col span="2">
                <van-tag color="#E4BC31">{{ index }}</van-tag>
              </van-col>
              <van-col span="6" style="text-align: left"> {{ item.percentage }}% </van-col>
              <van-col span="6" style="text-align: right"> {{ item.quantity }} </van-col>
              <van-col span="10" style="text-align: right; padding: 0 30px; overflow: hidden">
                <div>{{ item.address }}</div>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </div>
    </div>
    <!-- 钱包 -->
    <div class="wallet-box" v-if="active === 4">
      <div class="tab-head">
        <div class="head-left">
          <div class="t-1">#</div>
          <div class="t-2">{{ $t('market.currency') }}</div>
        </div>
        <div class="head-right">
          <div class="t-3" @click="sortqianbao('walletSecurity')">
            <div>{{ $t('market.security') }}</div>
            <div class="img-box">
              <img v-if="sortqianbaoFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sortqianbaoFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
          <div class="t-4" @click="sortqianbao('walletStar')">
            <div>{{ $t('market.starlevel') }}</div>
            <div class="img-box">
              <img v-if="sortqianbaoFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sortqianbaoFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <van-list>
        <van-cell v-for="(item, index) in qianbaoList" :key="index" @click="toWalletDetail(item.walletId)">
          <div class="item-left">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index + 1 }}</van-tag>
            <div class="info-box">
              <van-image class="info-logo" :src="item.walletLogo" />
              <div class="info">
                <div class="info-txt">{{ item.walletName }}</div>
                <div class="info-img">
                  <van-image
                    class="p"
                    v-if="item.walletTypes.indexOf('app') >= 0"
                    :src="require('../../assets/image/手机@2x.png')"
                  />
                  <van-image
                    class="c"
                    v-if="item.walletTypes.indexOf('hardware') >= 0"
                    :src="require('../../assets/image/芯片@2x.png')"
                  />
                  <van-image
                    class="p"
                    v-if="item.walletTypes.indexOf('pc') >= 0"
                    :src="require('../../assets/image/pc.png')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <van-rate
              v-model="item.walletStar"
              :size="18"
              gutter="3px"
              color="#FAD97E"
              void-icon="star"
              void-color="#eee"
            />
            <div class="right-txt">{{ $t('market.security') }}:{{ walletSecurity(item.walletSecurity) }}</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client'
import mixin from '@/filters/mixin'
import { rateList } from '@/api/common'
import {
  symbolInfo,
  symbolKline,
  marketTicker,
  symbolDetail,
  symbolTeam,
  symbolEvent,
  symbolHolder,
  walletList
} from '@/api/market'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      timeArr: [
        {
          label: this.$t('market.all'),
          value: 0
        },
        {
          label: '24H',
          value: 1
        },
        {
          label: this.$t('market.aweek'),
          value: 2
        },
        {
          label: this.$t('market.months3'),
          value: 3
        },
        {
          label: this.$t('market.thisyear'),
          value: 4
        },
        {
          label: this.$t('market.year'),
          value: 5
        }
      ],
      tipShow: false,
      chartTime: null,
      priceCN: null,
      priceUsd: null,
      priceBtc: null,
      myChart: null,
      rateArr: [], // 汇率数组
      teamMoreShow: false, // 团队更多
      organizationShow: false, // 机构更多
      qianbaoList: [],
      hangqingList: [],
      symbolId: null,
      symbolInfoObj: null,
      classify: 0,
      result: [], // echart数据
      paramsType: 0,
      sorthangqingFlag1: 0,
      sorthangqingFlag2: 0,
      sorthangqingFlag3: 0,
      symbolDetailObj: null,
      symbolTeamObj: null,
      symbolEventList: [],
      symbolHolderObj: null,
      sortqianbaoFlag1: 0,
      sortqianbaoFlag2: 0,
      rateR: null,
      rate: null,
      rateCode: null
    }
  },

  mixins: [mixin],
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  mounted() {
    this.symbolId = this.$route.query.id
    // 获取币种详情
    this.symbolInfo()
    this.myChart = echarts.init(document.getElementById('mychart'))
    this.initChart()
    // 获取K线
    this.symbolKline()
    // 获取行情列表
    this.marketTicker()
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
      this.socket = io.connect(`http://43.252.160.205:9093?symbolId=${that.symbolId}&languageId=${languageid}&current=1&size=100&type=${that.paramsType}`, opts)
      this.socket.on('symbolTicker', function(data) {
        const sockData = JSON.parse(data)
        if (that.hangqingList.length) {
          if (JSON.stringify(that.hangqingList) === JSON.stringify(sockData)) {
            return
          } else {
            that.hangqingList = sockData.data
          }
        }
      })
    },
    walletSecurity(value) {
      switch (value) {
        case 1:
          return this.$t('market.low')
        case 2:
          return this.$t('market.lower')
        case 3:
          return this.$t('market.medium')
        case 4:
          return this.$t('market.higher')
        case 5:
          return this.$t('market.high')
      }
    },
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // 去平台详情页
    toPlatformDetail(id) {
      this.$router.push({
        path: '/platformDeatil',
        query: {
          id
        }
      })
    },
    // 去钱包详情
    toWalletDetail(id) {
      this.$router.push({
        path: '/walletDetail',
        query: {
          id
        }
      })
    },
    // 钱包排序
    sortqianbao(key) {
      if (key === 'walletSecurity') {
        this.sortqianbaoFlag1++
        if (this.sortqianbaoFlag1 === 1) {
          this.qianbaoList.sort((a, b) => {
            return a['walletSecurity'] - b['walletSecurity']
          })
        } else if (this.sortqianbaoFlag1 === 2) {
          this.qianbaoList.sort((a, b) => {
            return b['walletSecurity'] - a['walletSecurity']
          })
        } else {
          this.qianbaoList.sort((a, b) => {
            return a - b
          })
          this.sortqianbaoFlag1 = 0
        }
      } else {
        this.sortqianbaoFlag2++
        if (this.sortqianbaoFlag2 === 1) {
          this.qianbaoList.sort((a, b) => {
            return a['walletStar'] - b['walletStar']
          })
        } else if (this.sortqianbaoFlag2 === 2) {
          this.qianbaoList.sort((a, b) => {
            return b['walletStar'] - a['walletStar']
          })
        } else {
          this.qianbaoList.sort((a, b) => {
            return a - b
          })
          this.sortqianbaoFlag2 = 0
        }
      }
    },
    // 钱包列表
    walletList() {
      const data = {
        symbolId: this.symbolId
      }
      walletList(data).then(res => {
        this.qianbaoList = res
      })
    },
    // 持币
    symbolHolder() {
      const data = {
        symbolId: this.symbolId
      }
      symbolHolder(data).then(res => {
        this.symbolHolderObj = res
      })
    },
    // 发展历程
    symbolEvent() {
      const data = {
        symbolId: this.symbolId
      }
      symbolEvent(data).then(res => {
        this.symbolEventList = res
      })
    },
    // 获取团队
    symbolTeam() {
      const data = {
        symbolId: this.symbolId
      }
      symbolTeam(data).then(res => {
        this.symbolTeamObj = res
      })
    },
    // 行情排序
    sorthangqing(key) {
      if (key === 'changeDaily') {
        this.sorthangqingFlag1++
        if (this.sorthangqingFlag1 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['changeDaily'] - b['changeDaily']
          })
        } else if (this.sorthangqingFlag1 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['changeDaily'] - a['changeDaily']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag1 = 0
        }
      } else if (key === 'baseVolume') {
        this.sorthangqingFlag2++
        if (this.sorthangqingFlag2 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['baseVolume'] - b['baseVolume']
          })
        } else if (this.sorthangqingFlag2 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['baseVolume'] - a['baseVolume']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag2 = 0
        }
      } else {
        this.sorthangqingFlag3++
        if (this.sorthangqingFlag3 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['marketScale'] - b['marketScale']
          })
        } else if (this.sorthangqingFlag3 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['marketScale'] - a['marketScale']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag3 = 0
        }
      }
    },
    // tabs点击事件
    clickTab(value) {
      this.socket.close()
      if (value === 0) {
        this.paramsType = 0
        this.marketTicker()
        this.initSocket()
      } else if (value === 1) {
        this.paramsType = 1
        this.marketTicker()
        this.initSocket()
      } else if (value === 2) {
        this.symbolDetail()
        this.symbolTeam()
        this.symbolEvent()
      } else if (value === 3) {
        this.symbolHolder()
      } else {
        this.walletList()
      }
    },
    // 获取简况
    symbolDetail() {
      const data = {
        symbolId: this.symbolId
      }
      symbolDetail(data).then(res => {
        this.symbolDetailObj = res
      })
    },
    // 获取行情,合约列表
    marketTicker() {
      const data = {
        current: 1,
        size: 100,
        symbolId: this.symbolId,
        type: this.paramsType
      }
      marketTicker(data).then(res => {
        this.hangqingList = res.records
      })
    },
    // K线请求接口
    symbolKline() {
      const data = {
        symbolId: this.symbolId,
        classify: this.classify
      }
      symbolKline(data).then(res => {
        this.result = res
        this.initChart()
      })
    },
    // 币种详情
    symbolInfo() {
      const data = {
        symbolId: this.symbolId
      }
      symbolInfo(data).then(res => {
        this.symbolInfoObj = res
      })
    },
    // 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
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
      this.classify = value
      this.symbolKline()
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
      this.tipShow = false
      const that = this
      // 基于准备好的dom，初始化echarts实例

      var option
      const xArr = this.result.map(item => {
        return that.$moment(item.timestamp).format('MM-DD,YYYY')
      })
      const yArr = this.result.map(item => {
        return item.marketcapUsd
      })
      const interval = Math.ceil(this.result.length / 5)
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
          left: '5%', // 与容器左侧的距离
          right: '5%', // 与容器右侧的距离
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
            interval: interval
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
                return Math.round(value / 100000000) + that.$t('market.million')
              } else if (value >= 10000) {
                return Math.round(value / 10000) + that.$t('mamrket.thousand')
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
      this.chartTime = this.$moment(time).format('YYYY-MM-DD HH:mm')
      this.priceUsd = this.result[clickIndex].priceUsd.toFixed(2)
      this.priceCN = this.cnNumUnti(this.result[clickIndex].priceUsd.toFixed(2))
      this.priceBtc = this.result[clickIndex].priceBtc
      this.tipShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-head {
  .red {
    color: #e86d7c;
  }
  .gray {
    color: #939ea9;
  }
  .green {
    color: #00a287;
  }
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
      margin-right: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
       overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
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
        overflow: hidden;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .column-right {
        align-items: flex-start;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
      align-items: flex-start;
      color: #939ea9;
      font-size: 0.01rem;
      transform: scale(0.9);
      text-align: left;
      & > div:first-child {
        margin-bottom: 5px;
      }
      span {
        margin-right: 14px;
      }
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
          flex-grow: 1;
          margin-left: 11px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .base125 {
          max-width: 125px;
        }
      }
      .bicon-name-bottom {
        margin-top: 6px;
        color: #92959c;
        font-size: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .base185 {
        max-width: 185px;
      }
      .hangqing {
        max-width: 125px;
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
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
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
        right: 20px;
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
        max-width: 200px;
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
        .team-icon > a:first-child {
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
    background: #fff;
    z-index: 10000;
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
        img {
          width: 24px;
          height: 28px;
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
