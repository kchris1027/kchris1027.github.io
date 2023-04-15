$(document).ready(function () {
    try {
      $("#page-header").ripples({
        resolution: 1024,
        dropRadius: 10, //px
        perturbance: 0.04,
      });
    } catch (e) {
      $(".error").show().text(e);
    }
    // $(window).resize(function() {
    //   // 在这里添加适配网页缩放的代码
    //   // 比如重新计算水波纹效果的参数等
    //   // 例如：
    //   $("#page-header").ripples("updateSize");
    // });
  });
