---
title: A Formula for Accumulated XOR Operations in a Continuous Range (LC E268)
date: 2024-02-19
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
<pre>I came up with this formula when I was solving E268. Missing Number again.

Description:
<blockquote>Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
Constraints:
    n == nums.length
    1 &lt;= n &lt;= $10^4$
    0 &lt;= nums[i] &lt;= n
    All the numbers of nums are unique.
</blockquote>

Here is my original solution:
</pre>
<pre class="markdown">```
class Solution {
public:
    int missingNumber(vector&lt;int&gt;&amp; nums) {
        int s=0,l=nums.size();
        for(int &amp;i:nums)s+=i;
        return l*(l+1)/2-s;
    }
};
```
</pre>
<pre>And of course there's the explicit sum solution, without using the formula:
</pre>
<pre class="markdown">```
class Solution {
public:
    int missingNumber(vector&lt;int&gt;&amp; nums) {
        int result = nums.size();
        for (int i = 0; i &lt; nums.size(); ++i) {
            result += i;
            result -= nums[i];
        }
        return result;
    }
};
```
</pre>
<pre>But it should be slower than using the formula, since there are n additions, instead of one multiplication and one division.

And then I saw the bitwise operation solution, like this:
</pre>
<pre class="markdown">```
class Solution {
public:
    int missingNumber(vector&lt;int&gt;&amp; nums) {
        int result = nums.size(),i=0;
        for(int num:nums){
            result ^= num;
            result ^= i;
            i++;
        }
        return result;
    }
};
```
</pre>
<pre>Which avoids possible integer overflows. But it suffers from the same issue as the explicit summation solution: it takes O(n) operations to find the accumulated result.
So, I wonder, is there an easier way to get the accumulated result?
And I found a surprisingly simple form of it. I'm surprised nobody mentioned it so far (at least not in the top solutions).
Let's see what the accumulated results are for n=0,1,2,...
      n   Xor from 0 to n
      0    0
      1    1
     10   11
     11    0
    100  100
    101    1
    110  111
    111    0
   1000 1000
   
There is clearly a pattern. After giving it some thought, it's not hard to see why the result is simply a 1 or 0 if n is odd. If you xor an odd number with its previous number, you'll just get a 1. So it simply depends on how many 1s are there. So the result is 1 if n=4k+1, and 0 if n=4k+3.
When n is even, we just need to xor it with its previous accumulated result, which ends with an odd number.

So, we can get the accumulated result in O(1), similar to the summation with the formula.
</pre>
<pre class="markdown">```
#pragma GCC target("avx,mmx,sse2,sse3,sse4")
auto _=[]()noexcept{ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);return 0;}();
class Solution {
public:
    int missingNumber(const vector&lt;int&gt;&amp; nums) {
        int s,n=nums.size();
        switch(n&amp;3){
            case 0:s=n;break;
            case 1:s=1;break;
            case 2:s=n^1;break;
            case 3:s=0;
        }
        for(int i:nums)s^=i;
        return s;
    }
};
```
</pre>
<pre>This can easily be generalized to the accumulation of an arbituary continuous range of non-negative integers [a,b], it's just XorAccumulated(a-1)^XorAccumlated(b).
Actually, it works for negative range as well, given the nice properties of two's complement expression. So this works for all integer ranges.
</pre>
