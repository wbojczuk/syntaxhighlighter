# HTML SYNTAX HIGHLIGHTER

Demo - https://wbojczuk.github.io/syntaxhighlighter/

About Syntax Highlighter:
Created in 2022 by William Bojczuk, Syntax Highlighter uses a combination of Vanilla JavaScript and complex Regular Expressions to highlight the code.
All colors are customizable and accept any color values supported by CSS3. Options can be changed globally via the "syntaxHighlighter" object.
SyntaxHighlighter supports input formatted in elements such as text-area elements. The program will convert input line-breaks "/n" to HTML5 line breaks "<br>" upon program execution.

HTML special characters are converted into HTML Entities during initial text processing.

Spaces are converted to &nbsp; entities to preserve all original spacing.

The HTML color profiles include: Elements, Open/Close Chars, Comments, Attributes, String Values, DOCTYPE declarations, URLs

The CSS color profiles include: Selectors, Style Rules, Style Values (Numerical and string/hex values have their own profiles), Comments, URLs, @import/@keyframes declarations, url(), rgb(a)

How Syntax Highlighter works:


A Basic Overview:
Each aspect of the code that needs to be highlighted is matched via Regular Expressions. The matches of each aspect are saved in an array, the matches original locations in the text string that the program is parsing are saved in a variable named matchLocation.  The matches are then wrapped in a <span> element and injected back into the main text string using the original location stored in the matchLocation variable.
  
  
HTML Attributes:
The first RegEx gets all matches of either "<element>, or <element/>", and all following tasks are completed in each match. HTML attribute diversity was an obstacle. For instance a single HTML element might look something like <element disabled onclick="function();" content="IE=edge" content="width=device-width, initial-scale=1.0"> . There is a lot to consider here when creating the RegEx. You cannot test matches based on "=" as some "=" are part of a string value. My final solution seperates attribute matches based on whether or not they contain a string value eg(attribute VS attribute="stringVal"). If the match does not contain a string value, the procedure is very simple and only requires a <span> wrap and inject. If the attribute contains a string value, a new RegEx expression is ran on the match to seperate the attribute and the string value so they can be wrapped in different colored <span>s. using the "split" method to make the seperation, the "=" is destroyed in the split and is re-applied during the injection so it is not colored in the process.  For elements with multiple attributes, the <span> wrapped attributes are built in a temporary container, and that container is injected into the original text string.
  
  
HTML DOCTYPE:
The HTML <!DOCTYPE html> declaration has its own color profile. This match is relatively easy as you can test for <!DOCTYPE ~ ~ ~ > and there is not much diversity.

  
  HTML Open/Close characters (<, >, />):
The HTML O/C characters are found via three RegEx. One that tests for "<" characters that are immediately followed by valid characters, second tests for ">" characters, third tests for "/>" character combinations. O/C characters have their own color profiles.

  
  HTML <!-- COMMENTS -->:
These are tested for last. The reason for this is if, the comment contains an HTML Element/etc that was styled, this section can test for it, and override the color/styles with the comment's color profile.

  
CSS Overview:
CSS3 is a little more complicated than HTML. The overall system is similar but the RegEx are more complicated. 
@keyframes notes:
A bit of an obstacle was @keyframes{styles}. The layout of @keyframes is really similar to CSS selectors/styles with the exception of a @ preceding the selector. Because of the very complex RegEx needed to make this work, only 4 @keyframes instances are supported in a single file for performance reasons. This limit can be edited in the source code but it is not recommended. Also an @keyframes{} instance cannot be left empty, or the script will throw an error.

NOTES:
This script was created in 7 days, with 2 days being dedicated to getting a basic system down. This script was created for simple extremely easy plugin and use.
Not supported by Safari, a known bug regarding js generated inline styling in Safari renders the script

  
  Very large CSS pages (400+ words) with complex content could produce some unwanted results, please preview the result and confirm it is the desired result if you intend on using this script for large pages.
