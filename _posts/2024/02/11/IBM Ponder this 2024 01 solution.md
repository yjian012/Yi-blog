---
title: IBM Ponder this 2024 01 solution
date: 2024-02-11
---
<link rel="stylesheet" href="https://yjian012.github.io/Yi-blog/styles.css">
    <!--markdown-->
    <!--script src='https://polyfill.io/v3/polyfill.min.js?features=es6'/-->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' type='text/javascript'/>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js' type='text/javascript'/>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/showdown/1.6.2/showdown.min.js' type='text/javascript'/>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css' id='markdown' rel='stylesheet'/>
    
    <!--markdown then mathjax-->
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
        loadScript(&quot;https://yjian012.github.io/Yi-blog/markdown-highlight-in-blogger.js&quot;).then(script=&gt;loadScript(&quot;https://yjian012.github.io/Yi-blog/scripts.js&quot;));
      //https://mxp22.surge.sh/markdown-highlight-in-blogger.js
    </script>
<pre>
Problem description can be found <a href="https://research.ibm.com/haifa/ponderthis/challenges/January2024.html">here</a>. The solution is posted <a href="https://research.ibm.com/haifa/ponderthis/solutions/January2024.html">here</a>.

The first question is quite similar to finding the solutions to the magic squares in Ponder this 2023 11. I didn't implement the solver back then, but this time I got the chance to do it.
The equations easy to construct,

  x1 + x2 - x3 - x4 = 5
  x5 + x6 + x7 - x8 = 10
  x9 - x10 + x11 + x12 = 9
  x13 - x14 + x15 - x16 = 0
  x1 + x5 + x9 - x13 = 17
  x2 + x6 - x10 - x14 = 8
  x3 - x7 - x11 + x15 = 11
  x4 + x8 + x12 + x16 = 48
  x1 + ... + x16 = 136

There are 16 variables and 9 equations. Now I just need to assign 7 of them as free variables, and express the other 9 as linear combinations of them.

I iterated through all possible ways to assign different numbers between 1 and 16 to the 7 free variables, and check if it's a solution. There are $\binom{16}{7}=11440$ combinations, not too large. It's very fast to solve.

The complete list of 84 solutions is shown below.
  5 13 2 11 15 10 1 16 3 7 4 9 6 8 14 12
  14 8 2 15 4 16 1 11 5 9 3 10 6 7 13 12
  12 6 2 11 10 15 1 16 4 5 3 7 9 8 13 14
  11 8 1 13 4 16 2 12 7 10 3 9 5 6 15 14
  12 8 4 11 13 10 2 15 1 3 5 6 9 7 14 16
  8 16 6 13 12 5 2 9 1 10 7 11 4 3 14 15
  8 13 2 14 7 11 1 9 5 12 6 10 3 4 16 15
  11 16 7 15 13 2 5 10 1 4 3 9 8 6 12 14
  13 8 7 9 6 16 2 14 1 12 5 15 3 4 11 10
  6 16 8 9 14 7 2 13 1 12 5 15 4 3 10 11
  13 14 7 15 6 11 2 9 1 12 4 16 3 5 10 8
  12 13 5 15 6 9 3 8 1 10 7 11 2 4 16 14
  12 9 5 11 6 16 3 15 1 10 4 14 2 7 13 8
  7 11 1 12 13 10 3 16 5 4 2 6 8 9 15 14
  7 15 5 12 13 10 3 16 1 8 2 14 4 9 11 6
  15 9 5 14 11 8 3 12 1 2 4 6 10 7 13 16
  12 9 5 11 14 8 3 15 1 2 4 6 10 7 13 16
  8 13 5 11 10 14 1 15 3 12 2 16 4 7 9 6
  13 16 10 14 9 5 3 7 1 11 4 15 6 2 8 12
  7 16 8 10 13 3 9 15 1 5 2 11 4 6 14 12
  15 10 8 12 13 7 1 11 3 5 2 9 14 4 6 16
  13 7 10 5 9 14 3 16 1 11 4 15 6 2 8 12
  13 9 10 7 15 8 3 16 1 5 2 11 12 4 6 14
  13 12 6 14 5 9 4 8 1 10 7 11 2 3 16 15
  6 15 5 11 12 10 4 16 1 9 3 14 2 8 13 7
  15 6 5 11 10 12 4 16 1 2 3 7 9 8 13 14
  15 9 5 14 1 12 8 11 4 7 2 10 3 6 16 13
  12 16 8 15 10 5 1 6 4 11 3 13 9 2 7 14
  12 6 8 5 10 15 1 16 4 11 3 13 9 2 7 14
  15 6 11 5 10 12 4 16 1 8 3 13 9 2 7 14
  15 9 11 8 13 6 5 14 1 4 2 10 12 3 7 16
  15 10 8 12 5 7 11 13 1 3 2 9 4 6 16 14
  13 7 10 5 6 11 9 16 1 8 4 12 3 2 14 15
  13 9 10 7 6 8 12 16 1 5 2 11 3 4 15 14
  6 16 2 15 12 9 3 14 4 7 1 11 5 10 13 8
  12 9 2 14 6 16 3 15 4 7 1 11 5 10 13 8
  8 16 4 15 12 9 3 14 2 7 1 13 5 10 11 6
  16 9 5 15 2 13 7 12 3 6 1 11 4 8 14 10
  6 16 8 9 12 7 2 11 3 14 5 15 4 1 10 13
  6 10 3 8 7 16 2 15 9 14 1 13 5 4 11 12
  7 16 3 15 6 10 2 8 9 14 1 13 5 4 11 12
  15 6 9 7 10 14 2 16 3 8 1 13 11 4 5 12
  14 16 10 15 6 3 9 8 2 7 1 13 5 4 11 12
  8 16 7 12 11 2 10 13 3 4 1 9 5 6 15 14
  16 10 8 13 12 7 2 11 3 4 1 9 14 5 6 15
  16 12 8 15 2 7 10 9 3 6 1 11 4 5 14 13
  2 15 4 8 12 7 5 14 9 11 1 10 6 3 13 16
  2 14 4 7 12 8 5 15 9 11 1 10 6 3 13 16
  14 8 7 10 2 16 4 12 6 13 1 15 5 3 9 11
  6 16 9 8 12 2 10 14 4 7 1 11 5 3 13 15
  10 12 9 8 16 6 2 14 4 7 1 11 13 3 5 15
  12 16 9 14 6 2 10 8 4 7 1 11 5 3 13 15
  16 6 9 8 2 12 10 14 4 7 1 11 5 3 13 15
  16 6 9 8 10 12 2 14 4 7 1 11 13 3 5 15
  16 12 9 14 2 6 10 8 4 7 1 11 5 3 13 15
  16 12 9 14 10 6 2 8 4 7 1 11 13 3 5 15
  16 10 8 13 4 7 11 12 2 3 1 9 5 6 15 14
  7 15 11 6 13 4 9 16 2 8 1 14 5 3 10 12
  12 8 9 6 14 10 2 16 4 7 1 11 13 3 5 15
  13 8 7 9 2 16 6 14 5 12 1 15 3 4 11 10
  5 14 6 8 9 11 2 12 7 16 3 15 4 1 10 13
  9 14 6 12 5 11 2 8 7 16 3 15 4 1 10 13
  14 12 8 13 2 6 11 9 5 7 1 10 4 3 15 16
  12 9 5 11 3 16 6 15 4 10 1 14 2 7 13 8
  11 10 4 12 5 15 6 16 3 8 1 13 2 9 14 7
  15 9 5 14 11 8 3 12 4 2 1 6 13 7 10 16
  12 9 5 11 14 8 3 15 4 2 1 6 13 7 10 16
  16 13 10 14 3 5 9 7 4 8 1 12 6 2 11 15
  9 13 11 6 15 4 5 14 3 8 2 12 10 1 7 16
  6 16 7 10 9 8 4 11 3 14 5 15 1 2 13 12
  6 16 8 9 10 7 4 11 3 14 5 15 2 1 12 13
  12 10 4 13 11 7 6 14 3 1 2 5 9 8 15 16
  16 7 10 8 6 14 3 13 4 11 1 15 9 2 5 12
  16 13 10 14 6 8 3 7 4 11 1 15 9 2 5 12
  12 9 10 6 14 8 3 15 4 7 1 11 13 2 5 16
  11 16 7 15 3 6 9 8 5 10 1 13 2 4 14 12
  6 15 9 7 10 8 5 13 3 14 4 16 2 1 11 12
  6 15 9 7 10 5 11 16 3 8 1 13 2 4 14 12
  7 10 8 4 9 11 6 16 3 12 5 13 2 1 14 15
  8 12 6 9 4 14 5 13 7 15 1 16 2 3 11 10
  4 16 8 7 10 6 9 15 5 11 1 14 2 3 13 12
  10 12 9 8 5 6 13 14 4 7 1 11 2 3 16 15
  4 15 8 6 10 7 9 16 5 11 1 14 2 3 13 12
  4 14 8 5 10 9 7 16 6 13 1 15 3 2 11 12

To solve the bonus problem, a straight forward algorithm is, to simply iterate through the combinations of the assignment of operators '+' or '-', such that they are different in at least 12 positions from the original assignment, for all pairs of the solutions. There are 84*83/2*(1+2+2^2+...+2^12)=28553826 combinations to check. It's simple to implement but it took a little while to get the results.

To iterate through the assignments of operators, I expressed each assignment as an unsigned integer, each bit in the binary representation is 1 for '+' and 0 for '-'. To get an assignment that is different in $k$ positions from the original assignment, I just used an integer that has $k$ 1s in its binary form and xor to the original assignment. To iterate through all binary numbers that has $k$ 1s, I wrote a binNextPerm() function, which is basically the binary equivalence of next_permutation(), but with the __builtin_ctz() functions, each iteration is O(1).

A better algorithm is, to find the results that are partially correct and continue checking the further rows/cols. For that, I needed to map each solution of each row/col to the solution index. So, I used a hash map to store the results and mapped them to a hash set. The solutions must be on the same row/col, with the same assignment of operators, so the key must be the combination of these three. The result must be between -63 and 63, which takes at most 7 bits. There are 8 rows/cols combined, and 8 ways to assign the operators, so 13 bits are enough to store the key.

After the mapping is done, a recursive algorithm is used to find the results. Given two indices, it starts from the first row and looks for the indices of solutions that gives the same result for that row with the same assignment of the operators, and check if the indices include the second index. If it's found, it continues to the next row/col, otherwise it continues to the next assignment of operators. When it goes through the 8 rows+cols, it adds the result, a triplet consisting of the two indices and the assignment of the operators, to the answer. This is way more efficient and solved the problem in a second. The answer is checked against the original assignment of the operators with xor operator to see if there are at least 12 differences, and is excluded if not.

There are 3 solutions listed on the website, but actually there are 6, although 4 of them are equivalent. But they are not identical, so I consider them different solutions. They are listed below.
  i=1,j=23
  14,8,2,15,4,16,1,11,5,9,3,10,6,7,13,12,
  13,12,6,14,5,9,4,8,1,10,7,11,2,3,16,15,
  mask:010110110001101100100010
  [-,+,-,+,+,+,-,+,+,-,-,-,-,+,+,+,-,+,-,-,-,-,-,+]
  12
  i=17,j=58
  8,13,5,11,10,14,1,15,3,12,2,16,4,7,9,6,
  12,8,9,6,14,10,2,16,4,7,1,11,13,3,5,15,
  mask:001101110100110001111111
  [-,-,+,+,-,+,+,+,-,+,+,-,+,+,+,+,-,-,+,+,+,+,-,-]
  12
  i=20,j=55
  15,10,8,12,13,7,1,11,3,5,2,9,14,4,6,16,
  16,12,9,14,10,6,2,8,4,7,1,11,13,3,5,15,
  mask:001000110001110001010111
  [-,-,+,+,-,-,+,-,-,-,+,-,+,+,+,+,-,-,+,-,+,-,-,+]
  12
  i=20,j=55
  15,10,8,12,13,7,1,11,3,5,2,9,14,4,6,16,
  16,12,9,14,10,6,2,8,4,7,1,11,13,3,5,15,
  mask:001000110001110001111111
  [-,-,+,+,-,+,+,-,-,-,+,-,+,+,+,+,-,-,+,+,+,-,-,+]
  12
  i=20,j=55
  15,10,8,12,13,7,1,11,3,5,2,9,14,4,6,16,
  16,12,9,14,10,6,2,8,4,7,1,11,13,3,5,15,
  mask:001000110100110001010111
  [-,-,+,+,-,-,+,-,-,-,+,-,+,+,+,+,-,-,+,-,+,+,-,-]
  12
  i=20,j=55
  15,10,8,12,13,7,1,11,3,5,2,9,14,4,6,16,
  16,12,9,14,10,6,2,8,4,7,1,11,13,3,5,15,
  mask:001000110100110001111111
  [-,-,+,+,-,+,+,-,-,-,+,-,+,+,+,+,-,-,+,+,+,+,-,-]
  12

Here the $i$ and $j$ are my indices of the 84 solutions, you can ignore them. "mask" is the assignment of the signs in binary form, which is translated to the form that they stated in the problem.
The last 4 solutions are equivalent, because after the '+' or '-' signs are expressions that evaluates to 0, so of course one can choose either of them. But still, they are different assignments of operators.