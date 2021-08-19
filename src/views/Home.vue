<template>
  <div class="home">
    <Nav
      leftIcon="icon-liebiao"
      rightIcon="icon-sousuo"
      @leftClick="handLeftClick"
      @rightClick="handLeftClick"
    >
      <template #center>
        <div
          :class="`nav-title ${selectId === item.id ? 'active' : ''}`"
          @click="handleChange(item.id)"
          v-for="(item, index) in navData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </template>
    </Nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Nav from "@/components/Nav/Nav";

export default defineComponent({
  name: "Home",
  components: {
    Nav,
  },
  setup(props, { emit }) {
    const selectId = ref(1);
    const navData = reactive([
      { id: 1, name: "我的" },
      { id: 2, name: "发现" },
      { id: 3, name: "云村" },
      { id: 4, name: "视频" },
    ]);
    const handLeftClick = () => {
      console.log(111);
    };
    const handleChange = (num: number) => {
      selectId.value = num;
    };
    return {
      handLeftClick,
      handleChange,
      selectId,
      navData,
    };
  },
});
</script>

<style lang="less" scoped></style>
