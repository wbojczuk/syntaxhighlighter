

codeFormatter();
function codeFormatter() {
    
    var colorHTMLElement = "<span style='color:#2e5cb8'>";
    
    var colorHTMLAttribute = "<span style='color:#34dbeb'>";

    var colorHTMLString = "<span style='color:#b5612d'>";

    var colorHTMLDoctype = "<span style='color:#4576d6'>";

    var colorHTMLComment = "<span style='color:#178a00'>";

    var textColor = "white";
    

    var formatHTMLElems = document.querySelectorAll(".formatHTML");

    for(var e = 0; e < formatHTMLElems.length; e++) {
        formatHTMLElems[e].style.color = textColor;
            var textTemp1 = "";
            var textTemp = "";
            var currentTextTemp = "";
            var currentText = formatHTMLElems[e].textContent.replace(/ /g, "~");
            currentText = currentText.replace(/\n/g, "*br*");
            currentText = currentText.replace(/<br>/g, "*br*");
            currentText = currentText.replace(/<br\/>/g, "*br*");
            currentText = currentText.replace(/\//g, "****");
            currentText = currentText.replace(/</g, "^^&#60-^");
            currentText = currentText.replace(/>/g, "^^&#62;^");
            
            
            
            

            var frontHTMLRegEx = /&#60-[a-z0-9]{1,}/gi;

            var insideHTMLRegEx = /(\^\^&#60-\^[\!]*[a-z0-9]{1,}~{1,}[^\^]{1,}\^\^&#62;\^)|(\^\^&#60-\^[a-z0-9]{1,}~{1,}[^\^]{1,}[\*]{4}\^\^&#62;\^)/gi;
            

            var insideMatches;
            var insideAmount = 0;
            if(insideHTMLRegEx.test(currentText)){
                insideAmount = currentText.match(insideHTMLRegEx).length;
                insideMatches = currentText.match(insideHTMLRegEx);
            }

             
            for(let i = 0; i < insideAmount; i++) {
                
                
                var currentLocation = currentText.indexOf(insideMatches[i]);
                var currentTextLength = insideMatches[i].length;

                
                
                var attributes = insideMatches[i].split(/(?<![=][,"\!][^'"\!]*[~]*[^'"\!]*[~]*[^'"\!]*[~]*[^'"\!]*[~]*[^'"\!]*[~]*[^'"\!]*[~]*)~(?=[^~][^\&\*^])/gi);
                
                
                
                if(attributes.length < 3){

                if (/=/.test(attributes[attributes.length - 1])) {
                    
                    if ( attributes[attributes.length - 1].match(/=/g).length > 1) {

                        
                    }
                    var splitArray = attributes[attributes.length - 1].split(/=(?=['"])/gi);
                    var tempAttribute = splitArray[0];
                    var values = splitArray[1];
                    values = "=" + values;
                    
                    
                    tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";

                    var finishedElement = attributes[0] + tempAttribute + values; 
                    

                    /* CONCAT TIMEEE BOIS */

                    var frontTemp = currentText.slice(0,currentLocation);
                    var backTemp = currentText.slice(currentLocation + currentTextLength);
                    currentText = frontTemp + finishedElement + backTemp;

                } else {
                    var splitArray;
                    if (/[a-z0-9][~](?![~]*\^\^)/.test(attributes[attributes.length - 1])) {
                        
                        splitArray = attributes[attributes.length - 1].split(/(?<=[a-z0-9])[~](?![~]*\^\^)/gi);
                        splitArray[1] = "~" + splitArray[1];
                    } else if (/[a-z0-9=][~]*\^\^/.test(attributes[attributes.length - 1])) {
                        
                        splitArray = attributes[attributes.length - 1].split(/(?<=[a-z0-9])[~]*\^\^/gi);
                        splitArray[1] = "^^" + splitArray[1];
                        
                    }
                    else if (/[a-z0-9][~]*[\*]{4}\^\^/.test(attributes[attributes.length - 1])) {
                        splitArray = attributes[attributes.length - 1].split(/(?<=[a-z0-9])[~]*[\*]{4}\^\^/gi);
                        splitArray[1] = "****^^" + splitArray[1];
                        
                    } 
                    var tempAttribute = splitArray[0];
                    tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";
                    var finishedElement = attributes[0] + tempAttribute + splitArray[1];
                    if (/\^/.test(splitArray[0])){finishedElement = attributes[attributes.length - 1];};
                    /* CONCAT TIMEEE BOIS */

                    var frontTemp = currentText.slice(0,currentLocation);
                    var backTemp = currentText.slice(currentLocation + currentTextLength);
                    currentText = frontTemp + finishedElement + backTemp;
                }

            }else if (attributes.length > 2) {
                
                    var attributeContainer = "";
                    for (var g = 1; g < attributes.length; g++){
                        
    
                        if (/=/.test(attributes[g])) {
                            var splitArray = attributes[g].split(/=/gi);
                            var tempAttribute = splitArray[0];
                            var values = "=";
                            for (l = 1; l < splitArray.length; l++) {
                                
                                if (splitArray.length > 1 && l > 1) {
                                splitArray[l] = "=" + splitArray[l];
                                values += splitArray[l];
                                } else {
                                    values += splitArray[l];
                                }
                            }
                            
                            
                            tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";
        
                            var finishedElement = tempAttribute + values; 
                            
                            attributeContainer += finishedElement;
        
                        } else {
                            var splitArray;
                            var tempAttribute;
                            var finishedElement
                            
                            if (/[a-z0-9][~'"]*[\*]{4}\^\^/.test(attributes[g])) {
                                splitArray = attributes[g].split(/(?<=[a-z0-9][~'"]*)[\*]{4}\^\^/gi);
                                splitArray[1] = "****^^" + splitArray[1];
                                tempAttribute = splitArray[0];
                                
                                tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";
                                finishedElement = tempAttribute + splitArray[1];
                                
                            } else if (/[a-z0-9][~'"]*\^\^/.test(attributes[g])) {
                                splitArray = attributes[g].split(/(?<=[a-z0-9][~'"]*)\^\^/gi);
                                splitArray[1] = "^^" + splitArray[1];
                                tempAttribute = splitArray[0];
                                tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";
                                finishedElement = tempAttribute + splitArray[1];
                                
                            }else if (/[a-z0-9]/.test(attributes[g])) {
                                
                                splitArray = attributes[g];
                                splitArray[1] =  splitArray + "~" ;
                                tempAttribute = splitArray;
                                tempAttribute = "~" + colorHTMLAttribute + tempAttribute + "</span>";
                                finishedElement = tempAttribute;
                               
                                
                            } 
                            
                            
                            
                            attributeContainer += finishedElement;
                            
                            
                    }
    
                }
                        var frontTemp = currentText.slice(0,currentLocation);
                        var backTemp = currentText.slice(currentLocation + currentTextLength);
                        currentText = frontTemp + attributes[0] + attributeContainer + backTemp;
                        
                    
                }

                
                
            }

            // STRINGS
            var stringHTMLRegEx = /(?<==)["](?=.*["])/gi;

            var htmlMatches = currentText.match(insideHTMLRegEx);
            var htmlMatchesLength = 0;
            if (stringHTMLRegEx.test(currentText)) {
                htmlMatchesLength = htmlMatches.length;
            }
            for(var i = 0; i < htmlMatchesLength; i++) {
                var currentLocation = currentText.indexOf(htmlMatches[i]);
                var currentTextLength = htmlMatches[i].length;

                var stringMatches = htmlMatches[i].split(stringHTMLRegEx);
                var stringContainer = stringMatches[0];
               
                
                for ( var l = 1; l < stringMatches.length; l++) {
                    var snippedStringsAgain = stringMatches[l].split(/["]/);
                    var tempString = colorHTMLString + '"' + snippedStringsAgain[0] + '"' + "</span>" + snippedStringsAgain[1];
                    
                    stringContainer += tempString;
                   

                }
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + currentTextLength);
                currentText = frontTemp + stringContainer + backTemp;
   
            
        }

        // DOCTYPE 
        var doctypeHTMLRegEx = /(?<=\^\^&#60-\^\!)[a-z0-9]{1,}(?=~)/gi;
        var doctypeMatches = currentText.match(doctypeHTMLRegEx);
        var doctypeMatchesLength = 0;
        if (doctypeHTMLRegEx.test(currentText)) {
            doctypeMatchesLength = doctypeMatches.length;
        }

        for (let i = 0; i < doctypeMatchesLength; i++) {
            var currentLocation = currentText.indexOf(doctypeMatches[i]);
            var textLength = doctypeMatches[i].length;
            var frontTemp = currentText.slice(0, currentLocation);
            
            var backTemp = currentText.slice(currentLocation + textLength);

            currentText = frontTemp + colorHTMLDoctype + doctypeMatches[i] + "</span>" + backTemp;

        }

        // COMMENTS 


        var commentHTMLRegEx = /\^\^&#60-\^\![-]{2}[^\!]{1,}[-]{2}\^\^&#62;\^/gi;

        var commentHTMLMatches = currentText.match(commentHTMLRegEx);
        var commentHTMLMatchesLength = 0;

        if (commentHTMLRegEx.test(currentText)) {
            commentHTMLMatchesLength = commentHTMLMatches.length;
        }

        for (let i = 0; i < commentHTMLMatchesLength; i++) {
            var currentLocation = currentText.indexOf(commentHTMLMatches[i]);
            var textLength = commentHTMLMatches[i].length;
            var frontTemp = currentText.slice(0, currentLocation);
            
            var backTemp = currentText.slice(currentLocation + textLength);

            currentText = frontTemp + colorHTMLComment + commentHTMLMatches[i] + "</span>" + backTemp;

        }

            
            
            /* RE-encode some things */
            currentText = currentText.replace(/\^\^&#62;\^/gi, "&#62;");
            currentText =  currentText.replace(/\^\^&#60-\^/gi, "&#60-");
            currentText = currentText.replace(/\*\*\*\*/g, "&#47-");
            currentText = currentText.replace(/\^&#47-/g, "&#47-");
            currentText = currentText.replace(/&#47;/g, "&#47-");
            currentText = currentText.replace(/~/g, "&nbsp;");
            var backHTMLRegEx = /&#60-&#47-[a-z0-9]{1,}/gi;
            
            

            var frontAmount = 0;

                if (frontHTMLRegEx.test(currentText)) {
                    frontAmount = currentText.match(frontHTMLRegEx).length;
                }

             
            

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

            var backAmount = 0;

                if (backHTMLRegEx.test(currentText)) {
                    backAmount = currentText.match(backHTMLRegEx).length;
                }
                
            

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
            currentText = currentText.replace(/&#47-/g, "&#47;");
            currentText = currentText.replace(/\*br\*/g, "<br>");
            currentText = currentText.replace(/&#60-/g, "&#60;");
                formatHTMLElems[e].innerHTML = currentText;


                

    
        


    }
} 