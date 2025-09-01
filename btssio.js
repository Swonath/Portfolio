// script.js
document.addEventListener("DOMContentLoaded", function() {
    const btnSISR = document.getElementById("btnSISR");
    const btnSLAM = document.getElementById("btnSLAM");
    const contentSISR = document.getElementById("contentSISR");
    const contentSLAM = document.getElementById("contentSLAM");

    btnSISR.addEventListener("click", function() {
        toggleContent(contentSISR, btnSISR);
    }); 

    btnSLAM.addEventListener("click", function() {
        toggleContent(contentSLAM, btnSLAM);
    });

    function toggleContent(contentElement, button) {
        contentElement.classList.toggle("visible");
        button.classList.toggle("active");
    }
});
