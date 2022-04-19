codeFormatter();
function codeFormatter() {
    var colorHTMLElement = "<span style='color:#2e5cb8'>";

    var formattingEls = document.querySelectorAll(".codeFormatter");

    for(var e = 0; e < formattingEls.length; e++) {

        if(formattingEls[e].classList.contains("formatHTML")) {
            var textTemp1 = "";
            var textTemp = "";
            var currentTextTemp = "";
            var currentText = formattingEls[e].textContent.replace(/ /g, "&nbsp;");
            currentText = currentText.replace(/<br>/g, "*br*");
            currentText = currentText.replace(/<br\/>/g, "*br*");
            currentText = currentText.replace(/\//g, "&#47-");
            currentText = currentText.replace(/</g, "&#60-");
            currentText = currentText.replace(/>/g, "&#62;");
            
            
            var backHTMLRegEx = /&#60-&#47-[a-z0-9]{1,}/gi;

            var frontHTMLRegEx = /&#60-[a-z0-9]{1,}/gi;


            var frontAmount = currentText.match(frontHTMLRegEx).length;
            

            for(let i = 0; i < frontAmount; i++) {
                
                var currentLocation = currentText.indexOf(currentText.match(frontHTMLRegEx)[0]);
                var textLocation = currentLocation + 5;

                var currentMatchString = currentText.match(frontHTMLRegEx)[0].slice(5);
                var spanText = colorHTMLElement + currentMatchString + "</span>";
                var textLength = currentMatchString.length; 
                var allTextLength = currentText.match(frontHTMLRegEx)[0].length;
            
                
                /* CONCAT TIMEEE */

                var frontTemp = currentText.slice(0, currentLocation) + "&#60;";
                 
                var backTemp = currentText.slice(currentLocation + allTextLength);

                /* snip/convert HTML ENTITIES */


                currentText = frontTemp + spanText + backTemp;
                
                
                
                
                
                
            }

            var backAmount = currentText.match(backHTMLRegEx).length;
            

            for(let i = 0; i < backAmount; i++) {
                
                var currentLocation = currentText.indexOf(currentText.match(backHTMLRegEx)[0]);
                var textLocation = currentLocation + 10;

                var currentMatchString = currentText.match(backHTMLRegEx)[0].slice(10);

                
                var spanText = colorHTMLElement + currentMatchString + "</span>";
                var textLength = currentMatchString.length; 
                var allTextLength = currentText.match(backHTMLRegEx)[0].length;
            
                
                /* CONCAT TIMEEE */

                var frontTemp = currentText.slice(0, currentLocation) + "&#60;&#47;";
                 
                var backTemp = currentText.slice(currentLocation + allTextLength);

                /* snip/convert HTML ENTITIES */


                currentText = frontTemp + spanText + backTemp;
                
                
                
                
                
                
            }
                formattingEls[e].innerHTML = currentText;


                

    
        }


    }
} 