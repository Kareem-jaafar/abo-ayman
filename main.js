/* مرايات العرب — سكربت خفيف: القائمة، معرض الصور، تتبع النقرات، Google Tag Manager */
(function () {
  "use strict";

  /* ضع معرف حاوية Google Tag Manager هنا عند الربط، مثال: "GTM-ABC1234" */
  var GTM_ID = "";

  window.dataLayer = window.dataLayer || [];

  function loadGTM(id) {
    if (!id || window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  if (GTM_ID) {
    if (document.readyState === "complete") loadGTM(GTM_ID);
    else window.addEventListener("load", function () { loadGTM(GTM_ID); });
  }

  /* تتبع نقرات الاتصال وواتساب */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var type = null;
    if (href.indexOf("tel:") === 0) type = "phone_click";
    else if (href.indexOf("wa.me/") !== -1) type = "whatsapp_click";
    if (!type) return;
    var payload = {
      event: type,
      click_location: a.getAttribute("data-track") || "unknown",
      page_path: location.pathname,
      link_url: href
    };
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", type, { click_location: payload.click_location, page_path: payload.page_path });
    }
  });

  /* قائمة الجوال */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* معرض الصور */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var img = box.querySelector("img");
    var cap = box.querySelector("p");
    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var source = btn.querySelector("img");
        img.src = source.currentSrc || source.src;
        img.alt = source.alt;
        cap.textContent = source.alt;
        box.showModal();
      });
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".lightbox-close")) box.close();
    });
  }

  /* السنة في التذييل */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
