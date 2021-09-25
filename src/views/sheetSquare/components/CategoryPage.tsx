import { getPlayListCategory } from "@/api/songSheet";
import Nav from "@/components/Nav/Nav";
import { defineComponent, reactive, ref, Transition, watch } from "vue";
import "./common.scss";

export default defineComponent({
  name: "CategoryPage",
  props: {
    show: Boolean,
  },
  emits: ["close", "change", "slide", "gopage"],
  setup(props, { emit, slots }) {
    // 上面自定义的歌单 网易云可以加很多，我这里限制15个
    const baseSheetCateData = ref([
      { activity: true, category: 999, canDel: false, name: "推荐" },
      { activity: true, category: 999, canDel: false, name: "官方" },
      { activity: true, category: 999, canDel: false, name: "视频歌单" },
      { activity: true, category: 999, canDel: false, name: "精品" },
    ]);
    const sheetCateData = reactive({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    }) as Record<string, any>;
    const categories = ref({}) as Record<string, any>;
    const isEdit = ref(false);

    const handleClose = () => {
      emit("close");
    };

    const setLoaclBaseData = () => {
      localStorage.setItem(
        "baseSheetCateData",
        JSON.stringify(baseSheetCateData.value)
      );
    };
    const getLoaclBaseData = () => {
      if (localStorage.getItem("baseSheetCateData")) {
        const tempData = JSON.parse(
          localStorage.getItem("baseSheetCateData") || "[]"
        );
        if (Array.isArray(tempData) && tempData.length >= 4) {
          baseSheetCateData.value = tempData;
        }
      }
      getSheetCateData();
    };

    //初始化分类，如果在本地有了的 则不能再新增
    const initSheetCateData = (data: any) => {
      data.forEach((el: any) => {
        if (
          baseSheetCateData.value.findIndex(
            (base: any) => base.name === el.name
          ) !== -1
        ) {
          el.activity = true;
        }
      });
    };

    const handEdit = () => {
      if (isEdit.value) {
        setLoaclBaseData();

        emit("change");
      }
      isEdit.value = !isEdit.value;
    };

    const getSheetCateData = () => {
      getPlayListCategory().then((res: any) => {
        categories.value = res.categories;
        initSheetCateData(res.sub);
        for (const key in sheetCateData) {
          sheetCateData[key] = res.sub.filter(
            (item: any) => Number(item.category) === Number(key)
          );
        }
      });
    };

    watch(
      () => props.show,
      (newValue) => {
        if (newValue) {
          getLoaclBaseData();
        }
      }
    );

    const sheetCardClick = (item: any, index: number) => {
      if (!isEdit.value && !item.activity) {
        emit("gopage", { visible: true, data: item.name });
        return;
      }
      if (!item.activity && isEdit.value) {
        item.activity = true;
        baseSheetCateData.value.push({
          activity: true,
          category: item.category,
          canDel: true,
          name: item.name,
        });
      }
    };

    const removeBaseSheet = (item: any, index: number) => {
      if (!isEdit.value) {
        emit("slide", index);
        emit("close");
        return;
      }
      if (item.canDel && isEdit.value) {
        sheetCateData[item.category].find(
          (row: any) => row.name === item.name
        ).activity = false;
        baseSheetCateData.value.splice(index, 1);
      }
    };

    const renderSheetcate = () => {
      return Object.keys(sheetCateData).map((key: string) => {
        return (
          <>
            <div class="sheetcate-body-title">
              <div class="sheetcate-body-title-left">
                {categories.value[key]}
              </div>
            </div>
            <div class="sheetcate-body-group">
              {sheetCateData[key].map((item: any, index: number) => {
                return (
                  <div
                    class={[
                      "sheetcate-body-group-item",
                      item.activity ? "group-item-active" : "",
                    ]}
                  >
                    <div
                      class="sheetcate-body-group-item-card"
                      onClick={() => sheetCardClick(item, index)}
                    >
                      {isEdit.value ? <i class="iconfont icon-add"></i> : null}
                      <span class="sheetcate-card-name">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      });
    };

    return () => {
      const { show } = props;
      return (
        <Transition name="sheetcate-fade">
          <div
            class={["sheetcate", show ? "sheetcate-show" : ""]}
            v-show={show}
          >
            <Nav
              iconSize="0.5rem"
              class="sheetcate-nav"
              v-slots={{
                right: () => null,
                center: () => <span class="sheetcate-nav-title">所有歌单</span>,
              }}
              onLeftClick={handleClose}
            />
            <div class="sheetcate-body">
              <div class="sheetcate-body-title">
                <div class="sheetcate-body-title-left">
                  我的歌单广场 <span>(长按可编辑)</span>
                </div>
                <div class="sheetcate-body-title-right" onClick={handEdit}>
                  {isEdit.value ? "完成" : "编辑"}
                </div>
              </div>
              <div class="sheetcate-body-group">
                {baseSheetCateData.value.map((item: any, index: number) => {
                  return (
                    <div
                      class={[
                        "sheetcate-body-group-item",
                        isEdit.value && !item.canDel ? "group-item-active" : "",
                      ]}
                    >
                      <div
                        class="sheetcate-body-group-item-card"
                        onClick={() => removeBaseSheet(item, index)}
                      >
                        {isEdit.value && item.canDel ? (
                          <i class="iconfont icon-jian"></i>
                        ) : null}
                        <span class="sheetcate-card-name">{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {renderSheetcate()}
            </div>
          </div>
        </Transition>
      );
    };
  },
});
