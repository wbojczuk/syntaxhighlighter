                if (attributes[i].length > 2) {
                    var attributeContainer = "";
                    for (var g = 1; g > attributes[i].length; g++){
    
                        if (/=/.test(attributes[g])) {
                            var splitArray = attributes[g].split(/=/gi);
                            var tempAttribute = splitArray[0];
                            var values = splitArray[1];
                            values = "=" + values;
                            
                            tempAttribute = "&nbsp;" + colorHTMLAttribute + tempAttribute + "</span>";
        
                            var finishedElement = tempAttribute + values; 
                            attributeContainer += finishedElement;
        
                        } else {
                            var splitArray;
                            if (/[a-z0-9]&nbsp;/.test(g)) {
                                splitArray = attributes[g].split(/(?<=[a-z0-9])&nbsp;/gi);
                                splitArray[1] = "&nbsp;" + splitArray[1];
                            } else if (/[a-z0-9]\^\^/.test(attributes[g])) {
                                splitArray = attributes[g].split(/(?<=[a-z0-9])\^\^/gi);
                                splitArray[1] = "^^" + splitArray[1];
                            }
                            var tempAttribute = splitArray[0];
                            tempAttribute = "&nbsp;" + colorHTMLAttribute + tempAttribute + "</span>";
                            var finishedElement = tempAttribute + splitArray[1];
                            attributeContainer += finishedElement;
    
                    }
    
                }
                        var frontTemp = currentText.slice(0,currentLocation);
                        var backTemp = currentText.slice(currentLocation + currentTextLength);
                        currentText = frontTemp + attributes[0] + finishedElement + backTemp;
                    
                }