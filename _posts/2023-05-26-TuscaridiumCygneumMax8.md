---
title: Tuscaridium cygneum and the maximum 8 vertex polyhedron -A curious shape
date: 2023-05-26
---
<script src="https://yjian012.github.io/Yi-blog/scripts.js"></script>
<link rel="stylesheet" href="https://yjian012.github.io/Yi-blog/styles.css">

![Tuscaridium cygneum](/Yi-blog/img/2023-05-26-Tuscaridium cygneum 2.PNG)

I saw this thing on a [youtube video](https://www.youtube.com/watch?v=GETuoG_bN2w ), and I thought I recognized the shape. Here is my original comment:
<pre>
<blockquote>
Wait... This shape... I think I've seen this shape, the interesting symmetry.
The voice in the video says that it has "7 arms", but that's not true, there're actually 8 arms. And it looks surprisingly symmetric.
If we take each "arm" as a vertex, It has 8 vertices and all of its faces are triangles. 
At first I thought of a regular octahedron whose faces are all equilateral triangles, but it has 6 vertices. It's definitely not a cube either.
I'm pretty sure I've seen this shape before in my random research on polyhedrons, so I googled "eight vertices polyhedron on a sphere maximum". And there it is:
https://mathoverflow.net/questions/73899/optimal-8-vertex-isoperimetric-polyhedron
https://math.stackexchange.com/questions/979660/largest-n-vertex-polyhedron-that-fits-into-a-unit-sphere
I believe this is the same shape.
I wonder how this naturally happens. Maybe this shape is also the solution to "if I put 8 equal charges on a sphere and they can move freely on the sphere, what shape do they make in equilibrium?". Maybe that's exactly how it's formed: 8 "bud"s were released to the surface, and they repelled each other... eventually they ended up in this shape.
We should give this polyhedron a name. How about "Tuscaridron"? (What does "Tuscaridium" mean anyway?)
This is such an astonishing finding, I'm deeply intrigued by the beauty of the nature...
</blockquote>
</pre>
And it got deleted immediately. Probably because it was long and had links. But still, youtube's spam detection is crap. It happened quite a few times before, too, so I had the habbit to copy my comment somewhere else before posting them. After all, if you want to talk about something serious, youtube comment is not the best place to post it anyway.

I tried to see if the shapes actually match. The data was from [Spherical Codes](http://neilsloane.com/maxvolumes/), graphed on [GeoGebra](https://www.geogebra.org/3d).
![Tuscaridium cygneum match vertex](/Yi-blog/img/2023-05-26-Tuscaridium cygneum 3.png)

Light color means the vertex is in the front, dark color means it's in the back.
I also found more images on the internet (Credit to Steven Haddock and MBARI), and I tried to match those, too:
![Tuscaridium cygneum match vertex](/Yi-blog/img/2023-05-26-Tuscaridium cygneum 2.jpg)
They seem to line up in some degree, but not perfectly.

I also noticed that there could be more than 8 capsules, as the following picture shows:
![Tuscaridium cygneum more capsules](/Yi-blog/img/2023-05-26-p3.jpg)
I'm not sure what that shape is. From what I've read, it seems that the number of capsules is often a multiple of 8, so there're probably 16 in this one. Also, I don't think the shape of the bottom one matches the 8-vertex maximum volume polyhedron, even though there're exactly 8 capsules. I wonder what the shape is - the 4 on the bottom seem to form a square.

On the other hand, I also thought about the other problem: If I put $n$ point charges on a sphere and they can move freely on the sphere, what shape do they make in equilibrium? While I was writing a program to find out, I took a look at the links again and noticed that in another [question](https://mathoverflow.net/questions/429497/known-configurations-maximizing-the-volume-of-the-convex-hull-of-n-points-on-the) they mentioned the [Thomson problem](https://en.wikipedia.org/wiki/Thomson_problem), which is exactly what I thought about. Apparently the solution for 8 vertices is a square antiprism - which doesn't seem to match any of the shapes above (except that there seem to be a squre at the bottom in the last picture above). A closely related problem, [Tammes problem](https://en.wikipedia.org/wiki/Tammes_problem), has exactly the same solution to 8 vertices. The proof can be found [here](https://pdodds.w3.uvm.edu/teaching/courses/2009-08UVM-300/docs/others/1994/mooers1994a.pdf).

I wonder if the shape is indeed the one that maximizes the volume, and since the shape is not a square antiprism, I wonder what mechanism drives it to become this shape.