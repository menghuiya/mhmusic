<template>
  <div v-if="sheetData">
    <div class="sheet-bg-box">
      <img class="sheet-bg" :src="sheetData.coverImgUrl" alt="" />
    </div>
    <Nav leftIcon="icon-fanhui" iconColor="#fff" :backStatus="true">
      <template #center>
        <span class="top-title">歌单®</span>
      </template>
      <template #right>
        <i class="iconfont icon-sousuo search top-icon"></i>
        <i class="iconfont icon-gengduo more top-icon"></i>
      </template>
    </Nav>
    <div class="sheet-base">
      <div class="sheet-baseinfo-box">
        <div class="sheet-cover">
          <img class="sheet-cover-img" :src="sheetData.coverImgUrl" alt="" />
          <div class="sheet-cover-count">
            <i class="iconfont icon-bofang2"></i>
            {{ getCounts(sheetData.playCount) }}
          </div>
        </div>
        <div class="sheet-info">
          <div class="sheet-name">
            {{ sheetData.name }}
          </div>
          <div class="sheet-user">
            <img class="user-cover" :src="sheetData.creator.avatarUrl" />
            <div class="user-name">
              {{ sheetData.creator.nickname }}
            </div>
            <div class="user-action">
              <i class="iconfont icon-zengjia"></i>
            </div>
          </div>
          <div class="sheet-desc">
            {{ sheetData.description }}
          </div>
        </div>
      </div>
      <div class="sheet-otherinfo-box">
        <div class="sheet-otherinfo sheet-collet">
          <i class="iconfont icon-zengjiashuzi"></i>
          <span>{{ sheetData.subscribedCount }}</span>
        </div>
        <div class="sheet-otherinfo sheet-comment">
          <i class="iconfont icon-pinglun"></i>
          <span>{{ sheetData.commentCount }}</span>
        </div>
        <div class="sheet-otherinfo sheet-share">
          <i class="iconfont icon-fenxiang"></i>
          <span>{{ sheetData.shareCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/Nav/Nav";
import { getShowNumber } from "@/utils/tool";

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
    const getCounts = (num: number) => {
      return getShowNumber(num);
    };
    return {
      getCounts,
    };
  },
});
</script>

<style lang="scss" scoped>
.sheet-bg-box {
  position: fixed;
  left: 0;
  top: 0;
  height: 6.2rem;
  overflow: hidden;
  z-index: -1;
  .sheet-bg {
    // width: 12rem;
    height: auto;
    filter: blur(40px) brightness(0.6);
    transform: scale(1.2);
  }
}

.top-title {
  color: #fff;
  font-weight: 600;
  transform: scaleY(1.05);
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
        border-radius: 0.25rem;
        filter: drop-shadow(5px 5px 5px #000);
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
        height: 0.8rem;
        line-height: 0.4rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
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
    background-color: #fff;
    width: 7.5rem;
    margin: 0 auto;
    padding: 0.3rem 0.3rem;
    border-radius: 0.85rem;
    box-shadow: 1px 1px 20px #818181;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0.25rem;
    .sheet-otherinfo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      span {
        margin-left: 0.1rem;
        font-size: 0.35rem;
      }
      .iconfont {
        font-size: 0.4rem;
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
