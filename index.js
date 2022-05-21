require("./index.css");


var $4fa36e821943b400$var$acc = document.getElementsByClassName("accordion");
var $4fa36e821943b400$var$i;
for($4fa36e821943b400$var$i = 0; $4fa36e821943b400$var$i < $4fa36e821943b400$var$acc.length; $4fa36e821943b400$var$i++)$4fa36e821943b400$var$acc[$4fa36e821943b400$var$i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) panel.style.maxHeight = null;
    else panel.style.maxHeight = panel.scrollHeight + "px";
});


//# sourceMappingURL=index.js.map
