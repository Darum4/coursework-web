function resizeSelect(select) {
    const tmp = document.createElement("span");
    tmp.style.visibility = "hidden";
    tmp.style.position = "absolute";
    tmp.style.font = getComputedStyle(select).font;
    tmp.innerText = select.options[select.selectedIndex].text;
    document.body.appendChild(tmp);
    select.style.width = (tmp.offsetWidth + 50) + "px";
    document.body.removeChild(tmp);
}

resizeSelect(document.getElementById("langSelect"));
resizeSelect(document.getElementById("dynamicSelect"));