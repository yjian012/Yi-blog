---
title: The long journey from O(n^2) to O(n^1.5), Leetcode H1269. Number of Ways to Stay in the Same Place After Some Steps
date: 2023-10-18
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
<pre>H1269 description:
<blockquote>
You have a pointer at index 0 in an array of size arrLen. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time).

Given two integers steps and arrLen, return the number of ways such that your pointer is still at index 0 after exactly steps steps. Since the answer may be too large, return it modulo $10^9 + 7$.

Constraints:
  1 <= steps <= 500
  1 <= arrLen <= $10^6$</blockquote>
</pre>
<pre>
An $O(steps*\min(steps,arrLen))$ time complexity, $O(\min(steps,arrLen))$ space complexity solution is not hard to find, which is the typical approach and featured in the Editorial.

Basically we build up a table from the first step to the last step, where each row records the number of ways to be in that position at that step. It's easy to see that one can move at most $steps/2$ steps to the right, so if $arrLen>steps/2$ we just need to calculate $step/2+1$ positions. And since the position after each step only depends on the position at the previous step, one can use just two arrays to represent them and switch them after each step.

Here is a slightly improved version based on that approach:
</pre>
<pre class="markdown">
```cpp
#pragma GCC target("avx,mmx,sse2,sse3,sse4")
auto _=[]()noexcept{ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);return 0;}();
unsigned int cnt[251];
const int mod=1000000007;
class Solution {
public:
    int numWays(int steps, int arrLen){
        if(arrLen&lt;=2){
            if(arrLen==1) return 1;
            int p=(steps-1)/63,q=(steps-1)%63;
            unsigned long long r=(1ULL&lt;&lt;q)%mod,c=(1ULL&lt;&lt;63)%mod;
            while(p--) r=(r*c)%mod;
            return r;
        }
        int b=min(steps/2+1,arrLen),tmp2;
        unsigned long long tmp1;
        memset(cnt,0,b*sizeof(cnt[0]));
        cnt[0]=1;
        for(int i=0;i&lt;steps;++i){
            tmp1=cnt[0];
            cnt[0]=(cnt[0]+cnt[1])%mod;
            int s=min(min(i+1,steps-i),b-1);
            for(int j=1;j&lt;s;++j){tmp2=cnt[j]; cnt[j]=(tmp1+cnt[j]+cnt[j+1])%mod; tmp1=tmp2;}
            cnt[s]=(tmp1+cnt[s])%mod;
        }
        return cnt[0];
    }
};
```
</pre>
<pre>
Since the new position only depends on the 3 array elements of the previous step which is a fixed number, we don't really need to use an array to store that. Just use two integers to store two of the elements and roll them forward to update the single array. This saves half of the space.

Also noticing that the shape of the relevant elements in the array forms a triangle (first row has one non-zero element, second row has two, ..., after halfway we must go back, so the position afterwards are irrelevant and there's no need to comput them... second to last row has two relevant elements, the last has one), we can skip those unnecessary calculations, which saves at most half of the time.

When $arrLen==2$, the result has a very simple form: $2^{steps-1}$, so we just need to find $2^{steps-1} \mod 10^9+7$. The power function can be done in $O(\log n)$, but here since $steps<=500$, if we just factor $2^{steps-1}$ into power of $2^{63}$ and the remainder, it can be done in at most 8 operations, which is probably more efficient than using a power function.

This is an optimization to the typical approach. So far so good.

But, can this be optimized further?

Let's see what actually happens when we evolve the array after each step. $a_{j+1}[0]= a_j[0]+a_j[1]$, $a_{j+1}[1]= a_j[0]+a_j[1]+a_j[2]$, ...
If we write the array as a column vector, the new vector is the old one multiplied by a matrix:
$$\mathbf a_{j+1}=\mathbf H \mathbf a_j$$
where $\mathbf H$ is
</pre>
<pre class="markdown">
```
1 1 0 0 0 ... 0
1 1 1 0 0 ... 0
0 1 1 1 0 ... 0
0 0 1 1 1 ... 0
...
0 ... 0 1 1 1 0
0 ... 0 0 1 1 1
0 ... 0 0 0 1 1
```
</pre>
<pre>
After $s$ operations, the resulting vector is $\mathbf a_s=\mathbf H^s\mathbf a_0$, where $\mathbf a_0$ is a vector whose first element equals one and the rest zero. The answer to the problem is just $\mathbf a_s[0]$, which equals the product of the first row of $\mathbf H^s$ and $\mathbf a_0$. Since the only non-zero element of $\mathbf a_0$ is the first element which is one, the answer is just $\mathbf H^s[0][0]$.

A simple implementation of matrix multiplication has $O(n^3)$ complexity. Strassen algorithm can bring it down to $O(n^{\log_2 7})\approx O(n^{2.81})$, and recent research brought the bound to as low as $O(n^{2.372})$. But they are considered galactic algorithms. The matrix $\mathbf H$ is at most 500*500, even the not-so-complicated Strassen algorithm probably won't accelerate it by much. Furthermore, it must be multiplied by $O(\log s)$ to include the complexity of computing the power $s$. So this does not improve the performance at all.

But noticing that the matrix is a symmetric tridiagonal toeplitz matrix, maybe we can exploit this symmetry and find a better algorithm.

A Hermitian matrix is always diagonalizable, $\mathbf H=\mathbf P \mathbf D \mathbf P^\dagger$, where $\mathbf D$ is a diagonal matrix with elements equal to the eigen values of $\mathbf H$, and $\mathbf P$ is a unitary matrix $\mathbf P^{-1}=\mathbf P^\dagger$. If $\mathbf H$ is symmetric, $\mathbf P$ is orthogonal, $\mathbf P^{-1}=\mathbf P^T$. This property makes it very easy to calculate powers of Hermitian/symmetric matrices, since all the $\mathbf P$ and $\mathbf P^{-1}$ in the middle cancel out, $\mathbf H^s=\mathbf P \mathbf D^s \mathbf P^\dagger$, and $\mathbf D^s$ is very easy to calculate - just raise every element on the diagonal to power $s$.

This property alone doesn't help much, since eigendecomposition typically has the same complexity as matrix multiplication. The only thing it improves is, the power is easy to solve, so the $\log s$ factor is gone. This is not good enough.
  
But this matrix is not only symmetric, it's also <a href="https://en.wikipedia.org/wiki/Toeplitz_matrix">Toeplitz</a>. A Toeplitz matrix can be decomposed in $O(n^2)$. A <a href="https://en.wikipedia.org/wiki/Tridiagonal_matrix#Eigenvalues">tridiagonal Toeplitz</a> matrix has known eigen values, namely $a+2\sqrt{bc}\cos\left(\frac{k\pi}{n+1}\right), k=1,\dots,n$, where $a=b=c=1$ in this case.

Since $\mathbf D^s$ is diagonal, it's easy to see that $\mathbf H^s[0][0]=\sum_i \mathbf P[0][i] \mathbf D^s[i][i] \mathbf P^T[i][0] = \sum_i \mathbf P^2[0][i] \mathbf D^s[i][i]$. We already have the eigen values, now if we can find the first row of the matrix $\mathbf P$ without actually decomposing the matrix, it would be an $O(n)$ algorithm!

Here are the eigen values and the first rows of the $\mathbf P$ of various sizes of $\mathbf H$ that I found, the first rows are the sizes, the second rows are the eigen values, the third rows are the first row of the corresponding $\mathbf P$:
(If the table below is all messed up, try refreshing. For speed (I guess) or whatever reason, sometimes browsers don't load the scripts in order, which messes up the table.)
</pre>
<pre class="markdown">
| 3*3 |  |  |
|:--:|:--:|:--:|
| $1+\sqrt{2}$, | 1, | $1-\sqrt{2}$ |
| 1/2, | $1/\sqrt{2}$, | 1/2 |

|4*4| | | |
|:--:|:--:|:--:|:--:|
|$(3+\sqrt{5})/2$,| $(1+\sqrt{5})/2$,|$	(1-\sqrt{5})/2	$,|$(3-\sqrt{5})/2$|
|$1/\sqrt{5+\sqrt{5}}$,|$1/\sqrt{5-\sqrt{5}}$,|$	1/\sqrt{5+\sqrt{5}}	$,|$1/\sqrt{5-\sqrt{5}}$|

|5*5| | | | |
|:--:|:--:|:--:|:--:|:--:|
|$1+\sqrt{3}$,|$		2	$,|$	1	$,|$	1-\sqrt{3}	$,|$	0$|
|$1/2\sqrt{3}$,|$	1/2$,|$		1/\sqrt{3}$,|$		1/2\sqrt{3}$,|$	1/2$|

|6*6| | | | | |
|:--:|:--:|:--:|:--:|:--:|:--:|
|2.80194,|		2.24698	,|	1.44504	,|	-0.801938,|	0.554958,|	-0.24698|
|0.231921	,|-0.417907,|	0.521121,|	0.231921,|	0.521121,|	0.417907|

7*7| | | | | | |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|2.84776	,|	2.41421	,|	1.76537		,|1,|		-0.847759	,|-0.414214,|	0.234633|
|0.191342	,|0.353553	,|0.46194,|		0.5	,|	0.191342,|	0.353553,|	0.46194|
</pre>
<pre>
Noticing the symmetry of the elements in $\mathbf P$ and the corresponding eigen values, remembering that the eigen values are $1+2\cos\theta$, it's easier to tell by returning the eigen values back to the $\cos$ value, i.e., subtract 1 from the values and then divide by 2.
</pre>
<pre class="markdown">
|3*3|  |  |
|:--:|:--:|:--:|
| $\sqrt{2}/2$ ,|	0,|	$-\sqrt{2}/2$|
|1/2 ,|$1/\sqrt{2}$,| 1/2|

|4*4| | | |
| :--:|:--: | :--:|:--:|
|$(1+\sqrt{5})/4$,|$	(-1+\sqrt{5})/4$,|$	(-1-\sqrt{5})/4	$,|$(1-\sqrt{5})/4$|
|$1/\sqrt{5+\sqrt{5}}$,|$1/\sqrt{5-\sqrt{5}}$,|$	1/\sqrt{5+\sqrt{5}}	$,|$1/\sqrt{5-\sqrt{5}}$|

|5*5| | | | |
| :--:|:--: | :--: |:--:|:--:|
|$\sqrt{3}/2$,|$		1/2	$,|$	0	$,|$	-\sqrt{3}/2	$,|$	-1/2$|
|$1/2\sqrt{3}$,|$	1/2$,|$		1/\sqrt{3}$,|$		1/2\sqrt{3}$,|$	1/2$|

|6*6| | | | | |
| :--: | :--: |:--: |:--:|:--:|:--:|
|1.80194/2,|		1.24698/2	,|	0.44504/2	,|	-1.801938/2,|	-0.44504/2,|	-1.24698/2|
|0.231921	,|-0.417907,|	0.521121,|	0.231921,|	0.521121,|	0.417907|

7*7| | | | | | |
| :--: | :--: |:--: |:--:|:--:|:--:|:--:|
|1.84776/2	,|	1.41421/2	,|	0.76537/2		,|0,|		-1.847759/2	,|-1.414214/2,|	-0.76537/2|
|0.191342	,|0.353553	,|0.46194,|		0.5	,|	0.191342,|	0.353553,|	0.46194|
</pre>
<pre>
I noticed that for 3*3 5*5 and 7*7 matrices, the elements corresponding to $0$ are $1/\sqrt{2}$,$1/\sqrt{3}$,$1/\sqrt{4}$ respectively, and for 4*4 all elements have a factor of $\sqrt{5}$, so there could be a factor of $1/\sqrt{n+1}$. I guessed that it may also have something to do with $\sin\theta$, since as the absolute value of the eigen value decreases, the element value increases. And I figured it out!
The formula is,
$\theta_i=\frac{i\pi}{n+1}, i=1,2,...n$
$e_i=1+2\cos\theta_i$
$p_i=\sqrt{\frac{2}{n+1}}\sin\theta_i$
$ans=\sum_ie_i^{s}p_i^2, s=steps$
The following code implements this algorithm. The only problem now is, the result could be very large, so how do we find the remainder of it $\mod 10^9+7$ accurately?
</pre>
<pre class="markdown">
```
#pragma GCC target("avx,mmx,sse2,sse3,sse4")
auto _=[]()noexcept{ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);return 0;}();
unsigned int cnt[251];
const int mod=1000000007;
class Solution {
public:
    int numWays(int steps, int arrLen){
        if(arrLen&lt;=2){
            if(arrLen==1) return 1;
            int p=(steps-1)/63,q=(steps-1)%63;
            unsigned long long c=(1ULL&lt;&lt;63)%mod,r=(1ULL&lt;&lt;q)%mod;
            while(p--) r=(r*c)%mod;
            return r;
        }
        int b=min(steps/2+1,arrLen),tmp2;

        //new algorithm
        double r=0.0;
        for(int i=1;i&lt;=b;++i){
            double c=cos(M_PI*i/(b+1));
            r+=pow(1+2*c,steps)*(1-pow(c,2));
        }
        r=r*2/(b+1);
        if(r&lt;mod) return round(r);

        //may not work due to rounding errors if result is too large, so back to old algorithm
        unsigned long long tmp1;
        memset(cnt,0,b*sizeof(cnt[0]));
        cnt[0]=1;
        for(int i=0;i&lt;steps;++i){
            tmp1=cnt[0];
            cnt[0]=(cnt[0]+cnt[1])%mod;
            int s=min(min(i+1,steps-i),b-1);
            for(int j=1;j&lt;s;++j){tmp2=cnt[j]; cnt[j]=(tmp1+cnt[j]+cnt[j+1])%mod; tmp1=tmp2;}
            cnt[s]=(tmp1+cnt[s])%mod;
        }
        return cnt[0];
    }
};
```
</pre>
<pre>
Simply changing to 
</pre>
<pre class="markdown">
```
        r=remainder(r,mod);
        return round(r);
```
</pre>
<pre>
gives numeric errors:
</pre>
<pre class="markdown">
```
Input
steps = 47
arrLen = 38
Output 318653590
Expected 318671228
```
</pre>
<pre>
(In this example, the result is "r=1.149565e+20", it's accurate up to the 15th decimal place.
Which means we can safely do that when the result is less than $10^{15}$ which is about $2^{50}$, so we can change
</pre>
<pre class="markdown">
```
if(r&lt;mod) return round(r);
```
</pre>
<pre>
to
</pre>
<pre class="markdown">
```
if(r&lt;(1ULL&lt;&lt;50)) return round(fmod(r,mod));//fmod() avoids negative results that remainder() may return
```
</pre>
<pre>
and the result is precise enough.)

So it requires too much precision for very large outputs. But in general, it gives a very good approximation in $O(n)$ complexity. Amazing!

But can we improve the complexity for the original problem? Let's go down this path further and see where it leads us!

If we apply the trivial result that answer=1 when steps=1, we get an interesting identity,
$\sum_i(1+2\cos\theta_i)\sin^2\theta_i=\frac{n+1}{2}$
,where $\theta_i=\frac{i\pi}{n+1}, i=1,2,\dots,n$.
One way to prove it is, simply write $\cos\theta_k=(e^{i\theta_k}+e^{-i\theta_k})/2$ and $\sin\theta_k=(e^{i\theta_k}-e^{-i\theta_k})/2i$ and expand the expression, most of the summations cancel out, only the number 1/2 repeats $n+1$ times, thus completes the proof.

There is an easier way to prove it, though. Noticing that $\cos(\pi-\theta)=-\cos\theta$ and $\sin(\pi-\theta)=\sin\theta$, the terms $\cos\theta_k\sin^2\theta_k$ cancel out! Now we're left with $\sum_k \sin^2\theta_k=\sum\frac{1-\cos(2\theta_k)}{2}=\frac{n}{2}-\frac{1}{2}\sum\cos(2\theta_k)$. $\cos(2\theta_k)$ can be taken as the real part of $e^{i2\theta_k}$, where $\theta_k=\frac{k\pi}{n+1}, k=1,\dots,n$. So it becomes $\sum_{k=1}^n e^{i\frac{k 2\pi}{n+1}}$. It would make a full circle if we include $k=0$ which contributes an extra 1, thus the summation must equal -1. This gives the expected result $\frac{n+1}{2}$.

Can we generalize this to the general case with power $s$? Let's find out!

The function is zero for $\theta=0$, so adding $k=0$ doesn't change the result.
Then, if we also include $\theta_k=\frac{k\pi}{n+1}$ where $k=n+1,n+2\dots,2n+1$, they are just the repeat of the values for $k=0,1\dots,n$, thus the result is doubled.
Applying these changes and express the $\sin$ and $\cos$ in exponents, we get
$$ans=-\frac{2}{n+1}\sum_{k=0}^{2n+1}(e^{i\theta_k}+e^{-i\theta_k}+1)^s(e^{2i\theta_k}+e^{-2i\theta_k}-2)/8$$
If we expand it as a polynomial of $e^{i\theta_k}$, $ans=\sum_k \sum_m a_m e^{im\theta_k}$, most of the terms will cancel out after the summation of $k$, since the summation would become $(1-e^{i\frac{(2n+2)m\pi}{n+1}})/(1-e^{i\frac{m\pi}{n+1}})$, which is zero unless $\frac{m}{n+1}$ is a multiple of 2, in which case the summation is $2n+2$ since it's 1 repeated $2n+2$ times.

Thus, only the terms with power $m$ being a multiple of $2n+2$ contributes to the result. Each one of those contributs $a_m(2n+2)$. How do we find $a_m$? The coefficient of the term $e^{im\theta_k}$ in $(e^{i\theta_k}+e^{-i\theta_k}+1)^s$ is easy to find, namely $\sum_{j=0}^{\frac{s-m}{2}}\binom{s}{j}\binom{s-j}{j+m}$. Let's denote that by $c(m)$. Multiplying it by $e^{2i\theta_k}+e^{-2i\theta_k}-2$ will shift it to the powers $m+2$, $m-2$ and $m$ respectively.
Thus, the result is
$$ans=\frac{1}{2}(\sum_{m} 2 c(m)-c(m+2)-c(m-2))$$
where $c(m)=\sum_{j=0}^{\frac{s-m}{2}}\binom{s}{j}\binom{s-j}{j+m}$.

Then, what are the $m$s? Since the power can be at most $s$, and $m$ must be a multiple of $2n+2$, the ratio must be within $[-\frac{s}{2n+2},\frac{s}{2n+2}]$. We can then just iterate through that and multiply by $2n+2$. This completes the algorithm.

This algorithm has complexity $O(steps*max(steps/arrLen,1))$. Interestingly, one would expect the complexity to grow with $arrLen$, but with this algorithm it's the opposite. When $arrLen>steps$, the old algorithm at the beginning takes $O(steps^2)$ while this one takes $O(steps)$! If we combine this algorithm and the old algorithm which has complexity $O(steps*min(steps,arrLen))$, i.e., we use the new algorithm for large $arrLen$ and the old one for small $arrLen$, we get an $O(step^{1.5})$ algorithm! We choose the new one if $arrLen>\sqrt{steps}$ and the old one otherwise.

(Building the binomial table has complexity $O(n^2)$ but it is not included in the complexity, since it only needs to be built once. For multiple requests the amortized complexity can be arbitrarily low. Explictly, if the function is called $k$ times, while the maximum of the number of steps is $N$, then the amortized complexity is $\frac{N^2}{k}$. If $k\geq \sqrt N$, the amortized comlexity is still $O(N^{1.5})$.)

The following code implements this algorithm:
</pre>
<pre class="markdown">
```
#pragma GCC target("avx,mmx,sse2,sse3,sse4")
auto _=[]()noexcept{ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);return 0;}();
unsigned int cnt[251];
const int mod=1000000007;
vector&lt;vector&lt;int>> binom{{1}};
void buildBinom(int n){
    for(int i=binom.size()-1;i&lt;=n;++i){
        vector&lt;int> v;
        v.reserve(i+2);
        v.emplace_back(1);
        const auto& b=binom.back();
        for(int j=0;j&lt;i;++j) v.emplace_back((b[j]+b[j+1])%mod);
        v.emplace_back(1);
        binom.emplace_back(move(v));
    }
}
int getCoe(int s,int j,int t){
    if(j+t&lt;0||s&lt;2*j+t) return 0;
    return (long long)binom[s-j][j+t]*binom[s][j]%mod;
}
class Solution {
public:
    int numWays(int steps, int arrLen){
        if(arrLen&lt;=2){
            if(arrLen==1) return 1;
            int p=(steps-1)/63,q=(steps-1)%63;
            unsigned long long c=(1ULL&lt;&lt;63)%mod,r=(1ULL&lt;&lt;q)%mod;
            while(p--) r=(r*c)%mod;
            return r;
        }
        if(steps==1) return 1;
        if(arrLen>steps||arrLen*arrLen>steps){
            buildBinom(steps);
            long long t=0;
            int tmp=2*arrLen+2;
            for(int m=-steps/tmp*tmp;m&lt;=steps;m+=tmp){
                int upper=(steps-m)/2+2;
                for(int j=0;j<=upper;++j){
                    t=(t+2*getCoe(steps,j,m)-getCoe(steps,j,m+2)-getCoe(steps,j,m-2))%mod;
                }
            }
            return ((t*500000004)%mod+mod)%mod;
        }
        int tmp2;
        unsigned long long tmp1;
        memset(cnt,0,arrLen*sizeof(cnt[0]));
        cnt[0]=1;
        for(int i=0;i&lt;steps;++i){
            tmp1=cnt[0];
            cnt[0]=(cnt[0]+cnt[1])%mod;
            for(int j=1;j&lt;arrLen;++j){tmp2=cnt[j]; cnt[j]=(tmp1+cnt[j]+cnt[j+1])%mod; tmp1=tmp2;}
            cnt[arrLen]=(tmp1+cnt[arrLen])%mod;
        }
        return cnt[0];
    }
};
```
</pre>
<pre>
Ah, one more thing. The number 500000004 here acts as $2^{-1}$, because we can't simply divide $t$ by 2. To divide a number $\mod q$, we must multiply the inverse of the element. Now, the $O(n^{1.5})$ algorithm is complete.

To get rid of this $2^{-1}$, noticing the symmetry of the coefficients $c(m)=c(-m)$, it's easy to see that the sum of the terms corresponding to $m$ and $-m$ are the same. With this, the middle part can be written as
</pre>
<pre class="markdown">
```
        if(arrLen>steps||arrLen*arrLen>steps){
            buildBinom(steps);
            long long t=0;
            for(int j=0;j&lt;=steps/2;++j) t=(t+getCoe(steps,j,0)-getCoe(steps,j,2))%mod;
            int tmp=2*arrLen+2;
            for(int m=tmp;m&lt;=steps;m+=tmp){
                int upper=(steps-m)/2+2;
                for(int j=0;j&lt;=upper;++j){
                    t=(t+2*getCoe(steps,j,m)-getCoe(steps,j,m+2)-getCoe(steps,j,m-2))%mod;
                }
            }
            return (t+mod)%mod;
        }
```
</pre>
<pre>
which also saves the time by half.


I really enjoyed the journey to this surprising result. It reminds me of the first time I learned about Strassen algorithm. The fact that "this is achievable!" and seeing it unveils in front of me is so satisfying!

(ps: Just learned that the solution for the case when $arrLen>=steps/2+1$ is known as the <a href="https://en.wikipedia.org/wiki/Motzkin_number">Motzkin numbers</a>, which has an recurrence relation: $M_n=\frac{2n+1}{n+2}M_{n-1}+\frac{3n-3}{n+2}M_{n-2}$. This gives an $O(n)$ algorithm without the need to build the binomial table for this special case. The only downside is, we must find $(i+2)^{-1} \mod 1e9+7$ for $i=1\dots steps$, which takes about 30 operations for each of them by finding $(i+2)^{1e9+5}$. But it's still a really good algorithm. I wonder if this can be generalized for the "correction terms" above, i.e., if there is a recurrence relation for $M_{n,m}=c(m)-(c(m-2)+c(m+2))/2$. The Motzkin numbers are the $M_{n,0}$ here. If so, the binomial table will not be necessary.)