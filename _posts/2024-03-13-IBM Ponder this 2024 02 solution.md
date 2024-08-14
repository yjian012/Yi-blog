---
title: IBM Ponder this 2024 02 solution
date: 2024-03-13
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
Problem description can be found <a href="https://research.ibm.com/haifa/ponderthis/challenges/February2024.html">here</a>. The solution is posted <a href="https://research.ibm.com/haifa/ponderthis/solutions/February2024.html">here</a>.
The first thing to do is, finding the probabilities that A wins a round and B wins a round. The range of the sum of the numbers is [5,59]. There are $total=$4*6*8*10*12*20=460800 combinations in total. Now I just need to find out how many combinations result in each sum, which can be done by repeatedly shifting and adding. Then the counts of combinations for A to win are summed, the same is done for B. The result is countA=114399, countB=230400, so the probability that A wins a round is $p_a$=countA/total, and for B it is $p_b$=countB/total. (For the bonus question, countB=116001.)

Next is a Markov process, with 2n+1 states: $N$ - the neutral state, $A_1$ - A wins one round, $A_2$ - A wins two rounds, ..., $A_n$ - A wins $n$ rounds, and $B_1$ to $B_n$ with similar meanings. The transition matrix is not hard to construct, basically, $A_n$ and $B_n$ results in themselves no matter the result (probability=1), for the other $A_i$s, the probability that it goes to $A_{i+1}$ is $p_a$, that it goes to $B_1$ is $p_b$, to $N$ is $1-p_a-p_b$, similar for $B_i$ and $N$.
The goal is to find out the probability that it ends up at $A_n$ or $B_n$ eventually.

The standard way to solve this type of problem is, to do an eigen decomposition on the matrix, and remove any eigen values that's less than one, then multiply the matricies back to get the probability. The reason is simple: After each round, the new probabilities vector is the old one multiplied by the Markov matrix, and the goal is finding the result after multiplying the matrix for infinite times, i.e. taking limit of the power of the matrix to infinity. With eigen decomposition, the pair of inverse matrices cancel out, only the eigen values are powered, and any eigen values that are less than one become zero when the power is taken to infinity.

By doing that, the solution to the first question is easy to find, which is about 0.000167566680157.

The bonus question, though, cannot be solved with this technique. The reason is that there is not enough numerical precision. The method above gives nonsensical results like probability larger than 1, and sum of the probabilities has an order of magnitude $10^{-17}$. It started to break down at around $n=26$, let alone when $n=300$. What should I do, then?

I thought, the reason for the eigen decomposition is to find out the limit of the power of the matrix, but what if I just power the matrix itself and see how that goes? Numerical precision might still be an issue, but it was worth a try.
The naive matrix powering algorithm that repeatedly muliplies the matrix is too slow. The efficient matrix powering algorithm has $O(\log(n))$ complexity, where $n$ is the power. Since I just need to take the limit to infinity, I simply repeatedly squared the matrix. After $n$ squares, the transition matrix $M$ is raised to $M^{2^n}$.
After 65 square operations, the result $p=prA/(prA+prB)$ converges to 0.01525753293679526. But the numerical error still appears, because $prA+prB=2.861639890862583e-163$ instead of 1. I wasn't sure if this invalidates the result. Maybe I can normalize the sum every time after I square it, so that it remains to be a Markov matrix, I thought. And this time, it converged to $p=0.01525753293679551$ after 603 iterations. Using "long double" type in python doesn't change the result by much.

At this point I believed that the result is accurate enough, so I submitted it. Then I got a reply from Ponder This, which informed me that there was a formula of the exact solution. So I took another look and figured it out!

A typical approach to find the final state probabilities is, finding a martingale. A martingale, as I understand it, is like a conserved quantity in physics. In physics, when we want to know the final state of an object, sometimes we don't need to know the dynamics at every moment in the process. Instead, we just need to use the conservation laws, which states that certain quantities must remain the same in the initial state and the final state, which provides a shortcut to the calculation. A martingale in a stochastic process is a conservation of expectation. If the expectation of a quantity doesn't change after one step in the process, then the expectation in the beginning must be the same of that in the end, which makes it very suitable for solving final probabilities.

We may rewrite this problem as a random walk problem. Let's use point 0 to represent the neutral state, and negative points to represent $A_i$, positive points for $B_i$. We start from point 0, and if we roll an A, we move to -1, and if we roll a B, we move to 1, and we stay at 0 if we roll a draw. At any positive (B) point except the last one which is the absorbing state, if we roll an A, we go straight to -1, and if we roll a B, we move to the right by 1, and a draw moves us to 0. Similar for negative points. At the absorbing states, we don't move.

I wasn't able to find a martingale in this model, because the distance that we travel depends on where we are, so the expectation of our location can't be conserved. But then I thought, the expectation of the location depends on both the probability and the distance. The probabilities are fixed, but I'm free to change the distances anyway I want!
Now, if I want the expectation to be conserved, the expectation of the change in the location at any point must be zero. Let the coordinate of $A_1,A_2,\dots,A_n$ be $-a_1,-a_2,\dots,-a_n$ respectively, and similar for $B_i$. Denote $p_a,p_b,p_n$ for the probability that $A$ wins the round, $B$ wins, and a draw respectively. The expectation after one step from point 0 is $p_a(-a_1)+0+p_b(b_1)$ which must equal zero. At $A_1$, the expectation of the displacement after one step is $p_a(a_1-a_2)+p_na_1+p_b(a_1+b_1)$ which again must be zero. Similarly we get $p_a(a_{i-1}-a_i)+p_na_{i-1}+p_b(a_{i-1}+b_1)=0$. To get the equations for $B_i$, simply exchange $a_i$ and $b_i$, $p_a$ and $p_b$. At the two end points $-a_n$ and $b_n$, we never move, so it's guaranteed that the expectation doesn't change. Now, our coordinate is a martingale, because no matter where we are, the expectation of our coordinate after one step is always the same. Which means, if we start from 0, the expectation of our coordinate after infinite steps is still 0. Since we must be either at $-a_n$ with probability $prA$ or at $b_n$ with probability $prB$, we must have $prA\cdot(-a_n)+prB\cdot b_n=0$. Now we just need to find the coordinates of the two end points, which can be solved by solving the recursive equations.

The only constraint on $a_1$ and $b_1$ is the equation at point 0. So, as long as $a_1:b_1=p_b:p_a$, we can scale them by any constant. For simplicity, let's set $a_1=p_b, b_1=p_a$. With $p_a+p_b+p_n=1$, we can simplify the equations to $p_aa_i=a_{i-1}+p_ap_b$.
Let $D_i=a_i-a_{i-1}$, so we have $p_aD_i=D_{i-1}$.
$D_i=\frac{D_1}{p_a^{i-1}}$.
Here we define $D_1=a_1=p_b$. We then have $D_i=\frac{p_b}{p_a^{i-1}}$.
Summing it up,
$$a_n=\sum_{i=1}^n D_i = p_b\frac{\frac{1}{p_a^{n}}-1}{\frac{1}{p_a}-1}$$
The final result, the probability that $A$ first wins $n$ consecutive rounds, is
$$prA=\frac{b_n}{a_n+b_n}$$
$$=\frac{1}{\frac{a_n}{b_n}+1}$$
$$=\frac{1}{\frac{p_b}{p_a}\frac{\frac{1}{p_a^n}-1}{\frac{1}{p_a}-1}\frac{\frac{1}{p_b}-1}{\frac{1}{p_b^n}-1} +1}$$
$$=\frac{1}{\frac{1-p_b}{1-p_a}\frac{\frac{1}{p_a^n}-1}{\frac{1}{p_b^n}-1} +1}$$
Plugging in $p_a,p_b,n$, we get the result.