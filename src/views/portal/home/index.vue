<template>
  <div class="home">
    <section class="base-container">
      <div class="base-info__main">
        <div class="base-info">
          <div class="base-info__text__heavy">NFT PRINTER</div>
          <div class="base-info__text">Bring NFTs into reality</div>
        </div>
        <div class="base-container__image-container">
          <img src="~@/assets/home_main.png" alt="home base">
          <div class="base-container__image__decoration" />
        </div>
      </div>
    </section>
    <div class="main-container">
      <section class="surrounding-section">
        <el-row type="flex" class="custom-row">
          <el-col :lg="12">
            <div class="surrounding__image-container">
              <img src="~@/assets/surrounding.png" alt="surrounding">
            </div>
          </el-col>
          <el-col :lg="12" class="flex-top-right">
            <div class="surrounding__info">
              <div class="surrounding__info__title">OUR BUSINESS PARTNER</div>
              <div class="surrounding__info__btn-container">
                <el-button class="surrounding__info__btn" @click="$router.push('/printer')">Join us</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      <section class="desc-section">
        <div class="desc__title">
          Why use NFT Printer
        </div>
        <div class="desc__main">
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
          />
        </div>
      </section>
      <section class="provide-section">
        <el-row :gutter="58" class="provide__row">
          <el-col :lg="12">
            <div class="provide__main odd">
              <div class="provide__title">
                What are we offering?
              </div>
              <div class="provide__content">
                <p>
                  NFT Printer is a unique platform that provides authentication for digital NFT assets as well as its physical counterpart. Contrary to traditional NFT services, we cover up several areas of the ecosystem and welcome all actors on the market to be a part of our community.
                </p>
                <p>
                  Our service is based on the idea of reproducing your digital NFT asset as a pshysical object, and turn it into a trackable item with its data stored in the blockchain. It is a secure, easy and unique way of NFT services that you won’t find anywhere else.
                </p>
              </div>
            </div>
          </el-col>
          <el-col :lg="12">
            <div class="provide__main even">
              <div class="provide__title">
                What NFT Printer can offer
              </div>
              <div class="provide__content">
                <p>
                  Traditional printing factories only rely on profit-making operations, cannot provide
                  services with transparent information, can only provide products that can be r
                  eproduced, and may infringe on the legal rights of others.
                </p>
                <p>
                  NFT Printer is a 100% blockchain-based project that aims to build an ecosystem
                  for NFT products. All its data will be traceable and open, any ownership and
                  copyright will be respected and protected, all products will be unique and
                  prestigious, and all participants will be part of a privileged group.
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      <section class="latest-news-section">
        <div class="latest-news__title">
          Latest news
        </div>
        <div class="latest-news__main">
          <el-row type="flex" :gutter="40" class="custom-row">
            <el-col :lg="12">
              <div class="latest-news__info">
                <a href="https://www.linkedin.com/posts/nftprinter_nft-nfts-nftcommunity-activity-6930499009845297154-OeyZ?utm_source=linkedin_share&utm_medium=ios_app" target="_blank" class="latest-news__item active">
                  <div class="latest-news__item__image-container">
                    <img src="~@/assets/pentagram.png" alt="pentagram">
                  </div>
                  <div class="latest-news__item__content">
                    <div class="latest-news__item__title">Excited to announce our project that brings up a totally new concept: NFT Printer.</div>
                    <div class="latest-news__item__subtitle">
                      The idea behind NFT Printer is to bridge the gap between reality and the NFT digital world. Our ambition is to create a complete and decentralized ecosystem that includes owners and creators in the one end, and industrial organisations in the other. And we make this happen in the most basic way possible - by printing NFT assets.
                      Sounds excited? The project is now in the startup phase and is cooperating with ChromaWay. Stay tuned!
                    </div>
                  </div>
                </a>
              </div>
            </el-col>
            <el-col :lg="12">
              <div class="latest-news__image-container">
                <img src="~@/assets/last_news.png" alt="last news">
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'Home',
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        language: 'en',
        loop: false,
        preload: 'auto',
        aspectRatio: '4:2',
        fluid: true,
        sources: [
          {
            src: require('@/assets/home_video.mp4'),
            type: 'video/mp4'
          }
        ],
        poster: require('@/assets/video_cover.png'),
        notSupportedMessage: 'This video is currently unavailable, please try again later',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.home.device
    },
    isDesktop() {
      return this.device === 'desktop'
    }
  },
  watch: {
    isDesktop(newVal, oldVal) {
      if (!newVal) return

      this.addHeaderCustomClass()
    }
  },
  mounted() {
    this.addHeaderCustomClass()
  },
  beforeRouteLeave(to, from, next) {
    const portalHeader = document.querySelector('.portal-header')
    portalHeader.setAttribute('class', portalHeader.getAttribute('class').replace('custom-header', '').trim())
    next()
  },
  methods: {
    addHeaderCustomClass() {
      const portalHeader = document.querySelector('.portal-header')
      if (portalHeader && !portalHeader.classList.contains('custom-header')) {
        portalHeader.setAttribute('class', portalHeader.getAttribute('class').concat(' custom-header'))
      }
    }
  }
}
</script>

<style lang="scss">
@import './video.scss';

// .custom-header {
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 99;
//   width: 100%;
//   text-align: center;
// }
</style>
<style lang="scss" scoped>
@mixin title {
  @include font-size-very-large;
  @include special-font-family;
  line-height: $fontLineHeightLarge;
  text-align: center;
}
.base-container {
  position: relative;
  background: 0px 0px url("~@/assets/layout_bg.png") #fff repeat;
  background-size: 100%;
  &__image-container {
    width: 740px;
    img {
      width: 100%;
      position: relative;
      z-index: 2;
    }
  }
  &__image__decoration {
    height: 152px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 24.5945%;
    z-index: 1;
    &::before {
      content: '';
      height: 117px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: $backgroundColorDecor;
    }
    &::after {
      content: '';
      height: 35px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: $backgroundColorPrimary;
    }
  }
  .base-info {
    @include special-font-family;
    padding-top: 204px;
    color: $colorLowSpecialPrimary;
    flex: 1;
    margin-right: 55px;
    &__main {
      width: 1324px;
      margin: 0 auto;
      display: flex;
    }
    &__text, &__text__heavy {
      box-sizing: border-box;
    }
    &__text {
      @include font-size-ceil-large;
      &__heavy {
        font-size: 68px;
        line-height: 96px;
      }
    }
  }
}
.main-container {
  padding: 0 238px;
  // width: 1444px;
  margin: 0 auto;
  box-sizing: border-box;
}
.surrounding {
  &-section {
    padding: 86px 52px 0 94px;
    overflow: auto;
  }
  &__image-container {
    width: 88.923%;
    padding-bottom: 63.6094%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  &__info {
    padding-left: 16px;
    padding-top: 88px;
    &__title {
      @include special-font-family;
      width: 450px;
      color: $colorPrimary;
      font-size: 50px;
      line-height: 68px;
      margin: 0 0 0 auto;
      text-align: right;
    }
    &__btn-container {
      margin-top: 39px;
      text-align: right;
    }
    &__btn {
      @include special-font-family;
      font-size: 52px;
      align-items: center;
      width: 290px;
      color: white;
      font-weight: 400;
      position: relative;
      z-index: 2;
      border: none;
      background: transparent;
      transition: text-shadow .2s;
      ::before {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 23px;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        background: linear-gradient(to left, $backgroundColorDecor, #87D3C6, #A2D6CD, $backgroundColorDecor);
        // animation: bg-move 0.3s linear infinite;
        animation-play-state: paused;
      }
      &:hover {
        text-shadow: 0 0 10px white;
      }
      &:hover ::before {
        animation-play-state: running;
      }
    }
  }
}
.flex-top-right {
  align-items: start!important;
  justify-content: right;
}
.el-link.el-link--primary.is-underline:hover:after {
  border-color: $borderColorSmart;
}
.desc {
  &-section {
    padding-top: 95px;
    padding-bottom: 85px;
  }
  &__title {
    @include title;
    padding-bottom: 30px;
  }
}
.provide {
  &-section {
    padding: 0px 46px 140px;
    overflow: hidden;
  }
  &__main {
    position: relative;
    padding-top: 15px;
  }
  &__title {
    @include font-size-ceil-large;
    @include special-font-family;
    width: 57.098%;
    height: 49px;
    line-height: 49px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 60px;
    text-align: center;
    z-index: 1;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: $backgroundColorPrimary;
      transform: skew(-55deg);
      z-index: -1;
    }
  }
  &__content {
    font-size: $fontSizeLarge;
    height: 410px;
    color: #fff;
    line-height: 32px;
    padding: 78px 18px 0;
    background-color: $backgroundColorDecor;
    border-radius: $borderRadiusLowBase;
  }
}
.provide__main.odd {
  .provide__title {
    &::before {
      content: '';
      background-color: $backgroundColorPrimary;
    }
  }
  .provide__content {
    background-color: $backgroundColorDecor;
  }
}
.provide__main.even {
  .provide__title {
    &::before {
      content: '';
      background-color: $backgroundColorDecor;
    }
  }
  .provide__content {
    background-color: $backgroundColorPrimary;
  }
}
.layout {
  &__image-container {
    width: 100%;
    padding-bottom: 56.26%;
    position: relative;
    margin-bottom: 20px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &__desc {
    @include font-size-low-medium;
    @include regular-font-family;
    p {
      padding-bottom: 10px;
    }
  }
}
.custom-row {
  .el-col {
    display: flex;
    align-items: center;
  }
}
.latest-news {
  &-section {
    padding: 0 64px;
    margin-bottom: 127px;
    overflow: hidden;
  }
  &__title {
    @include title;
    padding-bottom: 60px;
  }
  &__info {
    width: 100%;
    padding-top: 42px;
    padding-bottom: 10px;
  }
  &__item {
    display: flex;
    padding: 18px 40px 25px;
    background-color: #fff;
    border-radius: 25px;
    margin-bottom: 38px;
    cursor: pointer;
    transition: all 0.5s;
    &:last-of-type {
      margin-bottom: 0;
    }
    &__image-container {
      width: 56px;
      height: 56px;
      margin-right: 27px;
      transition: all 0.3s;
      transform: scaleX(0);
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__content {
      flex: 1;
      overflow: hidden;
      > div {
        @include text-ellipsis;
      }
    }
    &__title {
      @include special-font-family;
      @include font-size-large;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 6px;
    }
    &__subtitle {
      @include font-size-medium;
    }
  }
  &__item:hover,&__item.active {
    box-shadow: 0px 3px 6px 1px rgba(120, 205, 203, 0.49);
    .latest-news__item__image-container {
      transform: scaleX(1);
    }
  }
  &__image-container {
    max-width: 470px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}

@keyframes bg-move
{
  0% {
    background: linear-gradient(to left, $backgroundColorDecor, #87D3C6, #A2D6CD, $backgroundColorDecor);
  }
  33% {
    background: linear-gradient(to left, $backgroundColorDecor, $backgroundColorDecor, #87D3C6, #A2D6CD);
  }
  66% {
    background: linear-gradient(to left, #A2D6CD, $backgroundColorDecor, $backgroundColorDecor, #87D3C6);
  }
  100% {
    background: linear-gradient(to left, #87D3C6, #A2D6CD, $backgroundColorDecor, $backgroundColorDecor);
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1679px) {
  .main-container {
    padding: 0 80px;
  }
  .base-container .base-info {
    padding-top: 50px;
  }
  .base-container .base-info__main {
    width: auto;
    justify-content: center;
     .base-info {
      flex: none;
      width: 500px;
    }
    .base-container__image-container {
      width: 550px;
      .base-container__image__decoration {
        height: 113px;
        bottom: 100px;
        &::before {
          height: 80px;
          top: 0px;
        }
      }
    }
  }
  .provide {
    &-section {
      padding: 0px 10px 140px;
    }
    &__title {
      width: 70%;
      font-size: $fontSizeMedium;
    }
    &__content {
      height: 430px;
    }
  }
}

@media only screen and (max-width: 1199px) {
  .main-container {
    padding: 0 80px;
  }
  .base-container .base-info__main {
    width: auto;
    display: block;
  }
  .base-container .base-info {
    padding-top: 50px;
    padding-bottom: 30px;
    text-align: center;

  }
  .base-container__image-container {
    margin: 0 auto;
  }
  .custom-row {
    display: block;
  }
  .latest-news__info {
    margin-bottom: 30px;
  }
  .provide__row {
    .el-col {
      margin-bottom: 30px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .provide {
    &-section {
      padding: 0px 10px 140px;
    }
  }
}
@media only screen and (max-width: 991px) {
  .main-container {
    padding: 0 50px;
  }
  .base-container {
    .base-info {
      margin-right: 0;
      padding-left: 10px;
      padding-right: 10px;
    }
    .base-container__image-container {
      width: 100%;
    }
  }
  .surrounding-section {
    padding: 86px 0 0;
    .surrounding__info {
      text-align: center;
      padding-left: 0;
      &__title {
        width: 100%;
        text-align: center;
      }
      &__btn-container {
        text-align: center;
      }
    }
    .custom-row .el-col {
      justify-content: center;
    }
  }
  .provide {
    &-section {
      padding: 0 10px 50px;
    }
    &__title {
      width: 100%;
      left: 0;
    }
    &__title::before {
      transform: skew(0);
    }
    &__content {
      padding: 60px 18px 30px;
      height: auto;
    }
  }
  .latest-news {
    &__title {
      padding-bottom: 0px;
    }
    &-section {
      padding: 0 10px;
    }
    &__item__image-container {
      display: none;
    }
  }
}
@media only screen and (max-width: 767px) {
  .main-container {
    padding: 0 15px;
  }
  .base-container {
    .base-info {
      padding-bottom: 10px;
    }
  }
  .surrounding-section {
    padding-top: 50px;
  }
  .surrounding__info {
    padding-top: 40px;
  }
  .desc-section {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .provide__row .el-col{
    padding: 15px!important;
  }
  .latest-news__info {
    padding-top: 30px;
  }
  .latest-news-section {
    margin-bottom: 60px;
  }
}
</style>
