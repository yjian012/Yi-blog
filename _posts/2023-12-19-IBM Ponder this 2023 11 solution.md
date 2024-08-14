---
title: IBM Ponder this 2023 11 solution
date: 2023-12-19
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
<pre>
Problem description is <a href="https://research.ibm.com/haifa/ponderthis/challenges/November2023.html">here</a>. The solution is given <a href="https://research.ibm.com/haifa/ponderthis/solutions/November2023.html">here</a>.

When I saw the problem, I wondered if the diagonals include just the two main diagonals or the broken diagonals too. There's <a href="https://en.wikipedia.org/wiki/Magic_square#Enumeration_of_magic_squares">no explicit method</a> to construct all magic squares of order $\geq 4$, but if we require that the broken diagonals also add up to the magic constant, i.e. we consider the pandiagonal magic squares, there is an <a href="https://en.wikipedia.org/wiki/Pandiagonal_magic_square#4%C3%974_pandiagonal_magic_squares">explicit construction</a> of all order 4 pandiagonal magic squares. So I just did that, and once I confirmed that the shortest path length of them is less than 50, I pretty much forgot about the more general magic squares. Well, I like the pandiagonal ones better anyway, because of their higher symmetry.

Once the matrix is constructed, the first thing to do is to check its parity, because we need that to determine which target it'll connect with. Another thing we may want to know is, a heuristic distance from this matrix to the target. One simple choice is the Manhattan distance, although I doubt its effectiveness. Anyway, here's my implementation of the order 4 pandiagonal magic squares:
</pre>
<pre class="markdown">
```cpp
struct matrix{
    array&lt;array&lt;int,4>,4> mat;
    coor coors[16];
    int dis,to_target;
    int perm=0;
    matrix(int b,int c,int d,int e,int tranX,int tranY){//tranX and tranY from 0 to 3
        coors[mat[tranX][tranY]=0]=coor{tranX,tranY};
        coors[mat[tranX][(tranY+1)%4]=b+c+e]=coor{tranX,(tranY+1)%4};
        coors[mat[tranX][(tranY+2)%4]=c+d]=coor{tranX,(tranY+2)%4};
        coors[mat[tranX][(tranY+3)%4]=b+d+e]=coor{tranX,(tranY+3)%4};
        coors[mat[(tranX+1)%4][tranY]=b+c+d]=coor{(tranX+1)%4,tranY};
        coors[mat[(tranX+1)%4][(tranY+1)%4]=d+e]=coor{(tranX+1)%4,(tranY+1)%4};
        coors[mat[(tranX+1)%4][(tranY+2)%4]=b]=coor{(tranX+1)%4,(tranY+2)%4};
        coors[mat[(tranX+1)%4][(tranY+3)%4]=c+e]=coor{(tranX+1)%4,(tranY+3)%4};
        coors[mat[(tranX+2)%4][tranY]=b+e]=coor{(tranX+2)%4,tranY};
        coors[mat[(tranX+2)%4][(tranY+1)%4]=c]=coor{(tranX+2)%4,(tranY+1)%4};
        coors[mat[(tranX+2)%4][(tranY+2)%4]=b+c+d+e]=coor{(tranX+2)%4,(tranY+2)%4};
        coors[mat[(tranX+2)%4][(tranY+3)%4]=d]=coor{(tranX+2)%4,(tranY+3)%4};
        coors[mat[(tranX+3)%4][tranY]=c+d+e]=coor{(tranX+3)%4,tranY};
        coors[mat[(tranX+3)%4][(tranY+1)%4]=b+d]=coor{(tranX+3)%4,(tranY+1)%4};
        coors[mat[(tranX+3)%4][(tranY+2)%4]=e]=coor{(tranX+3)%4,(tranY+2)%4};
        coors[mat[(tranX+3)%4][(tranY+3)%4]=b+c]=coor{(tranX+3)%4,(tranY+3)%4};
        getDis();
    }
    void getDis(){
        dis=0;
        to_target=0;
        for(int i=0;i&lt;16;++i) dis+=abs(coors[i].x-target0coors[i].x)+abs(coors[i].y-target0coors[i].y);
        if(checkPerm()&1){
            to_target=1;
            dis-=abs(coors[14].x-target0coors[14].x)+abs(coors[14].y-target0coors[14].y);
            dis-=abs(coors[15].x-target0coors[15].x)+abs(coors[15].y-target0coors[15].y);
            dis+=abs(coors[14].x-target1coors[14].x)+abs(coors[14].y-target1coors[14].y);
            dis+=abs(coors[15].x-target1coors[15].x)+abs(coors[15].y-target1coors[15].y);
        }
    }
    int checkPerm(){
        int arr[16];
        for(int i=0;i&lt;4;++i)for(int j=0;j&lt;4;++j) arr[4*i+j]=mat[i][j];
        perm=0;
        if(arr[15]!=0){for(int i=0;i&lt;15;++i){if(arr[i]==0){perm+=(i/4)+(i%4)-1;swap(arr[i],arr[15]);break;}}}
        for(int i=1;i&lt;=15;++i){
            if(arr[i-1]!=i){
                perm++;
                for(int j=0;j&lt;15;++j){
                    if(arr[j]==i){swap(arr[j],arr[i-1]);break;}
                }
            }
        }
        return perm;
    }
    void print(ostream& output)const{
        output&lt;&lt;"distance is "&lt;&lt;dis&lt;&lt;endl;
        output&lt;&lt;"[";
        for(int i=0;i&lt;4;++i){output&lt;&lt;"[";for(int j=0;j&lt;3;++j) output&lt;&lt;mat[i][j]&lt;&lt;",";output&lt;&lt;mat[i][3]&lt;&lt;"]";if(i!=3) output&lt;&lt;",";else output&lt;&lt;"];";output&lt;&lt;endl;}
        output&lt;&lt;"-------------------\n";
    }
    void printDis(ostream& output)const{
        output&lt;&lt;"to_target="&lt;&lt;to_target&lt;&lt;endl&lt;&lt;"number:";
        for(int i=0;i&lt;16;++i) output&lt;&lt;i&lt;&lt;" "; output&lt;&lt;endl&lt;&lt;"distance:";
        if(to_target){
            for(int i=0;i&lt;16;++i) output&lt;&lt;(abs(coors[i].x-target1coors[i].x)+abs(coors[i].y-target1coors[i].y))&lt;&lt;" ";
            output&lt;&lt;endl;
        }
        else{
            for(int i=0;i&lt;16;++i) output&lt;&lt;(abs(coors[i].x-target0coors[i].x)+abs(coors[i].y-target0coors[i].y))&lt;&lt;" ";
            output&lt;&lt;endl;
        }
    }
    void printPerm(ostream& output)const{output&lt;&lt;"perm="&lt;&lt;perm&lt;&lt;endl;}
    mr1 to_mr1()const{
        ull conf=0,co=0;
        for(int i=0;i&lt;16;++i){co|=(ull)coors[i].x&lt;&lt;(4*i);co|=(ull)coors[i].y&lt;&lt;(4*i+2);}
        for(int i=0;i&lt;4;++i)
            for(int j=0;j&lt;4;++j)
                conf|=(ull)mat[i][j]&lt;&lt;(4*(4*i+j));
        return mr1{conf,co,(int8_t)dis};
    }
    mr0 to_mr0()const{
        ull conf=0,co=0;
        for(int i=0;i&lt;16;++i){co|=(ull)coors[i].x&lt;&lt;(4*i);co|=(ull)coors[i].y&lt;&lt;(4*i+2);}
        for(int i=0;i&lt;4;++i)
            for(int j=0;j&lt;4;++j)
                conf|=(ull)mat[i][j]&lt;&lt;(4*(4*i+j));
        return mr0{conf,co,(int8_t)dis};
    }
};
```
</pre>
<pre>
I need to be able to find the element at given coordinates and also to find the coordinates of a given element, so I decided to store both. Next, I can build the graph and try to find a path. To save space, I noticed that an order 4 magic square can be expressed by a 64 bit integer - either configuration or coordinates. So I used that expression as a "reduced matrix". That's what the "mr0" and "mr1" are, corresponding to the different parities.

There are 384 order 4 pandiagonal magic squares, 192 for each parity.

Before implementing the reduced matrices, I tried to find a solution manually and see what the best result I could get was. I used <a href="https://rosettacode.org/wiki/15_puzzle_game#JavaScript">this implementation</a> and changed it a bit. First, I need to be able to set the parity (I could've computed the parity from the matrix input, but I decided to skip that. I could've also created a plain text input for the initial matrix, but it was not that important since I just wanted to see the result, so I kept it simple and just pasted the matrix into the source code). Next, I need the elements that I clicked in reverse order.
</pre>
<style>
    #game15{padding:0; margin:0;padding-top:8vh;background:#222;color:#111}
    .txt{color:#fff;text-align:center;font-size:14pt}
    .board{padding:0;margin:auto;width:33vh;height:33vh}
    .button, .empty{border:0;font-size:3.5vh;margin:0.5vh;padding:0;height:6vh;width:7.25vh;line-height:5vh;
    vertical-align:middle;background:#fff;text-align:center;border-radius:3px;cursor:pointer;float:left}
    .empty{background:#333;border:1px solid #111}
    .option{color:#fff;text-align:center;font-size:20pt}
    .result{color:#fff;text-align:center;font-size:14pt}
</style>
<div id="game15">
<div class="option">
Parity:
<form>
  <input type="radio" id="even" name="parity" value="even" onclick="changeParity(0)">
  <label for="even">even</label><br>
  <input type="radio" id="odd" name="parity" value="odd" checked="checked" onclick="changeParity(1)">
  <label for="odd">odd</label><br>
</form> 
</div>
<div class="result">
<p id="result">
</p>
</div>
</div>
<script>
var parity=1;
var emptyX,emptyY;
var board, zx, zy, clicks, possibles, clickCounter, oldzx = -1, oldzy = -1;
var record=[];
function changeParity(x){
  if(x==0) parity=0;
  else if(x==1) parity=1;
}
function getPossibles() {
    var ii, jj, cx = [-1, 0, 1, 0], cy = [0, -1, 0, 1];
    possibles = [];
    for( var i = 0; i < 4; i++ ) {
        ii = zx + cx[i]; jj = zy + cy[i];
        if( ii < 0 || ii > 3 || jj < 0 || jj > 3 ) continue;
        possibles.push( { x: ii, y: jj } );
    }
}
function updateBtns() {
    var b, v, id;
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            id = "btn" + ( i + j * 4 );
            b = document.getElementById( id );
            v = board[i][j];
            if( v != 16 ) {
                b.innerHTML = ( "" + v );
                b.className = "button"
            }
            else {
                b.innerHTML = ( "" );
                b.className = "empty";
            }
        }
    }
    clickCounter.innerHTML = "Clicks: " + clicks;
}
function shuffle() {
    var v = 0, t; 
    do {
        getPossibles();
        while( true ) {
            t = possibles[Math.floor( Math.random() * possibles.length )];
            console.log( t.x, oldzx, t.y, oldzy )
            if( t.x != oldzx || t.y != oldzy ) break;
        }
        oldzx = zx; oldzy = zy;
        board[zx][zy] = board[t.x][t.y];
        zx = t.x; zy = t.y;
        board[zx][zy] = 16; 
    } while( ++v < 200 );
}
function import_config(){
//default even [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
//default odd [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,15,14,0]];
  board=[[6,8,5,11],
[1,15,2,12],
[10,4,9,7],
[13,3,14,0]];

  for(let i=0;i<4;++i)
    for(let j=i+1;j<4;++j){
      let tmp=board[i][j];
      board[i][j]=board[j][i];
      board[j][i]=tmp;
    }
  for(let i=0;i<4;++i)
    for(let j=0;j<4;++j)
      if(board[i][j]==0){board[i][j]=16;zx=i;zy=j;return;}
}
function restart() {
    //shuffle();
    import_config();
    clicks = 0;
    updateBtns();
}
function checkFinished() {
    var a = 0;
    if(parity==1){
      for( var j = 0; j < 3; j++ ) {
        for( var i = 0; i < 4; i++ ) {
              if( board[i][j] < a ) return false;
              a = board[i][j];
          }
      }
      if(board[0][3]!=13||board[1][3]!=15||board[2][3]!=14||board[3][3]!=16) return false;
      return true;
    }
    else{
      for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
              if( board[i][j] < a ) return false;
              a = board[i][j];
          }
      }
      return true;
    }
}
function btnHandle( e ) {
    getPossibles();
    var c = e.target.i, r = e.target.j, p = -1;
    for( var i = 0; i < possibles.length; i++ ) {
        if( possibles[i].x == c && possibles[i].y == r ) {
            p = i;
            break;
        }
    }
    if( p > -1 ) {
        clicks++;
        var t = possibles[p];
        board[zx][zy] = board[t.x][t.y];
        record.push(board[zx][zy].toString());
        board[t.x][t.y] = 16;
        zx = t.x; zy = t.y;
        //board[zx][zy] = 16;
        updateBtns();
        if( checkFinished() ) {
            document.getElementById("result").innerHTML="<p>Length="+record.length+"</p><p>["+record.reverse().join(", ")+"]</p>";
            record=[];
            restart();
        }
    }
}
function createBoard() {
    board = new Array( 4 );
    for( var i = 0; i < 4; i++ ) {
        board[i] = new Array( 4 );
    }
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            board[i][j] = ( i + j * 4 ) + 1;
        }
    }
    zx = zy = 3; //board[zx][zy] = 16;
}
function createBtns() {
    var b, d = document.createElement( "div" );
    d.className += "board";
    var game=document.getElementById("game15");
    game.appendChild( d );
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            b = document.createElement( "button" );
            b.id = "btn" + ( i + j * 4 );
            b.i = i; b.j = j;
            b.addEventListener( "click", btnHandle, false );
            b.appendChild( document.createTextNode( "" ) );
            d.appendChild( b );
        }
    }
    clickCounter = document.createElement( "p" );
    clickCounter.className += "txt";
    game.appendChild( clickCounter );
}
function gameStart() {
    createBtns();
    createBoard();
    restart();
}
gameStart();
</script>
<pre>
I found a solution of path length 90 manually.

Now, getting back to the reduced matrices and graph building algorithm...
</pre>
<pre class="markdown">
```cpp
unordered_map&lt;ull,array&lt;ull,4>> graph;
struct mr0{//reduced matrix
    ull conf,co;
    int8_t dis=0;
    mr0(ull conf1,ull co1,int8_t dist):conf(conf1),co(co1),dis(dist){}
    mr0 getMr(){
        ull confs[4];//left,right,up,down
        ull coos[4];
        int8_t dis[4];
        double prob[4]={0.0};
        if((co&3)!=0){//l
            confs[0]=conf;
            coos[0]=co;
            int x=(co-1)&3,y=(co>>2)&3;
            coos[0]--;
            int locOfe=4*(4*x+y);
            ull e=(conf>>locOfe)&15;
            coos[0]+=1ULL&lt;&lt;(e*4);
            confs[0]&=~(15ULL&lt;&lt;locOfe);
            confs[0]|=e&lt;&lt;(4*(4*(x+1)+y));
            dis[0]=getDis(coos[0]);
            addg(confs[0]);
            if(dis[0]==0) return mr0{confs[0],coos[0],dis[0]};
            prob[0]=exp(-dis[0]*T);
            //cout&lt;&lt;"left config:\n";print(confs[0]);cout&lt;&lt;"distance="&lt;&lt;(int)dis[0]&lt;&lt;endl;
        }
        if((co&3)!=3){//r
            confs[1]=conf;
            coos[1]=co;
            int x=(co+1)&3,y=(co>>2)&3;
            coos[1]++;
            int locOfe=4*(4*x+y);
            ull e=(conf>>locOfe)&15;
            coos[1]-=1ULL&lt;&lt;(e*4);
            confs[1]&=~(15ULL&lt;&lt;locOfe);
            confs[1]|=e&lt;&lt;(4*(4*(x-1)+y));
            dis[1]=getDis(coos[1]);
            addg(confs[1]);
            if(dis[1]==0) return mr0{confs[1],coos[1],dis[1]};
            prob[1]=exp(-dis[1]*T);
            //cout&lt;&lt;"right config:\n";print(confs[1]);cout&lt;&lt;"distance="&lt;&lt;(int)dis[1]&lt;&lt;endl;
        }
        if((co&12)!=0){//u
            confs[2]=conf;
            coos[2]=co;
            int x=co&3,y=((co>>2)-1)&3;
            coos[2]-=4;
            int locOfe=4*(4*x+y);
            ull e=(conf>>locOfe)&15;
            coos[2]+=4ULL&lt;&lt;(e*4);
            confs[2]&=~(15ULL&lt;&lt;locOfe);
            confs[2]|=e&lt;&lt;(4*(4*x+y+1));
            dis[2]=getDis(coos[2]);
            addg(confs[2]);
            if(dis[2]==0) return mr0{confs[2],coos[2],dis[2]};
            prob[2]=exp(-dis[2]*T);
            //cout&lt;&lt;"up config:\n";print(confs[2]);cout&lt;&lt;"distance="&lt;&lt;(int)dis[2]&lt;&lt;endl;
        }
        if((co&12)!=12){//d
            confs[3]=conf;
            coos[3]=co;
            int x=co&3,y=((co>>2)+1)&3;
            coos[3]+=4;
            int locOfe=4*(4*x+y);
            ull e=(conf>>locOfe)&15;
            coos[3]-=4ULL&lt;&lt;(e*4);
            confs[3]&=~(15ULL&lt;&lt;locOfe);
            confs[3]|=e&lt;&lt;(4*(4*x+y-1));
            dis[3]=getDis(coos[3]);
            addg(confs[3]);
            if(dis[3]==0) return mr0{confs[3],coos[3],dis[3]};
            prob[3]=exp(-dis[3]*T);
            //cout&lt;&lt;"down config:\n";print(confs[3]);cout&lt;&lt;"distance="&lt;&lt;(int)dis[3]&lt;&lt;endl;
        }
        for(int i=1;i&lt;4;++i) prob[i]+=prob[i-1];
        for(int i=0;i&lt;4;++i) prob[i]/=prob[3];
        //cout&lt;&lt;"Accumulated probabilities are:"; for(int i=0;i&lt;4;++i) cout&lt;&lt;prob[i]&lt;&lt;","; cout&lt;&lt;endl;
        double p=roll1(generator);
        int l=0;
        for(;l&lt;4;++l){if(p&lt;prob[l]) break;}
        return mr0{confs[l],coos[l],dis[l]};
    }
    void addg(ull nei){
        auto& arr=graph[conf];
        for(int i=0;i&lt;4;++i){
            if(arr[i]==nei) return;
            if(arr[i]==0){arr[i]=nei;break;}
        }
        auto& arr1=graph[nei];
        for(int i=0;i&lt;4;++i){
            if(arr1[i]==0){arr1[i]=conf;return;}
        }
    }
    int getDis(ull coor){
        int dis=0;
        for(int i=0;i&lt;16;++i) dis+=abs(int((coor>>4*i)&3)-target0coors[i].x)+abs(int((coor>>(4*i+2))&3)-target0coors[i].y);
        return dis;
    }
};
```
</pre>
<pre>
They store the configuration and coordinates of the matrix and the manhattan distance to their target. The "getMr()" method generates a neighboring matrix with probability proportional to $e^{-\text{distance}*T}$ where $T$ is a constant parameter. The newly generated matrix is stored in a graph, and once it reaches the target, I did a BFS to find the shortest path.

Because the shortest path may be starting from any of the magic squares that has the same parity as the target, I just started from the target and looked for any of the initial matrices.
</pre>
<pre class="markdown">
```cpp
unordered_map&lt;ull,int> layers;
unordered_set&lt;ull> inits;
queue&lt;ull> q;
ull bfs(ull start){
    while(!q.empty()) q.pop();
    q.emplace(start);
    int l=0;
    layers[start]=l;
    while(!q.empty()){
        int sz=q.size();
        l++;
        while(sz--!=0){
            const auto &arr=graph[q.front()];
            q.pop();
            for(int i=0;i&lt;4;++i){
                ull t=arr[i];
                if(t==0) break;
                if(layers.find(t)!=layers.end()) continue;
                layers[t]=l;
                if(inits.count(t)){//cout&lt;&lt;"layers="&lt;&lt;l&lt;&lt;endl;
                    while(!q.empty()) q.pop(); return t;}
                q.emplace(t);
            }
        }
    }
    return 0;
}
vector&lt;ull> getSteps(ull fin,ull tar){
    vector&lt;ull> r{fin};
    ull nxt=fin;
    int l=layers[fin]-1;
    //cout&lt;&lt;"finished layers="&lt;&lt;l&lt;&lt;endl;
    while(nxt!=tar){
        const auto& arr=graph[nxt];
        for(int i=0;i&lt;4;++i){
            if(arr[i]==0) break;
            if(layers[arr[i]]==l){nxt=arr[i];r.emplace_back(nxt);break;}
        }
        l--;
    }
    return r;
}
```
</pre>
<pre>
Since it's a randomized algorithm, the first path that it finds is usually quite large, on the magnitude of 10,000 and has large fluctuations. But as the graph gets bigger, there's a higher chance that a short path will be found, and the shortest path length decreases. Quickly the length decreases to about 100, then it hardly moves, until the program crashes due to using too much memory, because the graph gets too big. The best result that I got with this algorithm is 59.

So, I searched for a better solver, and I found one <a href="https://github.com/GuptaAnna/15418Project">here</a>. Again, I need to change the source code a little bit to enable different parities.

For many of the inputs, this gives a result very fast, but for the rest, it also used too much memory (more than 12GB) and crashed. The implementation is quite general and not optimized for order 4 matrices.

Anyway, the best result I got from that program is, 42! The answer to life, universe and everything! Coincidence? I think not!

Start:
1 2 3 4
5 6 7 8
9 10 11 12
13 15 14 0

Sequence: 
[12, 8, 7, 11, 10, 6, 5, 9, 6, 10, 8, 12, 14, 8, 11, 3, 4, 7, 12, 11, 3, 5, 10, 15, 8, 3, 5, 4, 2, 10, 9, 1, 10, 9, 4, 2, 9, 4, 15, 8, 3, 14]

End:
10 4 9 7
1 15 2 12
6 8 5 11
13 3 14 0 

Now that I look at it again, I noticed that their distance function skips the empty cell, which I didn't do in my distance calculation. I think that's why it didn't work too well... Also, I think I only changed the destination for the odd parities, but forgot to change the distance function too. Maybe that's why there are more configurations that it was unable to solve. The distance is not guaranteed to be the shortest for those odd parity ones due to that, too. Anyway, it's not hard to fix, but I got to move on...

One issue with the $A^*$ algorithm is, one can only go in one direction, and if the distance function is not helpful, in the worst case it just reduces to a BFS in this context. And the radius to explore equals the length of the shortest path. On the other hand, if we start from both ends, we just need to explore two balls of radius $l/2$, where $l$ is the shortest length. This makes a huge difference when the volume is exponential in radius.

So, another way to solve it is, since we know that a solution with length $\leq 50$ exists, we can simply explore the space of radius 25 from both sides and stop when they touch and get the result. If they don't touch, we move on to the next one.

Each configuration has from 2 to 4 neighbors, or 1 to 3 children. If the case of 1 and 3 children has the same probability, there are at most 2^25 configurations in each sphere, which is about 32M. Including the surface, it would be 48M, two of them is 96M, each configuration can be stored in 64bit, need one byte to store the distance, so it would be 864MB. Considering more space is needed for hashmap and other overheads, theoretically it can be done using within 2GB memory... I wonder how much memory it actually uses.

So the bonus problem is easier to solve in this sense. If the path length is just a little longer, this method will not be feasible.
On the contrary, my randomized algorithm can find a solution to all the starting configurations very fast, but it's very hard to get the shortest path. It's pretty good for the main problem, though. It finds a solution with length $\leq 150$ pretty fast.

Now, consider the general magic squares, the only difference is how we generate them. Apparently there are 7040 of them, and 880 of them if we exclude reflections and rotations. We could find the list that's available on the internet like <a href="http://recmath.org/Magic%20Squares/order4list.htm"> here</a>, and do the rotations and reflections to generate the others, or we could solve the 10 linear equations, where 9 of them are independent, and iterate through the permutations of the 7 independent elements. Because of the symmetry, we could fix one element, say 1, to 3 positions, so the total number of choices to consider is 3*15*14*13*12*11*10. Then we do the reflection and rotation to get all 7040 matrices. After we get all of them, the rest is pretty much the same.