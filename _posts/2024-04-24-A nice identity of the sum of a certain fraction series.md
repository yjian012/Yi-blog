---
title: A nice identity of the sum of a certain fraction series
date: 2024-04-24
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
<pre>I saw this <a href="https://math.stackexchange.com/q/4904578/78249">question</a> on stackexchange, and I was intrigued. The equation in question is,
$$\sum_{k=1}^n\frac{2^{2k-1}}{k}\frac{\binom{2n-2k}{n-k}}{\binom{2n}{n}}=\sum_{k=1}^n\frac{1}{2k-1}$$
Are you able to prove this identity without looking at the proof that I gave under the question?





After simplifying the expression, it turned into
$$\sum_{k=1}^n\frac{1}{2k}\frac{2n}{2n-1}\frac{2n-2}{2n-3}\dots\frac{2n-2k+2}{2n-2k+1}=\sum_{k=1}^n\frac{1}{2k-1}$$
The first few $n$ gives:
$$\frac{1}{2}\frac{2}{1}=1$$
$$\frac{1}{2}\frac{4}{3}+\frac{1}{4}\frac{4}{3}\frac{2}{1}=1+\frac{1}{3}$$
$$\frac{1}{2}\frac{6}{5}+\frac{1}{4}\frac{6}{5}\frac{4}{3}+\frac{1}{6}\frac{6}{5}\frac{4}{3}\frac{2}{1}=1+\frac{1}{3}+\frac{1}{5}$$
$$\frac{1}{2}\frac{8}{7}+\frac{1}{4}\frac{8}{7}\frac{6}{5}+\frac{1}{6}\frac{8}{7}\frac{6}{5}\frac{4}{3}+\frac{1}{8}\frac{8}{7}\frac{6}{5}\frac{4}{3}\frac{2}{1}=1+\frac{1}{3}+\frac{1}{5}+\frac{1}{7}$$
By grouping the terms, I came up with this expression:
$$\frac{8}{7}\left(\frac{1}{2}+\frac{6}{5}\left(\frac{1}{4}+\frac{4}{3}\left(\frac{1}{6}+\frac{2}{1}\left(\frac{1}{8}\right)\right)\right)\right)=1+\frac{1}{3}+\frac{1}{5}+\frac{1}{7}$$
An interesting thing that I noticed is, if I replace the numbers $\frac{1}{2},\frac{1}{4},\frac{1}{6},\frac{1}{8}$ with ones, it suddenly becomes obvious. We get this identity:
$$\frac{8}{7}+\frac{8}{7}\frac{6}{5}+\frac{8}{7}\frac{6}{5}\frac{4}{3}+\frac{8}{7}\frac{6}{5}\frac{4}{3}\frac{2}{1}=\frac{8}{7}\left(1+\frac{6}{5}\left(1+\frac{4}{3}\left(1+\frac{2}{1}1\right)\right)\right)=8=2+2+2+2$$
Then I wondered, what if I inverse the order of them? And I found that
$$\frac{1}{8}\frac{8}{7}+\frac{1}{6}\frac{8}{7}\frac{6}{5}+\frac{1}{4}\frac{8}{7}\frac{6}{5}\frac{4}{3}+\frac{1}{2}\frac{8}{7}\frac{6}{5}\frac{4}{3}\frac{2}{1}=\frac{8}{7}\left(\frac{1}{8}+\frac{6}{5}\left(\frac{1}{6}+\frac{4}{3}\left(\frac{1}{4}+\frac{2}{1}\left(\frac{1}{2}\right)\right)\right)\right)=\left(1+\frac{1}{1}\right)\left(1+\frac{1}{3}\right)\left(1+\frac{1}{5}\right)\left(1+\frac{1}{7}\right)-1$$
which is very easy to prove.

The proof of the first equation, though, is much harder to construct, because the coefficient changes in the opposite direction of $n$ from the inside to the outside, so each time $n$ changes, the previous expression is no longer a part of the new expression, making the induction argument difficult to find. But after some manipulation, I found the proof, which I posted on the stackexchange page, so I won't repeat it here.
I wonder if more simple sequences can be constructed with other sequences as the coefficients

This reminds me of continued fraction. I think maybe this should have a name, like, continued product? But it seems that this name has already been taken by something different. So, maybe "rolling product"?
A similar concept seems to be <a href="https://en.wikipedia.org/wiki/Engel_expansion">Engel expansion</a>, but here we have a way more general form, $a_1(b_1+a_2(b_2+a_3(b_3+\dots)))$, where $a_i$ and $b_j$ are rational, while the result is the sum of a different series. Or maybe this can further be generalized to any real sequences, or even complex sequences? I wonder...
</pre>