<template>
  <div class="community">
    <section class="base-container">
      <div class="base-container__image-container">
        <img src="~@/assets/community_main.png" alt="community main">
      </div>
    </section>
    <div class="main-container">
      <div class="main__section">
        <div class="main__section__title">Community</div>
        <div class="main__section__content">
          <p>
            The platform is a part of a global community where people from all around the world gather, connect and exchange services and experiences
            regarding NFT. Our platform is in an ever expanding phase and will soon be present in several metaverses.
          </p>
        </div>
      </div>
      <div class="main__section">
        <div class="main__section__title">Join the conversation</div>
        <div class="main__section__content">
          <p>
            Hear what others have to say, and be a part of the conversation about NFT Printer and the community. Connect, share and spread the word!
          </p>
          <div class="contact-container">
            <el-row :gutter="180" class="contact">
              <el-col :lg="12">
                <a href="https://discord.gg/E7xkv2zBsu" target="_blank" class="contact__btn">
                  <div class="contact__text">
                    Discord
                  </div>
                  <div class="contact__icon">
                    <svg-icon icon-class="discord" />
                  </div>
                </a>
              </el-col>
              <el-col :lg="12">
                <a href="https://twitter.com/nft_printer" target="_blank" class="contact__btn">
                  <div class="contact__text">
                    Twitter
                  </div>
                  <div class="contact__icon">
                    <svg-icon icon-class="twitter" />
                  </div>
                </a>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Community'
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
  padding: 80px 300px 102px;
  box-sizing: border-box;
}
.main__section {
  margin-bottom: 167px;
  color: $colorPrimary;
  &:last-of-type {
    margin-bottom: 0;
  }
  &__title {
    @include font-size-very-large;
    @include special-font-family;
    text-align: center;
    margin-bottom: 45px;
  }
  &__content {
    @include font-size-ceil-large;
    @include regular-font-family;
    line-height: 30px;
  }
}
.contact {
  margin-top: 80px;
  text-align: left;
  &-container {
    padding: 0 70px;
  }
  &__btn {
    max-width: 465px;
    display: flex;
    padding: 6px 10px 41px 0;
    align-items: center;
    margin: 0 auto 20px;
    background: 0 0 url("~@/assets/contact_bg.png") #fff no-repeat;
    background-size: cover;
    cursor: pointer;
  }
  &__icon {
    font-size: 82px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__text {
    @include font-size-very-large;
    @include special-font-family;
    color: white;
    margin-left: 50px;
    flex: 1;
  }
}
@media only screen and (max-width: 1679px) {
  .main-container {
    padding: 60px 120px 80px;
  }
}
@media only screen and (max-width: 767px) {
  .main-container {
    padding: 60px 15px 80px;
  }
  .main__section {
    margin-bottom: 80px;
  }
  .contact-container {
    padding: 0;
    overflow-x: hidden;
  }
}
</style>
