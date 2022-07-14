<template>
  <div class="faq">
    <section class="base-container">
      <div class="base-container__image-container">
        <img src="~@/assets/fqa_main.png" alt="faq main">
      </div>
    </section>
    <div class="main-container">
      <div class="main__title">
        Frequently Asked Questions
      </div>
      <div class="main__content">
        <div class="main__section">
          <div class="main__section__title">Question 1</div>
          <div class="main__section__content">
            <div>What is an NFT?</div>
            <div>NFT (non-fungible token) is a one-of-a-kind, verifiable digital asset that can be exchanged between a creator and a buyer. The one-of-a-kind characteristic is important in distinguishing NFTs from other digital assets; one NFT is not interchangeable for another, like a dollar bill or a share of stock, but is unique and has its own value. The value of an NFT comes from the property it represents, which is generally something that exists in the digital world like an original piece of art or digital memorabilia. The NFT itself doesn’t necessarily contain the digital property, but points to its location on the blockchain. Like a concert ticket or a deed to a physical property, an NFT reflects the value of the thing it represents.</div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 2</div>
          <div class="main__section__content">
            <div>What is the NFT Printer project?</div>
            <div>As NFTs are getting more and more popular, we as a group of NFT lovers can often feel the strong conflicts between popularity and isolation. So we got the idea of NFT Printer to break the boundary between the NFT digital world and the real physical world and prosper the NFT industry by protecting and benefiting NFT assets owners, creators, and lovers in the next level. We will also bring a revolution for the traditional printing industry. All different stakeholders around the NFTs will be considered as a part of our ecosystem. We are simply the bridge between the NFT world and Reality.</div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 3</div>
          <div class="main__section__content">
            <div>What can NFT Printer offer?</div>
            <div>
              1. NFT Printer offers a series of different services and products for different stakeholders in this ecosystem.<br>
              2. NFT owners can get identity confirmation, assets appreciation and rewards.<br>
              3. NFT lovers can get authorized real NFT products and play a natural role in the community.<br>
              4. NFT creators can get full control for their work and be rewarded.<br>
              5. Producers can get access to a much wider and rising consumer group and make profit from authorized NFT arts.<br>
              6. Small businesses can easily get on-chain, earning a much larger market as the pioneer.
            </div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 4</div>
          <div class="main__section__content">
            <div>What makes you different from a traditional printing shop?</div>
            <div>
              NFT Printer is a 100% blockchain born project that aims to build an ecosystem for NFT products. All data will be trackable and open. All ownership and copyrights will be respected and protected. All products will be unique and prestigious. All involvers will be part of the privileged community.<br>
              A traditional printing shop will be running on profit only, not be able to give the same transparency, can only provide replicable products, and can often build their growth on violations for others' legal rights.
            </div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 5</div>
          <div class="main__section__content">
            <div>How do I start earning by my NFT assets?</div>
            <div>
              1. Click the “Register NFT” on our website, and you will get to the page to register your NFT assets.<br>
              2. Connect your wallet. Click “Yes” to authorize in the pop-up window for your wallet.<br>
              3. Your NFT assets should be shown in the list now. Choose the ones you want to authorize to us, and confirm.<br>
              4. Now you should be able to see a reminder that your chosen NFT assets are successfully authorized.<br>
              5. Contact us if you need further assistance.
            </div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 6</div>
          <div class="main__section__content">
            <div>Can I cancel the NFT authorization?</div>
            <div>
              Yes, you can withdraw your authorization at any time. Just go to the page for “Register NFT” and click the “Cancel” button from the NFT asset list for the corresponding NFT assets that you want to cancel.
            </div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 7</div>
          <div class="main__section__content">
            <div>How do I print an NFT product?</div>
            <div>
              <div>1. Click the “NFT Products” on our website.</div>
              <div>
                <p>2. You can now make your NFT product choice in two different ways:</p>
                <div class="indent-block">
                  1. Choose the NFT art that you like, and then choose the product that you want to print it with.<br>
                  2. Choose the physical product that you want first, and then choose the NFT art that you want to be printed with.
                </div>
              </div>
              <div>3. Fill in the order information. Make sure that your address and telephone number are correct.</div>
              <div>4. Make the payment according to the instruction.</div>
            </div>
          </div>
        </div>
        <div class="main__section">
          <div class="main__section__title">Question 8</div>
          <div class="main__section__content">
            <div>What happens next after I have printed products?</div>
            <div>
              1. We will send it by courier to the delivery address you entered when printing.<br>
              2. Taxes and duties are not included normally in our charge. Make sure that you have checked the local tax regulations and custom fees before you order a product.<br>
              3. If you have any questions or changes, contact us and we will contact you as soon as possible.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ'
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
  @include regular-font-family;
  padding: 90px 264px 100px;
  box-sizing: border-box;
  color: $colorPrimary;
}
.main {
  &__title {
    @include font-size-very-large;
    @include special-font-family;
    text-align: center;
    margin-bottom: 60px;
  }
  &__content {
    @include font-size-ceil-large;
    @include regular-font-family;
    line-height: 30px;
  }
  &__section {
    padding-top: 30px;
    margin-bottom: 82px;
    position: relative;
    &:last-of-type {
      margin-bottom: 0
    }
    &__title {
      @include font-size-ceil-large;
      height: 58px;
      line-height: 58px;
      margin-bottom: 30px;
      padding: 0 35px;
      position: absolute;
      top: 0;
      left: 28px;
      background-color: white;
      border-radius: $borderRadiusLowBase;
    }
    &__content{
      padding: 64px 36px 38px;
      border-radius: $borderRadiusLowBase;
      & > div {
        margin-bottom: 40px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    &:nth-of-type(odd) {
      .main__section__title {
        border: 1px solid $borderColorBrightPrimary;
      }
      .main__section__content {
        border: 1px solid $borderColorSpecialPrimary;
      }
    }
    &:nth-of-type(even) {
      .main__section__title {
        border: 1px solid $borderColorSpecialPrimary;
      }
      .main__section__content {
        border: 1px solid $borderColorBrightPrimary;
      }
    }
  }
}
.indent-block {
  padding: 10px 0px 10px 40px;
}
@media only screen and (max-width: 1679px) {
  .main-container {
    padding: 60px 120px 100px;
  }
}
@media only screen and (max-width: 767px) {
  .main-container {
    padding: 60px 15px 100px;
  }
  .main__section {
    margin-bottom: 60px;
  }
  .main__section__content {
    padding: 45px 15px 20px;
  }
}
</style>
