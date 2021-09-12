## 网易云移动端仿制版

[toc]

### 概述

主要用于整理开发过程中遇到的问题

<hr/>

### 使用到的技术

### 思路

### 模块实现

#### 

### 问题

### 总结







#### 使用到的技术

1. 前端

   `vue3.0`，`ts+tsx`，`glfx`，`swiper`，`rem`，`scss`，

2. 后端 

   [Binaryify]: https://github.com/Binaryify/NeteaseCloudMusicApi	"网易云接口"

   `node.js`

#### 一，顶部Nav采用的定位方式

这里有两种方式可供选择；

1. **fixed布局**

   使用该布局后，主体内容会向上移动相应的高度，会遮住一部分主体内容；

   需要设置对应的方向

   如果父级没有设置相对定位，则处于脱离文档流

2. **sticky布局**

   主体不会向上移动相应内容，但是会受到父级overflow的影响 不能设置overflow

   仅仅在父元素内生效，

   父元素的高度不能低于sticky元素的高度

   必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
   
   ```css
   .xxx {
     position: sticky;
     top: 0;
     z-index: 100;
   }
   ```
   
   

#### 二，弹出框后禁止底部页面滚动

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



#### 三，引入swiper6.0 并且在tsx中使用时出现警告

警告代码：

<table><tr><td bgcolor=#ffff0080>
<font color=red>lot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.</font>
</td></tr></table>

找了很久但是没有找到具体的解决办法，但是代码正常运行，

如果不想看见此代码，可以设置关闭vue的代码警告（自行百度），不使用tsx语法进行开发，也可以不触发此提示

#### 四，Transition在vue3且tsx语法下的使用

在tsx语法中，需要先引入Transition后才能使用，

```tsx
import { Transition } from "vue";
```

需要注意，在tsx语法中 如果自行控制`display`的状态 是无法触发Transition的过渡动画的；

在tsx语法中，我们可以使用<font color=red>`v-show`</font>  但是不能使用<font color=red>`v-if`</font> 否则会报错 <font color=red>`v-show`</font> 可以触发过渡动画

#### 五，使用图片进行页面背景的设置

1. 不处理图像，使用<font color=red>`filter:blur(40px)`</font>对图像进行模糊处理，但是此方法需要新建一个div作为图像位置，这样才不会影响到内容的展示 否则会整体模糊 此时页面亮度会根据图片亮度来，而且会有发光效果；加上 <font color=blue>`brightness(0.6)`</font> 对亮度进行调节 0-1 

   ```css
   filter: blur(40px) brightness(0.6);
   transform: scale(1.2);
   ```

2. 使用`glfx.js` 前端图像处理工具进行处理，处理代码如下！

   ```ts
   /**
    * 改变图片+转 base64
    * @param {String} url 图片链接
    * @param {Function} callback 回调
    * @param {Function} blur 模糊值
    * @param {Function} brightness 明亮值(0 ~ -1)
    */
   const imgToBlob = (
     url: string,
     callback: any,
     blur: number | undefined,
     brightness: number | undefined
   ) => {
     const img = new Image();
     img.setAttribute("crossOrigin", "anonymous");
     img.src = url;
     img.onload = () => {
       let canvas = null;
       if (blur === undefined || brightness === undefined) {
         canvas = document.createElement("canvas");
         canvas.width = img.width;
         canvas.height = img.height;
         const ctx = canvas.getContext("2d");
         if (ctx) {
           ctx.drawImage(img, 0, 0, img.width, img.height);
         }
       } else {
         canvas = glfx.canvas();
         const texture = canvas.texture(img);
         canvas
           .draw(texture)
           .lensBlur(blur, -1, 0)
           .brightnessContrast(brightness, 0)
           .update();
       }
       callback(canvas.toDataURL("image/jpeg", 0.8));
     };
   };
   ```

   在vue3.0+ts写法中 直接使用`npm install glex ` 进行安装后，不能直接引用 需要创建对应的声明文件 

   在src中创建文件 `glex.d.ts`

   ```ts
   declare module "glfx";
   ```

#### 六，vue3.0中ref的用法（vue2.x的refs）；

需要在`setup`中定义变量

```tsx
const xxxref = ref(null) //不建议
const xxxref = ref() //建议
```

如果使用第一种，在tsx写法的方法中使用值时会报错，提示对象可能为null  加上 if 条件判断也不行

推荐使用第二种，不会出现上述问题 使用方法如下

```tsx
const NavRef = ref() //建议
NavRef.value.style.backgroundImage = ``;

```

tsx代码中使用时不能使用`xxxref.value` 直接使用`xxxref`

```tsx
<div ref={NavRef}></div>
```

#### 七，audio标签的使用方法（以前很少用）

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

#### 八，自定义popup组件（借鉴vant-popup）

在自定义自己的popup组件时遇到最大的问题就是要兼容各个方向，但是css动画的变化时要根据自身的原始数据 到新的数据的大小来变化产生的；如果是每次组件都是单独一个`DIV`元素的话，就不会出现问题，如果想要一个组件，通过变量控制不同的方向， 就会出现问题，动画效果就会错乱！

#### 九， 做播放器时，封面图片的唱片指针遇到的问题；

当我们使用css中的`rotate`动画属性时 ，需要控制旋转中心，此时需要使用到` transform-origin`

下面实例代码

```css
&-needle {
      width: 3rem;
      position: relative;
      left: 1rem;
      transform: rotate(-25deg);
      transform-origin: 0.4rem 0.4rem;
      transition: all 1s;
      z-index: 1;
      &-active {
        transform: rotate(0deg);
      }
    }
```

#### 十，在定义``click  ``,`touchmove`等等函数,需要使用到<font color=red>event</font>时遇到的问题

当我们要组织默认事件，或者使用函数传递参数时，在`vue3`+`tsx`中是不能直接传递参数的，需要声明相应的类型，如下所示

1. tsx语法中传递一个`index`时

   ```tsx
   <div
    class={[
      "read-play-music-left",
       index === props.currentIndex ? " active" : "",
    ]}
    onClick={clickHandler(index)}
    ></div>  
   ```

2. 在函数中接受时,定义type，后才能使用相应的值

   ```tsx
   type ClickHandler = (index: number) => (e: MouseEvent) => void;
   const clickHandler: ClickHandler = (index) => (e) => {
     e.preventDefault();
     store.commit("setPlayCurrntIndex", index);
   };
   ```



#### 十一，h5界面禁止缩放+iosX以上机型适配等设置

1. 首先在html界面meta中加入相关配置 

   ```html
   <meta
         name="viewport"
         content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
       />
   ```

   `user-scalable=no` 禁止缩放

   `viewport-fit=cover`安全区适配时使用

2. 在需要配置安全适配的css代码中加入

   ```scss
   padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
   padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
   ```

   需要注意的是：此方法只适合定位在底部的内容

#### 十二，导航条下面的下划线跟随移动

1. 我们使用最简单的方法，但是该方法无法有滚动的效果

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

2. 将下划线设置为绝对定位，通过js进行定位宽度

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

3. 因为我们导航本身也属于滚动属性，而且设置了滚动时会居中显示，这样与我们下划线的绝对定位产生了错位！ 

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

#### 十三， 使用 `swiper.js` 倘若每个`slider`高度不固定，每个 `slider`有滚动时无法有各自的滚动

需要设计，swiper占满所剩下的屏幕空间，此时页面会有滚动，但是设置高度为100%后，页面会全部滚动===》当第一个 `slider`滚动时，第二个也同样跟着滚动相应的距离！

此时需要设置`slider`的高度！才能避免这种情况，或者在每个`slider`的内容中自己固定一定的高度后再设置scoller滚动



#### 十四，在ts中使用localStorage.getItem时提示错误

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

#### 十五，写一个播放器进度条（音量大小，下载进度）等等均可用

首先来看看具体长啥样（模仿网易云pc端）

![image-20210905222649740](C:\Users\12743\AppData\Roaming\Typora\typora-user-images\image-20210905222649740.png)

1. 万能的html代码，平平无奇，不需要多讲

   ```html
   <div class="line">
         <span>0.00</span>
         <div class="slider">
           <div class="buffer"></div>
           <div class="processor"></div>
           <div class="controller"></div>
         </div>
         <span>0.00</span>
       </div>
   ```

2. css代码 样式必不可少呀，需要控制好样式

   ```css
   .line {
     width: 100%;
     height: 45px;
     background-color: #2d2d2d;
     border-top: 1px solid #4a4a4a;
     border-bottom: 1px solid #4a4a4a;
     position: fixed;
     bottom: 50%;
     display: flex;
     align-items: center;
     color: #fff;
     /* padding: 10px; */
   }
   .line > span {
     padding: 0 10px;
   }
   .slider {
     flex: 1;
     height: 5px;
     background-color: #181818;
     border-top: 1px solid #0b0b0b;
     border-bottom: 1px solid #4a4a4a;
     margin: 20px auto;
     position: relative;
     border-radius: 999px;
     display: flex;
     align-items: center;
   }
   .buffer {
     width: 0;
     height: 100%;
     background-color: #535353;
     border-radius: 999px;
     position: absolute;
   }
   .processor {
     width: 0;
     height: 100%;
     background-color: #c70c0c;
     border-radius: 999px;
     position: absolute;
   }
   .controller {
     position: absolute;
     width: 5px;
     height: 5px;
     border: 5px solid #f3f3f6;
     background-color: #000;
     border-radius: 50%;
     left: -5px;
     /* top: -6px; */
     /* opacity: 0.3; */
   }
   ```

   三个div 分别是

   * `buffer`缓冲进度条 视频播放器和音乐播放器时使用
   * `processor`播放进度条
   * `controller`小按钮

   这里主要是使用相对定位和绝对定位的结合使用，本来那个`controller`并不能平衡，但是给`slider`设置了flex布局后，可以完美居中水平线！

3. 下面介绍鼠标拖拽和移动端手指触摸滑动的js部分

   主要使用到的方法有：

   * `onmousedown`  鼠标按下，`ontouchstart  ` 触摸开始 都是对进度条操作的开始
   * `onmousemove`  鼠标移动，`ontouchmove ` 触摸滑动
   * `onmouseup`  鼠标放开，`ontouchend ` 结束触摸

   首先将所有元素获取到，这里使用<font color=red>`document.querySelector()`</font> 如下面代码所示

   ```js
   const slider = document.querySelector(".slider");
   const buffer = document.querySelector(".buffer");
   const processor = document.querySelector(".processor");
   const controller = document.querySelector(".controller");
   ```

   其次定义两个函数，供我们使用,`dragDropHandle` 判断操作 `changeElement`具体修改页面

   ```js
   /**
    * 判断移动的距离
    * @param event MouseEvent || TouchEvent
    */
   function dragDropHandle(event) {
     //获取距离右侧距离数值
     const clientX = event.clientX || event.changedTouches[0].clientX;
     //计算出到进度条左侧的值
     const tx = clientX - slider.offsetLeft;
     //计算小圆点本身宽度 并且1/2
     const halfW = controller.offsetWidth >> 1;
     switch (event.type) {
       case "mousedown":
         changeElement(tx, halfW);
         break;
       case "touchstart":
         changeElement(tx, halfW);
         break;
       case "mousemove":
         changeElement(tx, halfW);
         break;
       case "touchmove":
         changeElement(tx, halfW);
         break;
       case "mouseup":
         //做出拖拽结束后的操作
         break;
       case "touchend":
         //做出滑动结束后的操作
         break;
     }
   }
   
   /**
    * 改变界面元素
    * @param tx 当前鼠标或者手指所在位置到开始的距离
    * @param halfW 进度按钮自身所占宽度
    */
   function changeElement(tx, halfW) {
     if (slider.offsetWidth >= tx && tx >= 0) {
       controller.style.left = tx - halfW + "px";
       processor.style.width = tx + "px";
     }
   }
   ```

   后面直接调用给相应的元素设置监听即可

   ```js
   slider.addEventListener("mousedown", dragDropHandle);
   slider.addEventListener("mousemove", dragDropHandle);
   slider.addEventListener("mouseup", dragDropHandle);
   slider.addEventListener("touchstart", dragDropHandle);
   slider.addEventListener("touchmove", dragDropHandle);
   slider.addEventListener("touchend", dragDropHandle);
   ```


#### 十六，Vue3.0 子组件通过update 更改props

<font color=red>`vue2.x`</font> 版本时 可以通过父组件visible.sync="xxxxx"  然后子组件使用`update:xxx`即可更改值

<font color=red>`vue3.0`</font> 版本中 已经丢弃`sync`，需要使用`v-model` 绑定的值 才能通过`update:xxx`进行修改

#### 十七，ios和pad中 在触发点击事件或者input时会有灰色背景显示

当我们在ios触发某个div的click事件时，会显示一块灰色区域，类似hover样式，虽不影响功能，但是会看起来很怪异，需要用css 去取消此效果

```css
-webkit-tap-highlight-color:rgba(0,0,0,0);
```

