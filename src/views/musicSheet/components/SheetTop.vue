<template>
  <Nav
    leftIcon="icon-fanhui"
    iconColor="#fff"
    :backStatus="true"
    :bgImg="TopBg"
    @moreNav="scollerMore"
    @lessNav="scollerLess"
  >
    <template #center>
      <span class="top-title">{{ sheetTitle }}</span>
    </template>
    <template #right>
      <i class="iconfont icon-sousuo search top-icon"></i>
      <i class="iconfont icon-gengduo more top-icon"></i>
    </template>
  </Nav>
  <div>
    <div class="sheet-bg-box" :style="`background-image:url(${TopBg});`">
      <!-- <img class="sheet-bg" :src="TopBg" alt="" /> -->
    </div>

    <div class="sheet-base">
      <div class="sheet-baseinfo-box">
        <div class="sheet-cover">
          <img
            class="sheet-cover-img"
            :src="sheetData.coverImgUrl"
            v-if="sheetData"
          />
          <div class="sheet-cover-img-load" v-else></div>
          <div class="sheet-cover-count">
            <i class="iconfont icon-bofang2"></i>
            {{ sheetData ? getCounts(sheetData.playCount) : 0 }}
          </div>
        </div>
        <div class="sheet-info">
          <div class="sheet-name">
            {{ sheetData ? sheetData.name : "" }}
          </div>
          <div class="sheet-user">
            <img
              class="user-cover"
              :src="sheetData.creator.avatarUrl"
              v-if="sheetData"
            />
            <div class="user-cover-load" v-else></div>
            <div class="user-name">
              {{
                sheetData && sheetData.creator ? sheetData.creator.nickname : ""
              }}
            </div>
            <div class="user-action">
              <i class="iconfont icon-zengjia"></i>
            </div>
          </div>
          <div class="sheet-desc">
            {{ sheetData ? sheetData.description : "" }}
          </div>
        </div>
      </div>
      <div class="sheet-otherinfo-box">
        <div class="sheet-otherinfo sheet-collet">
          <i class="iconfont icon-zengjiashuzi"></i>
          <div class="sheet-num">
            {{ sheetData ? getCounts(sheetData.subscribedCount) : "收藏" }}
          </div>
        </div>
        <div class="sheet-otherinfo sheet-comment">
          <i class="iconfont icon-pinglun"></i>
          <div class="sheet-num">
            {{ sheetData ? getCounts(sheetData.commentCount) : "评论" }}
          </div>
        </div>
        <div class="sheet-otherinfo sheet-share">
          <i class="iconfont icon-fenxiang"></i>
          <div class="sheet-num">
            {{ sheetData ? getCounts(sheetData.shareCount) : "分享" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Nav from "@/components/Nav/Nav";
import { getShowNumber, imgToBlob } from "@/utils/tool";

export default defineComponent({
  name: "index",
  components: {
    Nav,
  },
  props: {
    sheetData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const sheetTitle = ref("歌单®");
    const getCounts = (num: number) => {
      return getShowNumber(num);
    };
    const TopBg = ref("");
    watch(
      () => props.sheetData,
      (newV) => {
        imgToBlob(
          newV.coverImgUrl + "?imageView=1&thumbnail=225x0",
          (blur: any) => {
            TopBg.value = blur;
          },
          100,
          -0.1
        ); // blur
      }
    );

    const scollerMore = () => {
      sheetTitle.value = props.sheetData.name;
    };

    const scollerLess = () => {
      sheetTitle.value = "歌单®";
    };

    // onMounted(() => {});
    return {
      sheetTitle,
      TopBg,
      getCounts,
      scollerMore,
      scollerLess,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.sheet-bg-box {
  position: absolute;
  left: 0;
  top: 0;
  height: 6.2rem;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  transition: background-image 0.4s;
  background: #c8c9cc no-repeat center bottom / cover;
  background-size: cover;
  // .sheet-bg {
  //   width: 10rem;
  //   height: auto;
  //   // filter: blur(40px) brightness(0.6);
  //   // transform: scale(1.2);
  // }
}
.sheet-page {
  .top-nav {
    background: no-repeat center center / cover !important;
    .iconfont {
      color: #fff !important;
    }
  }
}

.top-title {
  color: #fff;
  font-weight: 600;
  transform: scaleY(1.05);
  width: 6rem;
  overflow: hidden;
  height: 0.6rem;
}
.top-icon {
  color: #fff;
  font-size: 0.5rem;
}

.search {
  margin-right: 0.5rem;
}

.sheet-base {
  padding: 0 0.4rem;
  .sheet-baseinfo-box {
    height: 4.5rem;
    display: flex;
    align-items: center;
    .sheet-cover {
      position: relative;
      .sheet-cover-img {
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        background-color: #f4f4f5;
        filter: drop-shadow(5px 5px 5px #000);
      }
      .sheet-cover-img-load {
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        background-color: #f4f4f5;
      }
      .sheet-cover-count {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        padding: 0.05rem 0.1rem;
        background-color: #808080a9;
        border-radius: 1rem;
        font-size: 0.24rem;
        color: #fff;
        .iconfont {
          font-size: 0.24rem;
        }
      }
    }
    .sheet-info {
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.45rem;
      margin-left: 0.5rem;
      overflow: hidden;
      .sheet-name {
        font-size: 0.41rem;
        // font-weight: 600;
        color: #fff;
        letter-spacing: 1px;
        height: 1rem;
        line-height: 0.5rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
        transform: scaleY(1.05);
      }
      .sheet-desc {
        font-size: 0.25rem;
        color: #c8c9cc;
        letter-spacing: 1px;
        height: 0.4rem;
        line-height: 0.4rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
      }
      .sheet-user {
        font-size: 0.25rem;
        color: #c8c9cc;
        display: flex;
        align-items: center;
        .user-cover {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          background-color: #f4f4f5;
        }
        .user-cover-load {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          background-color: #f4f4f5;
        }
        .user-name {
          font-size: 0.25rem;
          letter-spacing: 0.03rem;
          margin-left: 0.2rem;
          line-height: 0.5rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
        }
        .user-action {
          padding: 0.08rem 0.266667rem;
          background: #f4f4f541;
          border-radius: 0.213333rem;
          .iconfont {
            font-size: 0.3rem;
          }
        }
      }
    }
  }
  .sheet-otherinfo-box {
    @include background_color("background_color");
    @include font_color("text-color");
    background-color: #fff;
    width: 7.5rem;
    margin: 0 auto;
    padding: 0.3rem 0.3rem;
    border-radius: 0.85rem;
    // box-shadow: 1px 1px 20px #818181;
    @include user_filter("filter-shadow");
    display: flex;
    align-items: center;
    justify-content: space-around;
    // font-size: 0.25rem;
    .sheet-otherinfo {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .sheet-num {
        margin-left: 0.1rem;
        font-size: 0.3rem;
      }
      .iconfont {
        font-size: 0.5rem;
        // vertical-align: middle;
        // margin-top: 1px;
      }
    }
    .sheet-comment {
      border-right: 0.026667rem solid #c8c9cc;
      border-left: 0.026667rem solid #c8c9cc;
      // padding: 0 0.4rem;
    }
  }
}
</style>
