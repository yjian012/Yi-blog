---
title: IBM Ponder this 2025 06 solution
date: 2025-07-13
---
<html>
<head>
<style>
.keypad{
  border: 1px solid black;
  position: relative;
}
.key {
  border: 1px solid #3333FF;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
.keyOff{
  background-color: #FFFFFF; /* Green */
}
.keyOn{
  background-color: #04AA6D; /* Green */
}
.keyEmpty{
  background-color: #FFFFFF; /* White */
}
.keyVis{
  background-color: #0000FF; /* Blue */
}
.keyForb{
  background-color: #FF0000; /* Red */
}
.keyPlayer{
  background-color: #00FF00; /*Green*/
}
#overlay,#overlay_f {
  position: absolute;
  display: none;
  height: 240px;
  width: 240px;
  background: rgba(238, 228, 218, 0.5);
  z-index: 2;
  cursor: pointer;
}
#winText{
  position: relative;
  top: 70px;
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  color: rgb(180, 120, 120);;
}
#failText{
  position: relative;
  top: 70px;
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  line-height: 60px;
  color: rgb(220, 30, 30);;
}
</style>
</head>
<body>
<p>
Problem description can be found <a href="https://research.ibm.com/haifa/ponderthis/solutions/June2025.html">here</a>.
You can play the games below with a standard keyboard.
Choose main game or bonus game.
The current location of the frog is colored in green, to make it easier to tell.
Controls: 
  Use numpad keys 1 2 3 4 6 7 8 9 to move the frog in the corresponding directions.
  To make it easier to solve, you can use key 5 or 0 to undo previous moves.
  Make sure "Num lock" is on!
</p>
<button id="game1" onclick="init1()">Main game</button>
<button id="game2" onclick="init2()">Bonus game</button>
<div>
<p id="whiteCount">
</p>
<p id="solution">
</p>
<p id="colorBefore">
</p>
</div>
<table class="keypad" id="game1">
<div id="overlay" onclick="olOff()"><div id="winText">You won!</div></div>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key0_0"></button>
      <button class="key keyEmpty" id="key0_1"></button>
      <button class="key keyEmpty" id="key0_2"></button>
      <button class="key keyEmpty" id="key0_3"></button>
      <button class="key keyEmpty" id="key0_4"></button>
      <button class="key keyEmpty" id="key0_5"></button>
      <button class="key keyEmpty" id="key0_6"></button>
      <button class="key keyEmpty" id="key0_7"></button>
      <button class="key keyEmpty" id="key0_8"></button>
      <button class="key keyEmpty" id="key0_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key0_10"></button>
      <button class="key keyEmpty" id="key0_11"></button>
      <button class="key keyEmpty" id="key0_12"></button>
      <button class="key keyEmpty" id="key0_13"></button>
      <button class="key keyEmpty" id="key0_14"></button>
      <button class="key keyEmpty" id="key0_15"></button>
      <button class="key keyEmpty" id="key0_16"></button>
      <button class="key keyEmpty" id="key0_17"></button>
      <button class="key keyEmpty" id="key0_18"></button>
      <button class="key keyEmpty" id="key0_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key1_0"></button>
      <button class="key keyEmpty" id="key1_1"></button>
      <button class="key keyEmpty" id="key1_2"></button>
      <button class="key keyEmpty" id="key1_3"></button>
      <button class="key keyEmpty" id="key1_4"></button>
      <button class="key keyEmpty" id="key1_5"></button>
      <button class="key keyEmpty" id="key1_6"></button>
      <button class="key keyEmpty" id="key1_7"></button>
      <button class="key keyEmpty" id="key1_8"></button>
      <button class="key keyEmpty" id="key1_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key1_10"></button>
      <button class="key keyEmpty" id="key1_11"></button>
      <button class="key keyEmpty" id="key1_12"></button>
      <button class="key keyEmpty" id="key1_13"></button>
      <button class="key keyEmpty" id="key1_14"></button>
      <button class="key keyEmpty" id="key1_15"></button>
      <button class="key keyEmpty" id="key1_16"></button>
      <button class="key keyEmpty" id="key1_17"></button>
      <button class="key keyEmpty" id="key1_18"></button>
      <button class="key keyEmpty" id="key1_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key2_0"></button>
      <button class="key keyEmpty" id="key2_1"></button>
      <button class="key keyEmpty" id="key2_2"></button>
      <button class="key keyEmpty" id="key2_3"></button>
      <button class="key keyEmpty" id="key2_4"></button>
      <button class="key keyEmpty" id="key2_5"></button>
      <button class="key keyEmpty" id="key2_6"></button>
      <button class="key keyEmpty" id="key2_7"></button>
      <button class="key keyEmpty" id="key2_8"></button>
      <button class="key keyEmpty" id="key2_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key2_10"></button>
      <button class="key keyEmpty" id="key2_11"></button>
      <button class="key keyEmpty" id="key2_12"></button>
      <button class="key keyEmpty" id="key2_13"></button>
      <button class="key keyEmpty" id="key2_14"></button>
      <button class="key keyEmpty" id="key2_15"></button>
      <button class="key keyEmpty" id="key2_16"></button>
      <button class="key keyEmpty" id="key2_17"></button>
      <button class="key keyEmpty" id="key2_18"></button>
      <button class="key keyEmpty" id="key2_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key3_0"></button>
      <button class="key keyEmpty" id="key3_1"></button>
      <button class="key keyEmpty" id="key3_2"></button>
      <button class="key keyEmpty" id="key3_3"></button>
      <button class="key keyEmpty" id="key3_4"></button>
      <button class="key keyEmpty" id="key3_5"></button>
      <button class="key keyEmpty" id="key3_6"></button>
      <button class="key keyEmpty" id="key3_7"></button>
      <button class="key keyEmpty" id="key3_8"></button>
      <button class="key keyEmpty" id="key3_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key3_10"></button>
      <button class="key keyEmpty" id="key3_11"></button>
      <button class="key keyEmpty" id="key3_12"></button>
      <button class="key keyEmpty" id="key3_13"></button>
      <button class="key keyEmpty" id="key3_14"></button>
      <button class="key keyEmpty" id="key3_15"></button>
      <button class="key keyEmpty" id="key3_16"></button>
      <button class="key keyEmpty" id="key3_17"></button>
      <button class="key keyEmpty" id="key3_18"></button>
      <button class="key keyEmpty" id="key3_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key4_0"></button>
      <button class="key keyEmpty" id="key4_1"></button>
      <button class="key keyEmpty" id="key4_2"></button>
      <button class="key keyEmpty" id="key4_3"></button>
      <button class="key keyEmpty" id="key4_4"></button>
      <button class="key keyEmpty" id="key4_5"></button>
      <button class="key keyEmpty" id="key4_6"></button>
      <button class="key keyEmpty" id="key4_7"></button>
      <button class="key keyEmpty" id="key4_8"></button>
      <button class="key keyEmpty" id="key4_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key4_10"></button>
      <button class="key keyEmpty" id="key4_11"></button>
      <button class="key keyEmpty" id="key4_12"></button>
      <button class="key keyEmpty" id="key4_13"></button>
      <button class="key keyEmpty" id="key4_14"></button>
      <button class="key keyEmpty" id="key4_15"></button>
      <button class="key keyEmpty" id="key4_16"></button>
      <button class="key keyEmpty" id="key4_17"></button>
      <button class="key keyEmpty" id="key4_18"></button>
      <button class="key keyEmpty" id="key4_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key5_0"></button>
      <button class="key keyEmpty" id="key5_1"></button>
      <button class="key keyEmpty" id="key5_2"></button>
      <button class="key keyEmpty" id="key5_3"></button>
      <button class="key keyEmpty" id="key5_4"></button>
      <button class="key keyEmpty" id="key5_5"></button>
      <button class="key keyEmpty" id="key5_6"></button>
      <button class="key keyEmpty" id="key5_7"></button>
      <button class="key keyEmpty" id="key5_8"></button>
      <button class="key keyEmpty" id="key5_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key5_10"></button>
      <button class="key keyEmpty" id="key5_11"></button>
      <button class="key keyEmpty" id="key5_12"></button>
      <button class="key keyEmpty" id="key5_13"></button>
      <button class="key keyEmpty" id="key5_14"></button>
      <button class="key keyEmpty" id="key5_15"></button>
      <button class="key keyEmpty" id="key5_16"></button>
      <button class="key keyEmpty" id="key5_17"></button>
      <button class="key keyEmpty" id="key5_18"></button>
      <button class="key keyEmpty" id="key5_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key6_0"></button>
      <button class="key keyEmpty" id="key6_1"></button>
      <button class="key keyEmpty" id="key6_2"></button>
      <button class="key keyEmpty" id="key6_3"></button>
      <button class="key keyEmpty" id="key6_4"></button>
      <button class="key keyEmpty" id="key6_5"></button>
      <button class="key keyEmpty" id="key6_6"></button>
      <button class="key keyEmpty" id="key6_7"></button>
      <button class="key keyEmpty" id="key6_8"></button>
      <button class="key keyEmpty" id="key6_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key6_10"></button>
      <button class="key keyEmpty" id="key6_11"></button>
      <button class="key keyEmpty" id="key6_12"></button>
      <button class="key keyEmpty" id="key6_13"></button>
      <button class="key keyEmpty" id="key6_14"></button>
      <button class="key keyEmpty" id="key6_15"></button>
      <button class="key keyEmpty" id="key6_16"></button>
      <button class="key keyEmpty" id="key6_17"></button>
      <button class="key keyEmpty" id="key6_18"></button>
      <button class="key keyEmpty" id="key6_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key7_0"></button>
      <button class="key keyEmpty" id="key7_1"></button>
      <button class="key keyEmpty" id="key7_2"></button>
      <button class="key keyEmpty" id="key7_3"></button>
      <button class="key keyEmpty" id="key7_4"></button>
      <button class="key keyEmpty" id="key7_5"></button>
      <button class="key keyEmpty" id="key7_6"></button>
      <button class="key keyEmpty" id="key7_7"></button>
      <button class="key keyEmpty" id="key7_8"></button>
      <button class="key keyEmpty" id="key7_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key7_10"></button>
      <button class="key keyEmpty" id="key7_11"></button>
      <button class="key keyEmpty" id="key7_12"></button>
      <button class="key keyEmpty" id="key7_13"></button>
      <button class="key keyEmpty" id="key7_14"></button>
      <button class="key keyEmpty" id="key7_15"></button>
      <button class="key keyEmpty" id="key7_16"></button>
      <button class="key keyEmpty" id="key7_17"></button>
      <button class="key keyEmpty" id="key7_18"></button>
      <button class="key keyEmpty" id="key7_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key8_0"></button>
      <button class="key keyEmpty" id="key8_1"></button>
      <button class="key keyEmpty" id="key8_2"></button>
      <button class="key keyEmpty" id="key8_3"></button>
      <button class="key keyEmpty" id="key8_4"></button>
      <button class="key keyEmpty" id="key8_5"></button>
      <button class="key keyEmpty" id="key8_6"></button>
      <button class="key keyEmpty" id="key8_7"></button>
      <button class="key keyEmpty" id="key8_8"></button>
      <button class="key keyEmpty" id="key8_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key8_10"></button>
      <button class="key keyEmpty" id="key8_11"></button>
      <button class="key keyEmpty" id="key8_12"></button>
      <button class="key keyEmpty" id="key8_13"></button>
      <button class="key keyEmpty" id="key8_14"></button>
      <button class="key keyEmpty" id="key8_15"></button>
      <button class="key keyEmpty" id="key8_16"></button>
      <button class="key keyEmpty" id="key8_17"></button>
      <button class="key keyEmpty" id="key8_18"></button>
      <button class="key keyEmpty" id="key8_19"></button>
      </td>
    </tr>
    <tr>
      <td style="border-right: solid 2px #000;">
      <button class="key keyEmpty" id="key9_0"></button>
      <button class="key keyEmpty" id="key9_1"></button>
      <button class="key keyEmpty" id="key9_2"></button>
      <button class="key keyEmpty" id="key9_3"></button>
      <button class="key keyEmpty" id="key9_4"></button>
      <button class="key keyEmpty" id="key9_5"></button>
      <button class="key keyEmpty" id="key9_6"></button>
      <button class="key keyEmpty" id="key9_7"></button>
      <button class="key keyEmpty" id="key9_8"></button>
      <button class="key keyEmpty" id="key9_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key9_10"></button>
      <button class="key keyEmpty" id="key9_11"></button>
      <button class="key keyEmpty" id="key9_12"></button>
      <button class="key keyEmpty" id="key9_13"></button>
      <button class="key keyEmpty" id="key9_14"></button>
      <button class="key keyEmpty" id="key9_15"></button>
      <button class="key keyEmpty" id="key9_16"></button>
      <button class="key keyEmpty" id="key9_17"></button>
      <button class="key keyEmpty" id="key9_18"></button>
      <button class="key keyEmpty" id="key9_19"></button>
      </td>
    </tr>
	<tr style="background: #000;">
	 <td colspan="1"></td>
	</tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key10_0"></button>
      <button class="key keyEmpty" id="key10_1"></button>
      <button class="key keyEmpty" id="key10_2"></button>
      <button class="key keyEmpty" id="key10_3"></button>
      <button class="key keyEmpty" id="key10_4"></button>
      <button class="key keyEmpty" id="key10_5"></button>
      <button class="key keyEmpty" id="key10_6"></button>
      <button class="key keyEmpty" id="key10_7"></button>
      <button class="key keyEmpty" id="key10_8"></button>
      <button class="key keyEmpty" id="key10_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key10_10"></button>
      <button class="key keyEmpty" id="key10_11"></button>
      <button class="key keyEmpty" id="key10_12"></button>
      <button class="key keyEmpty" id="key10_13"></button>
      <button class="key keyEmpty" id="key10_14"></button>
      <button class="key keyEmpty" id="key10_15"></button>
      <button class="key keyEmpty" id="key10_16"></button>
      <button class="key keyEmpty" id="key10_17"></button>
      <button class="key keyEmpty" id="key10_18"></button>
      <button class="key keyEmpty" id="key10_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key11_0"></button>
      <button class="key keyEmpty" id="key11_1"></button>
      <button class="key keyEmpty" id="key11_2"></button>
      <button class="key keyEmpty" id="key11_3"></button>
      <button class="key keyEmpty" id="key11_4"></button>
      <button class="key keyEmpty" id="key11_5"></button>
      <button class="key keyEmpty" id="key11_6"></button>
      <button class="key keyEmpty" id="key11_7"></button>
      <button class="key keyEmpty" id="key11_8"></button>
      <button class="key keyEmpty" id="key11_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key11_10"></button>
      <button class="key keyEmpty" id="key11_11"></button>
      <button class="key keyEmpty" id="key11_12"></button>
      <button class="key keyEmpty" id="key11_13"></button>
      <button class="key keyEmpty" id="key11_14"></button>
      <button class="key keyEmpty" id="key11_15"></button>
      <button class="key keyEmpty" id="key11_16"></button>
      <button class="key keyEmpty" id="key11_17"></button>
      <button class="key keyEmpty" id="key11_18"></button>
      <button class="key keyEmpty" id="key11_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key12_0"></button>
      <button class="key keyEmpty" id="key12_1"></button>
      <button class="key keyEmpty" id="key12_2"></button>
      <button class="key keyEmpty" id="key12_3"></button>
      <button class="key keyEmpty" id="key12_4"></button>
      <button class="key keyEmpty" id="key12_5"></button>
      <button class="key keyEmpty" id="key12_6"></button>
      <button class="key keyEmpty" id="key12_7"></button>
      <button class="key keyEmpty" id="key12_8"></button>
      <button class="key keyEmpty" id="key12_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key12_10"></button>
      <button class="key keyEmpty" id="key12_11"></button>
      <button class="key keyEmpty" id="key12_12"></button>
      <button class="key keyEmpty" id="key12_13"></button>
      <button class="key keyEmpty" id="key12_14"></button>
      <button class="key keyEmpty" id="key12_15"></button>
      <button class="key keyEmpty" id="key12_16"></button>
      <button class="key keyEmpty" id="key12_17"></button>
      <button class="key keyEmpty" id="key12_18"></button>
      <button class="key keyEmpty" id="key12_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key13_0"></button>
      <button class="key keyEmpty" id="key13_1"></button>
      <button class="key keyEmpty" id="key13_2"></button>
      <button class="key keyEmpty" id="key13_3"></button>
      <button class="key keyEmpty" id="key13_4"></button>
      <button class="key keyEmpty" id="key13_5"></button>
      <button class="key keyEmpty" id="key13_6"></button>
      <button class="key keyEmpty" id="key13_7"></button>
      <button class="key keyEmpty" id="key13_8"></button>
      <button class="key keyEmpty" id="key13_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key13_10"></button>
      <button class="key keyEmpty" id="key13_11"></button>
      <button class="key keyEmpty" id="key13_12"></button>
      <button class="key keyEmpty" id="key13_13"></button>
      <button class="key keyEmpty" id="key13_14"></button>
      <button class="key keyEmpty" id="key13_15"></button>
      <button class="key keyEmpty" id="key13_16"></button>
      <button class="key keyEmpty" id="key13_17"></button>
      <button class="key keyEmpty" id="key13_18"></button>
      <button class="key keyEmpty" id="key13_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key14_0"></button>
      <button class="key keyEmpty" id="key14_1"></button>
      <button class="key keyEmpty" id="key14_2"></button>
      <button class="key keyEmpty" id="key14_3"></button>
      <button class="key keyEmpty" id="key14_4"></button>
      <button class="key keyEmpty" id="key14_5"></button>
      <button class="key keyEmpty" id="key14_6"></button>
      <button class="key keyEmpty" id="key14_7"></button>
      <button class="key keyEmpty" id="key14_8"></button>
      <button class="key keyEmpty" id="key14_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key14_10"></button>
      <button class="key keyEmpty" id="key14_11"></button>
      <button class="key keyEmpty" id="key14_12"></button>
      <button class="key keyEmpty" id="key14_13"></button>
      <button class="key keyEmpty" id="key14_14"></button>
      <button class="key keyEmpty" id="key14_15"></button>
      <button class="key keyEmpty" id="key14_16"></button>
      <button class="key keyEmpty" id="key14_17"></button>
      <button class="key keyEmpty" id="key14_18"></button>
      <button class="key keyEmpty" id="key14_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key15_0"></button>
      <button class="key keyEmpty" id="key15_1"></button>
      <button class="key keyEmpty" id="key15_2"></button>
      <button class="key keyEmpty" id="key15_3"></button>
      <button class="key keyEmpty" id="key15_4"></button>
      <button class="key keyEmpty" id="key15_5"></button>
      <button class="key keyEmpty" id="key15_6"></button>
      <button class="key keyEmpty" id="key15_7"></button>
      <button class="key keyEmpty" id="key15_8"></button>
      <button class="key keyEmpty" id="key15_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key15_10"></button>
      <button class="key keyEmpty" id="key15_11"></button>
      <button class="key keyEmpty" id="key15_12"></button>
      <button class="key keyEmpty" id="key15_13"></button>
      <button class="key keyEmpty" id="key15_14"></button>
      <button class="key keyEmpty" id="key15_15"></button>
      <button class="key keyEmpty" id="key15_16"></button>
      <button class="key keyEmpty" id="key15_17"></button>
      <button class="key keyEmpty" id="key15_18"></button>
      <button class="key keyEmpty" id="key15_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key16_0"></button>
      <button class="key keyEmpty" id="key16_1"></button>
      <button class="key keyEmpty" id="key16_2"></button>
      <button class="key keyEmpty" id="key16_3"></button>
      <button class="key keyEmpty" id="key16_4"></button>
      <button class="key keyEmpty" id="key16_5"></button>
      <button class="key keyEmpty" id="key16_6"></button>
      <button class="key keyEmpty" id="key16_7"></button>
      <button class="key keyEmpty" id="key16_8"></button>
      <button class="key keyEmpty" id="key16_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key16_10"></button>
      <button class="key keyEmpty" id="key16_11"></button>
      <button class="key keyEmpty" id="key16_12"></button>
      <button class="key keyEmpty" id="key16_13"></button>
      <button class="key keyEmpty" id="key16_14"></button>
      <button class="key keyEmpty" id="key16_15"></button>
      <button class="key keyEmpty" id="key16_16"></button>
      <button class="key keyEmpty" id="key16_17"></button>
      <button class="key keyEmpty" id="key16_18"></button>
      <button class="key keyEmpty" id="key16_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key17_0"></button>
      <button class="key keyEmpty" id="key17_1"></button>
      <button class="key keyEmpty" id="key17_2"></button>
      <button class="key keyEmpty" id="key17_3"></button>
      <button class="key keyEmpty" id="key17_4"></button>
      <button class="key keyEmpty" id="key17_5"></button>
      <button class="key keyEmpty" id="key17_6"></button>
      <button class="key keyEmpty" id="key17_7"></button>
      <button class="key keyEmpty" id="key17_8"></button>
      <button class="key keyEmpty" id="key17_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key17_10"></button>
      <button class="key keyEmpty" id="key17_11"></button>
      <button class="key keyEmpty" id="key17_12"></button>
      <button class="key keyEmpty" id="key17_13"></button>
      <button class="key keyEmpty" id="key17_14"></button>
      <button class="key keyEmpty" id="key17_15"></button>
      <button class="key keyEmpty" id="key17_16"></button>
      <button class="key keyEmpty" id="key17_17"></button>
      <button class="key keyEmpty" id="key17_18"></button>
      <button class="key keyEmpty" id="key17_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key18_0"></button>
      <button class="key keyEmpty" id="key18_1"></button>
      <button class="key keyEmpty" id="key18_2"></button>
      <button class="key keyEmpty" id="key18_3"></button>
      <button class="key keyEmpty" id="key18_4"></button>
      <button class="key keyEmpty" id="key18_5"></button>
      <button class="key keyEmpty" id="key18_6"></button>
      <button class="key keyEmpty" id="key18_7"></button>
      <button class="key keyEmpty" id="key18_8"></button>
      <button class="key keyEmpty" id="key18_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key18_10"></button>
      <button class="key keyEmpty" id="key18_11"></button>
      <button class="key keyEmpty" id="key18_12"></button>
      <button class="key keyEmpty" id="key18_13"></button>
      <button class="key keyEmpty" id="key18_14"></button>
      <button class="key keyEmpty" id="key18_15"></button>
      <button class="key keyEmpty" id="key18_16"></button>
      <button class="key keyEmpty" id="key18_17"></button>
      <button class="key keyEmpty" id="key18_18"></button>
      <button class="key keyEmpty" id="key18_19"></button>
      </td>
    </tr>
    <tr>
      <td>
      <button class="key keyEmpty" id="key19_0"></button>
      <button class="key keyEmpty" id="key19_1"></button>
      <button class="key keyEmpty" id="key19_2"></button>
      <button class="key keyEmpty" id="key19_3"></button>
      <button class="key keyEmpty" id="key19_4"></button>
      <button class="key keyEmpty" id="key19_5"></button>
      <button class="key keyEmpty" id="key19_6"></button>
      <button class="key keyEmpty" id="key19_7"></button>
      <button class="key keyEmpty" id="key19_8"></button>
      <button class="key keyEmpty" id="key19_9"></button>
	  </td>
	  <td>
      <button class="key keyEmpty" id="key19_10"></button>
      <button class="key keyEmpty" id="key19_11"></button>
      <button class="key keyEmpty" id="key19_12"></button>
      <button class="key keyEmpty" id="key19_13"></button>
      <button class="key keyEmpty" id="key19_14"></button>
      <button class="key keyEmpty" id="key19_15"></button>
      <button class="key keyEmpty" id="key19_16"></button>
      <button class="key keyEmpty" id="key19_17"></button>
      <button class="key keyEmpty" id="key19_18"></button>
      <button class="key keyEmpty" id="key19_19"></button>
      </td>
    </tr>
</table>
<div>
<p>
Input path (only characters 'A'-'H' are allowed): <textarea id="pathInput"></textarea>
</p>
<button onclick="runInput()">
Test path
</button>
  <br/>
  <p>
    I've been quite busy lately, so I'll stop solving the PonderThis puzzles for a while. Don't know when I'll resume, anyway, good luck to the other challengers! Cheers!
  </p>
</div>
</body>
<script type="text/javascript">
/*Written by Yi Jiang, Aug 2021. All rights reserved.*/
var sidelength=20;//10;
var initx=0,inity=0;//initx=4,inity=4;
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
	init();
}
function init2(){
	sidelength=10;
	initx=4,inity=4;
	init();
}
function init(){
	path="";
	document.getElementById("key"+x+"_"+y).classList.remove("keyPlayer");
	x=initx,y=inity;
	colorBefore="";
	whiteCount=sidelength*sidelength-1;
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
		document.getElementById("whiteCount").innerText="Remaining white cells count: "+whiteCount;
		/*if(whiteCount==0)*/ document.getElementById("solution").innerText="Current path: "+path;
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
		init();
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
</script>
</html>
