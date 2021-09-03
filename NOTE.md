### 网易云移动端仿制版-网页-梦回

主要用于整理开发过程中遇到的问题

<hr/>

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

