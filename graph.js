
$(function() {

	var canvaswidth = 550, canvasheight = 550;

	var xmin, xmax, ymin, ymax;

	resetxyrange();

	drawXYAxes();
	drawInitGrids();

	plotxsquare();

	function resetxyrange() {
		xmin = parseInt($("#xfrom").val());
		xmax = parseInt($("#xto").val());

		ymin = parseInt($("#yfrom").val());
		ymax = parseInt($("#yto").val());

		console.log("reset range: x from " + xmin + " to " + xmax + " and y from " + ymin + " to " + ymax);
	}

	function clearcanvas()
	{
		var context = document.getElementById("mycanvas").getContext("2d");
		context.clearRect(0, 0, canvaswidth, canvasheight);
	}


	function plotxsquare() {

		for (x = xmin; x<=xmax; x+=0.1)
		{
			y = x * x;

			var p = fromCartesian(x, y);

			// TODO font size
			draws(p.x, p.y, 5);
		}

	}

	// redraw and reset
	$("#reset").click(function() {

		clearcanvas();

		resetxyrange();

		drawXYAxes();
		drawInitGrids();

		plotxsquare();


	});


	$("#addfunction").click(function() {
		console.log("clicked");

		drawLine(0, 0, 50, 50);
	});

	function drawXYAxes()
	{
		var p = fromCartesian(0, 0);

		drawLine(0, p.y, canvaswidth, p.y);
		drawLine(p.x, 0, p.x, canvasheight);
	}


	function drawInitGrids()
	{
		for (i = xmin+1; i < xmax; i++)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = ymin+1; i < ymax; i++)
		{
			if (i!=0)
				drawGrids(i, i);

		}
	}

	// (x, y) is in Cartesian
	function drawGrids(x, y)
	{
		var p = fromCartesian(x, y);

		drawLineDash(0, p.y, canvaswidth, p.y);
		drawLineDash(p.x, 0, p.x, canvasheight);
	}

	function fromCartesian(x, y) {
		var p = {x:0, y:0};

		var topx = x - xmin;
		var botx = xmax - xmin;
		p.x = topx * canvaswidth / botx;

		var topy = ymax - y;
		var boty = ymax - ymin;
		p.y = topy * canvasheight / boty;

		return p;
	}


	function drawLineDash(x1, y1, x2, y2)
	{
		var context = document.getElementById("mycanvas").getContext("2d");
		context.fillStyle = "red";

		// TODO dash settings
		context.setLineDash([5, 10]);
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function drawLine(x1, y1, x2, y2)
	{
		var context = document.getElementById("mycanvas").getContext("2d");

		// TODO color
		context.fillStyle = "red";

		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function draws(x, y, size) {
		var context = document.getElementById("mycanvas").getContext("2d");

		// TODO color
		context.fillStyle = "red";
		context.rect(x, y, size, size);
		context.fill();
	}

	function draw(x, y) {
		draws(x, y, size);
	}

});

/*
   var x = 10, y = 10, dir = 1, interval;

   var startButton = document.getElementById("start");
   startButton.onclick = function() {
   if (startButton.value == "Start") {
   startButton.value = "Stop";

   interval = setInterval(frame, 20);
   function frame() {
   if (x == 5000) {
   clearInterval(id);
   } else {
   draw(x, y);
   move();
   }
   }
   } else {
   startButton.value = "Start"
   clearInterval(interval);
   }
   }

   document.getElementById("turnL").onclick = function() {
   dir = (dir + 3) % 4;
   }

   document.getElementById("turnR").onclick = function() {
   dir = (dir + 1) % 4;
   }

   function move() {
   var s=600; // width

   switch (dir) {
   case 0: y--; break;
   case 1: x++; break;
   case 2: y++; break;
   case 3: x--; break;
   }

   if (x>s) x=0;
   if (x<0) x=s;
   if (y>s) y=0;
   if (y<0) y=s;
   }

 */
