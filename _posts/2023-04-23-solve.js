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
