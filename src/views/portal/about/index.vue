<template>
  <div class="about">
    <section class="base-container">
      <div class="base-container__image-container">
        <img src="~@/assets/about_main.png" alt="about main">
      </div>
    </section>
    <div class="main-container">
      <div class="main__section">
        <div class="main__section__title">About us</div>
        <div class="main__section__content">
          The idea behind NFT Printer is to bridge the gap between reality and the NFT digital world. Our ambition is to create a complete and
          decentralized ecosystem that includes owners and creators in the one end, and industrial organisations in the other. And we make this
          happen in the most basic way possible - by printing NFT assets.
        </div>
      </div>
      <div class="main__section">
        <div class="main__section__title">Our Vision</div>
        <div class="main__section__content">
          <p>We strive to connect buyers, sellers, owners, manufacturers, creators and speculators of NFT in a single community. The platform benefits every stakeholder and lets you expand your operation to cover up more areas that the traditional market can offer. As a practitioner in fields that traditionally has been limited to personal interactions, here is your chance to go on-chain and explore a whole new digital market. Or if your business model is an online service that is still offchain, bring it to reality and discover how it feels to hold it in your own hands.</p>
          <p>NFT Printer points the way to a future where NFTs can exist not only as a digital piece of art or memorabilia, but as a physical object in your life. We believe this to be the next evolutionary step in the NFT-industry, as the decentralized web is growing rapidly and people - as well as organizations - all around the world are taking a huge interest in it. Join today and see what role you can play in the NFT market of tomorrow.</p>
        </div>
      </div>
      <div class="main__section team-container">
        <div class="main__section__title">The team</div>
        <div class="main__section__content">
          <div class="main__section__info">
            <el-row :gutter="114">
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/d_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Dasiy.</div>
                  <div class="block-item__subtitle">Founder/Project manager.</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/j_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Jonas.</div>
                  <div class="block-item__subtitle">Tech Advisor.</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/jq_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Wu J.</div>
                  <div class="block-item__subtitle">Team Leader</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/xz_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Xu Z.</div>
                  <div class="block-item__subtitle">Product Manager</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/qr_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Qin R.</div>
                  <div class="block-item__subtitle">Blockchain Dev.</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/lb_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Li B.</div>
                  <div class="block-item__subtitle">Go Dev.</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/lz_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Lu Z.</div>
                  <div class="block-item__subtitle">Frontend Dev.</div>
                </div>
              </el-col>
              <el-col :md="12" :lg="4">
                <div class="block-item">
                  <div class="block-item__image">
                    <div class="block-item__image__container">
                      <el-image :src="require('@/assets/sj_member.png')" class="block-item__image__main">
                        <div slot="placeholder" class="block-item__image__slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="block-item__decoration" />
                  <div class="block-item__title">Sun J.</div>
                  <div class="block-item__subtitle">Backend Dev.</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="main__section__presentation">
            NFT Printer is an international project. With experience in technology and a passion for the NFT market, we value new ideas and strive to ensure quality in every aspect of the product.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.base-container {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  &__image-container {
    width: 100%;
    min-height: 100px;
    padding-bottom: 20.8333%;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.main-container {
  padding: 88px 292px 124px;
  box-sizing: border-box;
  overflow-x: hidden;
}
.main__section {
  margin-bottom: 120px;
  color: $colorPrimary;
  &:last-of-type {
    margin-bottom: 0;
  }
  &__title {
    @include font-size-very-large;
    @include special-font-family;
    text-align: center;
    margin-bottom: 19px;
  }
  &__content {
    @include font-size-ceil-large;
    @include regular-font-family;
    line-height: 32px;
  }
  &__presentation {
    @include regular-font-family;
    font-size: $fontSizeCeilLarge;
  }
}
.block-item {
  @include regular-font-family;
  text-align: center;
  margin-bottom: 48px;
  &__image {
    margin-bottom: 23px;
    overflow: hidden;
    &__container {
      padding-bottom: 100%;
      position: relative;
    }
    &__main {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    &__slot {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $backgroundColorLight;
    }
  }
  &__decoration {
    width: 12px;
    height: 12px;
    position: relative;
    margin: 0 auto 22px;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      width: 1000vw;
      height: 2px;
      transform: translate3d(-50%, -50%, 0);
      background-color: $backgroundColorPrimary;
    }
    &::after {
      content: '';
      width: 12px;
      height: 12px;
      background: 0px 0px url("~@/assets/small_pentagram.png") #fff no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  &__title {
    @include font-size-very-large;
    @include special-font-family;
    margin-bottom: 12px;
  }
  &__subtitle {
    @include font-size-medium;
    height: 44px;
  }
}
.team-container {
  .main__section__info {
    padding: 0 100px;
  }
  .main__section__title {
    margin-bottom: 48px;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1679px) {
  .main__section__info .el-row .el-col{
    width: 33.3333333333%;
  }
}
@media only screen and (max-width: 1679px) {
  .main-container {
    padding: 60px 120px 40px;
  }
}
@media only screen and (max-width: 767px) {
  .main-container {
    padding: 60px 15px 40px;
  }
}
</style>
