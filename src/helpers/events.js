export const addShadowOnScroll = className => {
  window.addEventListener("scroll", () => {
    let scrollpos = window.scrollY;
    var header = document.getElementById(className);
    if (scrollpos > 20) {
      return header.classList.add("hasScrolled");
    } else {
      return header.classList.remove("hasScrolled");
    }
  });
};

export const checkDeviceOnResize = mobileDispatch => {
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 450) {
      mobileDispatch("mobile");
    } else if (window.innerWidth > 450 && window.innerWidth <= 1024) {
      mobileDispatch("tablet");
    } else {
      mobileDispatch("desktop");
    }
  });
};
