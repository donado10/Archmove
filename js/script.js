const hamburger = document.querySelector(".hamburger-menu");
const close_menu = document.querySelector(".close-menu");
const navigation = document.querySelector("nav");
const chevron_left = document.querySelectorAll(".chevron-left");
const chevron_right = document.querySelectorAll(".chevron-right");
const header = document.querySelector("header");

const gallery_image = document.querySelectorAll(
  ".design-gallery-images .image"
);

const service_features = document.querySelectorAll(
  ".service-features .feature"
);

const partners_logo = document.querySelectorAll(".partners-logo .logo");

const chevron_left_transition = function (...listEl) {
  const numberEl = listEl.length;

  if (listEl[numberEl - 1].classList.contains("next")) {
    listEl[0].classList.remove("hidden");
    listEl[0].classList.add("next");

    listEl[numberEl - 2].classList.remove("active");
    listEl[numberEl - 2].classList.add("hidden");

    listEl[numberEl - 1].classList.remove("next");
    listEl[numberEl - 1].classList.add("active");

    return;
  }
  listEl.forEach((el, i, arr) => {
    el.dataset.direction = "up";
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      el.classList.add("hidden");
      return;
    }

    if (el.classList.contains("next")) {
      el.classList.remove("next");
      el.classList.add("active");
      return;
    }

    if (
      el.classList.contains("hidden") &&
      arr[--i]?.classList.contains("active")
    ) {
      el.classList.remove("hidden");
      el.classList.add("next");
      return;
    }
  });
};

const chevron_right_transition = function (...listEl) {
  const numberEl = listEl.length;

  if (listEl[0].classList.contains("active")) {
    listEl[1].classList.remove("next");
    listEl[1].classList.add("hidden");

    listEl[0].classList.remove("active");
    listEl[0].classList.add("next");

    listEl[numberEl - 1].classList.remove("hidden");
    listEl[numberEl - 1].classList.add("active");

    return;
  }
  listEl.forEach((el, i, arr) => {
    el.dataset.direction = "down";
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      el.classList.add("next");
      return;
    }

    if (el.classList.contains("next")) {
      el.classList.remove("next");
      el.classList.add("hidden");
      return;
    }

    if (
      el.classList.contains("hidden") &&
      arr[++i]?.classList.contains("active")
    ) {
      el.classList.remove("hidden");
      el.classList.add("active");
      return;
    }
  });
};

hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  navigation.classList.toggle("show-nav");
});

close_menu.addEventListener("click", (e) => {
  e.preventDefault();
  navigation.classList.toggle("show-nav");
});

chevron_left.forEach((chevron) => {
  chevron.addEventListener("click", (e) => {
    const parent = e.currentTarget.parentElement;

    if (parent.classList.contains("gallery-chevrons")) {
      chevron_left_transition(...gallery_image);
      return;
    }

    if (parent.classList.contains("service-chevrons")) {
      chevron_left_transition(...service_features);
      return;
    }

    if (parent.classList.contains("partner-chevrons")) {
      chevron_left_transition(...partners_logo);
      return;
    }
  });
});

chevron_right.forEach((chevron) => {
  chevron.addEventListener("click", (e) => {
    const parent = e.currentTarget.parentElement;

    if (parent.classList.contains("gallery-chevrons")) {
      chevron_right_transition(...gallery_image);
      return;
    }

    if (parent.classList.contains("service-chevrons")) {
      chevron_right_transition(...service_features);
      return;
    }

    if (parent.classList.contains("partner-chevrons")) {
      chevron_right_transition(...partners_logo);
      return;
    }
  });
});

const stickyMenu = function (entries) {
  if (!entries[0].isIntersecting) {
    hamburger.classList.add("sticky");
  } else {
    hamburger.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyMenu, {
  root: null,
  threshold: 0,
});

headerObserver.observe(header);
