---
title: Probability of line segments intersecting - A surprisingly simple result
date: 2023-10-29
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
<pre>I was drawing random stuff on a piece of paper, suddenly this problem came into my mind:
<blockquote>If I draw a length 1 line segment randomly, then draw another one, what's the probability that they'll intersect?</blockquote>
Of course this description is ambiguous. To give a better description, we need to define things more accurately. First, we should limit the area that we can draw the line segments in. Second, we should define what it means by "drawing a line segment randomly".

To avoid annoying boundary situations, let's use periodic boundary conditions. But then, the size can't be too small, otherwise we may encounter complicated situations like crossing multiple times.
Apparently, if the second line segment intersects the first, both of the end points of the second line segment must lie within the envelope curve that has distance 1 to the first line segment. This shape is called a "<a href="https://en.wikipedia.org/wiki/Stadium_%28geometry%29">stadium</a>", where $a=r=1$ in this case. If we choose a rectangular area $w\times l$ where $w>=2$ and $l>=2$, multiple intersections won't happen.

The formal definition of the problem is as the following:
<blockquote>Consider a rectangular area of size $w\times l$ with periodic boundary conditions, where $w>=2,l>=2$. Draw two length 1 line segments randomly. Here, by randomly it means, first choose a random point with uniform distribution over the rectangular area, then from the circle that is centered at the first point with radius one, randomly choose a point with uniform distribution. These two points are the end points of the line segment.
Question: What's the probability that the two line segments intersect?
</blockquote>

Let's solve this problem!
Because of the periodic boundary conditions, linear translations don't matter. We can move the first line segment to the center of the rectangle area. Then, the probability is only none zero if the second line segment lies within the stadium shape centered at the first line segment. It doesn't matter how the stadium shape is oriented, so we can assume that the first line segment lies horizontally.

To find the probability, we can just integrate the probability that the second line segment intersects with the first one for all possible first end points of the second line segment.

The area outside the stadium has zero probability density. Due to the symmetry of the shape, we only need to consider a quarter of the stadium, and multiply the answer by 4.
The situations are different depending on which part of the stadium shape the first end point is in. We can put them in 4 parts:

![image](/Yi-blog/img/Probability that two line segments intersect.png)

(Actually, $P_1$ and $P_3$ can be combined in the calculations in polar coordinates. I started with Cartesian, so I didn't notice until later.)

The probability is $p=\frac{1}{A}\times 4\times\frac{1}{2\pi}(p_1+p_2+p_3+p_4)$, where
$p_1=\int_0^1 rdr\int_0^{\frac{\pi}{2}}\theta-\sin^{-1}(r\sin\theta)d\theta$
$p_2=\int_{\frac{1}{2}}^1dx\int_0^\sqrt{1-x^2}\tan^{-1}\frac{x}{y}+\tan^{-1}\frac{1-x}{y}dy$
$\quad=\frac{1}{2}\int_0^1 rdr\int_{\sin^{-1}\frac{r}{2}}^{\frac{\pi}{2}}\theta+\tan^{-1}\frac{1-r\sin\theta}{r\cos\theta}d\theta$
$p_3=\int_0^1 rdr\int_0^{\sin^{-1}\frac{r}{2}}\theta+\cos^{-1}(r\cos\theta)d\theta$
$p_4=\int_0^{\frac{1}{2}}dx\int_\sqrt{1-x^2}^1 2\cos^{-1}y\ dy$

(We may combine $p_1$ and $p_3$ and just calculate $\int_0^1 rdr\int_{-\frac{\pi}{2}}^{\sin^{-1}\frac{r}{2}}\theta+\cos^{-1}(r\cos\theta)d\theta$ instead.)

I'm not sure if Cartesian or polar coordinate system is easier to manually integrate them... I put them on wolfram alpha, and here's the result:
$p_1=\frac{1}{4}$
$p_2=0.583664$
$p_3=0.155138$
$p_4=0.011197 =\frac{1}{72}(27 - 3 \sqrt 3 \pi - \pi^2)$

Then I added them together, the summation is... 0.999999. Well, this can't be a coincidence, can it?
I'll get the exact result when I have more time...
So, the probability is $\frac{2}{\pi A}$, where $A$ is the area that the line segment "occupies". 

I quickly wrote a program to simulate the problem in a $3\times 3$ square. Averaging 100000000 results, the probability is 0.0707416, where the theoretical value is $\frac{2}{9\pi}=0.07073553$.

This reminds me of the result of Buffon's needle problem, which has probability $\frac{2l}{\pi t}$, where $l$ is the length of the needles and $t$ is the spacing between the lines, $l\leq t$.

This result can be taken as a generalization of Buffon's needle problem. It can be described as
<blockquote>Assuming there is a random uniform distribution with density $\frac{1}{A}$ of line segments with length 1 on the 2D plane. More precisely, the distribution is, the middle points of the line segments is uniformly distributied on the plane with density $\frac{1}{A}$ and the angle is also uniformly distributed from 0 to $2\pi$.

Then, if we draw another line segment of length one randomly, as described in the beginning, the expected number of intersections between this line segment and the line segments in the "background" is $\frac{2}{\pi A}$.</blockquote>

I wonder if this can be further generalized. An obvious first step is, changing the size of the line segments, which probably will give something similar to the result of Buffon's needle problem. How else can we generalize this?

2023.10.30 Update:
I think, indeed, the Buffon's needle problem can be seen as a special case of this problem.

If we see each line as an infinite chain of length 1 line segments, and the distance between the lines is $t$, then each line segment occupies an area $t$, thus the expectation of the number of intersections between a length 1 needle with the lines is $\frac{2}{\pi A}=\frac{2}{\pi t}$. Due to the additivity of expectation, a length $l$ needle will have expectation $\frac{2l}{\pi t}$. When $l\leq t$, there can be at most one intersection, thus this is the probability of them intersecting.


Regarding the integrations, Claude Leibovici gives the <a href="https://math.stackexchange.com/a/4796822/78249">exact expressions</a> to them, except for $p_3$ which is still based on numerical evidence (albeit a very strong one).

It seems very complicated, so I thought maybe it would be easier to do it in the other direction.

If we integrate $r$ first instead,the interval of $\theta$ is $[0,\frac{\pi}{6}]$ and the interval of $r$ is $[2\sin\theta,1]$. The integration is

$p_3=\int_0^{\frac{\pi}{6}}d\theta\int_{2\sin\theta}^1 (\theta+\cos^{-1}(r\cos\theta))rdr$
$\quad=\int_0^{\frac{\pi}{6}}\frac{\theta}{2}(1-4\sin^2\theta)+\left[\frac{r^2\cos^2\theta}{2}\cos^{-1}(r\cos\theta)+\frac{1}{4}\sin^{-1}(r\cos\theta)-\frac{r\cos\theta}{4}\sqrt{1-r^2\cos^2\theta}\right]_{2\sin\theta}^1\frac{1}{\cos^2\theta}d\theta$
$\quad=\int_0^{\frac{\pi}{6}}\frac{\theta}{2}(1-4\sin^2\theta)+\left(\theta\frac{\cos^2\theta}{2}+\frac{1}{4}(\frac{\pi}{2}-\theta)-\frac{\sin\theta\cos\theta}{4}-\frac{\sin^2 2\theta}{2}(\frac{\pi}{2}-2\theta)-\frac{1}{4}(2\theta)+\frac{\sin 2\theta \cos 2\theta}{4}\right)\frac{1}{\cos^2\theta}d\theta$

I got lazy again and just lumped it into wolfram alpha. This time it gives the exact result, $\frac{1}{36}(9+3\sqrt 3\pi-2\pi^2)$.

Combined with the result $p_2=\frac{1}{72}(9-3\sqrt 3\pi+5\pi^2)$ and the other two known results, I think the proof that the probability equals $\frac{2}{\pi A}$ is complete.
</pre>