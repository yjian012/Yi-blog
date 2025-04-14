---
title: A Recursive Geometric Proof of 1962 IMO Problem 6
date: 2024-12-29
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
<pre>
Youtube recommended a video to me, where the following problem is solved:
<blockquote>Consider an isosceles triangle. Let $R$ be the radius of its circumscribed circle and $r$ the radius of its inscribed circle. Prove that the distance $d$ between the centers of these two circles is $d=\sqrt{R(R-2r)}$.</blockquote>
As usual, I tried to solve it myself before watching the rest of the video. And I found a really nice solution.
Let the triangle be $\triangle ABC$, where $AB=AC$. Let $O$ be the center of the circumscribed circle, and $I$ be the center of the inscribed circle. So, $d=IO=|AI-AO|=|AI-R|$. What we want to prove becomes
\begin{align}
d^2&=R(R-2r)\\
(AI-R)^2&=R(R-2r)\\
AI^2-2AI*R+R^2&=R^2-2rR\\
AI^2&=2R(AI-r)\\
\frac{AI}{2R}&=\frac{AI-r}{AI}
\end{align}
Let the inscribed circle touch $AB$ at $P$, and $AC$ at $Q$, and intersect $AI$ at $X$. So, $AI-r=AX$. We want to show that $\frac{AI}{2R}=\frac{AX}{AI}$. Notice that $2R$ is the diameter of the circumcircle, I wonder if $AI$ can be a diameter too...
Notice that $IP\perp AB$ and $IQ\perp AC$, if we create a circle with diameter $AI$, it will pass through points $P$ and $Q$, so it's the circumcircle of $\triangle APQ$. Because of symmetry, we must have $AP=AQ$. So $\triangle APQ \sim \triangle ABC$. If $X$ is the incenter of $\triangle APQ$, it's obvious that $\frac{AI}{2R}=\frac{AX}{AI}$ due to similarity.
$\angle APX=\frac{1}{2}\angle AIP=\frac{1}{2}\angle B=\frac{1}{2}\angle APQ$, so $\angle APX=\angle XPQ$. $\angle PAX=\angle QAX$. So, indeed, $X$ is the incenter of $\triangle APQ$, and the proof is complete.

This shows an interesting property of isosceles triangles: $AI$ is the diameter of the circumcircle of $\triangle APQ$, and $X$ is its incenter. We can do this recursively to $\triangle APQ$, and get an even smaller version of this problem.
On the other hand, we can also extend $AO$ to intersect its circumcircle at $D$, and draw a tangent line at $D$, then $DB\perp AB$ and $DC\perp AC$. If we extend $AD$ to $E$ so that $DE=DB=DC$, and create a line $l\perp AE$ at $E$ which intersects $AB$ at $M$ and $AC$ at $N$, $D$ would be the incenter of $\triangle AMN$. This can go down infinitely as well. $X$,$I$,$D$,..., they are both the incenter of the bigger triangle, and the bottom of the diameter of the smaller triangle.

After I found this cool recursive geometric proof, I went back to watch the rest of the video. Again, I was disappointed - basically it used trigonometry to "brute force" the proof. It's not wrong, of course, but boring.
It did mention that this is an IMO problem, so I wonder which one it was from. I searched it and it turned out to be the Problem 6 of 1962 IMO, and <a href="https://artofproblemsolving.com/wiki/index.php/1962_IMO_Problems/Problem_6">here is another solution</a>. This solution not only solves this problem, but also proves that it applies to not only isosceles triangles, but ALL triangles!
The solution on that page is an elegant geometric proof, but since it doesn't demonstrate the recursive structure of the problem on isosceles triangles, I think my proof is a nice alternative solution.
</pre>
