/*
 Program: syntaxhighlighter.js
 Version: 1.0
 Creator: William Bojczuk (wiliambojcuzk@gmail.com)
 License: BSD
 Github: https://github.com/wbojczuk
 Website: https://williambojczuk.com
 
 */

var syntaxHighlighter = {


// START HTML OPTIONS

// TEXT COLOR
    HTMLTextColor: "white",

// COLOR SETTINGS
    HTMLAttributeColor: "#34dbeb",
    HTMLElementColor: "#2e5cb8",
    HTMLStringColor: "#b5612d",
    HTMLCommentColor: "#178a00",
    HTMLDoctypeColor: "#4576d6",
    HTMLElementCOTagsColor: "rgba(130, 130, 130, 0.788)",
    
    // DON'T PROCESS <br>,<br/>
    HTMLKeepBR: true,

    // END HTML OPTIONS

    // START CSS OPTIONS
    CSSTextColor : "white",

    CSSSelectorColor : "#debb3c",
    CSSStyleRuleColor: "#34dbeb",
    CSSStyleRuleValueColorString: "rgb(185, 85, 28)",
    CSSStyleRuleValueColorNumeric: "rgb(119, 181, 110)"
};

syntaxHighlighterScript();
function syntaxHighlighterScript() {
    
    var colorHTMLElement = "<span style='color:" + syntaxHighlighter.HTMLElementColor + "'>";
    
    var colorHTMLAttribute = "<span style='color:" + syntaxHighlighter.HTMLAttributeColor + "'>";

    var colorHTMLString = "<span style='color:" + syntaxHighlighter.HTMLStringColor + "'>";

    var colorHTMLDoctype = "<span style='color:" + syntaxHighlighter.HTMLDoctypeColor + "'>";

    var colorHTMLComment = "<span style='color:" + syntaxHighlighter.HTMLCommentColor + "'>";

    var HTMLLinkStyle = "<span style='text-decoration:underline'>";

    var colorHTMLCOTags = "<span style='color:" + syntaxHighlighter.HTMLElementCOTagsColor + "'>";

    var colorCSSStyleRule = "<span style='color:" + syntaxHighlighter.CSSStyleRuleColor + "'>";

    var colorCSSSelector = "<span style='color:" + syntaxHighlighter.CSSSelectorColor + "'>";

    var colorCSSStyleRuleValueString = "<span style='color:" + syntaxHighlighter.CSSStyleRuleValueColorString + "'>";

    var colorCSSStyleRuleValueNumeric = "<span style='color:" + syntaxHighlighter.CSSStyleRuleValueColorNumeric + "'>";
    

    var formatHTMLElems = document.querySelectorAll(".syntaxHTML");
    console.log(formatHTMLElems.length)

    for(var e = 0; e < formatHTMLElems.length; e++) {
        formatHTMLElems[e].style.color = syntaxHighlighter.HTMLTextColor;
            var currentText = formatHTMLElems[e].textContent.replace(/ /g, "~");
            currentText = currentText.replace(/\n/g, "*br*");
            if(syntaxHighlighter.HTMLKeepBR) {
                currentText = currentText.replace(/<br[~]*>/g, "*br*");
                currentText = currentText.replace(/<br[~]*\/>/g, "*br*");
            }
            currentText = currentText.replace(/\//g, "****");
            currentText = currentText.replace(/</g, "^^&#60-^");
            currentText = currentText.replace(/>/g, "^^&#62;^");
            
            
            
            

            

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

                
                
                var attributes = insideMatches[i].split(/(?<![=][,"\!][^"\!]*[~]*[^"\!]*[~]*[^"\!]*[~]*[^"\!]*[~]*[^"\!]*[~]*[^"\!]*[~]*)~(?=[^~][^\&\*^])/gi);
                
                
                
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

        // DOCTYPE BACK TAG THINGY

        var doctype2HTMLRegEx = /(?<=\^\^&#60-\^\!)[a-z0-9]{1,}[^\^]*\^\^&#62;\^/gi;


            var doctype2HTMLMatches = currentText.match(doctype2HTMLRegEx);
            var doctype2HTMLMatchesLenth = 0;

            if(doctype2HTMLRegEx.test(currentText)){
                doctype2HTMLMatchesLenth = doctype2HTMLMatches.length;
            }
            for (let i = 0; i < doctype2HTMLMatchesLenth; i++) {
                var currentLocation = currentText.indexOf(doctype2HTMLMatches[i]);
                var textLength = doctype2HTMLMatches[i].length;
                var finished = doctype2HTMLMatches[i].split(/\^/)[0] + colorHTMLCOTags + "&#62;" + "</span>";
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + textLength);
                currentText = frontTemp + finished + backTemp;
            }

            

        // DOCTYPE 
        var doctypeHTMLRegEx = /\^\^&#60-\^\![a-z0-9]{1,}(?=~)/gi;
        
        var doctypeMatches = currentText.match(doctypeHTMLRegEx);
        
        var doctypeMatchesLength = 0;
        if (doctypeHTMLRegEx.test(currentText)) {
            doctypeMatchesLength = doctypeMatches.length;
        }

        for (let i = 0; i < doctypeMatchesLength; i++) {
            var currentLocation = currentText.indexOf(doctypeMatches[i]);
            var textLength = doctypeMatches[i].length;
            var frontTemp = currentText.slice(0, currentLocation);

            var actualDoc = doctypeMatches[i].match(/[a-z]{1,}/gi);
            
            var backTemp = currentText.slice(currentLocation + textLength);

            currentText = frontTemp + colorHTMLCOTags + doctypeMatches[0].split(/[a-z]/gi)[0] + "</span>" + colorHTMLDoctype + actualDoc + "</span>" + backTemp;

        }

        currentText = currentText.replace(/~/g, "&nbsp;");
        currentText = currentText.replace(/\^\^&#60-\^\![-]{2}/gi, "~");

        
            currentText =  currentText.replace(/\^\^&#60-\^/gi, "&#60-");
            // currentText = currentText.replace(/\*\*\*\*/g, "^&#47;");
            
            
            
            var backHTMLRegEx = /&#60-\*\*\*\*[a-z0-9]{1,}/gi;

            var frontHTMLRegEx = /&#60-[a-z0-9]{1,}/gi;

            var front3HTMLRegEx = /(?<=&#60-)[a-z0-9]{1,}[^\^]*\*\*\*\*\^\^&#62;\^/gi;

            var front3HTMLMatches = currentText.match(front3HTMLRegEx);
            var front3HTMLMatchesLenth = 0;

            if(front3HTMLRegEx.test(currentText)){
                front3HTMLMatchesLenth = front3HTMLMatches.length;
            }
            for (let i = 0; i < front3HTMLMatchesLenth; i++) {
                var currentLocation = currentText.indexOf(front3HTMLMatches[i]);
                var textLength = front3HTMLMatches[i].length;
                var finished = front3HTMLMatches[i].split(/\*/)[0] + colorHTMLCOTags + "&#47;&#62;" + "</span>";
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + textLength);
                currentText = frontTemp + finished + backTemp;
            }

            var front2HTMLRegEx = /(?<=&#60-)[a-z0-9]{1,}[^\^]*\^\^&#62;\^/gi;

            var front2HTMLMatches = currentText.match(front2HTMLRegEx);
            var front2HTMLMatchesLenth = 0;

            if(front2HTMLRegEx.test(currentText)){
                front2HTMLMatchesLenth = front2HTMLMatches.length;
            }
            for (let i = 0; i < front2HTMLMatchesLenth; i++) {
                var currentLocation = currentText.indexOf(front2HTMLMatches[i]);
                var textLength = front2HTMLMatches[i].length;
                var finished = front2HTMLMatches[i].split(/\^/)[0] + colorHTMLCOTags + "&#62;" + "</span>";
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + textLength);
                currentText = frontTemp + finished + backTemp;
            }


            var back1HTMLRegEx = /(?<=&#60-\*\*\*\*)[a-z0-9]{1,}[^\^]*\^\^&#62;\^/gi;


            var back1HTMLMatches = currentText.match(back1HTMLRegEx);
            var back1HTMLMatchesLenth = 0;

            if(back1HTMLRegEx.test(currentText)){
                back1HTMLMatchesLenth = back1HTMLMatches.length;
            }
            for (let i = 0; i < back1HTMLMatchesLenth; i++) {
                var currentLocation = currentText.indexOf(back1HTMLMatches[i]);
                var textLength = back1HTMLMatches[i].length;
                var finished = back1HTMLMatches[i].split(/\^/)[0] + colorHTMLCOTags + "&#62;" + "</span>";
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + textLength);
                currentText = frontTemp + finished + backTemp;
            }
            
            

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

                var frontTemp = currentText.slice(0, currentLocation) + colorHTMLCOTags + "&#60;" + "</span>";
                 
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

                var currentMatchString = currentText.match(backHTMLRegEx)[0].slice(9);

                
                var spanText = colorHTMLElement + currentMatchString + "</span>";
                var textLength = currentMatchString.length; 
                var allTextLength = currentText.match(backHTMLRegEx)[0].length;
            
                
                /* CONCAT TIMEEE */

                var frontTemp = currentText.slice(0, currentLocation) + colorHTMLCOTags + "&#60;&#47;" + "</span>";
                 
                var backTemp = currentText.slice(currentLocation + allTextLength);

                /* snip/convert HTML ENTITIES */


                currentText = frontTemp + spanText + backTemp;
                
                
                
                
                
                
            }

            // COMMENTS 

       
        var commentHTMLRegEx = /~[^\~]{1,}[-]{2}\^\^&#62;\^/gi;

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
            

            // REPLACE COLORS WITH COMMENT COLORS
            var extraColorsRegEx = /<span style='color:[^'>]*'>/gi;
            var extraColorsLength = 0;
            var extraColorsMatches = commentHTMLMatches[i].match(extraColorsRegEx);
            if (extraColorsRegEx.test(commentHTMLMatches[i])){
                extraColorsLength = extraColorsMatches.length;
            }
            for(let y = 0; y < extraColorsLength; y++) {
                var currentColorLocation = commentHTMLMatches[i].indexOf(extraColorsMatches[y]);
                var currentColorLength = extraColorsMatches[y].length;
                var frontColorTemp = commentHTMLMatches[i].slice(0, currentColorLocation);
                var backColorTemp = commentHTMLMatches[i].slice(currentColorLocation + currentColorLength);
                commentHTMLMatches[i] = frontColorTemp + colorHTMLComment + backColorTemp;

            }

            currentText = frontTemp + colorHTMLComment + commentHTMLMatches[i] + "</span>" + backTemp;

        }

        // links

        var HTMLLinkRegEx = /(https|http):\*\*\*\*\*\*\*\*[^~\^"'\)\()]*/gi;
        var HTMLLinkMatchesLength = 0;
        var HTMLLinkMatches = currentText.match(HTMLLinkRegEx);
            if(HTMLLinkRegEx.test(currentText)) {
                HTMLLinkMatchesLength = HTMLLinkMatches.length;
            }

            for (let i = 0; i < HTMLLinkMatchesLength; i++) {
                var currentLocation = currentText.indexOf(HTMLLinkMatches[i]);
                var currentTextLength = HTMLLinkMatches[i].length;
                var finishedElement = HTMLLinkStyle + HTMLLinkMatches[i] + "</span>";

                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLocation + currentTextLength);
                currentText = frontTemp + finishedElement + backTemp;
            }
        
            
            /* RE-encode some things */
            currentText = currentText.replace(/~/gi,"&#60-!--"); 
            currentText = currentText.replace(/\*\*\*\*/g, "&#47;");
            currentText = currentText.replace(/\^\^&#62;\^/gi, "&#62;");
            
            currentText = currentText.replace(/\*br\*/g, "<br>");
            currentText = currentText.replace(/&#60-/g, "&#60;");
            
                formatHTMLElems[e].innerHTML = currentText;


                

    
        


    }

    // CSSS

    var syntaxCSSElems = document.querySelectorAll(".syntaxCSS");

    for(let a = 0; a < syntaxCSSElems.length; a++) {
        var currentText = syntaxCSSElems[a].textContent.replace(/ /g, "~");
        currentText = currentText.replace(/\n/g, "<br>");
        syntaxCSSElems[a].style.color = syntaxHighlighter.CSSTextColor;

        var CSSStylesRegEx = /(?<=\{)[^\{\}]{1,}(?=\})/gi;
        var CSSStylesMatches;
        var CSSStylesLength = 0;
        if(CSSStylesRegEx.test(currentText)) {
            CSSStylesMatches = currentText.match(CSSStylesRegEx);
            CSSStylesLength = CSSStylesMatches.length;
        }
        

        for(var i = 0;  i < CSSStylesLength; i++) {
            var currentStyleLocation = currentText.indexOf(CSSStylesMatches[i]);
            var currentStyleLength = CSSStylesMatches[i].length;

            var CSSStyleRulesRegEx = /[a-z0-9-]{1,}[~]*\:[^\;\{\}]{1,}(?=\;)/gi;
            
            var CSSStyleRulesMatches;
            var CSSStyleRulesLength = 0;

            if(CSSStyleRulesRegEx.test(currentText)) {
                CSSStyleRulesMatches = CSSStylesMatches[i].match(CSSStyleRulesRegEx);
                CSSStyleRulesLength = CSSStyleRulesMatches.length;
            }
            for (var u = 0; u < CSSStyleRulesLength; u++) {
                var currentRuleLocation = CSSStylesMatches[i].indexOf(CSSStyleRulesMatches[u]);
                var currentRuleLength = CSSStyleRulesMatches[u].length;
                var splitArray = CSSStyleRulesMatches[u].split(":");
                var finished = ""
                if(/(?<!\#[a-z0-9]*)[0-9]{1,}/gi.test(splitArray[1])) {
                    finished = colorCSSStyleRule + splitArray[0] + "</span>:" + colorCSSStyleRuleValueNumeric + splitArray[1] + "</span>";
                } else {
                    finished = colorCSSStyleRule + splitArray[0] + "</span>:" + colorCSSStyleRuleValueString + splitArray[1] + "</span>";
                }
                var frontTemp1 = CSSStylesMatches[i].slice(0,currentRuleLocation);
                var backTemp1 = CSSStylesMatches[i].slice(currentRuleLength + currentRuleLocation);
                CSSStylesMatches[i] = frontTemp1 + finished + backTemp1;
                
            }
            var frontTemp = currentText.slice(0,currentStyleLocation);
            var backTemp = currentText.slice(currentStyleLength + currentStyleLocation);
            currentText = frontTemp + CSSStylesMatches[i] + backTemp

            
        }


        
        var CSSSelectorRegEx = /[-_a-z0-9\#\.\:]{1,}(?=[~]*\{)/gi; 
        var CSSSelectorMatches;
        var CSSSelectorLength = 0; 
            if (CSSSelectorRegEx.test(currentText)) {
                CSSSelectorMatches = currentText.match(CSSSelectorRegEx);
                CSSSelectorLength = CSSSelectorMatches.length;
            }
            for(var i = 0; i < CSSSelectorLength; i++) {
                var currentLocation = currentText.indexOf(CSSSelectorMatches[i]);
                var currentLength = CSSSelectorMatches[i].length;
                var frontTemp = currentText.slice(0,currentLocation);
                var backTemp = currentText.slice(currentLength + currentLocation);
                currentText = frontTemp + colorCSSSelector + CSSSelectorMatches[i] + "</span>" + backTemp
            }

            currentText = currentText.replace(/~/g, "&nbsp;");
            syntaxCSSElems[a].innerHTML = currentText;
        
    }


} 