
$(function() {

	var canvaswidth = 550, canvasheight = 550;

	var xmin, xmax, ymin, ymax;

	resetxyrange();

	drawXYAxes();
	drawInitGrids();

	plotfunction("x ^ 2", "red", 5);

	function resetxyrange() {
		xmin = parseInt($("#xfrom").val());
		xmax = parseInt($("#xto").val());

		ymin = parseInt($("#yfrom").val());
		ymax = parseInt($("#yto").val());

		console.log("reset range: x from " + xmin + " to " + xmax + " and y from " + ymin + " to " + ymax);
	}

	function replacex(str, x) {
		return str.replace(/x/g, x);
	}

	function clearcanvas()
	{
		var context = document.getElementById("mycanvas").getContext("2d");
		context.clearRect(0, 0, canvaswidth, canvasheight);
	}

	function evalfunction(expression, x)
	{

		var express = replacex(expression, "(" + x + ")");
		return math.eval(express);
	}

	// expression is of form like "x^2"
	function plotfunction(expression, color, size) {

		for (x = xmin; x<=xmax; x+=0.1)
		{

			y = evalfunction(expression, x);

			var p = fromCartesian(x, y);

			// TODO font size
			drawcs(p.x, p.y, color, size);
		}

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

		clearplots();


	});

	function clearplots() {
		clearcanvas();
		resetxyrange();
		drawXYAxes();

		drawInitGrids();

		$("#functions").html("");
	}

	$("#addfunction").click(function() {

		// clearplots();

		var functionexpression = $("#functionexpression").val();

		plotfunction(functionexpression, "red", 5);
	});

	function drawXYAxes()
	{
		var p = fromCartesian(0, 0);

		drawLine(0, p.y, canvaswidth, p.y);
		drawLine(p.x, 0, p.x, canvasheight);
	}

	function drawInitGrids()
	{
		for (i = 1; i < xmax; i++)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = -1; i > xmin; i--)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = 1; i < ymax; i++)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = -1; i > ymin; i--)
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

		context.setLineDash([1, 0]);
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function drawcs(x, y, color, size) {

		var context = document.getElementById("mycanvas").getContext("2d");

		// TODO color
		context.fillStyle = color;
		context.rect(x, y, size, size);
		context.fill();
	}

	function draws(x, y, size) {
		drawcs(x, y, "red", size);
	}

	function draw(x, y) {
		draws(x, y, 5);
	}

	$("#animate").click(function() {

		// clearplots();

		var x = xmin;
		var interval = setInterval(function() {

			y = evalfunction($("#functionexpression").val(), x);

			// TODO animate step
			var p = fromCartesian(x, y);
			draws(p.x, p.y, 5);

			x+=0.1;

			if (x > xmax)
			clearInterval(interval);

		}, 10);

		addFunctionToList($("#functionexpression").val());
	});

	function addFunctionToList(expression) {

		$("#functions").append("<p>" + expression + "</p>");
	}

});

