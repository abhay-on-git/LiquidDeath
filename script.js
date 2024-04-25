// AOS initialization
AOS.init();

function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('main'),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the 'main' element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('main', {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector('main').style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

const buttons = document.querySelectorAll('button');
const body = document.getElementsByTagName( 'body' );
const info = document.querySelector('.info')
const selfBTN = document.querySelector('.selfBtn')

// Themes code
let menuIcons = document.querySelector(".menu .icons")
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");
let isDarkMode = true;
menuIcons.addEventListener("click",()=>{
  document.body.classList.toggle("dark-theme");
  if(isDarkMode){
    lightIcon.style.opacity = 1;
    darkIcon.style.opacity=0;
    isDarkMode = false;
  }else{
    dark.style.opacity = 1;
    lightIcon.style.opacity=0;
    isDarkMode = true;
  }
  gsap.to(body,{
    backgroundColor: isDarkMode ? 'white' : 'black',
    duration:0
  })
  gsap.to('.infoin',{
    color: isDarkMode ? 'white' : 'black',
    duration:0
  })
  gsap.to('.infoin',{
    backgroundColor: isDarkMode ? 'black' : 'white',
    duration:0
  })
  gsap.to('.cursor',{
    backgroundColor: isDarkMode ? 'black' : 'white',
    duration:0
  })
});
const iOfMenu = document.querySelectorAll('.menu i');
iOfMenu.forEach((i)=>{
  i.addEventListener('mouseenter',()=>{
    crscrEnlarge(i);
  })
  i.addEventListener('mouseleave',()=>{
    crscrNormal(i);
  })
})

const infoIcon = document.querySelectorAll(['.info .icons i']);
infoIcon.forEach((i)=>{
  i.addEventListener('mouseenter',()=>{
    transform:'scale(1.1)';
    ease:'power4.out';
    crscr.style.opacity=0;
  })
  i.addEventListener('mouseleave',()=>{
    transform:'scale(1)';
    ease:'power4.out';
    crscr.style.opacity=1;
  })
})

const iOfFooter = document.querySelectorAll('footer i');
iOfFooter.forEach((i)=>{
  i.addEventListener('mouseenter',()=>{
    crscrEnlarge(i);
  })
  i.addEventListener('mouseleave',()=>{
    crscrNormal(i);
  })
})

// info tab code
selfBTN.addEventListener("mouseenter",()=>{
  info.style.height = "25vmax" ; 
  info.style.opacity = 1;
})
info.addEventListener("mouseleave",()=>{
  info.style.height =  0 ;
  info.style.opacity = 0;
})


// button Animations
function btnAnimation(button){
  const text = button.querySelector('.text');
  const span1 = button.querySelector('.one');
  const span2 = button.querySelector('.two');
  const span3 = button.querySelector('.three');

  const tl = gsap.timeline(); 
  tl.to(span1, {
    top: '-100%',
    duration: 0.2,
    ease: 'Expo.ease',
  });

  tl.to(span2, {
    top: '-100%',
    duration: 0.1,
    ease: 'Expo.ease',
  });

  tl.to(span3, {
    top: '-58%',
    duration: 0.1,
    ease: 'Expo.ease',
  });
  button.addEventListener('mouseenter', () => {

    crscrEnlarge(button)
    gsap.to(button, {
      scale: 1.04,
    });
    
    gsap.to(text, {
      top: '27%',
      duration: 0.2,
      ease: 'Expo.ease',
    });
  
    tl.play()
    
  });

  button.addEventListener('mouseleave', () => {
    crscrNormal(button);
    gsap.to(button, {
      scale: 1,
    });

    gsap.to(text, {
      top: '100%',
      duration: 0.01,
    });

    tl.reverse()

  });
}
buttons.forEach(button => {
  btnAnimation(button);
});


// pg5 revealing Animation
var tl = gsap.timeline({
  scrollTrigger: {
    trigger:'.pg5',
    // markers:true,
    start:'50% 50%',
    end:'100% 50%',
    scrub:true,
    pin:true,
    scroller:'main'
  }
})
tl.to('.top',{
  top:'-50%'
},'a')
.to('.bottom',{
  bottom:'-50%',
},'a')
.to('#top-h',{
  top:'150%',
},'a')
.to('#bottom-h',{
  bottom:'-80%',
},'a')

// Canvas code started here

function canvasCode(){
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getCurrentFrame(index) {
  return `./images/img(${index.toString()}).jpg`;
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

const frameCount = 299;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = getCurrentFrame(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: canvas,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: canvas,
  pin: true,
  // markers:true,
  scroller: `main`,
//   set start end according to preference
  start: `top top`,
  end: `725% bottom`,
});
}
canvasCode()

// footer code 
const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  document.getElementById('currentYear').textContent = currentYear;


  // .text rotation

  function text (){
    allh2 = document.querySelectorAll('.text h2');
    allh1 = document.querySelectorAll('.text h1');
    allh2.forEach((h2)=>{
      gsap.from(h2,{
        rotateX:90,
        scrollTrigger:{
         trigger:h2,
         scroller :'main',
         start:'top 70%',
         end:'top 60%',
         ease:'power1.out',
         scrub:1,
        //  markers:true,
        }
   })
    })
    allh1.forEach((h1)=>{
      gsap.from(h1,{
        rotateX:90,
        scrollTrigger:{
         trigger:h1,
         scroller :'main',
         start:'top 70%',
         end:'top 60%',
         ease:'power1.out',
         scrub:1,
        //  markers:true,
        }
   })
    })
  }
  text()
  
// magnet effect for h1s 
const magneth1s = document.querySelectorAll('.magnet h1')
magneth1s.forEach(h1 =>{
  h1.addEventListener('mousemove', (e)=>{
      const position = h1.getBoundingClientRect();
      //Get the correct position of cursor when hover to the button
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
    console.log(x,y)
      //Set the button position
      h1.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      //Same thing with the span element
      h1.children[0].style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      // pointer.classList.add('buttonHover');
  })

  //It change postion but not go back to the original positon, so what we should do
  h1.addEventListener('mouseout', ()=>{
      h1.style.transform = `translate(0px, 0px)`;
      //Same thing with the span element
      h1.children[0].style.transform = `translate(0px, 0px)`;
      // Remove buttonHover
      // pointer.classList = 'pointer';
  })
})
  
// cursor code started here

const crscr = document.querySelector('.cursor')

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  console.log(mouseX,mouseY)
});

function updateCursorPositions() {
  // Calculate the position for the cursor to remain centered
  const cursorWidth = crscr.offsetWidth;
  const cursorHeight = crscr.offsetHeight;
  const cursorX = mouseX - cursorWidth / 2;
  const cursorY = mouseY - cursorHeight / 2;

  crscr.style.delay = `0.8s`
  crscr.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(updateCursorPositions);
}

  updateCursorPositions();

const root = document.documentElement;
const fontColor = getComputedStyle(root).getPropertyValue('--font-color');
// Crscr enlarge function code & styling
function crscrEnlarge(a){
  // Calculate the new cursor position to keep it centered
  const cursorWidth = crscr.offsetWidth;
  const cursorHeight = crscr.offsetHeight;
  const cursorX = mouseX - cursorWidth / 2;
  const cursorY = mouseY - cursorHeight / 2;

  
  crscr.style.width = '80px'; // Adjust the width as needed
  crscr.style.height = '80px'; // Adjust the height as needed
  crscr.style.transition = 'width 0.3s, height 0.3s';
  crscr.style.transform = `translate(${cursorX}px, ${cursorY}px)`; // Set the new position
  crscr.style.backgroundColor ='transparent';
  crscr.style.border = isDarkMode ? '1px solid #000': '1px solid #fff';
}

// Crscr normal function code & styling
function crscrNormal(a){
    crscr.style.width = '20px'; // Reset the width
    crscr.style.height = '20px'; // Reset the height
    crscr.style.transition = 'width 0.3s, height 0.3s';
    crscr.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`; // Reset the position
    crscr.style.backgroundColor = isDarkMode ? 'black': 'white';
    crscr.style.border = '0px solid #000';
}


// loder code started here
let loader = document.getElementById("loderh1");

function load() {
    let intervalId = setInterval(() => {
        let number = Math.ceil(Math.random() * 100);
        if (number >= 100) {
            // console.log(+ ' completed');
            loader.innerText = `${number}%` ;
            loderAnimation()
            loader.style.display='none';
            clearInterval(intervalId);
        } else {
            loader.innerText = `${number}%` 
        }
    }, 50);
}
load();

function loderAnimation(){
  var tl = gsap.timeline();
  tl.to('#loderImg',{
    duration: 1, 
    scale: 3, 
    ease: "power2.out" ,
  },'a')
  tl.to('.loder',{
    duration: 0.5, 
    opacity:0,
    ease: "power2.out" ,
  },'a')
  tl.from('.pg1headings h1',{
    duration: 1,
    delay:0.5, 
    y:200,
    opacity:0,
    ease: "power2.out" ,
  },'a')
  
}
