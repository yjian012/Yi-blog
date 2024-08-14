---
title: Puzzle game
date: 2021-09-05
---
<script src="/Yi-blog/js/scripts.js"></script>
<link rel="stylesheet" href="/Yi-blog/css/styles.css">
<link rel="stylesheet" href="/Yi-blog/css/keypad.css">

  <p>Here's a keypad puzzle that I made:</p>
  <p>There are 9 keys on a keypad. You can open the door when all the keys are on. The problem is, pressing each key not only turns itself on or off, it also toggles the state of some other keys. Can you solve this puzzle?</p>
  <p>To make it a little bit trickier, there is a certain probability that there is no solution at all! Can you figure it out?</p>
<table id="keypad">
<div id="overlay" onclick="olOff()"><div id="winText">You won!</div></div>
<div id="overlay_f" onclick="olOff_f()"><div id="failText">Try again!</div></div>
    <tr>
      <td>
      <button class="key keyOff" id="key0" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key1" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key2" onclick="changeState(this)"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyOff" id="key3" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key4" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key5" onclick="changeState(this)"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyOff" id="key6" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key7" onclick="changeState(this)"></button>
      <button class="key keyOff" id="key8" onclick="changeState(this)"></button>
      </td>
    </tr>
    <tr>
    <td rowspan="3" style="text-align: center;"><button onclick="noSol()" style="background: rgb(233,200,200); font-weight: bold;">There's no solution!</button></td>
    </tr>
</table>
<br />
<button onclick="reset()">reset</button>
<button onclick="newRandConf()">new configuration</button>
<div>
<button onclick="showHint()">show hint</button>
<div id="hint" style="background-color: rgba(200,200,200,0.5); display: none;">
<p></p>
<div id="sol" style="display: none;">
<button onclick="showSol()">show solution</button>
<div id="solution" style="display: none;">
<table style="border: 1px solid black;">
<tr>
  <td>&nbsp; 0 &nbsp;</td><td>&nbsp; 1 &nbsp;</td><td>&nbsp; 2 &nbsp;</td>
</tr>
<tr>
  <td>&nbsp; 3 &nbsp;</td><td>&nbsp; 4 &nbsp;</td><td>&nbsp; 5 &nbsp;</td>
</tr>
<tr>
  <td>&nbsp; 6 &nbsp;</td><td>&nbsp; 7 &nbsp;</td><td>&nbsp; 8 &nbsp;</td>
</tr>
</table>
<p></p>
</div>
</div>
</div>
</div>
<br />
<h4>Motivation:</h4>
  <p>I love solving puzzles - in research, in life, or in games. But many "puzzles" in games are more like riddles - the clues are words, and the solutions are up to interpretation, sometimes there are ambiguities, and if it's translated into another language, very often some of the subtleties are lost in translation.</p>
  <p>There are puzzles that don't need explanations, for example, the keypad puzzles below are from Silent Hill 2 and Resident Evil Village:</p>
  ![SH2](/Yi-blog/img/CreeperKeypad.png)
  ![RE8](/Yi-blog/img/RE8_crank_puzzle.jpg)
  <p>But these puzzles are very easy to solve. So I wonder, are there good mathematical/algorithmic puzzles? I searched "math puzzles" but they were not what I was thinking about.</p>
  <p>So, I have this idea of creating some good puzzles that don't need much explanation but requirs good logic or algorithmic thinking to solve. The keypad puzzle above is a good example. It would be nearly impossible to solve it by trying luck and randomly clicking on the keys if the size of the problem is large, e.g. a 4 by 4 keypad or even larger, but there is a simple algorithm that can solve it very efficiently.</p>
  <p>I have some other ideas which are all related to interesting mathematical or algorithmic problems, involving graph theory, linear algebra, number theory, etc. I want them to be difficult, but not too difficult - some of them are NP-complete, so I'll have to make a simpler version of it. Anyways, they are just ideas, and right now I don't have time to make a real game out of them. Maybe I'll try to see what I can do with them in the future, if I have some spare time...</p>
  
<script type="text/javascript">
/*Written by Yi Jiang, Aug 2021. All rights reserved.*/
var i;
var matrix=new Array(9);
for(i=0; i<9; i++) {
  matrix[i] = new Array(9).fill(0);
}
var initial=new Array(9).fill(0);
var valid;
var solution;
newRandConf();
function initialize_mat(){//initialize matrix to row weight 2~4
  for(i=0; i<9; i++) {
    matrix[i] = new Array(9).fill(0);
  }
  for(i=0;i<9;i++){
    matrix[i][i]=1;
    var num_eles=Math.floor(Math.random()*3+1);
    var list_eles=[];
    while(list_eles.length < num_eles){
      var r = Math.floor(Math.random() * 8);
      if(r>=i) r++;
      if(list_eles.indexOf(r) === -1) list_eles.push(r);
    }
    for(var j=0;j<num_eles;j++){
      matrix[i][list_eles[j]]=1;
    }
  }
}
function initialize_ini(){//weight of initial: 1~4
	initial=new Array(9).fill(0);
	var num_eles=Math.floor(Math.random()*4+1);
  var list_eles=[];
  while(list_eles.length < num_eles){
    var r = Math.floor(Math.random() * 8);
    if(r>=i) r++;
    if(list_eles.indexOf(r) === -1) list_eles.push(r);
  }
  for(var j=0;j<num_eles;j++){
    initial[list_eles[j]]=1;
  }
}
function reset(){
  for(i=0;i<9;i++){
  	if(initial[i]==0){
   		document.getElementById("key"+i).classList.remove("keyOn");
    	document.getElementById("key"+i).classList.add("keyOff");
    }
  	else{
   		document.getElementById("key"+i).classList.remove("keyOff");
    	document.getElementById("key"+i).classList.add("keyOn");
    }
  }
}
function newRandConf(){
  if(Math.random()<0.25){newValidConf();return;}
  olOff();
  olOff_f();
  document.getElementById("hint").style.display="none";
	document.getElementById("solution").style.display="none";
  initialize_mat();
	initialize_ini();
	for(i=0;i<9;i++){
  	if(initial[i]==0){
   		document.getElementById("key"+i).classList.remove("keyOn");
    	document.getElementById("key"+i).classList.add("keyOff");
    }
  	else{
   		document.getElementById("key"+i).classList.remove("keyOff");
    	document.getElementById("key"+i).classList.add("keyOn");
    }
  }
  solve();
}
function newValidConf(){
	//opposite of initial is a linear combinantion of rows of matrix
  //choose three to nine rows, the sum is initial
  olOff();
  olOff_f();
  document.getElementById("hint").style.display="none";
  document.getElementById("solution").style.display="none";
  initialize_mat();
  var list_rows=[];
  list_rows=[0,1,2,3,4,5,6,7,8];
  shuffle(list_rows);
  initial.fill(1);
  var j;
  for(j=0;j<list_rows.length;j++){
  	for(i=0;i<9;i++){
    	initial[i]=initial[i]^matrix[list_rows[j]][i];
    }
    var count=0;
    for(i=0;i<9;i++){
    	if(initial[i]==1) count++;
    }
    if(count<=4) break;
  }
  list_rows=list_rows.slice(0,j+1);
  /*
  var answer="";
  for(i=0;i<list_rows.length;i++){
    answer+=list_rows[i]+" ";
  }
  console.log(answer);
  */
	for(i=0;i<9;i++){
  	if(initial[i]==0){
   		document.getElementById("key"+i).classList.remove("keyOn");
    	document.getElementById("key"+i).classList.add("keyOff");
    }
  	else{
   		document.getElementById("key"+i).classList.remove("keyOff");
    	document.getElementById("key"+i).classList.add("keyOn");
    }
  }
  /*
  var debug="";
  for(i=0;i<9;i++){
  	debug="";
  	for(var j=0;j<9;j++){
    	debug=debug+matrix[i][j]+' ';
    }
    console.log(debug);
  }
  */
  solve();
}
function solve(){
  var rows=matrix.length;
  var cols=matrix[0].length;
  var matrix1=new Array(rows+1);
  for(i=0; i<rows; i++) {
    matrix1[i] = new Array(cols);
    for(var j=0;j<cols;j++){
      matrix1[i][j]=matrix[i][j];
    }
  }
  matrix1[rows] = new Array(cols);
  for(var j=0;j<cols;j++){
  	if(initial[j]==1) matrix1[rows][j]=0;
    else matrix1[rows][j]=1;
  }
  var ech=echelon(matrix1);
  if(echelon(matrix).rank==ech.rank){
  	valid=true;
    solution=ech.row_com[rows];
    solution.splice(0,1);
    solution.sort();
  }
  else valid=false;
}
function noSol(){
	if(valid==false){
  	olOn();
  }
  else olOn_f();
}
function showHint(){
	document.getElementById("hint").firstElementChild.innerText="Create a matrix and use a little bit of linear algebra.";
	document.getElementById("hint").style.display="";
  document.getElementById("sol").style.display="";
}
function showSol(){
  if(valid==false){document.getElementById("solution").getElementsByTagName("p")[0].innerText="There is no solution!"; document.getElementById("solution").style.display=""; return;}
  else{
  	var solString="The solution is {";
    for(i=0;i<solution.length;i++){
    	solString+=solution[i]+" ";
    }
    solString+="}.";
    document.getElementById("solution").getElementsByTagName("p")[0].innerText=solString;
    document.getElementById("solution").style.display="";
    return;
  }
}
function echelon(mat){
  var rows=mat.length;
  var cols=mat[0].length;
	var e_form=new Array(rows);
  for(i=0; i<rows; i++) {
    e_form[i] = new Array(cols);
    for(var j=0;j<cols;j++){
    	e_form[i][j]=mat[i][j];
    }
  }
  var row_com=new Array(9);
  for(i=0;i<rows;i++){
  	row_com[i]=[i];
  }
  var rank=0;
  var v=0;
  var h=0;
  //var repeat=0;
  while(v<rows /*&& repeat<10000*/){
    while(h<cols /*&& repeat<10000*/){
  		//repeat++;
      var p=v+1;
    	if(e_form[v][h]==0){
      	for(p=v+1;p<rows;p++){
        	if(e_form[p][h]==1){
          	for(var l=h;l<cols;l++){
            	e_form[v][l]=e_form[v][l]^e_form[p][l];//add row p to row v
            }
            row_com[v]=row_com[v].concat(row_com[p]);
            for(var t=row_com[v].length-1;t>=0;t--){
            	var s=row_com[v].indexOf(row_com[v][t]);
              if(s!=t){
              	row_com[v].splice(t,1);
                row_com[v].splice(s,1);
              	t--;
              }
            }
            break;
          }
        }
        if(p==rows){h++; continue;}
      }
      for(var j=p;j<rows;j++){
        if(e_form[j][h]==1){
          for(var l=h;l<cols;l++){
            e_form[j][l]=e_form[v][l]^e_form[j][l];//add row v to row j
          }
          row_com[j]=row_com[j].concat(row_com[v]);
          for(var t=row_com[j].length-1;t>=0;t--){
            var s=row_com[j].indexOf(row_com[j][t]);
            if(s!=t){
              row_com[j].splice(t,1);
              row_com[j].splice(s,1);
            	t--;
            }
          }
        }
      }
    	h++;
    	v++;
    }
    if(h==cols) break;
  }
  rank=v;
  return {e_form,row_com,rank};
}
function prob_check(){//test: full rank probability //result: about 1/3 (9*9,row weight 2-4)
	var count_full=0;
  //var count_nfull=0;
  for(var t=0;t<1000;t++){
  	initialize_mat();
    if(echelon(matrix).rank==matrix.length) count_full++;
    //else count_nfull++;
  }
  console.log(count_full);
  //console.log(count_nfull);
}
function prob_check2(){//test: same random configuration as above, test the probability that initial is solvable //result: about 63%
	var count_s=0;
  //var count_ns=0;
  for(var t=0;t<1000;t++){
  	initialize_mat();
    var rows=matrix.length;
    var cols=matrix[0].length;
    var matrix1=new Array(rows+1);
    for(i=0; i<rows; i++) {
      matrix1[i] = new Array(cols);
      for(var j=0;j<cols;j++){
        matrix1[i][j]=matrix[i][j];
      }
    }
    matrix1[rows] = new Array(cols).fill(1);
  	var num_eles=Math.floor(Math.random()*4+1);
    var list_eles=[];
    while(list_eles.length < num_eles){
      var r = Math.floor(Math.random() * 8);
      if(r>=i) r++;
      if(list_eles.indexOf(r) === -1) list_eles.push(r);
    }
    for(var j=0;j<num_eles;j++){
      matrix1[rows][list_eles[j]]=0;
    }
    if(echelon(matrix).rank==echelon(matrix1).rank) count_s++;
  }
  console.log(count_s);
}
function changeState(elem){
	var num=parseInt(elem.id.slice(-1));
  for(i=0;i<9;i++){
  	if(matrix[num][i]==1) toggle(document.getElementById("key"+i));
  }
  checkWin();
}
function checkWin(){
  for(i=0;i<9;i++){
  	if(document.getElementById("key"+i).classList.contains("keyOff")) return;
  }
  olOn();
  return;
}
function olOn() {
  document.getElementById("overlay").style.display = "block";
}
function olOff() {
  document.getElementById("overlay").style.display = "none";
}
function olOn_f() {
  document.getElementById("overlay_f").style.display = "block";
}
function olOff_f() {
  document.getElementById("overlay_f").style.display = "none";
}
function toggle(elem){
	if(elem.classList.contains("keyOff")){
    elem.classList.remove("keyOff");
    elem.classList.add("keyOn");
  }
  else{
    elem.classList.remove("keyOn");
    elem.classList.add("keyOff");
  }
}
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function check(){
	initialize_mat();
	var debug="";
  var result=echelon(matrix);
  //var ech=;
  for(i=0;i<matrix.length;i++){
  	var vec=new Array(matrix[0].length).fill(0);
  	debug="";
  	for(var j=0;j<matrix[0].length;j++){
    	debug=debug+result.e_form[i][j]+' ';
    }
    debug+="=rows(";
    for(var j=0;j<result.row_com[i].length;j++){
    	debug=debug+result.row_com[i][j]+' ';
      for(var k=0;k<matrix[0].length;k++){
      	vec[k]^=matrix[result.row_com[i][j]][k];
      }
    }
    debug+=") =";
    for(var j=0;j<matrix[0].length;j++){
    	debug+=vec[j]+' ';
    }
    console.log(debug);
  }
  console.log("rank="+echelon(matrix).rank);
  console.log("----------")
  for(i=0;i<9;i++){
  	debug="";
  	for(var j=0;j<9;j++){
    	debug=debug+matrix[i][j]+' ';
    }
    console.log(debug);
  }
  console.log("###########")
}
function newInvalidConf(){
	//make 8 rows. the 9th row must be a linear combination, so that it's not full rank. Problem is, if none of the other keys toggle key8, then it's impossible...
  //initial must have the "1"s in the missing rows in the row echelon form.
  valid=false;
  
}
function newRandConf_old(){
  for(i=0;i<9;i++){
    initial[i]=Math.round(Math.random());
  }
	for(i=0;i<9;i++){
  	if(initial[i]==0){
   		document.getElementById("key"+i).classList.remove("keyOn");
    	document.getElementById("key"+i).classList.add("keyOff");
    }
  	else{
   		document.getElementById("key"+i).classList.remove("keyOff");
    	document.getElementById("key"+i).classList.add("keyOn");
    }
  }
  for(i=0;i<9;i++)
  	for(var j=0;j<9;j++){
    	if(j==i) {matrix[i][j]=1;continue;}
  		matrix[i][j]=Math.round(Math.random());
    }
  /*
  var debug="";
  for(i=0;i<9;i++){
  	debug="";
  	for(var j=0;j<9;j++){
    	debug=debug+matrix[i][j]+' ';
    }
    console.log(debug);
  }
  */
}
</script>