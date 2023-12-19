// ==UserScript==
// @name         HN Expand Comment
// @namespace    https://news.ycombinator.com/item
// @description  Expand nested comments to improve readability on HN comments 
// @match        https://news.ycombinator.com/item*
// @author       Daniel de Vries
// @license      MIT
// @version      0.1
// ==/UserScript==


function main () {
    const ctree = document.querySelector("table.comment-tree");
    const tbody = ctree.querySelector("tbody");
    const tablerows = tbody.children

    for (let i = 0; i < tablerows.length; i++) {
        var comment = tablerows[i];
        var commentlength = comment.querySelector(".commtext").innerText.length
        var indenttd = comment.querySelector(".ind");
        let indent = indenttd.getAttribute("indent");
        // only add Expand button to comments nested deeper than 6
        // and have a comment charater length larger than 400
        if (indent < 6 || commentlength < 400) {continue}
        // if (indent < 6) {continue}
        var commentbtns = comment.querySelector(".comhead")
        var commentnav = commentbtns.querySelector(".navs")
        let input = document.createElement("input");
        styleBtn(input);
        input.dataset.commentid = comment.id;
        input.type="button";
        input.value="expand";
        input.onclick = function(){
            expandComment(input.dataset.commentid)
        };
        commentnav.textContent += " | "
        commentbtns.appendChild(input); 
    }
    function expandComment(argument){
        var comment = document.getElementById(argument)
        var indenttd = comment.querySelector(".ind");
        let indent = indenttd.getAttribute("indent");
        var gif = indenttd.querySelector("img")
        if (gif.width == 0 && indent > 0) {
            gif.width = 40 * indent 
        } else {
            gif.width = 0
        }
    }
    function styleBtn(btn){
        btn.style.background = "none";
        btn.style.color = "inherit";
        btn.style.border = "none";
        btn.style.padding = "0";
        btn.style.cursor = "pointer";
        btn.style.font = "inherit";
    }
}; main()

