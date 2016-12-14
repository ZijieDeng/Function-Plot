
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

			console.log("size? " + $("#linesize").val());

			size = parseInt($("#linesize").val());
			if (isNaN(size)) size = 5;

			drawcs(p.x, p.y, color, size);
		}

	}

	function plotxsquare() {

		for (x = xmin; x<=xmax; x+=0.1)
		{
			y = x * x;

			var p = fromCartesian(x, y);


			size = parseInt($("#linesize").val());
			if (isNaN(size)) size = 5;

			draws(p.x, p.y, size);
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
		var size = parseInt($("#gridsize").val());
		if (isNaN(size)) size = 1;

		for (i = size; i < xmax; i+=size)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = -size; i > xmin; i-=size)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = size; i < ymax; i+=size)
		{
			if (i!=0)
				drawGrids(i, i);

		}
		for (i = -size; i > ymin; i-=size)
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

		var size = 5;

		context.setLineDash([size, size * 2]);
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function drawLine(x1, y1, x2, y2)
	{
		var context = document.getElementById("mycanvas").getContext("2d");

		var color = $("#color").val();

		context.fillStyle = color;

		context.setLineDash([1, 0]);
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function drawcs(x, y, color, size) {

		var context = document.getElementById("mycanvas").getContext("2d");

		var color = $("#color").val();

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

		var	speed = parseInt($("#animatespeed").val());
		if (isNaN(speed)) speed = 10;

		var x = xmin;
		var interval = setInterval(function() {

			y = evalfunction($("#functionexpression").val(), x);

			// TODO animate step
			var p = fromCartesian(x, y);

			var	size = parseInt($("#linesize").val());
			if (isNaN(size)) size = 5;

			draws(p.x, p.y, size);
			x+= 0.1;

			if (x > xmax)
			clearInterval(interval);

		}, 100 / speed);

		addFunctionToList($("#functionexpression").val());
	});

	function addFunctionToList(expression) {

		$("#functions").append("<p>" + expression + "</p>");
	}

});

