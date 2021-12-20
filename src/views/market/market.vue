<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" @click="clickTab">
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
                    @click="selectRate(item.rateC)"
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
          <span>登陆查看更多</span>
          <van-button color="#E4BC31" @click="linkToLogin">立即登陆</van-button>
        </div>
        <div v-else>
          <div class="table-head">
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="2">#</van-col>
              <van-col span="4">币种</van-col>
              <van-col span="7">
                <div class="arrow-box">
                  <div>全球指数</div>
                  <div class="img-box">
                    <van-image
                      style="transform: rotate(180deg); margin-bottom: 2px"
                      width="6px"
                      height="3px"
                      :src="require('../../assets/icon/上下箭头@2x(1).png')"
                    >
                    </van-image>
                    <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')">
                    </van-image>
                  </div>
                </div>
              </van-col>
              <van-col span="7">
                <div class="arrow-box">
                  <div>24H涨幅</div>
                  <div class="img-box">
                    <van-image
                      style="transform: rotate(180deg); margin-bottom: 2px"
                      width="6px"
                      height="3px"
                      :src="require('../../assets/icon/上下箭头@2x(1).png')"
                    >
                    </van-image>
                    <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')">
                    </van-image>
                  </div>
                </div>
              </van-col>
              <van-col span="4"> </van-col>
            </van-row>
          </div>
          <van-list>
            <div class="list-box">
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
                <van-col span="4" class="icon-name">
                  <div class="icon-name-top">
                    <van-image width="18px" height="18px" :src="item.src"></van-image>
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="bicon-name-bottom">Bitcoin</div>
                </van-col>
                <van-col span="7" style="text-align: right"> {{ item.money }}万亿 </van-col>
                <van-col span="7" style="text-align: right">
                  <div>5</div>
                </van-col>
                <van-col span="4" style="text-align: right">
                  <van-image
                    @click="starClick"
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
          <van-col span="6">币种</van-col>
          <van-col span="4">
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
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="9" offset="1">币种</van-col>
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
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="3">#</van-col>
          <van-col span="8" offset='1'>币种</van-col>
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
            <div style="text-align: right">
              <div>24H热搜指数</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 历史高位 -->
      <div class="table-head" v-if="active === 4">
        <van-row type="flex" justify="space-between" align="center">
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
        <van-row type="flex" justify="space-between" align="center">
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
            <div style="text-align: right">24H涨幅</div>
          </van-col>
        </van-row>
      </div>
      <!-- 跌幅榜 -->
      <div class="table-head" v-if="active === 6">
        <van-row type="flex" justify="space-between" align="center">
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
            <div style="text-align: right">24H涨幅</div>
          </van-col>
        </van-row>
      </div>
      <!-- 换手率榜 -->
      <div class="table-head" v-if="active === 7">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="6">
            <div style="text-align: right">全球指数 (¥)</div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H额 (¥)</div>
          </van-col>
          <van-col span="6">
            <div style="text-align: right">24H换手率</div>
          </van-col>
        </van-row>
      </div>
      <!-- 成交额榜 -->
      <div class="table-head" v-if="active === 8">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="8">币种</van-col>
          <van-col span="8">
            <div style="text-align: left">流通量/发行量</div>
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
        <van-row type="flex" justify="space-between" align="center">
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
            <div style="text-align: right">上市时间</div>
          </van-col>
        </van-row>
      </div>
      <!-- 概念行情 -->
      <div class="table-head" v-if="active === 10">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="10">概念名称</van-col>
          <van-col span="6">
            <div style="text-align: left">领涨/领跌</div>
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
      <van-loading v-show="loading" style="width:100%;height:100%;position:absolute;top:200px;text-align:center" color="rgb(228, 188, 49)" />
      <!-- 市值排名 -->
      <div v-if="active === 1">
        <van-list >
          <van-row
            class="list-item"
            v-for="(item, index) in shizhiList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="6" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolCode }}</span>
              </div>
              <div class="bicon-name-bottom">{{ item.symbolName }}</div>
            </van-col>
            <van-col span="4" style="text-align: right"> {{ numUnti(item.symbolMarketCapUsd) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ numUnti(item.priceUsd) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.priceChange1d.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.priceChange1d }}%</div>
            </van-col>
          </van-row>
           <div class="list-more" @click="listMore(active)">点击加载更多</div>
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
            @click="toDetail"
          >
            <van-col span="2" >
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="9" offset="1" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{ item.symbolFullName }}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{ numUnti(item.price) }}</div>
            </van-col>
            <van-col
              span="6"
              style="text-align: right"
              :class="item.percentChange.toString().indexOf('-') >= 0 ? 'red' : 'green'"
            >
              <div>{{ item.percentChange }}%</div>
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
            @click="toDetail"
          >
            <van-col span="3">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="8" offset='1' class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{item.currentPriceUsd}}</div>
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
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ numUnti(item.priceUsd) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{numUnti(item.highPriceAll)}}</div>
            </van-col>
            <van-col span="6" style="text-align: right" :class="item.quoteChange&&item.quoteChange.toString().indexOf('-') >= 0 ? 'red' : 'green'">
              <div>{{item.quoteChange}}</div>
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
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ item.price }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{numUnti(item.volume)}}</div>
            </van-col>
            <van-col span="6" style="text-align: right" :class="item.changePercent&&item.changePercent.toString().indexOf('-') >= 0 ? 'red' : 'green'">
              <div>{{item.changePercent}}%</div>
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
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ item.price }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{numUnti(item.volume)}}</div>
            </van-col>
            <van-col span="6" style="text-align: right" :class="item.changePercent&&item.changePercent.toString().indexOf('-') >= 0 ? 'red' : 'green'">
              <div>{{item.changePercent}}%</div>
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
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ item.price }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{numUnti(item.volume)}}</div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{item.turnoverPercent}}%</div>
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
            @click="toDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="8" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                <span>{{ item.symbolName }}</span>
              </div>
              <div class="bicon-name-bottom">{{item.symbolFullName}}</div>
            </van-col>
            <van-col span="8" style="text-align: right">
              <div class="greenprogress">
                <greenprogress :num="item.circulateAmount"></greenprogress>
                <div>{{item.totalSupply}}</div>
              </div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{numUnti(item.volume)}}</div>
            </van-col>
          </van-row>
        </van-list>
      </div>

      <!-- 新币上市 -->
      <div v-if="active === 9">
        <van-list>
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
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
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
      </div>

      <!-- 概念行情 -->
      <div v-if="active === 10">
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in erList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toConceptDetail"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{ item.symbolRank }}</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
            </van-col>
            <van-col span="10">
              <div>{{ item.name }}</div>
            </van-col>
            <van-col span="6" style="text-align: left">
              <div class="gainian">
                <span>AE</span>
                <span class="green">+28.26%</span>
              </div>
              <div class="gainian">
                <span>POE</span>
                <span class="red">-4.26%</span>
              </div>
            </van-col>
            <van-col span="6" style="text-align: right">
              <div>1111</div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/filters/mixin'
import banner from '@/components/banner'
import search from '@/components/search'
import greenprogress from '@/components/greenprogress'
import { rateList } from '@/api/common'
import { symbolRankPage, symbolFuturesPage, symbolHotList, symbolHignList, symbolSortList, symbolChangeList, symbolVolumeList } from '@/api/market'
import fire from '@/components/fire'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 1,
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
      loading: false,
      shizhicurrent: 1,
      shizhisize: 100,
      shizhiList: [],
      qihuoList: [],
      resouList: [],
      lishigaoweiList: [],
      zhangfuList: [],
      huanshouList: [],
      chengjiaoeList: []

    }
  },
  mixins: [mixin],
  components: { banner, search, fire, greenprogress },
  computed: {
    ...mapGetters(['userName', 'isLogin'])
  },
  mounted() {
    // 获取汇率
    this.rateList()
    // 获取市值排名列表
    this.symbolRankPage()
  },
  methods: {
    // 成交额榜
    symbolVolumeList() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      symbolVolumeList(data).then(res => {
        console.log(res, 'res``````````````')
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
      }
      console.log(value, 'clickTabclickTabclickTab')
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
      this.rate = value
      this.$refs.item.toggle()
    },
    // 获取汇率列表
    rateList() {
      rateList().then(res => {
        this.rateArr = res
      })
    },
    // 关注点击小星星
    starClick() {
      this.$toast('已取消关注')
    },
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
    },
    // 概念详情
    toConceptDetail() {
      this.$router.push({
        name: 'conceptDetail'
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
    background: #fff;
    z-index: 10000;
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
          justify-content: flex-start;
          align-items: center;

          span {
            margin-left: 11px;
            overflow: hidden; /* 溢出隐藏 */
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* ...代替隐藏的内容 */
             flex-basis: 100px;
          }
        }
        .bicon-name-bottom {
          margin-top: 6px;
          color: #92959c;
          font-size: 24px;
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
