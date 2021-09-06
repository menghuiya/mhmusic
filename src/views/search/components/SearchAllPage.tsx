import { defineComponent } from "vue";
import "./index.scss";
import { getShowNumber, getFormateData } from "@/utils/tool";

//组件引入区域
import TitleLine from "@/components/TitleLine/TitleLine";
import CellItem from "@/components/Cell/CellItem";
import { CustomEventFuncType, ClickEventFuncType } from "@/utils/types";
export default defineComponent({
  name: "SearchAllPage",
  props: {
    data: Object,
    onMoreClick: Function as CustomEventFuncType<number>,
  },
  emits: ["more-click"],
  setup(props, { emit }) {
    const defaultImg = require("@/assets/images/activ01.png");

    const handleMoreClick: ClickEventFuncType = (id: number) => (e) => {
      emit("more-click", id);
    };
    return () => {
      return (
        <div class="all">
          <div class="all-singersong">
            <TitleLine
              showType="left"
              title="单曲"
              btnName="播放"
              noPadding={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            {props.data && props.data.song
              ? props.data.song.songs.map((item: any) => {
                  return (
                    <CellItem
                      arrow={false}
                      style={{
                        borderTop: "1px solid #ebeef5",
                        padding: "0.25rem 0",
                        margin: "0 0.25rem",
                      }}
                      v-slots={{
                        icon: () => null,
                        title: () => (
                          <div class="all-singersong-music">
                            <div class="all-singersong-music-name">
                              {item.name}
                            </div>
                            <div class="all-singersong-music-author">
                              {item.ar[0].name}-{item.al.name}
                            </div>
                          </div>
                        ),
                        right: () => (
                          <>
                            <i class="iconfont icon-bofangqi all-singersong-music-video"></i>
                            <i class="iconfont icon-gengduo all-singersong-music-more"></i>
                          </>
                        ),
                      }}
                    ></CellItem>
                  );
                })
              : null}
            {props.data && props.data.song && props.data.song.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(1)}>
                <span>{props.data.song.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
          <div class="all-sheet">
            <TitleLine
              showType="left"
              title="歌单"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            {props.data && props.data.playList
              ? props.data.playList.playLists.map((item: any) => {
                  return (
                    <div class="all-sheet-item">
                      <img
                        class="all-sheet-item-cover"
                        src={item.coverImgUrl}
                        alt=""
                      />
                      <div class="all-sheet-item-body">
                        <div class="item-body-name">{item.name}</div>
                        <div class="item-body-info">
                          {item.trackCount}首音乐 by {item.creator.nickname}
                          ，播放
                          {getShowNumber(item.playCount)}次
                        </div>
                        <div class="item-body-other">
                          包含《<span class="item-body-other-color">梦回</span>
                          》
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
            {props.data &&
            props.data.playList &&
            props.data.playList.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(2)}>
                <span>{props.data.playList.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
          <div class="all-video">
            <TitleLine
              showType="left"
              title="视频"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            <div class="video-item">
              <div class="video-item-cover">
                <img class="video-item-cover-img" src={defaultImg} alt="" />
                <i class="iconfont icon-Controls-71"></i>
              </div>
              <div class="video-item-body">
                <div class="video-item-body-name">
                  此接口没有返回视频，暂时无法展示视频数据
                </div>
                <div class="video-item-body-info">
                  05:20 by 梦回，播放3000 万次
                </div>
              </div>
            </div>
            {props.data &&
            props.data.new_mlog &&
            props.data.new_mlog.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(3)}>
                <span>{props.data.new_mlog.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
          <div class="all-singer">
            <TitleLine
              showType="left"
              title="艺人"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            {props.data && props.data.artist
              ? props.data.artist.artists.map((item: any) => {
                  return (
                    <CellItem
                      arrow={false}
                      style={{
                        padding: "0.15rem 0",
                        margin: "0 0.25rem",
                      }}
                      v-slots={{
                        icon: () => (
                          <img
                            class="singer-item-cover"
                            src={item.picUrl}
                            alt=""
                          />
                        ),
                        title: () => (
                          <div>
                            <div class="singer-item-name">
                              {item.name}
                              {item.trans ? `(${item.trans})` : null}
                            </div>
                            <div class="singer-item-fans">粉丝：无数据</div>
                          </div>
                        ),
                        right: () => (
                          <div class="singer-item-btn">
                            <i class="iconfont icon-zengjia singer-item-btn-add"></i>
                            <span>关注</span>
                          </div>
                        ),
                      }}
                    ></CellItem>
                  );
                })
              : null}
            {props.data && props.data.artist && props.data.artist.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(4)}>
                <span>{props.data.artist.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
          <div class="all-ablm">
            <TitleLine
              showType="left"
              title="专辑"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            {props.data && props.data.album
              ? props.data.album.albums.map((item: any) => {
                  return (
                    <CellItem
                      arrow={false}
                      style={{
                        padding: "0.15rem 0",
                        margin: "0 0.25rem",
                      }}
                      v-slots={{
                        icon: () => (
                          <img
                            class="ablm-item-cover"
                            src={item.picUrl}
                            alt=""
                          />
                        ),
                        title: () => (
                          <div>
                            <div class="ablm-item-name">{item.name}</div>
                            <div class="ablm-item-info">
                              {item.artists
                                .map((art: any) => art.name)
                                .join("/")}
                              <span> </span>
                              {getFormateData(item.publishTime)}
                            </div>
                          </div>
                        ),
                      }}
                    ></CellItem>
                  );
                })
              : null}
            {props.data && props.data.album && props.data.album.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(6)}>
                <span>{props.data.album.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
          <div class="all-qurey">
            <TitleLine
              showType="left"
              title="相关搜索"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            <div class="all-qurey-box">
              {props.data && props.data.sim_query
                ? props.data.sim_query.sim_querys.map((item: any) => {
                    return <div class="all-qurey-box-item">{item.keyword}</div>;
                  })
                : null}
            </div>
          </div>
          <div class="all-user">
            <TitleLine
              showType="left"
              title="用户"
              btnName=""
              noPadding={false}
              showLeft={false}
              icon="icon-Controls-71"
              titleStyle={{
                fontSize: "0.4rem",
                letterSpacing: "0",
              }}
            />
            {props.data && props.data.user
              ? props.data.user.users.map((item: any) => {
                  return (
                    <CellItem
                      arrow={false}
                      style={{
                        padding: "0.15rem 0",
                        margin: "0 0.25rem",
                      }}
                      v-slots={{
                        icon: () => (
                          <img
                            class="user-item-cover"
                            src={item.avatarUrl}
                            alt=""
                          />
                        ),
                        title: () => (
                          <div>
                            <div class="user-item-name">{item.nickname}</div>
                            <div class="user-item-fans">{item.signature}</div>
                          </div>
                        ),
                        right: () => (
                          <div class="user-item-btn">
                            <i class="iconfont icon-zengjia user-item-btn-add"></i>
                            <span>关注</span>
                          </div>
                        ),
                      }}
                    ></CellItem>
                  );
                })
              : null}
            {props.data && props.data.user && props.data.user.moreText ? (
              <div class="more-bottom" onClick={handleMoreClick(6)}>
                <span>{props.data.user.moreText}</span>
                <i class="iconfont icon-qianjin1"></i>
              </div>
            ) : null}
          </div>
        </div>
      );
    };
  },
});
