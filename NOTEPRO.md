## 网易云移动端仿制版

[toc]

### 概述

主要用于整理开发过程中遇到的问题，以及在我开发过程中，需要用到的模块的开发，我觉得重要的，我就记录一下！

<hr/>

### 使用到的技术
#### 前端

* `vue3.0+ts` 
* `rem布局` 更好适应不同移动端
* `scss`  
* `swiper.js`  首页轮播+部分内容滑动+搜索页tab

#### 后端 

[Binaryify]: https://github.com/Binaryify/NeteaseCloudMusicApi	"网易云接口"

`node.js`  

### 思路

* 使用vue3.0+ts进行开发；cli安装方式在模块第一条； <font color='blue'>`基础`</font>
* 选择rem布局，有利于各种移动端的适应； <font color='blue'>`基础`</font>
* 实现首页轮播，需要用到swiper.js 目前可使用npm 安装 <font color='blue'>`完成`</font>
* 实现首页部分热门数据展示+对接接口； <font color='blue'>`完成`</font>
* 实现歌单界面数据的展示； <font color='blue'>`完成`</font>
* 实现全局播放器； <font color='blue'>`完成`</font>
* 实现播放页面光碟转动，歌词根据时间滚动； <font color='blue'>`完成`</font>
* 实现首页搜索页组件； <font color='blue'>`完成`</font>
* 实现具体搜索页内容（多内容切换）； <font color='blue'>`完成`</font>
* 实现首页左侧设置内容； <font color='red'>`开发中`</font>
* 实现个人中心样式； <font color='gray'>`未开始`</font>
* 实现用户登录注册等； <font color='gray'>`未开始`</font>
* 实现查看他人信息； <font color='gray'>`未开始`</font>
* 实现私人FM； <font color='gray'>`未开始`</font>
* 实现排行榜页面； <font color='gray'>`未开始`</font>
* 实现歌曲评论界面； <font color='gray'>`未开始`</font>
* 实现云贝相关界面； <font color='gray'>`未开始`</font>
* 待思考.....

### 模块实现

此处主要展示某些模块或者组件的实现方式；

<hr>

#### vue3.0 CLI 安装需要的配置；

* 安装vue cli 最新版 

  ```sh
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```

* 使用cli 创建项目

  ```sh
  vue create appName
  ```

* 此时会有弹出 Please pick a preset，如果以前没有安装过，请选择 `Manually select features` 后回车；因为我们需要设置某系我们需要的配置！

* 现在提示：Check the features needed for your project ， 这里是上下键切换后 按空格进行选择或者取消，这里我们需要选择的比较多；

  * `Choose Vue version`   选择版本
  * `Bable` 将ES6编译成ES5
  * `TyperScript`  JS超集，主要是类型检查
  * `Router` 路由
  * `Vuex` 状态管理
  * `CSS Pre-processors`  css预编译 (*稍后会对这里进行配置*)
  * `Liner / Formatter `  代码检查工具

  这里几个都有*号后回车 进入下一步

* 选择 3.x 后回车

* 进入 Use class-style component syntax?  这里输入Y

  是否使用Class风格装饰器？
  即原本是：`home = new Vue()`创建vue实例
  使用装饰器后：`class home extends Vue{}`

* 进入Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)?  这里输入Y

* 进入 Use history mode for router  路由使用历史模式? （y/n都可） 我输入n 

* 进入 Pick a CSS pre-processor  这里看你习惯选择  我们选择Sass/SCSS (with node-sass) 

* 进入 Pick a linter / formatter config  选择ESLint with error prevention only  

* 进入 Pick additional lint features 代码检查方式  选择Lint on save  

* 进入 Where do you prefer placing config for... 选择  In package.json 

* 进入 Save this as a preset for future projects?  是否在以后的项目中使用以上配置？ 可以保存 可以不保存  此处是为了下次直接使用 跳过选择  （我选择否  n）

* 开始安装搭建 （如果是首次创建  会让你选择使用npm 还是yarn进行安装）

* 安装完成后 

  ```shell
  cd xxxx
  npm run serve #即可运行项目
  ```



#### 配置rem 布局配置

* 首先安装对应的依赖；

  ```shell
  npm install amfe-flexible --save
  npm install postcss-px2rem --save
  ```

* 在 main.ts 中引入 

  ```ts
  import "amfe-flexible";
  ```

* 在package.json 中配置 px2rem-loader

  ```json
  "postcss": {
      "plugins": {
        "autoprefixer": {},
        "postcss-px2rem": {
          "remUnit": 37.5 //这里指的是设计稿的宽度 （370 / 10）
        }
      }
    },
  
  ```

* 配置完成后 重新启动项目就好啦， 使用过程中 px 会转换成rem 如果没有vscode 插件去改格式的话，可以使用大写的px 保留不被转化；

* 如果使用的是`vscode` 且需要rem 提示的话 需要安装一个插件 `cssrem` 这里不介绍此插件用法



#### 实现全局组件的方式

很多时候，某个组件我们会在很多地方使用，每次都需要进行组件的引入，此时我们需要设置对应的全局组件，以供我们在需要时调用！

* 首先我们做好准备 在`utils/types.ts `中定义一种类型 `withInstall`

  ```ts
  type withInstall<T> = T & { install(app: App): void };
  export { withInstall }
  ```

* 写好组件后 需要在组件目录下创建一个index.ts 文件对组件进行导出 比如我们的input组件

  `input.jsx` 组件文件,`index.scss` 样式文件，

  ```ts
  import { App } from 'vue';
  import { withInstall } from '../utils/types';
  import MInput from './input';
  
  MInput.install = (app: App) => {
    app.component(MInput.name, MInput);
  };
  export default MInput as withInstall<typeof MInput>;
  ```

  

* 在我们组件的位置  例如 /src/components 下创建`index.ts` 文件 

  ```ts
  import { App } from 'vue';
  import MInput from './input/index';//自定义的组件的位置
  
  const components = [MInput]; //可以多个组件
  
  export { MInput };//可以单个导出
  
  // 注册组件
  export default function(app: App) {
    components.forEach((item) => app.component(item.name, item));
  }
  
  ```

* 在mian.ts 中引入`/src/components/index.ts`

  ```ts
  import { createApp } from 'vue';
  import App from './App.vue';
  import { MInput } from './components';
  
  createApp(App)
    .use(MInput)
    .mount('#app');
  ```

* 这样就注册全局成功了，但是我这种时属于写ui组件库的时候的用法，可以随时添加你想变成全局组件的组件，方便注册！



#### 组件之通过方法调用

此处的通过方法调用，就和`ElementUI`的

```js
this.$comfirm(message,title,{xxx:xxx}) //使用confirm 方法一致
```

温馨说明：我根据vant 的dialog 组件的写法来写的confirm组件

* 首先创建我们的confirm组件，代码在下面 我不做过多讲解,需要引入我们创建的另外一个popup组件 结合使用，此处请看代码，有点乱 还没完整 半成品

  ```tsx
  import { defineComponent, PropType, CSSProperties, ref } from "vue";
  import Popup from "../Popup/Popup";
  import "./index.scss";
  import { ClickEventFuncType } from "@/utils/types";
  
  export type ConfirmAction = "confirm" | "cancel";
  export type ConfirmMessage = string | (() => JSX.Element);
  export type ConfirmMessageAlign = "left" | "center" | "right";
  
  export default defineComponent({
    name: "Confirm",
    props: {
      callback: Function as PropType<(action?: ConfirmAction) => void>,
      modelValue: {
        type: Boolean,
        default: false,
      },
      title: String,
      width: [Number, String],
      message: [String, Function] as PropType<ConfirmMessage>,
      messageAlign: String as PropType<ConfirmMessageAlign>,
    },
    emits: ["confirm", "cancel", "update:modelValue"],
    setup(props, { emit, slots }) {
      const updateShow = (value: boolean) => emit("update:modelValue", value);
  
      const close = (action: ConfirmAction) => {
        updateShow(false);
        if (props.callback) {
          props.callback(action);
        }
      };
  
      const getActionHandler = (action: ConfirmAction) => () => {
        // should not trigger close event when hidden
        if (!props.modelValue) {
          return;
        }
        emit(action);
        close(action);
      };
  
      const onCancel = getActionHandler("cancel");
      const onConfirm = getActionHandler("confirm");
  
      const popStyle = ref<CSSProperties>({
        width: "6.5rem",
        borderRadius: "0.35rem",
        overflow: "hidden",
        backgroundColor: "#F1F0F0",
        textAlign: "center",
      });
  
      return () => {
        const { modelValue, title, message } = props;
        return (
          <div>
            <Popup
              clickModalClose={false}
              showSafeArea={false}
              visible={modelValue}
              direction="center"
              style={popStyle.value}
              {...{ "onUpdate:modelValue": updateShow }}
              v-slots={{
                head: () => null,
              }}
            >
              <div class="comfirm">
                <div class="comfirm-title">{title}</div>
                <div class="comfirm-message">{message}</div>
                <div class="comfirm-action">
                  <div class="comfirm-action-cancle" onClick={onCancel}>
                    取消
                  </div>
                  <div class="comfirm-action-comfirm" onClick={onConfirm}>
                    确定
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        );
      };
    },
  });
  
  ```

* 第二步创建一个另外的文件  ` confirm-function-call.tsx ` 此处某些东西原本是定义在untils/index.ts下面的 但是为了方便 此时全部定义到这个文件当中，后面可以自行抽离

  * 首先引入相关模块

    ```tsx
    import { 
      App,Component,
      createApp,reactive,
      nextTick,getCurrentInstance,
      ComponentPublicInstance 
    } from "vue";
    import MConfirm, {
      ConfirmAction,
      ConfirmMessage,
      ConfirmMessageAlign,
    } from "./Confirm";  //这里是组件需要的
    ```

  * 定义相关的函数 和 类型

    ```tsx
    export const extend = Object.assign;
    export const inBrowser = typeof window !== "undefined";
    const camelizeRE = /-(\w)/g;
    export function camelize(str: string): string {
      return str.replace(camelizeRE, (_, c) => c.toUpperCase());
    }
    export type ComponentInstance = ComponentPublicInstance<{}, any>;
    export type Interceptor = (...args: any[]) => Promise<boolean> | boolean;
    export type WithInstall<T> = T & {
      install(app: App): void;
    } & EventShim;
    //注册组件
    export function withInstall<T>(options: T) {
      (options as Record<string, unknown>).install = (app: App) => {
        const { name } = options as any;
        app.component(name, options);
        app.component(camelize(`-${name}`), options);
      };
    
      return options as WithInstall<T>;
    }
    
    //代码虽然写在这 但是自己却并没有真正搞懂
    export function useExpose<T = Record<string, any>>(apis: T) {
      const instance = getCurrentInstance(); //获取到组件实例
      if (instance) {
        extend(instance.proxy, apis);
      }
    }
    
    // 其实这里在vant 中是定义popup的 但是被我改成了我的confirm
    // 这里需要注意一个点就是 这个modelValue 在我们外面组件化使用时 就是v-model
    export function usePopupState() {
      const state = reactive<{
        modelValue: boolean;
        [key: string]: any;
      }>({
        modelValue: false,
      });
     
      const toggle = (modelValue: boolean) => {
        state.modelValue = modelValue;
      };
    
      const open = (props: Record<string, any>) => {
        extend(state, props);
        nextTick(() => toggle(true));
      };
    
      const close = () => toggle(false);
    
      useExpose({ open, close, toggle });
    
      return {
        open,
        close,
        state,
        toggle,
      };
    }
    
    // 此处就是挂载组件了 具体可以看代码 很明了
    export function mountComponent(RootComponent: Component) {
      const app = createApp(RootComponent);
      const root = document.createElement('div');
    
      document.body.appendChild(root);
    
      return {
        instance: app.mount(root),
        unmount() {
          app.unmount();
          document.body.removeChild(root);
        },
      };
    }
    
    ```

  * 具体的对组件的操作

    ```tsx
    export type ConfirmOptions = {
      title?: string;
      width?: string | number;
      message?: ConfirmMessage;
      beforeClose?: Interceptor;
      teleport?: string;
      messageAlign?: ConfirmMessageAlign;
      cancelButtonText?: string;
      showCancelButton?: boolean;
      showConfirmButton?: boolean;
      cancelButtonColor?: string;
      confirmButtonText?: string;
      confirmButtonColor?: string;
    };
    
    let instance: ComponentInstance;
    
    function initInstance() {
      const Wrapper = {
        setup() {
          const { state, toggle } = usePopupState();
          return () => (
            <MConfirm {...state} {...{ "onUpdate:modelValue": toggle }} />
          );
        },
      };
    
      ({ instance } = mountComponent(Wrapper));
    }
    
    function Confirm(options: ConfirmOptions) {
      /* istanbul ignore if */
      if (!inBrowser) {
        return Promise.resolve();
      }
    
      return new Promise((resolve, reject) => {
        if (!instance) {
          initInstance();
        }
    
        instance.open(
          extend({}, Confirm.currentOptions, options, {
            callback: (action: ConfirmAction) => {
              (action === "confirm" ? resolve : reject)(action);
            },
          })
        );
      });
    }
    
    Confirm.defaultOptions = {
      title: "",
      width: "",
      message: "",
      callback: null,
      teleport: "body",
      beforeClose: null,
      messageAlign: "",
      cancelButtonText: "",
      cancelButtonColor: null,
      confirmButtonText: "",
      confirmButtonColor: null,
      showConfirmButton: true,
      showCancelButton: false,
    };
    
    Confirm.currentOptions = extend({}, Confirm.defaultOptions);
    Confirm.alert = Confirm;
    
    Confirm.confirm = (options: ConfirmOptions) =>
      Confirm(extend({ showCancelButton: true }, options));
    
    Confirm.close = () => {
      if (instance) {
        instance.toggle(false);
      }
    };
    
    Confirm.setDefaultOptions = (options: ConfirmOptions) => {
      extend(Confirm.currentOptions, options);
    };
    
    Confirm.resetDefaultOptions = () => {
      Confirm.currentOptions = extend({}, Confirm.defaultOptions);
    };
    
    Confirm.Component = withInstall(MConfirm);
    
    Confirm.install = (app: App) => {
      app.use(Confirm.Component);
      app.config.globalProperties.$confirm = Confirm;
    };
    
    export { Confirm };
    ```

* 上述代码时可以使用的，但是自身并不是理解得透彻, 使用时很简单 

  ```tsx
  import { Confirm } from "@/components/Confirm";
  const MConfirm = Confirm.Component; //这样可以根据组件的方法去使用
  //tsx中使用：<MConfirm></MConfirm> 
  //函数使用
  Confirm.confirm({
    title: "dadsa",
    message: "dddd",
  }).then((res) => {
      console.log("点击了确定");
    })
    .catch(() => {
       console.log("点击了取消");
    });
  ```



#### 导航栏下面的下划线跟随移动

* 我们使用最简单的方法，但是该方法无法有滚动的效果

   <img src="https://img2018.cnblogs.com/blog/1059788/201902/1059788-20190213173529738-2108536811.gif" alt="效果图" style="zoom:150%;" />

   代码也很简单 在你每个导航下面新增一下内容,需要注意的是本身需要设置相对定位

   ```scss
   div{
       position:relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 100%;
          width: 0;
          height: 2px;
          background-color: #000;
          transition: all 0.3s ease-out;
       }
   }
   &-active {
     color: #000;
     font-weight: 600;
     &::after {
     width: 100%;
     left: 0;
   	}
   
     & + .nav::after {
        left: 0;
     }
   }
   ```

* 将下划线设置为绝对定位，通过js进行定位宽度

   先设置scss

   ```SCSS
   &-underline {
      position: absolute;
      bottom: 0;
      display: block;
      height: 4px;
      border-radius: 4px;
      background-color: red;
      transition: all 0.3s ease-out;
      margin-bottom: 0.1rem;
   }
   ```

   再通过js控制宽度和向左的距离

   ```tsx
   //获取当前导航本身
   const navActive: any = document.querySelector(".msearch-nav-active");
   //传递给函数 元素宽度 距离左边的距离
   moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
   //定义moveUnderLine函数 多处使用
   const moveUnderLine = (width: number | string, left: number | string) => {
     navUnderlinStyle.value = {
       width: width + "px",
       left: left + "px",
     };
   };
   ```

* 因为我们导航本身也属于滚动属性，而且设置了滚动时会居中显示，这样与我们下划线的绝对定位产生了错位！ 

   此时需要将下划线，导航放在同一个div中 并且div的定位属性设置为 <font color=red>`relative`</font> 这样才能让导航条跟随导航的滚动的位置一致；下面展示导航滚动自动居中的js代码

   ```tsx
   //获取激活导航元素
   const navActive: any = document.querySelector(".msearch-nav-active");
   //获取整个滚动区域的宽度（设置多宽就是多少）
   const navWidth = navBoxRef.value.offsetWidth;
   if (navActive) {
     //获取激活导航的距离左边的距离
     const navOffsetWidth = navActive.offsetLeft;
     //中间值 通过偏移宽度减去元素本身宽度再除以2  
     const diffWidth = (navWidth - navActive.offsetWidth) / 2; 
     //需要滚动的距离targetWidth
     const targetWidth = navOffsetWidth - diffWidth;
     //设置滚动距离
     navBoxRef.value.scrollLeft = targetWidth;
     //上面下划线跟随滚动
     moveUnderLine(navActive.offsetWidth, navOffsetWidth);
   }
   ```



### 问题

这里主要用于我在写代码过程中遇到的部分问题，以及解决办法

<hr>
#### 使用fixed后 滑动fixed页面 底层会跟着滚动

<font  color="red">tps：此方法只能用于移动端</font>

给modal层设置onTouchMove时阻止默认行为，代码如下：

```tsx
//定义事件
const preventTouchMove = (event: TouchEvent) => {
   if (props.lockScroll) {
     event.preventDefault();
   }
};
//在tsx中使用
<div
  class="mh-modal"
  style={{
     zIndex: props.mIndex,
  }}
  v-show={props.show}
  onClick={handleClick}
  onTouchmove={preventTouchMove}
></div>
```



#### CSS中 position:sticky布局失效的问题

* 主体不会向上移动相应内容，但是会受到父级overflow的影响 不能设置overflow

* 仅仅在父元素内生效，

* 父元素的高度不能低于sticky元素的高度

* 必须指定top、bottom、left、right4个值之一，否则只会处于相对定位

```css
.xxx {
  position: sticky;
  top: 0;
  z-index: 100;
}
```



#### 引入swiper6.0 并且在tsx中使用时出现警告

警告代码：

<table><tr><td bgcolor=#ffff0080>
<font color=red>lot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.</font>
</td></tr></table>


找了很久但是没有找到具体的解决办法，但是代码正常运行，

如果不想看见此代码，可以设置关闭vue的代码警告（自行百度），不使用tsx语法进行开发，也可以不触发此提示,

<font color=red>如果有更好的解决办法，请告知</font>



#### Transition在vue3且tsx语法下的使用无动画效果

在tsx语法中，需要先引入Transition后才能使用，

```tsx
import { Transition } from "vue";
```

需要注意，在tsx语法中 如果自行控制`display`的状态 是无法触发Transition的过渡动画的；

在tsx语法中，我们可以使用<font color=red>`v-show`</font>  但是不能使用<font color=red>`v-if`</font> 否则会报错 <font color=red>`v-show`</font> 可以触发过渡动画

其实本身v-if也是一个三元运算符 很简单的操作

但是至于为什么我dispaly 使用无法触发动画效果 很无奈



#### 使用ref来获取值时 会提示 该对象可能会null

因为某些时候我们在使用vue3.0的ref创建时会像下面这样创建变量

```tsx
const xxxref = ref(null)
```

然乎再去绑定到dom上面

```tsx
<div ref={NavRef}></div>
```

但是在我们使用的时候，就会tslint会有提示 对象可能为null

因为我们没有定义对应的类型判断 导致会这样 我们可以换种写法 给他一个类型

```tsx
const xxxref = ref<any>(null) //or
const xxxref = ref() 
```

其实两行代码一样 ref会自行推断类型  当然你有特殊的值 可以定义好后 再使用



#### audio标签的使用方法（以前很少用）

因为此程序是音乐播放器，则需要使用到audio标签去进行音乐的播放

```tsx
<audio
  src={`https://music.163.com/song/media/outer/url?id=.mp3`}
  ref={playControRef}
  autoplay={playing.value ? true : false}
  onEnded={playEnd}
  onPlay={onPlay}
  onPause={onPause}
  onTimeupdate={onTimeupdate}
></audio>
```

* `autoplay` 自动播放 接受Boolean
* `onPlay` 播放
* `onPause` 暂停
* `onEnded` 播放结束
* `onTimeupDate` 播放时间更新播放时 类似`setInterval` 循环
* ... （等待更新 拖动进度条等等）



#### 在定义``click  ``,`touchmove`等等函数,需要使用到<font color=red>event</font>时遇到的问题

此问题非使用组件时，组件上直接使用这些方法 会让你自己emit定义好了才能使用 否则会报错

当我们要组织默认事件，或者使用函数传递参数时，在`vue3`+`tsx`中是不能直接传递参数的，需要声明相应的类型，如下所示

* tsx语法中传递一个`index`时

  ```tsx
  <div
   class={[
     "read-play-music-left",
      index === props.currentIndex ? " active" : "",
   ]}
   onClick={clickHandler(index)}
   ></div>  
  ```

* 在函数中接受时,定义type，后才能使用相应的值

  ```tsx
  type ClickHandler = (index: number) => (e: MouseEvent) => void;
  const clickHandler: ClickHandler = (index) => (e) => {
    e.preventDefault();
    store.commit("setPlayCurrntIndex", index);
  };
  ```



#### h5界面禁止缩放+iosX以上机型适配底部安全区等设置

* 首先在html界面meta中加入相关配置 

   ```html
   <meta
         name="viewport"
         content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
       />
   ```

   `user-scalable=no` 禁止缩放

   `viewport-fit=cover`安全区适配时使用

* 在需要配置安全适配的css代码中加入

   ```scss
   padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
   padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
   ```

   需要注意的是：此方法只适合定位在底部的内容

#### 使用 swiper.js`倘若每个slider高度不固定，每个 slider会同步滚动

需要设置各自内容的高度，不能根据slider 自身高度进行滚动



#### 在ts中使用localStorage.getItem时提示错误 

错误提示：![image-20210905003941646](C:\Users\12743\AppData\Roaming\Typora\typora-user-images\image-20210905003941646.png)

```ts
state.historySearch = JSON.parse(localStorage.getItem("historySearch"));
```

解决办法：

```ts
state.historySearch = JSON.parse(localStorage.getItem("historySearch")||'[]');
```

错误原因

**提示不要使用’{}‘或’[]’,因为JSON.parse(’{}’)、JSON.parse(’[]’) 为true !!**



#### Vue3.0 子组件通过update 更改props

<font color=red>`vue2.x`</font> 版本时 可以通过父组件visible.sync="xxxxx"  然后子组件使用`update:xxx`即可更改值

<font color=red>`vue3.0`</font> 版本中 已经丢弃`sync`，需要使用`v-model` 绑定的值 才能通过`update:xxx`进行修改



### 总结

* 对vue3.x API 不是很熟练，这属于是看完部分教程就开始写一个demo ，但是在写这个demo的过程中，遇到问题并且去解决问题，这样的学习方式也算是一种非常好的。因为有着vue2.x的基础，所以大部分还是不受影响的。
* ts语法不熟悉，对于ts的认识仅限于对于类型的限定，但是其中的某些高级语法就不会使用了，当然也只能在看到别人的代码时，了解高级语法的写法，从而学习到知识点；
