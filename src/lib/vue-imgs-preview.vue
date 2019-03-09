<template>
  <div class="vue-imgs-preview" v-show="showImgPre">
    <div
      class="img-box"
      ref="imgItem"
      :style="styleDom"
      @mousewheel="imgWheel"
      @mousedown.capture="imgMouseDown"
    >
      <img :src="imgUrl">
    </div>
    <ul class="tools">
      <li>
        <span class="image-index">{{index+1}}/{{imgData.length}}</span>
        <span class="separate-line"></span>
      </li>
      <li @click="enLarge()">
        <i class="iconimgs icon-plus">&#xe60e;</i>
      </li>
      <li @click="narrow()">
        <i class="iconimgs icon-minus">&#xe60b;</i>
      </li>
      <li @click="roTate()">
        <i class="iconimgs icon-rorate">&#xe607;</i>
      </li>
      <li>
        <a class="dl-info" target="_blank" :href="imgData[index]" :download="imgData[index]">
          <i class="iconimgs icon-down">&#xe668;</i>
        </a>
      </li>
      <li @click="fullScreen()">
        <i class="iconimgs icon-full">&#xe613;</i>
      </li>
    </ul>
    <div class="bi-zoom-prev" @click="handleLeft()">
      <i class="iconimgs icon-turn-prev">&#xe60d;</i>
    </div>
    <div class="bi-zoom-next" @click="handleRight()">
      <i class="iconimgs">&#xe60d;</i>
    </div>
    <div class="info">
      <div class="image-buttons" @click="closeImgPre()">
        <div class="close">
          <i class="iconimgs">&#xe611;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "img-preview",
  data() {
    return {
      imgUrl: "",
      index: 0,
      style: {
        name: "",
        rotate: 0,
        scale: 1,
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      sacle: 1,
      move: {
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        isMove: false
      },
      imgData: [],
      imgIndex: 0,
      positionX: 0,
      positionY: 0,
      showImgPre: this.imgPre
    };
  },
  props: {
    imgPre: {
      default: false
    },
    articleId: {
      default: "",
      type: String
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      document.documentElement.style.overflow = "hidden";
      this.index = this.imgIndex;
      //判断id是否存在
      if (this.articleId != "") {
        this.getAllimg();
      } else {
        console.log(...this.tips("参数articleId不能为空"));
      }
    });
  },
  methods: {
    //获取全部图片
    getAllimg() {
      let content = document.getElementById(this.articleId);
      if (content == null || typeof content == "undefined") {
        console.log(...this.tips("没有查到对应的id,请检查articleId参数"));
        return;
      }
      let imgArr = content.getElementsByTagName("img");
      this.imgData = [];
      this.imgIndex = 0;
      for (var i = 0; i < imgArr.length; i++) {
        let item = imgArr[i];
        this.imgData.push(item.src);
        (index => {
          item.onclick = e => {
            e.preventDefault();
            this.imgIndex = index;
            this.showImgPre = true;
            document.documentElement.style.overflow = "hidden";
          };
        })(i);
      }
    },
    handleLeft() {
      let num = this.imgIndex - 1;
      if (num < 0) {
        this.imgIndex = this.imgData.length - 1;
      } else {
        this.imgIndex = num;
      }
    },
    handleRight() {
      let num = this.imgIndex + 1;
      if (num >= this.imgData.length) {
        this.imgIndex = 0;
      } else {
        this.imgIndex = num;
      }
    },
    // 旋转
    roTate() {
      this.style.rotate = this.style.rotate - 90;
    },
    //放大
    enLarge() {
      this.style.height *= 2;
      this.style.width *= 2;
      this.setPos();
    },
    //缩小
    narrow() {
      this.style.height /= 1.3;
      this.style.width /= 1.3;
      this.setPos();
    },
    // 全屏
    fullScreen() {
      console.log(...this.tips("还没开始做,不要着急哈"));
    },
    // 关闭
    closeImgPre() {
      document.documentElement.style.overflow = "auto";
      this.showImgPre = false;
      //   this.$emit("handleclose", this.imgPre);
    },
    /**
     * 图片读取完毕，计算大小
     */
    picLoadDone(e) {
      let img = e.target;
      let w = window.innerWidth;
      let h = window.innerHeight;

      if (w > h && img.height > h) {
        this.style.height = h;
        this.style.width = (img.width / img.height) * h;
      } else if (img.width > w) {
        this.style.width = w;
        this.style.height = (img.height / img.width) * w;
      } else {
        this.style.width = img.width;
        this.style.height = img.height;
      }
      this.setPos();
    },
    setPos() {
      this.style.left = (window.innerWidth - this.style.width) / 2;
      this.style.top = (window.innerHeight - this.style.height) / 2;
    },
    //鼠标滚轮控制大小
    imgWheel(e) {
      if (e.deltaY > 0) {
        this.narrow();
      } else {
        this.enLarge();
      }
    },
    //拖拽图片事件
    imgMouseDown(e) {
      let odiv = this.$refs.imgItem;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      //移动事件
      document.onmousemove = e => {
        e.preventDefault();
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    tips(text) {
      return [
        `%c%c温馨提示%c${text}`,
        `line-height:28px;`,
        `line-height:28px;padding:4px;background:#222;color:#fff;font-size:14px;margin-right:15px`,
        `color:#008000;line-height:28px;font-size:14px;`
      ];
    }
  },
  computed: {
    styleDom() {
      return {
        top: this.style.top + "px",
        left: this.style.left + "px",
        width: this.style.width + "px",
        height: this.style.height + "px",
        transform: `rotate(${this.style.rotate}deg)`
      };
    }
  },
  watch: {
    imgData(cur) {
      this.style.scale = 1;
      this.style.rotate = 0;
      this.style.name =
        "scale(" + this.style.scale + ") rotate(" + this.style.rotate + "deg)";
      this.imgUrl = cur[this.imgIndex];
    },
    imgIndex(val) {
      this.index = val;
      this.imgUrl = this.imgData[val];
    },
    imgUrl(value) {
      let img = document.createElement("img");
      img.onload = this.picLoadDone;
      img.src = value;
    },
    imgPre(val) {
      this.showImgPre = val;
      console.log(...this.tips("变化"));
    }
  }
};
</script>
<style lang="less">
@font-face {
  font-family: "iconimgs"; /* project id 1078117 */
  src: url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.eot');
  src: url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.woff') format('woff'),
  url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1078117_zm6ylgqd6h.svg#font_family') format('svg');
}
.iconimgs {
  font-family: "iconimgs" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #8a8a8a;
}
.vue-imgs-preview {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  .img-box {
    cursor: move;
    position: absolute;
    z-index: 10005;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ul.tools {
    text-align: center;
    position: fixed;
    bottom: 20px;
    padding: 0 5px;
    left: 50%;
    margin-left: -163px;
    z-index: 10006;
    height: 56px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px #f2f2f2;
    min-width: 326px;
    li {
      cursor: default;
      display: inline-block;
      margin: 10px;
      cursor: pointer;
      position: relative;
      height: 24px;
      vertical-align: baseline;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:hover {
        i {
          color: #203de1;
        }
      }
      i {
        display: inline-block;
        font-size: 26px;
      }
      .image-index {
        top: -4px;
        position: relative;
        font-size: 16px;
        color: #676767;
      }
      .separate-line {
        position: relative;
        top: 6px;
        display: inline-block;
        margin-left: 22px;
        cursor: default;
        width: 1px;
        height: 30px;
        background: #e7e7e7;
      }
    }
  }
  .info {
    color: white;
    position: fixed;
    top: 0;
    line-height: 40px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10006;
    .image-buttons {
      position: absolute;
      top: 30px;
      right: 30px;
      border-radius: 50%;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
      border: solid 1px #efefef;
      width: 44px;
      height: 44px;
      background: #fff;
      cursor: pointer;
      .close {
        width: 44px;
        margin-top: 3px;
        i {
          font-size: 22px;
          display: block;
          margin: 0 auto;
          color: #203de1;
        }
      }
    }
  }
  .bi-zoom-prev,
  .bi-zoom-next {
    position: absolute;
    width: 48px;
    height: 48px;
    display: block;
    top: 50%;
    margin-top: -24px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px #f2f2f2;
    z-index: 11000;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    .icon-turn-prev {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
    i {
      color: #203de1;
      font-size: 28px;
      display: inline-block;
      text-align: center;
    }
  }
  .bi-zoom-next {
    right: 0;
  }
  .bi-zoom-prev {
    left: 0;
  }
}
</style>