---
title: Traversing a Tree with Adjacecncy Sums - LeetCode H2872. Maximum Number of K-Divisible Components, H3203. Find Minimum Diameter After Merging Two Trees
date: 2024-12-26
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

<pre>Here's a simple question: How do you traverse a tree, which is represented as a set of edges in the form of pairs of vertices?
My first reaction used to be a typical graph traversing algorithm, like BFS or DFS. They are the most common algorithms for traversing graphs. But last week I found a better algorithm particularly suitable for trees which is more efficient than the typical BFS or DFS approach.

I invented this algorithm while solving the daily problem "H2872. Maximum Number of K-Divisible Components" on Dec 24, so let's use it as an example to see how this algorithm works.

2872. Maximum Number of K-Divisible Components:
</pre>
<blockquote>
<p>There is an undirected tree with <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given the integer <code>n</code> and a 2D integer array <code>edges</code> of length <code>n - 1</code>, where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the tree.</p>

<p>You are also given a <strong>0-indexed</strong> integer array <code>values</code> of length <code>n</code>, where <code>values[i]</code> is the <strong>value</strong> associated with the <code>i<sup>th</sup></code> node, and an integer <code>k</code>.</p>

<p>A <strong>valid split</strong> of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by <code>k</code>, where the <strong>value of a connected component</strong> is the sum of the values of its nodes.</p>

<p>Return <em>the <strong>maximum number of components</strong> in any valid split</em>.</p>
  
  <strong>Constraints:</strong>
<ul>
	<li><code>1 <= n <= 3 * 10<sup>4</sup></code></li>
	<li><code>0 <= values[i] <= 10<sup>9</sup></code></li>
	<li><code>1 <= k <= 10<sup>9</sup></code></li>
	<li>Sum of <code>values</code> is divisible by <code>k</code>.</li>
    <li>...</li>
</ul>
</blockquote>
<pre>
Let's look at the example:
Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
Output: 2
<div class="separator" style="clear: both;"><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMr5afZSTJZ8OCDPvljzlT8dL3I1jdsQIrfuQU3BjAZJFk8CUGbilvFldW5_ZSqem66zmdUFFKkD6Ee8LU45UVYTykvmJtMqaal6jxEqbNJJgH35W7P5V-hUJipANRa2-n3rmW6uFfublu4ozgmt-VIe3Ap2mI2zwYYEPE3q0OnuIITMQd8D62fXpR_lHe/s1600/example12-cropped2svg.jpg" style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0" data-original-height="339" data-original-width="816" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMr5afZSTJZ8OCDPvljzlT8dL3I1jdsQIrfuQU3BjAZJFk8CUGbilvFldW5_ZSqem66zmdUFFKkD6Ee8LU45UVYTykvmJtMqaal6jxEqbNJJgH35W7P5V-hUJipANRa2-n3rmW6uFfublu4ozgmt-VIe3Ap2mI2zwYYEPE3q0OnuIITMQd8D62fXpR_lHe/s1600/example12-cropped2svg.jpg"/></a></div>
We can cut it into two parts, where the sum of the values of each part, 6 and 12 in this example, is a multiple of $k=6$. It's impossible to cut it into more parts without violating the condition. Fairly easy to understand.

Before jumping right into the solution, I have a comment on if it's not limited to trees:
If it's on any graph, then it can be NP-Hard.
Example: A complete graph. You can choose any set of vertices, and they are all connected.
So, basically the question becomes, there is a multiset of values, and you must find the maximum number of non-overlapping subsets that you can separate it into where the sum of each of them is a multiple of $k$.
You're guaranteed that the sum of the multiset is a multiple of $k$, but it doesn't really matter. It can be an arbitrary multiset, and to make the sum a multiple of $k$, just add another number $-sum$ in it (or $mk-sum$ with a large enough $m$, if it has to be positive), where $sum$ is the sum of the original multiset.
To determine if it's possible to separate it into two subsets is already NP-Complete, see <a href="https://en.wikipedia.org/wiki/Subset_sum_problem">Subset sum problem</a>. Finding the maximum number of subsets should be harder, so I believe it's NP-Hard.

Now it's time to solve this problem.
First, we look for just one edge to cut. Where do we start?
The situation is the simplest if the edge is in a long chain which ends at a leaf. In that case, we just need the sum of the values from the leaf to the cut to be a multiple of $k$. And if we find such an edge, we can simply cut it out and keep going. The tree becomes smaller, and we make progress.
But what happens when the next vertex is not on a chain, instead it has at least 3 branches? If we can cut the edge that connects the current vertex and the branching one, then it's easy, this branch is simply removed and the branching vertex has its degree decreased by one.
What happens if we can't cut that edge? That means the branch must be connected to that vertex forever. So, the branch is basically "attached" to it. In that case, we can simply "absorb" that branch into the vertex - in this problem, we absorb the sum of the values in that branch into the value of that vertex, and remove the branch.
So, either way, we can remove branches after branches, until the branching vertex has degree 2, which turns it into a chaining vertex. At last, the tree will be reduced to a single chain, and when we reach another leaf, the whole tree is processed.

I came up with this algorithm myself. A few days later, <a href="https://leetcode.com/u/sergei99/">@Sergei</a> mentioned that this was called "Kahn's algorithm". Then I checked the editorial, which called it "Topological Sort / Onion Sort".
At this point, the algorithm is pretty straight forward. The only thing left is to implement it.

First, we must construct the tree from the list of edges so that we can traverse it. There are many ways to store a graph. A typical approach is to use an adjacency list, where for each vertex we store an array of its neighboring vertices. A 2d C-array would be fast, but it must take $O(N_{max}^2)$ space, which may not be feasible. To save space, typically a vector of vectors or array of vectors is used. But that requires dynamic allocation for each vertex.
Next, a problem is, I want to be able to remove a branch when I reach a branching vertex. In other words, I want to be able to modify the adjacency list to remove edges. It can be done with a vector of vectors, i.e, in the vector of neighbors of the branching vertex, find the vertex that we come from and delete it by swapping it with the last element, then pop_back(). But it's not very efficient (although the compexity is the same). A better way may be to use a hash set to store the list of neighbors, but it's also a bit complicated.
So, I thought, is there any simpler ways to remove a neighbor of a vertex from the stored data? Imagine if we can just subtract the vertex id from the total of the neighbors...

And that's where things start to become interesting. I explored this idea further: If, for every vertex, I only store the sum of the ids of its neighbors, how much can I achieve? We start from a leaf, and the sum gives us its only neighbor. Next, if we are at a vertex of degree 2, the sum is of its two neighbors. If we subtract the previous vertex from the sum, the result is the vertex that we need to go next!
But what happens if the next vertex has a degree more than 2? In that case, we can't tell where to go next.
But we don't need to go anywhere! The branch that we come from should be removed, and that can be done by subtracting the current vertex from the sum of the neighbors of the branching vertex, then decreasing its degree by one. Then, we simply start from another leaf, and repeat this process.
Let's take a look at the example with this implementation.
<div class="separator" style="clear: both;"><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF_rKzNyD_9zEW5-NvRppYmw4YQ5kZ8aIHFeKlSBKZhcs4shM4J18TWMlbCQslkh32e-dT6bCvLzo5VzuTwENYHOb5oaGWjQZRDKPFqQaC4x6oS0MlRr_cTMJ5Iezd4qCudNnA04OiJF-t9upvVOOkaIjEtQ3NF8EJOmXbAHYesadKqfeZFAJ6AY5AD9xB/s1600/example12-cropped2svg.jpg" style="display: block; padding: 1em 0; text-align: center;"><img alt="" border="0" data-original-height="339" data-original-width="889" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF_rKzNyD_9zEW5-NvRppYmw4YQ5kZ8aIHFeKlSBKZhcs4shM4J18TWMlbCQslkh32e-dT6bCvLzo5VzuTwENYHOb5oaGWjQZRDKPFqQaC4x6oS0MlRr_cTMJ5Iezd4qCudNnA04OiJF-t9upvVOOkaIjEtQ3NF8EJOmXbAHYesadKqfeZFAJ6AY5AD9xB/s1600/example12-cropped2svg.jpg"/></a></div>
The numbers inside the circles are the vertex ids, to the right are the values. The blue numbers to the left are the sum of neighbors.
Suppose we start from the leaf #4. The current value is 4, we can't cut this edge. The sum of its neighbor is 2, so we check vertex #2. Its degree is 3, greater than 2, so we proceed by absorbing the current value into its value, i.e, update its value to 1+4=5 (black number). Then, we want to remove this branch. We do this by subtracting the vertex that we come from, 4, from the sum of neighbors of that vertex, 5, so the updates sum of neighbors of #2 becomes 5-4=1 (blue number). We also decrease the degree of #2 by one, so now its degree is 2.
This branch is removed, so we start from another leaf, either #0 or #3. Now the tree is reduced to a chain, it's easy to traverse it and get the result.

Basically, the algorithm goes like this:

<b>1.Prepare the adjacency sums representation of the tree, i.e, an array of pairs of unsigned integers, one for the sum of its neighbors, the other for its degree, both initialized to be 0. Read the list of edges, and update the sums and degrees accordingly.

2.Go through the adjacency sums, until we find a degree one vertex - a leaf. Set "current vertex" to its id, and "previous vertex" to 0. Add its value to the sum of values.
Check if the sum of values %k is 0. If so, add 1 to the result.
Check its neighbor:
  If it has degree 1, it's over, add 1 to the result and return it.
  If it has degree 2, we're in a chain. Assign "current vertex" to "previous vertex", and subtract "current vertex" from the sum of neighbors of that vertex to get where to go next. Set that neighbor to "current vertex". Basically we moved one step along the chain.
  If its degree is more, we add our current sum of values to the value of that vertex. Then we subtract our "current vertex" from the sum of neighbors of that vertex, and decrease its degree by one. Then we go back to Step 2., and look for the next leaf and start from there.</b>

This way, we only need a single array of pairs of unsigned integers to process the entire tree! Although the complexity is still O(n), It's extremely fast and space efficient, because we only need one dynamic allocation - or even zero if we know the maximum input size and simply use a C-array. Also, the space is contiguous, which gives higher cache hit.

The following is my solution:
</pre>
```cpp
const int nmax=30000;
struct pa{int sn,d;};
pa adjl[nmax];
int d1vs[nmax];
class Solution {
public:
    int maxKDivisibleComponents(int n,const vector<vector<int>>& edges, vector<int>& values, int k) {
        if(k==1) return n;
        memset(adjl,0,n*sizeof(adjl[0]));
        for(const auto &v:edges){
            auto &v0=adjl[v[0]];
            v0.sn+=v[1];
            v0.d++;
            auto &v1=adjl[v[1]];
            v1.sn+=v[0];
            v1.d++;
        }
        int d1sz=0;
        for(int i=0;i<n;++i) if(adjl[i].d==1) d1vs[d1sz++]=i;
        int cnt=0;
        int pre=0;
        while(1){
            int cur=d1vs[--d1sz],nei=adjl[cur].sn-pre;
            //cout<<"pre="<<pre<<",cur="<<cur<<",nei="<<nei<<endl;
            int sum=values[cur]%k;
            while(sum){
                auto &neis=adjl[nei];
                //cout<<"degree of "<<nei<<" is "<<neis.d<<endl;
                if(neis.d==1) return cnt+1;
                if(neis.d==2){
                    sum=(sum+values[nei])%k;
                    neis.sn-=cur;
                    pre=cur;
                    cur=nei;
                    nei=neis.sn;
                    continue;
                }
                values[nei]=(values[nei]+sum)%k;
                neis.sn-=cur;
                neis.d--;
                break;
            }
            if(!sum){
                cnt++;
                //cout<<"sum==0;next cur="<<nei<<",pre="<<cur<<endl;
                if(adjl[nei].d==1) return cnt+1;
                if(adjl[nei].d==2) {d1vs[d1sz++]=nei;pre=cur;}
                else adjl[nei].sn-=cur,adjl[nei].d--,sum=0,pre=0;
            }
            else sum=0,pre=0;
        }
        return 0x1337C0DE;
    }
};
```
<pre>
The previous runtime record was 70ms. The best runtime I got with this program was... 3ms. A 23 times speed up. And the memory record before was 158.6MB. My submission was 139.79MB. A huge difference. Here's my <a href="https://leetcode.com/problems/maximum-number-of-k-divisible-components/solutions/6169967/c-beats-100-that-s-an-understatement-the-most-efficient-algorithm-you-can-imagine/">solution page</a>.
You may have noticed that the algorithm that I used in this solution was slightly different from the one decribed above. That's because that later I noticed that I didn't really need to store all the degree one vertices in a stack ("d1vs"). I can simply go through each leaf one by one in the adjacency sums. Also, checking the sum of the value can be done before checking the neighbor, which simplifies the logic. Anyway, it's easy to simplify it.

There's another thing that can be improved. Notice that here I used a pair of "int". It's fine when the maximum vertex id is 3*10^4-1, because the sum must be smaller than 10^9. But if the maximum is larger, like in the next problem, it may overflow. Anyway, let's take a look at the problem first.

3203. Find Minimum Diameter After Merging Two Trees:
</pre>
<blockquote><p>There exist two <strong>undirected </strong>trees with <code>n</code> and <code>m</code> nodes, numbered from <code>0</code> to <code>n - 1</code> and from <code>0</code> to <code>m - 1</code>, respectively. You are given two 2D integer arrays <code>edges1</code> and <code>edges2</code> of lengths <code>n - 1</code> and <code>m - 1</code>, respectively, where <code>edges1[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the first tree and <code>edges2[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> indicates that there is an edge between nodes <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code> in the second tree.</p>

<p>You must connect one node from the first tree with another node from the second tree with an edge.</p>

<p>Return the <strong>minimum </strong>possible <strong>diameter </strong>of the resulting tree.</p>

<p>The <strong>diameter</strong> of a tree is the length of the <em>longest</em> path between any two nodes in the tree.</p>
  <strong>Constraints:</strong>
  <code>1 <= n, m <= 10<sup>5</sup></code>
</blockquote>
<pre>
The intuition is, the vertices that we want to choose to connect the two trees should be the "center"s of them. But how do we define this "center", and how do we find it?
The center vertex should be the vertex that is the furthest away from the leaves. To find it, we can simply remove the vertices layer by layer, where the first layer comprises all the leaves.
But what happens when we approach a branching point?
Notice that the diameter of the tree is the <b>longest</b> path. We want to find the vertex that has the smallest radius, which is the maximum distance from it to any leaf. So during the process of removing the vertices layer by layer, if we encounter a branching point, the first branch that approaches it - meaning that it's the shorter than the others - should just be ignored, because only the longest branch counts.
That means, this problem is perfect for the adjacency sums representation! When we encounter a branching point, we simply remove this branch, and continue with another leaf.

Here's the algorithm:
<b>
0. If the edge list is empty, return 0 as its diameter.
1. Prepare the adjacency sums.
2. Put all the leaves in an array. Initialize the layer count to be 0.
3. While the size of the array is greater than 2:
  Increment layer count by 1
  Go through the elements in the array:
    If its neighbor has degree == 2, we move forward, replace this element with its next neighbor and update the array.
    Otherwise, we subtract this vertex from the neighbor's sum of neighbors, and decrease its degree, then remove this vertex from the array by assigning it with the last element, then pop_back.
4. Finally the tree has only two leaves, meaning that it's reduced to a chain. The diameter of the tree is just the layer count times two, plus the length of this chain, where is easy to compute. We just go from one leaf to the other and find the length.
5. Now we can find the diameters of both trees. After we connect their "center" vertices, if the new longest path goes through this new edge, the diameter is the sum of the radii of the two trees plus one. But it's also possible that one tree has much smaller radius than the other, so the diameter of the new tree is simply the one of the larger tree. We can simply take the maximum of all the 3 possiblilties.
</b>
Here is my implementation:
</pre>
```cpp
struct pa{uint sn,d;} adjl[100000];
struct pr{uint ind,pre;} q[100000];
class Solution {
    int getD(const vector<vector<int>>& edges){
        const uint n=edges.size()+1;
        if(n==1) return 0;
        memset(adjl,0,n*sizeof(adjl[0]));
        for(const auto &v:edges){
            adjl[v[0]].sn+=v[1];
            adjl[v[0]].d++;
            adjl[v[1]].sn+=v[0];
            adjl[v[1]].d++;
        }
        int qsz=0,lay=0;
        for(uint i=0;i<n;++i) if(adjl[i].d==1) q[qsz++]=pr{i,0};
        while(qsz>2){
            lay++;
            uint i=0;
            while(i<qsz){
                int nei=adjl[q[i].ind].sn-q[i].pre;
                if(adjl[nei].d<=2){
                    q[i].pre=q[i].ind;
                    q[i].ind=nei;
                    ++i;
                    continue;
                }
                adjl[nei].sn-=q[i].ind;
                adjl[nei].d--;
                q[i]=q[--qsz];
            }
        }
        int l=0,ind=q[0].ind,pre=q[0].pre,tar=q[1].ind;
        while(ind!=tar){
            l++;
            int nxt=adjl[ind].sn-pre;
            pre=ind;
            ind=nxt;
        }
        return 2*lay+l;
    }
public:
    int minimumDiameterAfterMerge(const vector<vector<int>>& edges1,const vector<vector<int>>& edges2) {
        int d1=getD(edges1),d2=getD(edges2);
        return max(max(d1,d2),((d1+1)>>1)+((d2+1)>>1)+1);
    }
};
```
<pre>
Here, I used "uint" for the sum. You may wonder, isn't it possible to overflow, since the maximum number of vertices is 10^5 this time, and the sum can be at most 1+2+...+99999=99999*50000 which is about 5*10^9? Or is it simply because this doesn't happen in the test cases?
It's true that the test cases don't trigger any overflows, because I tested with "int" as well. But later, I realized that it doesn't even matter if it overflows.
The reason is, we don't use its value until the degree is one. So, as we accumulate the sum, if it overflows, basically it becomes mod 2^32. While we run the program, we subtract the vertice from this sum and decrease the degree. When degree is one, the sum must be the id of the vertex mod 2^32 - which is simply its id as long as it's under 2^32! So, it works as long as the vertex ids are unique numbers within the range of "uint".
Here is my <a href="https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees/solutions/6179612/19ms-c-beats-100-by-yjian012-kxv7/">solution page</a>.
As <a href="https://leetcode.com/u/Subs5/">@Suboptimal Coder</a> mentioned in the comment, we may use "xor" instead for this sum. In modern computer processors, they should both be one clock cycle. But there may be situations where "xor" is faster/more feasible on certain hardwares, since it requires less transistors. So, it's probably a good idea to replace the addition with xor.

The previous runtime record was 209ms. An optimized implementation of BFS by <a href="https://leetcode.com/u/sergei99/">@Sergei</a>, which used a custom queue, had a runtime of 16ms. At the time of writing this article, the best runtime of my algorithm is 3ms, as shown on the submission page. The old memory record was 282.3MB, while my program used 217.75MB, again a huge improvement.

If the edges of the tree are directed instead, the logic is actually simpler. We again start from the leaves, go up the chain, remove the branch when encountering a branching vertex. For each vertex, we need to store its parent vertex and its out-degree. It's more straight forward than the undirected version.

I don't know if this data structure / implementation has ever been proposed. Anyway, I'll just call it "Jiang's Adjacency Sums Algorithm for Tree Traversing" for now, until someone points out that it's already invented by someone else, XD.
</pre>
<hr>
<pre>
Update 250129: Edge sum variation
Today's daily problem, M684. Redundant Connection, is another one about trees. A list of edges is given, where they form a tree plus one extra edge which creats a cycle. The goal is to find the edge in the cycle that occurs last in the input.
I can use the algorithm above to remove all the braches from the graph, and only the cycle will be left. But then I won't be able to identify any of the edges in the cycle, because I will only know the sum of the two neighboring vertices for each vertex.
After giving it some thoughts, I figured out how to do it. Instead of storing the sum of the neighboring vertex indices, I store the sum of the incident edge indices. This way, I can tell which edges are removed, and I can still look up the next vertex through the input list of edges.
Here's an example of this implementation:
</pre>
```cpp
struct pa{uint s,d;} adjs[1001];
bool mark[1001];
class Solution {
public:
    vector<int> findRedundantConnection(const vector<vector<int>>& edges) {
        const uint sz=edges.size();
        memset(adjs+1,0,sz*sizeof(adjs[0]));
        memset(mark,1,sz);
        for(int i=0;i<sz;++i){
            const auto &v=edges[i];
            adjs[v[0]].d++;
            adjs[v[0]].s^=i;
            adjs[v[1]].d++;
            adjs[v[1]].s^=i;
        }
        for(int i=1;i<=sz;++i){
            if(adjs[i].d==1){
                int curV=i,curE=adjs[curV].s,nxtV=edges[curE][0];
                mark[curE]=0;
                if(nxtV==curV) nxtV=edges[curE][1];
                while(adjs[nxtV].d==2){
                    int nxtE=adjs[nxtV].s^curE;
                    curV=nxtV;
                    nxtV=edges[nxtE][0];
                    if(nxtV==curV) nxtV=edges[nxtE][1];
                    curE=nxtE;
                    mark[curE]=0;
                }
                adjs[nxtV].d--;
                adjs[nxtV].s^=curE;
            }
        }
        for(int i=sz;i>=0;--i) if(mark[i]) return edges[i];
        return edges[0];
    }
};
```