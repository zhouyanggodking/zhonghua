let init = false;

export function loadEncicleImage() {
  return new Promise((r, j) => {
    if (init) {
      requestAnimationFrame(() => {
        r()
      })
    } else {
      let tag = document.createElement("script");
      //没有旋转功能
      //tag.src = "/assets/libs1/app.js";
      //tag.src = "/ocr/assets/libs1/app.js";

      //有图片旋转功能
      tag.src = "@/assets/libs/app.js";
      //tag.src = "/ocr/assets/libs/app.js";

      //修改跨域版本
      //tag.src = "/assets/libs2/app.js";
      //tag.src = "/ocr/assets/libs2/app.js";

      // 支持ie
      //tag.src = "/assets/libs3/app.js";

      tag.async = "async";
      tag.onload = function () {
        document.body.removeChild(tag)
        tag = document.createElement("encircle-image");
        document.body.appendChild(tag);
        requestAnimationFrame(() => {
          init=true;
          document.body.removeChild(tag);
          r()
        })
      }
      document.body.appendChild(tag);
    }
  })

}
