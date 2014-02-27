#Code Formatter#

[Code Formatter](https://sublime.wbond.net/packages/CodeFormatter) is a popular SublimeText plugin that facilitates consistent code. It'd be nice to have a setup on all of our computers (since I assume that everyone uses Sublime Text for their code) that allows whatever coding style we write to be as consistent as possible. If anyone needs help using Package Control, ask Alex for help. 

I've made a sample configuration that you can drop into your Preferences/Package Settings/Code Formatter/Settings - User that should more or less produce clean and consistent CSS, HTML, and Javascript code. The primary points of the formatter are listed below (and subject to change if people feel like there's a problem).

* For javascript
  * Indent size of 4 (soft tabs)
  * Maximum of two newlines between bits of code. This really ought to be one, but for readability it may be necessary to have two.
  * Spaces after functions and conditionals and before parentheses. 
  * ANSI style braces (these really ought to be Allman, but whatever).
  * Max line width: 80 characters. 
* CSS
  * Indent size of 4 (soft tabs)
  * Have newlines after selector separators
* HTML
  * Indent size of 2 (soft tabs) - HTML requires lots of div's and tables, so an indent size of two is slightly more sane here.
  * Maximum of two newlines between bits of code (again, this really ought to be zero or one)


After you are done writing code for the day, you can push Ctrl(Command for the less enlightenened among us)+Shift+P and type in "Format Code". It should automagically work. 

Some basic guidelines that the code formatter doesn't take care of (Also up for discussion). Use your discretion on the meaning of "long" or "lots":
* If you find yourself calling a lot of methods on each object, try to place each method on its own line (use your best judgement). The "." before the method call should be the beginning of the line. Make sure they are indented relative to the object they belong to. 
* Split long strings up into multiple lines. The "+" to concat strings should be at the beginning of the line.
* Split up long conditionals into multiple lines. The conditional operators (like "&&" or "||") should be at the beginning of the line. 
* Try to use as few numbers as possible in the code. If you must use numbers in a way that is not imediately clear, assign them to a variable at the top and use that variable. We'll call constants by this convention: "var NAME_OF_CONSTANT = whatever" so that it is absolutely clear what the numbers mean. We've already declared the ranks and suits as constants, use them if possible. 
* Whenever possible, use JQuery to interact with the HTML page
* What's the difference between function signatures: var nameOfFunction = function(arguments) vs function NameOfFunction (arguments)? Someone who knows more about this than I do decide if we ought to pick one or the other. 



Once again, anything on this page or in this folder is up for dicussion. Feel free to play around. 
