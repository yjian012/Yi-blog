---
title: How smart are LLMs? The BrainF test
date: 2025-04-10
---
<link rel="stylesheet" href="/Yi-blog/css/styles.css">
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' type='text/javascript'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js' type='text/javascript'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/showdown/1.6.2/showdown.min.js' type='text/javascript'></script>
<link href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css' id='markdown' rel='stylesheet'/>  
<script>
    function loadScript(src){
      return new Promise(function(resolve, reject){
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
      });
    }
    loadScript("https://yjian012.github.io/Yi-blog/js/markdown-highlight-in-blogger.js").then(script=>loadScript("https://yjian012.github.io/Yi-blog/js/scripts.js"));
  //https://mxp22.surge.sh/markdown-highlight-in-blogger.js
</script>
A few days ago I was thinking, "How smart are LLMs?" It's well known that LLMs are very knowledgeable - You ask them anything, and they will spit out a summarization of human knowledge on that topic. But there's hardly any creativity. So, to test how smart they are, I should find a question that not many people has asked or answered before.

Later, I remembered an interesting problem that I tried before. That was when I first heard of the "Brainfuck" programming language. It's a Turing Complete language with only eight commands. Programming in that language is not easy. The problem is, "What's the shortest Brainfuck program that outputs the word 'Brainfuck'?"

After thinking about it for a while, I came up with a program that contains only 94 characters. Later, I found <a href="https://copy.sh/brainfuck/text.html">this webpage</a> which generates brainfuck programs that output the given text. The program that this page generates is 107 characters long - impressive for a general solver, although not optimal.

Today, I thought, "What if I ask the LLMs this question? How well will they perform?" The following is the answer from ChatGPT and deepseek, given the prompt "write a brainfuck program that outputs the word "Brainfuck", make it as short as possible."

ChatGPT quickly gave the following answer:

> Here is a Brainfuck program that outputs the word "Brainfuck":
>
> ```brainfuck
>　++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<<<.+++.------.--------.>>+.>++.
> ```
> 
> This program is optimized to output "Brainfuck" using a combination of loops and efficient value increments.

But when I tested this program, the output is "Hello HKE=Y"". So, apparently it just copied a "Hello World" program, maybe from wikipedia, then messed it up with its "optimizations". Kind of expected.
  
Deepseek thought for about a minute, then it stopped thinking. I clicked "continue thinking", then it started to output its thoughts.
It's pretty long, so I'll omit its thought process. After 495 seconds, it gave me an answer.

In its thought process, it found a length 135 solution:
```
+++++++[>++++++++++<-]>----.<++++++[>++++++++<-]>.<++[>--------<-]>-.++++++++.+++++.--------.<+++[>+++++<-]>.<+++[>------<-]>.++++++++.
```
This solution gives correct output. But its calculation of the length is wrong, somehow it said that the length is 108. It seems that it didn't include the characters '.','[' and ']'.
Then it thought about how to make it shorter. This time it came up with this solution:
```
++++++[>+++++++++++<-]>.<++++++[>++++++++<-]>.<++[>--------<-]>-.++++++++.+++++.--------.<+++[>+++++<-]>.<+++[>------<-]>.++++++++.
```
This solution still gives the correct output. The length is 131 characters, but deepseek still skipped those characters and said that the length is also 108 characters. And it considered this to be optimal.
Here's its final answer:

> To output the word "Brainfuck" in Brainfuck with minimal code length, we can optimize by using loops to generate ASCII values efficiently. Here's the shortest solution:
> 
> ```brainfuck
> ++++++[>+++++++++++<-]>.<++++++[>++++++++<-]>.<++[>--------<-]>-.++++++++.+++++.--------.<+++[>+++++<-]>.<+++[>------<-]>.++++++++.
> ```
> 
> **Explanation:**
> 
> 1. **B (66):** 
>    - `++++++[>+++++++++++<-]>.`
>    - Initialize cell0 to 6, loop to add 11 six times (6*11=66), then print.
> 
> 2. **r (114):** 
>    - `<++++++[>++++++++<-]>.`
>    - Move left to cell0 (now 0), set to 6, loop to add 8 six times (48) to cell1 (66+48=114), then print.
> 
> 3. **a (97):** 
>    - `<++[>--------<-]>-.`
>    - Move left to cell0 (0), set to 2, loop to subtract 8 twice (16) from cell1 (114-16=98), subtract 1 more (97), then print.
> 
> 4. **i (105):** 
>    - `++++++++.`
>    - Add 8 to cell1 (97+8=105) and print.
> 
> 5. **n (110):** 
>    - `+++++.`
>    - Add 5 to cell1 (105+5=110) and print.
> 
> 6. **f (102):** 
>    - `--------.`
>    - Subtract 8 from cell1 (110-8=102) and print.
> 
> 7. **u (117):** 
>    - `<+++[>+++++<-]>.`
>    - Move left to cell0 (0), set to 3, loop to add 5 three times (15) to cell1 (102+15=117), then print.
> 
> 8. **c (99):** 
>    - `<+++[>------<-]>.`
>    - Move left to cell0 (0), set to 3, loop to subtract 6 three times (18) from cell1 (117-18=99), then print.
> 
> 9. **k (107):** 
>    - `++++++++.`
>    - Add 8 to cell1 (99+8=107) and print.
> 
> This approach efficiently uses loops and pointer navigation to minimize the number of commands, resulting in the shortest possible Brainfuck program to output "Brainfuck".

Comparing the results:
-  Human designer (me): length=94
-  Human created program: length=107
-  ChatGPT: wrong answer
-  Deepseek: length=131

So, apparently some reasoning LLMs are able to give a correct answer, but it's unable to achieve human level optimizations, which requires some creativity.

I'm pretty sure if given a huge amount of data, the LLMs may be able to beat human on this as well, just from pure experience. But that makes it meaningless, because a human don't really need any experience at all! I just learned the rules and I found quite a few shortcuts. It's similar in research, one must find creative "tricks" to work around the obstacles that no one else has encountered before. I wonder how well the more advanced LLMs perform. If anyone has access to them, please let me know the result. I'd be very surprised if they come up with an even shorter solution without being extensively trained on this. Well, I'm also interested in their performance after being trained... How much improvement can that provide? Anyway, at least for now, they are far from beating my record.

If any human being is interested in this problem, let me know what's your best solution! I'll keep my 95 character solution as a secret, until it's beaten. :D
