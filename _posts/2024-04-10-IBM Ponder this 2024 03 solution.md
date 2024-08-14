---
title: IBM Ponder this 2024 03 solution
date: 2024-04-10
---
<link rel="stylesheet" href="/Yi-blog/css/styles.css">
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
        loadScript(&quot;https://yjian012.github.io/Yi-blog/js/markdown-highlight-in-blogger.js&quot;).then(script=&gt;loadScript(&quot;https://yjian012.github.io/Yi-blog/js/scripts.js&quot;));
      //https://mxp22.surge.sh/markdown-highlight-in-blogger.js
    </script>
<pre>
Problem description can be found <a href="https://research.ibm.com/haifa/ponderthis/challenges/March2024.html">here</a>. The solution is posted <a href="https://research.ibm.com/haifa/ponderthis/solutions/March2024.html">here</a>.
Not much to talk about this time. The result from $X_1$ to $X_{100}$ is,

1,8,9,9,15,15,15,24,24,24,90,90,90,105,105,105,114,114,114,114,
114,114,225,225,225,225,225,225,264,264,264,264,264,264,300,300,300,300,300,300,
300,300,300,300,300,300,945,945,945,945,945,945,945,945,945,945,945,945,945,945,
945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,945,
945,945,945,945,945,945,945,945,5349,5349,5349,5349,5349,5349,5349,5349,5349,5349,5349,5349,

Recording only when the result changes, the indices and values of $X_i$ for $i\leq 300$ are,

inds:
0,1,2,4,7,10,13,16,22,28,34,46,88,100,103,124,157,247,274,283,
vals:
1,8,9,15,24,90,105,114,225,264,300,945,5349,7035,11739,17280,35475,46914,190365,351645,
idiffs:
1,1,2,3,3,3,3,6,6,6,12,42,12,3,21,33,90,27,9,
vdiffs:
7,1,6,9,66,15,9,111,39,36,645,4404,1686,4704,5541,18195,11439,143451,161280,

where "inds" are the indices (0-indexed, so it's $i-1$), "vals" are the values $X_i$, "idiffs" are the differences in the indices, and "vdiffs" are the differences in the values.
There's no obvious pattern here. So, the only way is to test every number.

To find $X_{1000}$, it's alright to use the slow way of generating a list of primes, i.e., testing if the number $n$ divides any primes $\leq \sqrt n$. The result is 115192665.

But this method is way too slow for the bonus question.
To test the primality of a large range of numbers, the most efficient way is also the most ancient way, by sieving. With sieving, the larger the range, the more efficient it is. But what range should I use?
If I use one bit for each number, 8GB RAM can hold $2^{36}$ numbers. Is that enough?

I decided to try that with CUDA. And I found this very nice <a href="https://medium.com/@mckev/generating-prime-numbers-using-gpu-eb0d9caea479">GPU prime number generating algorithm</a>. But it turns out that the result is beyond $2^{36}$. 

Let's take a look at the trend of the values. The following plot is the values vs indices in the result above plus the point (1000, 115192665) in log-log scale:
</pre>
![image](/Yi-blog/img/trend.PNG)
<pre>
It seems that it still curves up, so at $n=2000$ it seems that it should be about $10^{11}$, which is about $2^{36.5}$. But it's hard to tell if that's enough, it may very well be much larger. What can I do?
Noticing that with primes list up to $2^n$ as seed, I can sieve primes up to $2^{2n}$. So, since I can already generate primes up to $2^{36}$, theoretically I can use that to generate primes up to $2^{72}$. But there's not enough ram or even storage to hold that many numbers.

Well, I can't hold all the numbers, but I can cut the range into sections, and sieve them one by one.

To save space, I only kept the odd numbers. The shifts, $i(i-1)/2$, are also separated into two lists, the odd ones and the even ones, for quick look up. It's not hard to come up with the formulas, i.e.

odd_sift[i]=(2*i+1)*(i+1-(i&1)), where i $\in$ [0, n/2+((n&3)==3) )
even_shift[i]=(2*i+1)*(i+(i&1)), where i $\in$ [0, n/2+((n&3)==1) )

So if the current number is odd, I only check even shifts, and odd shifts for even numbers.

The algorithm goes like this:

-Generate primes list up to $2^k$ on CPU.
-Using that as seed, generate primes list up to $2^{2k}$ with CUDA.
-Copy that to GPU. With that as seed, I can sieve primes up to $2^{4k}$.
-Determine the sizes of the bit arrays "good_numbers", "sieve_buffer", and integer arrays "odd_sift" and "even_shift", and allocate them on GPU. The sieve range must be greater than the good_numbers range plus $n(n-1)/2$. The larger the range, the more efficient it is. Initialize the bit arrays to 1 bits.
-Use the GPU prime sieving algorithm to sieve each range [sieve_start, sieve_end). Use binary search to find the starting index in the primes list. Also, since the minimum number to multiply is 3, and only odd numbers are considered, the number of threads is only 1/6 of the range.
-Check if the end of the range of good_numbers plus $n(n-1)/2$ is beyond the sieve range. If so, change sieve_start to the current starting point of good_numbers, and sieve this new range.
-For each bit index in good_numbers (offset by the current starting point), check if the number shifted by odd_shift or even_shift is a prime. If it hits a prime, mark the bit to 0.
-Use cub::DeviceReduce::Max() to check if there's any non-zero values in good_numbers. If not, move current start point to the previous end point. Otherwise, the answer is found, return the location of the first 1 bit.
(If cub::DeviceReduce has something like an ArgReduce() function which takes a custom reduce function, this could be done more efficiently, but I didn't find any. I've submitted a feature request, don't know if it'll be added one day.)
(Update: I was informed that the function that matches this description is <a href="https://nvidia.github.io/cccl/thrust/api/groups/group__searching.html#function-find-if">thrust::find_if</a>. Don't need to worry about the "thrust::device", just pass the C array and it works, like this:

    struct is_non_zero{
        __host__ __device__
        bool operator()(uint64_t x){return x!=0;}
    };
            auto iter=thrust::find_if(thrust::device,good_num_device,good_num_device+good_num_size,is_non_zero());
            int byteshift=iter-good_num_device;

This solves the problem at hand, but still, I think it'd be nice to have an argument version of reduce. Maybe it'll be useful somewhere else.
)

When I wrote this program, I fell into a pitfall. I tested the program for $n\leq 300$ and $n=1000$, it worked pretty well. But when I tried $n=2024$, it just kept going, until my GPU runtime got disconnected. Then I switched to the CPU version, and very quickly, an answer popped out, 1412159754600. I was surprised that the answer wasn't found by the GPU, but it's right after where it left off. I didn't think too much about it, so I just submitted it. Since you've already seen the answer, you probably noticed that this is not the correct answer. Indeed, this is about 12 times larger than the actual answer.

So, where did it go wrong? It took me quite some time to find out where the bug is. It turned out, it was not in the logic. It was not even in my implementation. It was in this line:

uint64_t i = (blockIdx.x * blockDim.x + threadIdx.x)*2+3;

It turned out, there were a lot of indices that $i$ didn't reach, meaning that many composite numbers were not sieved, instead they were left as prime. That's why the program never ended, it saw prime numbers everywhere, and every number hit a prime within only a few steps.
So what's wrong with this line? When I finally tried to output the indices "blockIdx.x, blockDim.x, threadIdx.x", a warning caught my attention. It said that I was trying to print an unsigned int type as an unsigned long long type. So, that's it. The indices, blockIdx.x etc, are all 32 bit unsigned int. But the number of threads can be greater than $2^{32}$. When that happens, it doesn't give a runtime error like a signed integer. It just quietly overflows. Very sneaky. Since these variables are not defined by me, it's not easy for me to check what type they are in.
I unconsciously neglected this possibility because I saw "blockIdx.x * blockDim.x + threadIdx.x" as the index in an array in many CUDA program examples, so I naturally thought, "they must be in size_t type, so that it can be used to represent any index in an array." Well, how wrong I was.
Anyway, at least I learned my lessons. Never assume the type of a variable not defined by myself, always check them. And, CUDA indices are 32 bit unsigned int. Guess I will remember this for the rest of my life...
Anyway, converting blockIdx.x to uint64_t fixed it.

With seed primes up to $2^{20}$, sieve_range=$2^{34}$, good_numbers range=$2^{22}$, the program finds the solution in 2m40s.



Miscellaneous thoughts:

Primality test:
While I was debugging the program, I looked for primality test algorithms to double check the number of steps.
There are a few primality test algorithms available. I heard about the <a href="https://en.wikipedia.org/wiki/AKS_primality_test">AKS test</a> 10 years ago. This time, I learned more about other algorithms, and I realized that although AKS algorithm is the first deterministic primality test that runs in polynomial time, in practice we may use a faster probabilistic test. The <a href="https://en.wikipedia.org/wiki/Baillie%E2%80%93PSW_primality_test">Baillie–PSW primality test</a> is a good candidate. Even though it's probabilistc, no counter-examples have ever been found. I found the <a href="https://flintlib.org/doc/fmpz.html#c.fmpz_is_probabprime_BPSW">FLINT implememtation</a> of the BPSW algorithm and learned how to install and use it. It was pretty easy to use (although the installation is very slow...).

Generalization to other sequences:
In general, we may consider the function
$f(a_0)=\min\{n|a_0+s_n \text{is prime}\}$
We get a different function $f$ for every different sequence $s_n$. The problem above is the case where $s_n=0+1+\dots+(n-1)=n(n-1)/2$.
A similar problem is when $s_n=(n-1)^2$.
A simpler sequence, $s_n=n-1$, results in $f(a_0)$ being the distance from $a_0$ to the next prime number, which gives <a href="https://oeis.org/A007920">this list</a>.
We may also consider exponential sequencies, like $s_n=2^{n-1}$.

An interesting sequence is $s_n=(n-1)!$. Here, 0! is better defined as 0, I think. The biggest difference between this sequence and those above is, for any $a_0$, the function $f(a_0)$ with $s_n$ given above should be finite (except when $s_n=k^{n-1}$ and $\gcd(a_0,k)\neq 1$ or both $a_0$ and $k$ are odd), but it's not at all clear where it will stop until we find the solution. But with factorial sequence, it's the opposite: we must have $f(a_0)&lt;m(a_0)$ or $f(a_0)=\infty$, where $m(1)=1$ and for $x\neq 1$, $m(x)$ is the minimum prime factor of $x$.

I did some calculations on what numbers will give infinite $f(a_0)$, grouped by their minimum prime factor.
min prime factor = 2: 8,14,20,24,26,... Which is obvious, those that equals an odd composite minus one.
min prime factor = 3: 33,63,75,...
min prime factor = 5: 295,445,505,665,... I didn't find any up to 100 by hand, so I wrote a program to find them.

To calculate this sequence efficiently, we need a sieve algorithm that leave the minimum prime factor of a number. This is not hard to construct, just initialize the values to uint(-1), and use min() function in the sieving. The problem is when the composite number is a product of very large primes, in which case we must test the primality of $n+k!$ for $k$ from 1 to $p-1$, where $p$ is $n$'s minimum prime factor. The number can be very large and there are a lot of tests to do.

Another similar sequence is the <a href="https://en.wikipedia.org/wiki/Primorial">primorial sequence</a>.

I wonder if these functions give any interesting result...