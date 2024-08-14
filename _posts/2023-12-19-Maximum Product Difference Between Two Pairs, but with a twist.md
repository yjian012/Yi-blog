---
title: Maximum Product Difference Between Two Pairs, but with a twist
date: 2023-12-19
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
Yesterday's daily problem, E1913. Maximum Product Difference Between Two Pairs, is a very easy one.

Description:
<blockquote>The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).

For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.

Return the maximum such product difference.

Constraints:
  4 <= nums.length <= $10^4$
  1 <= nums[i] <= $10^4$</blockquote>

This problem is very easy, one just needs to find the largest two numbers and the smallest two. This works because all the elements are positive.

So, naturally, I wonder, what if 0 and negative numbers are allowed? I.e, the second constraint becomes $-10^4$ &lt;= nums[i] &lt;= $10^4$?

At first, I thought, this is just a little more complicated. But as I attempted to solve it, I figured that this problem has quite a few special situations that I must take care of. It takes a lot of patience and carefulness.

Here is the test program that I wrote in C++. Are you able to solve this problem correctly? (The solution must still be $O(n)$.)
(Let me know if you translated it into a different language. I'll add them or link them.)
</pre>
<pre class="markdown">
```cpp
#include &lt;bits/stdc++.h>
using namespace std;
int yourSolution(vector&lt;int> &v){
    //input your solution here
    
    
    
    
    
    
}
int bruteForce(const vector&lt;int> &v,int &i1,int &i2,int &i3,int &i4){
    const int sz=v.size();
    int r=0,e1,e2,e3,e4,t;
    for(int i=0;i&lt;sz;++i){
        e1=v[i];
        for(int j=i+1;j&lt;sz;++j){
            e2=v[j];
            for(int k=j+1;k&lt;sz;++k){
                e3=v[k];
                for(int l=k+1;l&lt;sz;++l){
                    e4=v[l];
                    t=abs(e1*e2-e3*e4);
                    if(t>r) r=t,i1=e1,i2=e2,i3=e3,i4=e4;
                    t=abs(e1*e3-e2*e4);
                    if(t>r) r=t,i1=e1,i2=e3,i3=e2,i4=e4;
                    t=abs(e1*e4-e3*e2);
                    if(t>r) r=t,i1=e1,i2=e4,i3=e3,i4=e2;
                }
            }
        }
    }
    return r;
}
default_random_engine rg(chrono::system_clock::now().time_since_epoch().count());
uniform_int_distribution&lt;int> rollEle(1,10000);
const int optSize=12;
const int maxSize=32;
uniform_int_distribution&lt;int> rollPos(0,maxSize-1);
uniform_int_distribution&lt;int> roll0(0,1);
uniform_int_distribution&lt;int> rollExtreme(0,1);
void noNeg(vector&lt;int> &v){
    v.resize(maxSize);
    for(int i=0;i&lt;maxSize;++i) v[i]=rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
}
void noPos(vector&lt;int> &v){
    v.resize(maxSize);
    for(int i=0;i&lt;maxSize;++i) v[i]=-rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
}
void mixed(vector&lt;int> &v){
    v.resize(maxSize);
    for(int i=0;i&lt;maxSize/2;++i) v[i]=rollEle(rg);
    for(int i=maxSize/2;i&lt;maxSize;++i) v[i]=-rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
}
void neg2posN(vector&lt;int> &v){
    if(rollExtreme(rg)){
        v=vector&lt;int>{1,1,1,1,1,3,1,-1000,1,1,1,1,1,1,1,-1000,1,1,1,1,2,1,1,1,1};
        if(rollExtreme(rg)) v=vector&lt;int>{1,1,1,1,1,3,1,1000,1,1,1,1,1,1,1,-1000,1,1,1,1,-2,1,1,1,1};
        if(roll0(rg)) v[0]=0;
        return;
    }
    v.resize(maxSize);
    for(int i=2;i&lt;maxSize;++i) v[i]=rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
    v[0]=-rollEle(rg);
    v[1]=-rollEle(rg);
}
void neg1posN(vector&lt;int> &v){
    v.resize(maxSize);
    for(int i=2;i&lt;maxSize;++i) v[i]=rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
    v[rollPos(rg)]=-rollEle(rg);
}
void pos2negN(vector&lt;int> &v){
    if(rollExtreme(rg)){
        v=vector&lt;int>{-1,-1,-1,-1,-1,-3,1,-1000,-1,-1,-1,-1,-1,-1,-1,1000,-1,-1,-1,-1,-2,-1,-1,-1,-1};
        if(rollExtreme(rg)) v=vector&lt;int>{1,1,1,1,1,3,1,-1000,1,1,1,1,1,1,1,-1000,1,1,1,1,2,1,1,1,1};
        if(roll0(rg)) v[0]=0;
        return;
    }
    v.resize(maxSize);
    for(int i=2;i&lt;maxSize;++i) v[i]=-rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
    v[0]=rollEle(rg);
    v[1]=rollEle(rg);
}
void pos1negN(vector&lt;int> &v){
    v.resize(maxSize);
    for(int i=2;i&lt;maxSize;++i) v[i]=-rollEle(rg);
    if(roll0(rg)) for(int i=0;i&lt;3;++i) v[rollPos(rg)]=0;
    v[rollPos(rg)]=rollEle(rg);
}
void pos2neg2(vector&lt;int> &v){
    v.resize(4);
    v[0]=rollEle(rg);
    v[1]=-rollEle(rg);
    v[2]=-rollEle(rg);
    v[3]=rollEle(rg);
}
void pos2neg2and0(vector&lt;int> &v){
    v.resize(maxSize);
    v[0]=rollEle(rg);
    v[1]=-rollEle(rg);
    v[2]=-rollEle(rg);
    v[3]=rollEle(rg);
}
void pos2neg1and0(vector&lt;int> &v){
    v=vector&lt;int>(maxSize,0);
    v[0]=rollEle(rg);
    v[1]=-rollEle(rg);
    v.back()=rollEle(rg);
}
void neg2pos1and0(vector&lt;int> &v){
    v=vector&lt;int>(maxSize,0);
    v[0]=-rollEle(rg);
    v[1]=rollEle(rg);
    v.back()=-rollEle(rg);
}
void neg1pos1and0(vector&lt;int> &v){
    v=vector&lt;int>(maxSize,0);
    v[1]=rollEle(rg);
    v.back()=-rollEle(rg);
}
void (*updateTest[optSize]) (vector&lt;int>&)={noNeg,noPos,mixed,neg2posN,neg1posN,pos2negN,pos1negN,pos2neg2,pos2neg2and0,pos2neg1and0,neg2pos1and0,neg1pos1and0};
int main(){
    int i1,i2,i3,i4;
    int repeat=10000;
    vector&lt;int> test;
    uniform_int_distribution&lt;int> rollOpt(0,optSize-1);
    for(int i=0;i&lt;repeat;++i){
        updateTest[rollOpt(rg)](test);
        int result=yourSolution(test);
        int maxi=bruteForce(test,i1,i2,i3,i4);
        if(result!=maxi){
            cout&lt;&lt;"iteration number:"&lt;&lt;i&lt;&lt;endl;
            cout&lt;&lt;"input is ";
            for(auto e:test) cout&lt;&lt;e&lt;&lt;",";
            cout&lt;&lt;endl;
            cout&lt;&lt;"Your answer is "&lt;&lt;result&lt;&lt;", but the maximum is abs("&lt;&lt;i1&lt;&lt;"*"&lt;&lt;i2&lt;&lt;"-"&lt;&lt;i3&lt;&lt;"*"&lt;&lt;i4&lt;&lt;")="&lt;&lt;maxi&lt;&lt;".\n";
            return 0;
        }
    }
    cout&lt;&lt;"All passed!\n";
    return 0;
}
```
</pre>
<pre>
For simplicity and speed, the test cases are not randomly shuffled, but it probably doesn't matter too much in this context. A bigger problem is, the extreme cases are too rare, so I added some of them manually. If you think there are other extreme cases that should be included, let me know!

I wrote my own solution and it passed all test cases, but I'm still not 100% sure it's correct. Let me know if you wrote a better test case generator that covers more corner cases!
</pre>