console.log("JavaScript Working");

const headings = document.querySelectorAll(
    "#heading, #heading-skills, #headingproject"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.2
});

headings.forEach((heading) => {
    observer.observe(heading);
});


// TYPING ANIMATION

const typed = new Typed(".typing", {
    strings: [
        "ASP.NET Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Web Developer"
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});





const card = document.querySelector(".glass-card");
const orbits = document.querySelectorAll(".orbit");

let angle = 0;

function animate() {

    angle += 0.01;

    const radius = 210;

    orbits.forEach((icon, index)=>{

        const a = angle + index * ((Math.PI*2)/orbits.length);

        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;

        icon.style.left = `calc(50% + ${x}px - 32px)`;
        icon.style.top = `calc(50% + ${y}px - 32px)`;

    });

    requestAnimationFrame(animate);

}

animate();

document.querySelectorAll(".nav-link").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>';

    });

});