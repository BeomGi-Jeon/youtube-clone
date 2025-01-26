document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  

gsap.to(".typo_text01", {
    x: window.innerWidth * 1.5, 
    transformOrigin: "center center",
    scrollTrigger: {
    trigger: ".typo_text02",
    start: "top 80%",
    end: "bottom top-=200",
    scrub: 2
    },
});
  

gsap.to(".typo_text02", {
    x: -window.innerWidth * 1.5, 
    transformOrigin: "center center",
    scrollTrigger: {
    trigger: ".typo_text02",
    start: "top 80%",
    end: "bottom top-=200",
    scrub: 2
    },
});

gsap.fromTo(
".typo_text03",
{ y: 800, opacity: 0 }, 
{ 
    y: 0, opacity: 1, 
    duration: 0.3,
    scrollTrigger: {
    trigger: ".typo_area",
    start: "top 70%", 
    end: "top 50%", 
    scrub: 2, 
    },
}
);


gsap.fromTo(
".typo_text04",
{ y: 800, opacity: 0 }, 
{ 
    y: 0, opacity: 1, 
    scrollTrigger: {
    trigger: ".typo_area",
    start: "top 60%", 
    end: "top 40%", 
    scrub: 2, 
    },
}
);
      
    
ScrollTrigger.create({
    trigger: ".typo_area",
    start: "top top", 
    end: "bottom top", 
    pin: true, 
    pinSpacing: true,
});

});
  
  
  