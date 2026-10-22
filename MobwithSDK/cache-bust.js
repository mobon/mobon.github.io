(() => {
    const VERSION = "202610220846";
    // custom.css도 같은 버전 값을 붙여 불러옴 (스타일 변경이 캐시 때문에 늦게 반영되는 문제 방지)
    document.write('<link rel="stylesheet" href="../custom.css?v=' + VERSION + '">');

    const originalOpen = XMLHttpRequest.prototype.open;
  
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (typeof url === "string" && /\.md(?:\?|$)/i.test(url)) {
        const separator = url.includes("?") ? "&" : "?";
        url += `${separator}v=${VERSION}`;
      }
  
      return originalOpen.call(this, method, url, ...rest);
    };
  })();