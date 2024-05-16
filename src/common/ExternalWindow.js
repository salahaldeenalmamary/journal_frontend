export class ExternalWindow {
    constructor() {
      this.windowUrl = null;
      this.windowRef = null;
      this.watcherId = null;
  
      this.resolve = () => {};
      this.reject = () => {};
    }
  
    open(url, features) {
      return new Promise((resolve, reject) => {
        if (this.windowRef) this.close(new ExternalWindowError("Reopening another external window.", "WINDOW_REOPENING"));
  
        this.resolve = resolve;
        this.reject = reject;
  
        this.windowUrl = url;
        this.windowRef = window.open(this.windowUrl.href, "_blank", this.stringifyFeatures(features));
  
        if (this.windowRef) {
          window.externalWindow = this;
  
          this.watcherId = setInterval(() => {
            if (this.windowRef && this.windowRef.closed) {
              this.close(new ExternalWindowError("External window closed unexpectedly.", "WINDOW_CLOSE_UNEXPECTEDLY"));
            }
          }, 1000);
        } else {
          this.close(new ExternalWindowError("Could not open the external window.", "WINDOW_OPEN_FAILED"));
        }
      });
    }
  
    close(reason) {
      window.externalWindow = null;
  
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef = null;
      }
  
      if (this.watcherId !== null) {
        clearInterval(this.watcherId);
        this.watcherId = null;
      }
  
      if (reason instanceof Error) this.reject(reason);
      else this.resolve();
    }
  
    stringifyFeatures(features) {
      features = {
        width: 550,
        height: 650,
        menubar: false,
        toolbar: false,
        location: false,
        resizable: true,
        scrollbars: true,
        status: false,
        ...features
      };
  
      if (features.center) {
        const screenLeft = window.screenLeft || window.screenX || 0;
        const screenTop = window.screenTop || window.screenY || 0;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
        const left = Math.round(screenLeft + (screenWidth - (features.width || 0)) / 2);
        const top = Math.round(screenTop + (screenHeight - (features.height || 0)) / 2);
        features.left = left;
        features.top = top;
      }
  
      return Object.entries(features)
        .filter(([key, value]) => typeof value === "boolean" || typeof value === "number")
        .map(([key, value]) => `${key}=${value}`)
        .join(",");
    }
  
    static notify(reason) {
      const origin = window.location.origin;
  
      if (window.opener && window.opener.externalWindow) {
        const externalWindow = window.opener.externalWindow;
        const expectedOrigin = externalWindow.windowUrl ? (externalWindow.windowUrl.searchParams.get("origin") || origin) : origin;
  
        if (expectedOrigin.startsWith(origin)) {
          externalWindow.close(reason);
        }
      }
    }
  }
  
  export class ExternalWindowError extends Error {
    constructor(message, reason) {
      super(message);
      this.reason = reason;
      this.name = "ExternalWindowError";
    }
  }
  