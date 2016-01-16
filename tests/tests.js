// ------------------------------------------------------------
QUnit.module('Point methods');

QUnit.test('Add a single new point', function(assert) {
    var testGSHull = new ConvexHullGrahamScan();

    testGSHull.addPoint(11, 50);
    assert.deepEqual(testGSHull.anchorPoint, new testGSHull.Point(11, 50), 
	                 'Tests a point has been added to the points array correctly.');

	testGSHull.addPoint(10, 50);
    assert.deepEqual(testGSHull.anchorPoint, new testGSHull.Point(10, 50), 
	                 'Tests that same y value then checks x value for comparison.');
});

QUnit.test('Add a single new named point', function(assert) {
    var testGSHull = new ConvexHullGrahamScan();

    testGSHull.addPoint(11, 50, 'name');
    assert.deepEqual(testGSHull.anchorPoint, new testGSHull.Point(11, 50, 'name'), 
	                 'Tests a named point has been added to the points array correctly.');
    assert.strictEqual(testGSHull.anchorPoint.name, "name", 
	                 'Tests a named point has been added to the points array correctly - name value.');
});

QUnit.test('Sort points', function(assert){
    var samplePoints = [
        {'y' : '48.8', 'x' : '11.3', 'name': 'name 2'},
        {'y' : '48.8167', 'x' : '11.3667'},
        {'y' : '48.1', 'x' : '11.1'},
        {'y' : '48.9', 'x' : '11.7', 'name': 'name 1'},
        {'y' : '48.7833', 'x' : '11.2333'}];

    var sortedPoints = [
        {'y' : '48.1', 'x' : '11.1'},
        {'y' : '48.7833', 'x' : '11.2333'},
        {'y' : '48.8', 'x' : '11.3', 'name': 'name 2'},
        {'y' : '48.8167', 'x' : '11.3667'},
        {'y' : '48.9', 'x' : '11.7', 'name': 'name 1'}];

    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.points = samplePoints;
    testGSHull.anchorPoint = {'x' : 11.1, 'y' : 49.8};

    testGSHull._sortPoints();
    assert.deepEqual(testGSHull.points, sortedPoints, 'Tests a collection of points is correctly sorted.');

    testGSHull.points = [{'x':0,'y':0},{'x':0,'y':0}];
    testGSHull._sortPoints();
    assert.ok(testGSHull.points, 'Test handling points with zero values.');
});

QUnit.test('Find polar angle outputs a correct calculation', function(assert){
    var testGSHull = new ConvexHullGrahamScan();

    assert.deepEqual(testGSHull._findPolarAngle({'x': 11.1, 'y': 48.1}, {'x': 11.3 ,'y': 48.8}), 434.0546040990765, 
	                 'Tests the polar angle calculation method is correct.');
});

QUnit.test('Polar angle point comparison check.', function(assert){
    var testGSHull = new ConvexHullGrahamScan();

    assert.ok(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
                                       {'y' : '48.7833', 'x' : '11.2333'},
                                       {'y' : '48.8', 'x' : '11.3'}),
              'Check if last point added results in a concave.');

    assert.equal(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
					         			  {'y' : '48.7833', 'x' : '12.2333'},
										  {'y' : '48.8', 'x' : '11.3'}),
                 false,
                 'Check if last point added results in a concave.');

    assert.equal(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
										  {'y' : '48.1', 'x' : '-11.1'},
                                          {'y' : '-48.1', 'x' : '11.1'}),
				 false,
				 'Check if last point added results in a concave.');
});


// ------------------------------------------------------------
QUnit.module('Hull scan');

QUnit.test('Test handling less than 4 points.', function(assert){
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y' : '48.1', 'x' : '11.1'};
    testGSHull.points = [{'y' : '48.1', 'x' : '11.1', 'name': 'name 1'},
                        {'y' : '48.7833', 'x' : '11.2333'},
                        {'y' : '48.8', 'x' : '11.3'}];

    assert.deepEqual(testGSHull.getHull(), testGSHull.points, 'Check same array is returned.');
});

QUnit.test('Test hull calculation.', function(assert){
    var expectedHull = [
        {'y':48.7833,'x':11.2333, 'name': 'name 1'},
        {'y':48.8,'x':11.3},
        {'y':48.8167,'x':11.3667},
        {'y':48.8333,'x':11.4167},
        {'y':48.872829,'x':11.373385},
        {'y':49,'x':11.2167},
        {'y':48.893175,'x':10.990565},
        {'y':48.86946,'x':11.00602},
        {'y':48.8,'x':11.1}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':48.7833,'x':11.2333};
    testGSHull.points = [
        {'y':48.7833,'x':11.2333, 'name': 'name 1'},
        {'y':48.8,'x':11.3},
        {'y':48.8167,'x':11.3667},
        {'y':48.8333,'x':11.4167},
        {'y':48.8167,'x':11.3167},
        {'y':48.872829,'x':11.373385},
        {'y':48.85,'x':11.3167},
        {'y':48.9167,'x':11.3},
        {'y':48.8,'x':11.2333},
        {'y':49,'x':11.2167},
        {'y':48.95,'x':11.2},
        {'y':48.8333,'x':11.2167},
        {'y':48.88636,'x':11.198945},
        {'y':48.890609,'x':11.184313},
        {'y':48.9,'x':11.1},
        {'y':48.8667,'x':11.0667},
        {'y':48.893175,'x':10.990565},
        {'y':48.8833,'x':11},
        {'y':48.86946,'x':11.00602},
        {'y':48.8,'x':11.1}
    ];

    assert.deepEqual(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});

QUnit.test('Test handling 4 points rectangular.', function(assert){
    var expectedHull = [
        {'y':50.157913235507706,'x':29.900512524414125},
        {'y':50.157913235507706,'x':31.146087475586},
        {'y':50.74029471119741,'x':31.146087475586},
        {'y':50.74029471119741,'x':29.900512524414125}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':50.157913235507706,'x':29.900512524414125};
    testGSHull.points = [
        {'y' : 50.157913235507706, 'x' : 29.900512524414125},
        {'y' : 50.15791323550770611, 'x' : 31.146087475586},
        {'y' : 50.74029471119741, 'x' : 31.146087475586},
        {'y' : 50.74029471119741, 'x' : 29.900512524414125}
    ];

    assert.deepEqual(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});

QUnit.test('Test that collinear points sharing the same polar angle are removed from resultant hull.', function(assert){
    var expectedHull = [
        {'y':-5,'x':-5, 'name' : 'name 1'},
        {'y':-5,'x':5},
        {'y':5,'x':5},
        {'y':5,'x':-5}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':-5,'x':-5};
    testGSHull.points = [
        {'y' : 2, 'x' : 2},
        {'y' : -2, 'x' : 2},
        {'y' : -2, 'x' : -2},
        {'y' : 2, 'x' : -2},
        {'y' : 3, 'x' : 3},
        {'y' : -3, 'x' : 3},
        {'y' : -3, 'x' : -3},
        {'y' : 3, 'x' : -3},
        {'y' : 4, 'x' : 4},
        {'y' : -4, 'x' : 4},
        {'y' : -4, 'x' : -4},
        {'y' : 4, 'x' : -4},
        {'y' : 5, 'x' : 5},
        {'y' : -5, 'x' : 5},
        {'y' : -5, 'x' : -5, 'name' : 'name 1'},
        {'y' : 5, 'x' : -5}
    ];

    assert.deepEqual(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});
