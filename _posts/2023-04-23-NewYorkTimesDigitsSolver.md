---
title: "New York Times Digits Solver"
date: 2023-04-23
---
<html>
<title>New York Times Digits Solver</title>
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
<h2>
Solver
</h2>
<p>
Target is <textarea id="target"></textarea><span id='mess1'></span></p>
<p>
Numbers are (seperate by space) <textarea id="nums"></textarea> <span id='mess2'></span>
<span id='warn' style='display:None'>(There are more than 6 numbers, it may take much longer. Proceed anyway? <button id='proceed' onclick="compute()">Yes</button>)</span>
</p>
<p>
<button id="start_btn" onclick="init()">compute</button>
</p>
<p>
The closest solution is:
</p>
<p>
<span id="solution">
  <br/>
</span>
</p>
<hr>
<h2>
Complexity Analysis
</h2>
<p>
This problem is quite similar to the 24 puzzle game, but slightly different. They both provide 4 binary operators that we can choose from, namely $+$ $-$ $*$ and $/$. Thus, any valid expression that you construct naturally forms a full binary tree, which has a nice recursive structure, where there're $m$ leaves, each takes the value of a number, and $m-1$ non-leaf nodes, each takes one of the operators. So, the question becomes, how many different trees can you construct from $n$ numbers?
</p>
<p>
Let's consider the case where we use all of the numbers. Any solutions that use less numbers would just be a subtree of a tree of $n$ leaves. Let's consider the structure of the tree first. Starting from 2 leaves, there is only one way to construct it: two numbers, one operator. When we include the third number, we must choose one of the leaves and replace it with an operator node, and attach two number nodes as its children. We repeat this process for the rest of the numbers, each time we choose a leaf and replace it with an operator node, then attach two number nodes. There are $k-1$ choices when we include the $k$th number, so over all there are $(n-1)!$ structures.
</p>
<p>
Next, the number of different permutations of the numbers is $n!$, and the number of all combinations of the operators is $4^{n-1}$. Before we multiply them, notice that this problem has a symmetry: if we exchange the left and right subtree of a '$+$' or '$*$' operator node, the value of the expression doesn't change. If we consider a '$-$' node, we can exchange the subtrees when the two value on the subtrees are the same, and if they are different, one of the expressions is invalid, because the game prevents you from subtracting a large number from a small number. The same goes for '$/$' nodes. (Notice that in the case of the 24 puzzle, the situation is different. You have to use fractions in certain cases, e.g. 5 5 5 1, 3 3 7 7, etc.) So, for every ordering of the two subtrees of a operator node, only one needs to be considered. So the upper bound is $n!(n-1)!\frac{4^{n-1}}{2^{n-1}}=2^{n-1}n!(n-1)!$. In practice, though, the cases that one number is a multiple of the other is rare, so it would be closer to $\left(\frac{3}{2}\right)^{n-1}n!(n-1)!$, but it is a minor change on the complexity.
</p>
<p>
This is exactly how we are going to solve it. Each time we apply an operator on two of the numbers, record the new value (because we don't have to use all of the numbers, an intermediate result could be the solution. This is another difference between this problem and the 24 puzzle game) and its corresponding expression, then we take the new value and the rest of the numbers as the input to the same problem, but the number of the numbers is one less, so we can solve it recursively. If the solver finds the exact solution, we can return early. But if there's no exact solution, it returns the closest possible solution.
</p>
<p>
We can easily modify the function to return the first $k$ closest solutions, e.g. with a priority queue, but there will be many duplicated expressions with the same solution value. We can use a set to skip the expressions that give the same value that we've already found. Implementations are simple, so they're left as exercises! :)
</p>
</body>

<script>
let sol = {
  n: 0,
  exp: ''
}
let tar = 0
let nums = []
let exact = false

function init() {
  tar = 0
  nums = []
  exact = false
  let tar_str = document.getElementById('target').value
  if (tar_str.trim() == '' || /[^\d ]/.test(tar_str)) {
    document.getElementById('mess1').innerText = '  (must input a number!)'
    return
  }
  document.getElementById('mess1').innerText = ''
  tar = parseInt(tar_str)
  nums_str = document.getElementById('nums').value
  if (nums_str.trim() == '') {
    document.getElementById('mess2').innerText = '  (input cannot be empty!)'
    return
  }
  if (/[^\d ]/.test(nums_str)) {
    document.getElementById('mess2').innerText = '  (must be numbers seperated by spaces!)'
    return
  }
  document.getElementById('mess2').innerText = ''
  let nums_list = nums_str.split(' ').filter(_ => _.length > 0)
  nums_list.forEach(function(_) {
    nums.push({
      n: parseInt(_),
      exp: _
    })
  })
  sol = nums[0]
  if (nums.length > 6) {
    document.getElementById('warn').style.display = ''
  } else {
    document.getElementById('warn').style.display = 'None'
    compute()
  }
}

function compute() {
  solve(nums, tar)
  display()
}

function solve(nums, tar) {
  if (nums.length == 1 || exact) {
    return
  }
  for (let i = 0; i < nums.length - 1; ++i) {
    for (let j = i + 1; j < nums.length; ++j) {
      let nums_new = []
      for (let k = 0; k < nums.length; ++k) {
        if (k == i || k == j) continue
        nums_new.push(nums[k])
      }
      let num_n = {}
      if (nums[i].n < nums[j].n) {
        if (nums[j].n % nums[i].n == 0) {
          num_n = {
            n: nums[j].n / nums[i].n,
            exp: '(' + nums[j].exp + '/' + nums[i].exp + ')'
          }
          if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
            sol = num_n
            if (num_n.n == tar) {
              exact = true
              return
            }
          }
          solve([...nums_new, num_n], tar)
        }
        num_n = {
          n: nums[j].n - nums[i].n,
          exp: '(' + nums[j].exp + '-' + nums[i].exp + ')'
        }
        if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
          sol = num_n
          if (num_n.n == tar) {
            exact = true
            return
          }
        }
        solve([...nums_new, num_n], tar)
      } else if (nums[i].n > nums[j].n) {
        if (nums[i].n % nums[j].n == 0) {
          num_n = {
            n: nums[i].n / nums[j].n,
            exp: '(' + nums[i].exp + '/' + nums[j].exp + ')'
          }
          if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
            sol = num_n
            if (num_n.n == tar) {
              exact = true
              return
            }
          }
          solve([...nums_new, num_n], tar)
        }
        num_n = {
          n: nums[i].n - nums[j].n,
          exp: '(' + nums[i].exp + '-' + nums[j].exp + ')'
        }
        if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
          sol = num_n
          if (num_n.n == tar) {
            exact = true
            return
          }
        }
        solve([...nums_new, num_n], tar)
      }
      num_n = {
        n: nums[i].n + nums[j].n,
        exp: '(' + nums[i].exp + '+' + nums[j].exp + ')'
      }
      if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
        sol = num_n
        if (num_n.n == tar) {
          exact = true
          return
        }
      }
      solve([...nums_new, num_n], tar)
      num_n = {
        n: nums[i].n * nums[j].n,
        exp: '(' + nums[i].exp + '*' + nums[j].exp + ')'
      }
      if (Math.abs(num_n.n - tar) < Math.abs(sol.n - tar)) {
        sol = num_n
        if (num_n.n == tar) {
          exact = true
          return
        }
      }
      solve([...nums_new, num_n], tar)
    }
  }
}

function display() {
  document.getElementById('solution').innerText = sol.n + '=' + sol.exp
}
</script>
</html>