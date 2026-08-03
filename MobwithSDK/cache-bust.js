(() => {
    const VERSION = "202608031250";
    const originalOpen = XMLHttpRequest.prototype.open;
  
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (typeof url === "string" && /\.md(?:\?|$)/i.test(url)) {
        const separator = url.includes("?") ? "&" : "?";
        url += `${separator}v=${VERSION}`;
      }
  
      return originalOpen.call(this, method, url, ...rest);
    };
  })();