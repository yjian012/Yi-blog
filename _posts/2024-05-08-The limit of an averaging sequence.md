---
title: The limit of an averaging sequence
date: 2024-05-08
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

<pre>Consider this sequence of length $n$: $P_n=(p_0,p_1,p_2,\dots,p_{n-1})$, where $p_0=2$, and each time the next number $p_k$ can be any number within $[2,1+p_{k-1}]$ for $k\in [1,n-1]$. Consider the set of all such sequences of length $n$, $\{P_n\}$. The first few sets are:
\begin{align*}n=1:&amp; (2)\\
n=2:&amp; (2,2),(2,3)\\
n=3:&amp; (2,2,2),(2,2,3),(2,3,2),(2,3,3),(2,3,4)\\
n=4:&amp; (2,2,2,2),(2,2,2,3),(2,2,3,2),(2,2,3,3),(2,2,3,4),(2,3,2,2),(2,3,2,3),(2,3,3,2),\\
 &amp;(2,3,3,3),(2,3,3,4),(2,3,4,2),(2,3,4,3),(2,3,4,4),(2,3,4,5)
\end{align*}
Let $P_{nj}$ be any path in $\{P_n\}$, and $\prod P_{nj}$ be the product of all the numbers in that path. The question is, what is this limit: $\text{lim}_{n\rightarrow\infty} \sum_{P_{nj}\in \{P_n\}} (\prod P_{nj})^{-1}$?

The first few sums are

$$
\renewcommand\arraystretch{1.5}
\begin{matrix}
    n=1:&amp; \frac{1}{2}\\
    n=2:&amp; \frac{1}{2}\frac{1}{2}+\frac{1}{2}\frac{1}{3}\\
    n=3:&amp; \frac{1}{2}\frac{1}{2}\frac{1}{2}+\frac{1}{2}\frac{1}{2}\frac{1}{3}+\frac{1}{2}\frac{1}{3}\frac{1}{2}+\frac{1}{2}\frac{1}{3}\frac{1}{3}+\frac{1}{2}\frac{1}{3}\frac{1}{4}
\end{matrix}$$

<details>
<summary>Answer:</summary>
The limit is $e^{-1}$.
</details>

How do you prove that it converges to this value?

<span><!--more--></span>

This question is inspired by <a href="https://math.stackexchange.com/questions/4912506/how-to-prove-the-following-recursion-converges-to-1-e/4913225">this stackexchange post</a>. The original form of the question and the proof is in the following:

<details>
<summary>The original sequence:</summary>
Consider this initial sequence, $f(0,k)=\delta_{0k}, k=0,\dots,\infty$, where $\delta$ is the Kronecker delta.

Next, we define $f(n,k)=\frac{1}{k+2}\sum_{i=0}^{k+1}f(n-1,i)$, which is the average of the first $k+2$ numbers in the previous sequence. Thus, the first few sequences are,

$$1,0,0,0,\dots$$
$$\frac{1}{2},\frac{1}{3},\frac{1}{4},\dots$$
$$\frac{5}{12},\frac{13}{36},\frac{77}{240},\dots$$

The question is, what is $\text{lim}_{n\rightarrow\infty} f(n,0)$?
(This is why I decided to call it "The averaging sequence".)
</details>
<details>
<summary>Other forms:</summary>
If we write the sequence as a vector $v_n$, the vector of the next sequence is the previous one multiplied by a matrix $M$, $v_{n+1}=Mv_n$, where
$$M=
\renewcommand\arraystretch{1.5}
\begin{bmatrix}
    \frac{1}{2} & \frac{1}{2} & 0 & 0 & 0 & 0 & \dots\\
    \frac{1}{3} & \frac{1}{3} & \frac{1}{3} & 0 & 0 & 0 &\dots\\
    \frac{1}{4} & \frac{1}{4} & \frac{1}{4} & \frac{1}{4} & 0 & 0 & \dots\\
    \frac{1}{5} & \frac{1}{5} & \frac{1}{5} & \frac{1}{5} & \frac{1}{5} & 0 & \dots\\
     &  &  & \dots & & & \\
\end{bmatrix}$$
We start from the vector $v_0=(1,0,0,\dots)$, thus the first element of $v_{n}$ is just the top left element of $M^n$. Thus the question becomes if $\text{lim}_{n\rightarrow\infty} [M^n]_{00}=e^{-1}$.


Another way to see it is thinking backwards. Consider the first element of the $n$th sequence. It equals $\frac{1}{2}$ of the sum of the first two elements of the $(n-1)$th sequence. We can continue to write it as the weighted sum of the previous sequence, and so on. Let's write the weight on each element for each sequence, starting from the $n$th sequence.
$$
\renewcommand\arraystretch{1.5}
\begin{matrix}
    1 & & & &\\
    \frac{1}{2} & \frac{1}{2} & & &\\
    \frac{1}{2}\frac{1}{2}+\frac{1}{2}\frac{1}{3} &\frac{1}{2}\frac{1}{2}+\frac{1}{2}\frac{1}{3} & \frac{1}{3}\frac{1}{2} &  &\\
    \frac{1}{2}\frac{1}{2}\frac{1}{2}+\frac{1}{2}\frac{1}{3}\frac{1}{2}+\frac{1}{3}\frac{1}{2}\frac{1}{2}+\frac{1}{3}\frac{1}{3}\frac{1}{2}+\frac{1}{4}\frac{1}{3}\frac{1}{2} & \dots & & &
\end{matrix}$$
We can express the denominators as products of paths. Consider the sequences of length $n$, $\{P_n\}$, which start with $p_0=2$, and each time the next number $p_k$ can be any number within $[2,1+p_{k-1}]$ for $k\in [1,n-1]$. The first few sets are:

\begin{align*}n=1:& (2)\\
n=2:& (2,2),(2,3)\\
n=3:& (2,2,2),(2,2,3),(2,3,2),(2,3,3),(2,3,4)\\
n=4:& (2,2,2,2),(2,2,2,3),(2,2,3,2),(2,2,3,3),(2,2,3,4),(2,3,2,2),(2,3,2,3),(2,3,3,2),\\
 &(2,3,3,3),(2,3,3,4),(2,3,4,2),(2,3,4,3),(2,3,4,4),(2,3,4,5)
\end{align*}

Let $P_{nj}$ be any path in $\{P_n\}$, and $\prod P_{nj}$ be the product of all the numbers in that path. The question is equivalent to $\text{lim}_{n\rightarrow\infty} \sum_{P_{nj}\in \{P_n\}} (\prod P_{nj})^{-1}=e^{-1}$.

Notice that these sequences of weights are exactly the first row of $M^n$, thus they are totally equivalent. Relating them to the "product of paths" seems like an interesting connection.
</details>
<details>
<summary>Proof:</summary>

Consider the eigenvectors of the matrix, $M$. An obvious one is an all one vector, $u=(1,1,1,\dots)$. Apparently $Mu=u$, thus, $M^n u=u$, which implies that every row of $M^n$ must sum to 1. Can we use this to find $[M^n]_{00}$?

Suppose the first row of $M^{n-1}$ is $(a_{n-1,0},\ a_{n-1,1},\ a_{n-1,2},\ \dots)$. Multiply $M^{n-1}$ to $M$, the elements of the first row of $M^n$ are:
\begin{align*}
a_{n0}=&\frac{1}{2}a_{n-1,0}+\frac{1}{3}a_{n-1,1}+\frac{1}{4}a_{n-1,2}+\dots\\
a_{n1}=&\frac{1}{2}a_{n-1,0}+\frac{1}{3}a_{n-1,1}+\frac{1}{4}a_{n-1,2}+\dots\\
a_{n2}=&\frac{1}{3}a_{n-1,1}+\frac{1}{4}a_{n-1,2}+\dots\\
a_{n3}=&\frac{1}{4}a_{n-1,2}+\dots
\end{align*}
Evidently,
\begin{align*}
a_{n1}&=a_{n0},\\
a_{n2}&=a_{n1}-\frac{1}{2}a_{n-1,0},\\
a_{n3}&=a_{n2}-\frac{1}{3}a_{n-1,1},\\
\dots
\end{align*}

Assuming that the first row of $M^n$ converges (which will be proved shortly after) to a constant vector $(a_0,a_1,a_2,\dots)$. Then we must have
\begin{align*}
a_1&=a_0\\
a_2&=a_1-\frac{1}{2}a_0\\
a_3&=a_2-\frac{1}{3}a_1\\
a_4&=a_3-\frac{1}{4}a_2\\
\dots
\end{align*}
It's easy to solve for the first few elements as a function of $a_0$, namely
$a_1=a_0, a_2=\frac{1}{2}a_0, a_3=\frac{1}{6}a_0, a_4=\frac{1}{24}a_0$. The pattern is obvious.

It's easy to prove the general formula $a_k=\frac{1}{k!}a_0$ by induction, since $\frac{1}{k!}-\frac{1}{k+1}\frac{1}{(k-1)!}=\frac{1}{k!}-\frac{k}{k+1}\frac{1}{k!}=\frac{1}{(k+1)!}$.

Since we must have $\sum a_i=1$, we have $(\sum_{i=0}^\infty\frac{1}{i!})a_0=1$, thus $a_0=e^{-1}$.


To prove that the first row of $M^n$ converges, first we prove that $a_{n0}$ must converge. Consider the original form of the problem. We start with a decreasing sequence, $(1,0,0,0,\dots)$. Each time, the $k$th element of the next sequence is the average of the first $k+2$ elements of the current sequence. If the current sequence is decreasing, it's easy to show that the next sequence must also be decreasing. Thus, $f(n,0)=\frac{1}{2}(f(n-1,0)+f(n-1,1))&lt;f(n-1,0)$ for any $n$. We proved that $f(n,0)$ decreases with $n$. Since $f(n,0)>0$, the limit must exist, thus $a_{n0}$ must converge.

From the updating rule,
\begin{align*}
a_{n1}&=a_{n0},\\
a_{n2}&=a_{n1}-\frac{1}{2}a_{n-1,0},\\
a_{n3}&=a_{n2}-\frac{1}{3}a_{n-1,1},\\
\dots
\end{align*}
If $a_{n0}$ converges, $a_{n1}=a_{n0}$ must also converge, then $a_{n2}$ must converge as well. The same goes for the rest of the elements, thus the sequence must converge. The proof is complete.