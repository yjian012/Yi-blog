---
title: IBM Ponder this 2023 09 solution
date: 2023-11-07
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
The problem can be found <a href="https://research.ibm.com/haifa/ponderthis/challenges/September2023.html">here</a>.
Since the <a href="https://research.ibm.com/haifa/ponderthis/solutions/September2023.html">solution</a> has been posted on the website, here's my solution:
Q1 is simple, just calculate them directly:
</pre>
<pre class="markdown">
```cpp
#include &lt;bits/stdc++.h>
using namespace std;
int gcd(int a,int b){
    if(a&lt;b) swap(a,b);
    while(b){
        a=a%b;
        swap(a,b);
    }
    return a;
}
int main(){
    int a=531;
    //for(int i=2;i&lt;1000;++i) {int d=gcd(i,a);cout&lt;&lt;d&lt;&lt;", ";a=a+d;}
    int cnt=0, i=2;
    while(cnt&lt;10) {int d=gcd(i,a);if(d==5){++cnt;cout&lt;&lt;"(i="&lt;&lt;i&lt;&lt;",a="&lt;&lt;a&lt;&lt;"),";} a=a+d;i++;}
    return 0;
}
```
</pre>
<pre>
The second question takes a little observation, though. It's easy to see that the result must be an odd number. 9 and 15 don't work from reasoning, and 21 works. Working backwards, it's not hard to find that when $a_1=801$, $d_{21}=21$. (Somehow the solution page omitted the answer to this question. Probably overlooked.)

The bonus question is much harder to solve without the right tools, because it requires factoring many very large integers. Here's the code that I used to solve it:
</pre>
<pre class="markdown">
```python
import primefac as pf
import os
from datetime import datetime
file=open("result2309.txt","a")
start=datetime.now()
print("starting time:",start)
file.write("starting time:"+str(start)+"\n")
def gcd(a,b):
    while(b>0):
        a=a%b
        a,b=b,a
    return a
a=531
i=2
cnt=0
while(cnt&lt;200):
  g=gcd(a,i)
  if g!=1:
    if g==5:
      cnt+=1
      print(f"#{cnt}: i={i},a={a}")
      file.write(f"#{cnt}: i={i},a={a}\n")
      file.flush()
      os.fsync(file)
    a+=g
    i+=1
    continue
  n=a-i
  m=a
  d=0
  f=0
  factors=pf.primefac(n, verbose=False,methods=(pf.ecm,))
  for factor in factors:
    d=factor-(i%factor)
    if d&lt;m:
      m=d
      f=factor
  if f==5:
    cnt+=1
    print(f"#{cnt}: i={i},a={a}")
    file.write(f"#{cnt}: i={i},a={a}\n")
    file.flush()
    os.fsync(file)
  a+=m
  i+=m
  #print(f"next one: (i={i},a={a})")
  a+=f
  i+=1
end=datetime.now()
print("ending time:",end)
print(str(end-start))
file.write("ending time:"+str(end)+"\n")
file.write(str(end-start)+"\n")
file.close()
```
</pre>
<pre>
It requires the package "<a href="https://pypi.org/project/primefac/">primefac</a>" installed.
The "ECM" is much faster than the default "pollardrho_brent" method for extremely large numbers. The default method took around 10 hours, while the ECM took about 17 minutes.

I'll update the logic behind the code when I have more time... Or you may find the paper linked on their <a href="https://research.ibm.com/haifa/ponderthis/solutions/September2023.html">solution page</a> helpful.
</pre>