$(document).ready(function () {
    try {
      $("#page-header").ripples({
        resolution: 512,
        dropRadius: 10, //px
        perturbance: 0.02,
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
<link rel="stylesheet" href="/css/spoiler.css" type="text/css"><script src="/js/spoiler.js" type="text/javascript" async></script>