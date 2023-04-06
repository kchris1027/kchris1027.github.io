fish();
function fish() {
    return (
      // 修改页脚文本的位置和颜色
      $("#footer-wrap").css({
        position: "absolute",
        "text-align": "left",
        top: -20,
        right: 0,
        left: 0,
        bottom: 0,
        color: "#999999",
      }),
      // $("#footer").css({
      //   background: "rgba(255, 255, 255, 0)",
      // }),
      //页脚添加容器
      $("footer").append(
        '<div class="container" id="jsi-flying-fish-container"></div>'
      ),
      //运行js脚本
      $("body").append(
        '<script src="/js/fish/fish.js"></script>'
      ),
      // 定义容器的位置
      $("#jsi-flying-fish-container").css({
        position: "absolute",
        top: -60,
        right: 0,
        left: 0,
        bottom: -80,
        "z-index": -1,
        // background: "#49b1f5",
      }),       
      this
    );
  }