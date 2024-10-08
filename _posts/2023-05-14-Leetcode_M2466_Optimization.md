---
title: Leetcode M2466 Count Ways To Build Good Strings Optimization
date: 2023-05-14
---
<script src="/Yi-blog/js/scripts.js"></script>
<link rel="stylesheet" href="/Yi-blog/css/styles.css">
<pre>
M2466 description:
Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:
    Append the character '0' zero times.
    Append the character '1' one times.
This can be performed any number of times.
A good string is a string constructed by the above process having a length between low and high (inclusive).
Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo $10^9 + 7$.
Constraints:
1 <= low <= high <= $10^5$
1 <= zero, one <= low
</pre>
An optimization to the typical solution is, noticing that if gcd(zero,one) is not one, we can skip a lot of unnecessary computations.
(And different combinations of ("zero","one")s may conform to the same entry in the table.)
We can save what we've calculated for future inputs.

# Code
```cpp
class Solution {
    const int mo=1000000007;
    unordered_map<string,vector<int>> lookUp;
    unsigned int gcd(unsigned int a,unsigned int b){//make sure a,b>0
        while(a>0){
            b=b%a;
            swap(a,b);
        }
        return b;
    }
public:
    int countGoodStrings(int low, int high, int zero, int one) {
        int s=min(zero,one),l=max(zero,one);
        int g=gcd(s,l);
        s/=g;l/=g;low=(low-1)/g+1;high=high/g;
        string st=to_string(s)+','+to_string(l);
        auto it=lookUp.find(st);
        if(it==lookUp.end()){
            vector<int> table(high+1,0);
            for(int i=s;i<=l;i+=s){
                table[i]=1;
            }
            table[l]++;
            for(int i=l+1;i<=high;++i){
                table[i]=(table[i-s]+table[i-l])%mo;
            }
            int r=0;
            for(int i=low;i<=high;++i){
                r+=table[i];
                r%=mo;
            }
            table[0]=high;
            lookUp[st]=move(table);
            return r;
        }
        else{
            auto& table=it->second;
            if(high>table[0]){
                table.resize(high+1);
                for(int i=table[0]+1;i<=high;++i){
                    table[i]=(table[i-s]+table[i-l])%mo;
                }
                table[0]=high;
            }
            int r=0;
            for(int i=low;i<=high;++i){
                r+=table[i];
                r%=mo;
            }
            return r;
        }
    }
};
```
In this case we may change it to
```cpp
unordered_map<long long,vector<int>> lookUp;
long long st=(long long)s*100000+l;
```
which may be faster than converting to a string? I'm just too lazy to write a hash for pair<int,int> ...
