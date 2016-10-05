## JavaScript Graham's Scan Convex Hull Algorithm

For usage on my blog <a href="http://www.lequant40.com/2016/01/etat-des-principaux-indices-boursiers_14.html" target="_blank">
Le Quant 40</a> together with the <a href="http://www.highcharts.com/" target="_blank">Highcharts</a> graphical library, 
I required a Javascript implementation of a fast algorithm to calculate a convex hull from a set of points in x,y coordinates (Graham's Scan then).

I found what I needed on <a href="https://github.com/brian3kb/graham_scan_js" target="_blank">brian3kb</a>'s Github, although this
implementation lacked the capability of managing points with labels, which I added.


### Download

The minified source code, for immediate usage in a browser, is available <a href="http://raw.github.com/lequant40/graham_scan_js/master/graham_scan.min.js">here</a>.


### Building and testing

The following commands produce the minified file `graham_scan.min.js` and launch the unit tests with QUnit:

	npm install
	grunt deliver

The QUnit unit tests are located in the file `tests/index.html`.


### Usage

Straightforward:

    // Create a new instance.
    var aConvexHull = new ConvexHullGrahamScan();

    // Points addition, one by one, with an optional label
    aConvexHull.addPoint(1.5, 3.1);
    aConvexHull.addPoint(1.6, 3.2, 'my label');

    // Computation of the convex hull
    // The returned array is in JSON format: [{x: x coordinate, y: y coordinate, name: point label }, ...]
    var hullPoints = convexHull.getHull();

    
### References

* https://en.wikipedia.org/wiki/Convex_hull
* https://en.wikipedia.org/wiki/Graham_scan


### License

<a href="https://en.wikipedia.org/wiki/MIT_License" target=_blank">MIT License</a>
