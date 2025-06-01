/*Written by Yi Jiang, Aug 2021. All rights reserved.*/
var sidelength=10;//20;
var initx=4,inity=4;//initx=0,inity=0;
var path="";
var x=initx,y=inity;
var colorBefore="";//either R or W, for undo purpose
var whiteCount=sidelength*sidelength-1;
const mp=[['F','G','H'],
['E','X','A'],
['D','C','B']];
const dirmp=[[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
(function() {
    keyNav();
})();
function init1(){
	sidelength=20;
	initx=0,inity=0;
}
function init2(){
	sidelength=10;
	initx=4,inity=4;
}
function init(){
	path="";
	x=initx,y=inity;
	colorBefore="";
	witheCount=sidelength*sidelength-1;
	document.getElementById("key"+x+"_"+y).classList.remove("keyPlayer");
	for(let i=0;i<sidelength;++i){
		for(let j=0;j<sidelength;++j){
			key=document.getElementById("key"+i+"_"+j);
			key.classList.remove("keyForb");
			key.classList.remove("keyVis");
			key.classList.add("keyEmpty");
		}
	}
	document.getElementById("key"+x+"_"+y).classList.add("keyPlayer");
}
	function checkWin(){
		document.getElementById("whiteCount").innerText="剩余白色方格数量: "+whiteCount;
		/*if(whiteCount==0)*/ document.getElementById("solution").innerText="当前路径: "+path;
		//document.getElementById("colorBefore").innerText=colorBefore;//to comment out
	}
	function move(dx,dy){
		if(x+dx<0||x+dx>=sidelength||y+dy<0||y+dy>=sidelength) return;
		let nxt=document.getElementById("key"+(x+dx)+"_"+(y+dy));
		if(!nxt.classList.contains("keyEmpty")) return;
		if(x+2*dx>=0 && x+2*dx<sidelength && y+2*dy>=0 && y+2*dy<sidelength){
			let n2t=document.getElementById("key"+(x+2*dx)+"_"+(y+2*dy));
			if(n2t.classList.contains("keyVis")) return;
			let cur=document.getElementById("key"+x+"_"+y);
			cur.classList.remove("keyPlayer");
			cur.classList.add("keyVis");
			//console.log(nxt.id);
			nxt.classList.remove("keyEmpty");
			nxt.classList.add("keyPlayer");
			if(n2t.classList.contains("keyForb")) colorBefore+='R';
			else {whiteCount--;colorBefore+='W';}
			n2t.classList.remove("keyEmpty");
			n2t.classList.add("keyForb");
			x=x+dx;
			y=y+dy;
			path+=mp[dx+1][dy+1];
			whiteCount--;
			checkWin();
			return;
		}
		let cur=document.getElementById("key"+x+"_"+y);
		cur.classList.remove("keyPlayer");
		cur.classList.add("keyVis");
		nxt.classList.remove("keyEmpty");
		nxt.classList.add("keyPlayer");
		x=x+dx;
		y=y+dy;
		path+=mp[dx+1][dy+1];
		whiteCount--;
		checkWin();
	}
	function undo(){
		if(path.length==0) return;
		let dir=dirmp[path.charCodeAt(path.length-1)-"A".charCodeAt(0)];
		if(x-dir[0]>-1&&x-dir[0]<sidelength&&y-dir[1]>-1&&y-dir[1]<sidelength){
			let red=document.getElementById("key"+(x-dir[0])+"_"+(y-dir[1]));
			if(colorBefore[colorBefore.length-1]=='W'){
				red.classList.remove("keyForb");
				red.classList.add("keyEmpty");
				whiteCount++;
			}
			colorBefore=colorBefore.slice(0,-1);
		}
		let cur=document.getElementById("key"+x+"_"+y);
		cur.classList.remove("keyPlayer");
		cur.classList.add("keyEmpty");
		x+=dir[0];
		y+=dir[1];
		cur=document.getElementById("key"+x+"_"+y);
		cur.classList.remove("keyVis");
		cur.classList.add("keyPlayer");
		path=path.slice(0,-1);
		whiteCount++;
		//checkWin();//to comment out
	}
	function runInput(){
		let inputPath=document.getElementById('pathInput').value;
		for(let i=0;i<inputPath.length;++i){
			let num=inputPath.charCodeAt(i)-"A".charCodeAt(0);
			if(num<0||num>7){
				document.getElementById("solution").innerText="Current path: Wrong characters in input!!! Only 'A' to 'H' are allowed!";
				return;
			}
			move(-dirmp[num][0],-dirmp[num][1]);
		}
	}
function keyNav(){
	let start=document.getElementById("key"+x+"_"+y);
	start.classList.remove("keyEmpty");
	start.classList.add("keyPlayer");
    var holdingOverrideKey=false;
    var KeyEvent={DOM_VK_NUMPAD0:96,DOM_VK_NUMPAD1:97,DOM_VK_NUMPAD2:98,DOM_VK_NUMPAD3:99,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD7:103,DOM_VK_NUMPAD8:104,DOM_VK_NUMPAD9:105}
    function cancelEvent(a){
        a=a?a:window.event;
        if(a.stopPropagation){
            a.stopPropagation()}
        if(a.preventDefault){
            a.preventDefault()}
        a.cancelBubble=true;
        a.cancel=true;
        a.returnValue=false;
        return false
    }
    document.onkeydown=function(b){
        b = b || window.event;
        var target = b.target || b.srcElement;
        var targetTagName = (target.nodeType == 1) ? target.nodeName.toUpperCase() : "";
        if(!/INPUT|SELECT|TEXTAREA/.test(targetTagName)){
            if(b.altKey||b.ctrlKey||b.metaKey){
                holdingOverrideKey=true;return}
            var a=(window.event)?b.keyCode:b.which;
            switch(a){
                case KeyEvent.DOM_VK_NUMPAD1:move(1,-1);cancelEvent(b);break;
                case KeyEvent.DOM_VK_NUMPAD2:move(1,0);cancelEvent(b);break;
                case KeyEvent.DOM_VK_NUMPAD3:move(1,1);cancelEvent(b);break;
				case KeyEvent.DOM_VK_NUMPAD4:move(0,-1);cancelEvent(b);break;
				case KeyEvent.DOM_VK_NUMPAD0:case KeyEvent.DOM_VK_NUMPAD5:undo();break;
                case KeyEvent.DOM_VK_NUMPAD6:move(0,1);cancelEvent(b);break;
                case KeyEvent.DOM_VK_NUMPAD7:move(-1,-1);cancelEvent(b);break;
                case KeyEvent.DOM_VK_NUMPAD8:move(-1,0);cancelEvent(b);break;
                case KeyEvent.DOM_VK_NUMPAD9:move(-1,1);cancelEvent(b);break;
            }
        }
    }
    document.onkeyup=function(a){holdingOverrideKey=false;};
}
