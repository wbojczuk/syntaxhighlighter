

document.getElementById("testHTML").textContent = '<!DOCTYPE html><br>\
<html lang="en-us"><br>\
    <head><br>\
        <meta charset="UTF-8"><br>\
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><br>\
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/><br>\
        <title>Syntax Highlighting Demo</title><br>\
        <link rel="stylesheet" href="style.css"><br>\
        <!-- Yes... I made this --><br>\
        <script src="script.js" defer></script><br>\
        <script src="syntaxhighlighter.js" defer></script><br>\
        <a href="https://williambojczuk.com" target="_blank">Myself</a><br>\
    </head>';


    document.getElementById("testCSS").textContent = '@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600&display=swap");<br>\
    button {<br>\
    cursor: pointer;<br>\
    padding: 1vw 3vw;<br>\
    font-size: 2vw;<br>\
    background-color: rgb(60, 60, 60);<br>\
    color: #34dbeb;<br>\
    }<br>\
    /* I... Made it for CSS too :) */<br>\
.center {<br>\
    display: flex;<br>\
    align-items: center;<br>\
    justify-content: center;<br>\
}<br>\
#testHTML {<br>\
    background-image: url("./img/background.jpg");<br>\
    padding: 1vw;<br>\
    text-align: left;<br>\
    font-family: "Source Code Pro", monospace;<br>\
    max-height: 80vh;<br>\
    border: 1px solid rgb(111, 205, 255);<br>\
    overflow-y: auto;<br>\
}<br>\
@keyframes animation {<br>\
    from{background-position: 0%;}<br>\
    to{background-position: 100%;}<br>\
}';







    
