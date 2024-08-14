---
title: IBM Ponder this 2024 04 solution
date: 2024-05-06
---
<link rel="stylesheet" href="/Yi-blog/css/styles.css">
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' type='text/javascript'/>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js' type='text/javascript'/>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/showdown/1.6.2/showdown.min.js' type='text/javascript'/>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css' id='markdown' rel='stylesheet'/>
    
    <script>
        function loadScript(src){
          return new Promise(function(resolve, reject){
            let script = document.createElement(&#39;script&#39;);
            script.src = src;
            script.onload = () =&gt; resolve(script);
            script.onerror = () =&gt; reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
          });
        }
        loadScript(&quot;https://yjian012.github.io/Yi-blog/js/markdown-highlight-in-blogger.js&quot;).then(script=&gt;loadScript(&quot;https://yjian012.github.io/Yi-blog/js/scripts.js&quot;));
      //https://mxp22.surge.sh/markdown-highlight-in-blogger.js
    </script>
<pre>
<a href="https://research.ibm.com/haifa/ponderthis/challenges/April2024.html">Problem description</a>, and the <a href="https://research.ibm.com/haifa/ponderthis/solutions/April2024.html">solution</a>.
Hey, this time I got first place! Although there's not much to talk about.
The problem looks like a finite state machine problem. The states can be represented by a length $n$ ternary number, where the lowest digit represents the location of the largest disk, the second digit is the location of the second largest one, and so on. After each step, it transits to the next state, depending on the move.
The solution can be found by, like the solution page says, finding the periods of the sequences. Both the state and the move must be considered.

Or, just simulate the entire process. Out of all the problems that I've solved so far, this one is the most brute-forcible, if that's a word.
Each game is represented by 3 integer arrays, which correspond to the disks on the 3 rods, and a index of the move. Each time, read the move and change the arrays accordingly.
Usually the simulation of the periodic increment of the index is implemented as something like
  i=(i+1)%size;
or
  i=i+1;
  if(i==size) i=0;
But modulo and branching are costly operations, and the routine is called many times. To make it faster, I replaced it with a lookup table. The speedup is not huge, 90s to 63s, but still quite noticeable.