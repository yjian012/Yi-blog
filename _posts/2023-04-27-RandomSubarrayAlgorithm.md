---
title: "Random Subarray Algorithm"
date: 2023-04-27
---
<html>
<title>Random Subarray Algorithm</title>
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
After I discussed with someone else who also wrote a Digits solver, I looked into a little bit more of the codes that they used to generate the puzzles. I noticed an interesting function there:
</p>
<pre>
function getRandomInArray(arr, n) {
  var len = arr.length
  if (n > len)
    throw new RangeError(
      'getRandom: more elements taken than available',
    )
  var result = new Array(n),taken = new Array(len)
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}
</pre>
<p>
Apparently the function takes an array and returns a length-$n$ random subarray of the argument. But I was confused because it uses a grammar that I was not familiar with - I thought the "in" operator here is similar to the "in" in Python, which misled me at first. I realized that that's definitely not what it does when I tested it, indeed, it returns if the property (in this case, the index) exists, not the value.</p>
<p>
I wonder why it's written this way, instead of the more straightforward Fisher–Yates shuffle algorithm, because I noticed that this algorithm gives exactly the same result with the Fisher–Yates algorithm. I thought about this problem a few years ago in my research. After a few attempts, I re-discovered this algorithm myself. I was quite happy about it, but at the same time I thought that this must have already been discovered long ago. Years later, I finally searched about it and learned its official name. The original Fisher–Yates shuffle algorithm may be implemented this way:</p>

<pre>
function getRandomInArray(arr, n) {
  var len = arr.length
  if (n > len)
    throw new RangeError(
      'getRandom: more elements taken than available',
    )
  var result = arr;
  while (len-->n) {
    var x = Math.floor(Math.random() * len)
    let temp=result[x]
    result[x] = result[len]
    result[len]=temp
  }
  return result.slice(n)
}
</pre>
<p>
But the first function has a few advantages in certain circumstances. One issue with the original algorithm is, if we are not allowed to modify the original array, we must make a copy of the entire array. Even if we are allowed to modify it, exchanging two elements may still consume a lot of resources if the elements are large objects. One way to solve this is, we can just record the indices that are exchanged instead of the elements, and construct the new array based on the indices. This avoids the copying issue, but if the array is very large and we only need a few elements, creating an integer array of the full length and initialize it may still be time consuming. That's probably why the function in the beginning uses this "in" operator - so it kind of serves as a map of int to int. I'm not sure about the overhead of a "new Array" in JS, I wonder if it would be more efficient with an actual map?</p>
<p>
On another note, I noticed that this function is an exact copy of <a href="https://stackoverflow.com/a/19270021/2692551">this answer</a>. I wonder if it's by the same author... or someone just googled it and copied this. XD</p>
<p>
Anyway, here's my implementation of this algorithm in C++:</p>
<pre>
#include&lt;time.h>
#include&lt;vector>
#include&lt;unordered_map>
#include&lt;random>

using std::vector;
using std::unordered_map;
template &lt;typename T>
vector<T> ranSub(const vector<T>& arr,size_t n,bool trunc=false){
    if(arr.size()<n){
        if(trunc) n=arr.size();
        else throw;
    }
    size_t len=arr.size();
    vector<T> res(n);
    unordered_map<size_t,size_t> taken;
    taken.reserve(n);
    std::default_random_engine generator(time(NULL));
    while(n--){
        std::uniform_int_distribution<size_t> distribution(0,len-1);
        size_t x=distribution(generator);
        res[n]=arr[taken.find(x)!=taken.end()?taken[x]:x];
        taken[x]=taken.find(--len)!=taken.end()?taken[len]:len;
    }
    return res;
}
</pre>

</body>
</html>