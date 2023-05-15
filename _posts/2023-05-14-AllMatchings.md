---
title: An algorithm to iterate through all perfect matchings on a complete graph (Chord diagram)
date: 2023-05-14
---
<html>
<title></title>
<script>
MathJax = {
  tex: {
    inlineMath: [ ['$','$'],['\\(','\\)'] ],
    displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
    processEscapes: true,      
    processEnvironments: true, 
    processRefs: true       
  },
  options: {
   ignoreHtmlClass: 'tex2jax_ignore|editor-rich-text'
  }
};
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

<body>
<p>
I thought this function was helpful for solving another problem. It did work, but it was unnecessary since there were faster algorithms to solve it. But I was interested, so I ended up finishing it.
</p>
<p>
Input constraints: v.size() is even, elements are distinct and comparable, $v[2i]<v[2i+1]$.
Complexity: O(n)
</p>
<pre>
template<typename T>
bool next_matching(vector<T>& v){
    if(v.size()<=2) {return false;}
    size_t s=v.size();
    int mini=v[s-2],maxi=v[s-1];
    size_t start=s-4;
    while(start>0&&v[start]<=v[start+2]&&v[start+1]>=v[start+3]){start-=2;mini=v[start];maxi=v[start+1];}
    if(start==0&&v[0]<=v[2]&&v[1]>=v[3]){
        vector<T> v1(s);
        for(size_t i=0;i<s/2;++i){v1[i]=v[2*i];v1[s-i-1]=v[2*i+1];}
        v=move(v1);
        return false;
    }
    vector<int> v1(s);
    for(size_t i=0;i<=start+1;++i){
        v1[i]=v[i];
    }
    for(size_t i=0;i<(s-start)/2-1;++i){
        v1[start+2+i]=v[start+2+2*i];v1[s-i-1]=v[start+2+2*i+1];
    }
    size_t u=upper_bound(v1.begin()+start+2,v1.end(),v1[start+1])-v1.begin();
    swap(v1[start+1],v1[u]);
    v=move(v1);
    return true;
}
</pre>
<p>
The algorithm iterates through all possible ways to match $2n$ points, i.e. <a href="https://en.wikipedia.org/wiki/Chord_diagram_(mathematics)">chord diagrams</a>. 
The only other place that mentions the same problem is <a href="https://stackoverflow.com/questions/23689569/enumerate-perfect-matchings-of-a-complete-graph">here, solved with a recursive algorithm</a>. But the iterative is more efficient. Benchmarking shows that the recursive solution is 20 times slower for input size 2n=8, and 30 times slower for input size 2n=10.</p>
<img src="https://i.postimg.cc/rFDTXtRj/next-matching.png" alt="Benchmarking result">
<p>Not sure what the applications might be, but I'll just share it here.</p>

</body>
</html>