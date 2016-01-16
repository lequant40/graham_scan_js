/**
 * Graham's Scan Convex Hull Algorithm
 * @desc An implementation of the Graham's Scan Convex Hull algorithm in JavaScript.
 * @author Brian Barnett, brian@3kb.co.uk, http://brianbar.net/ || http://3kb.co.uk/
 * @author Roman Rubsamen, roman.rubsamen@gmail.com
 * @version 1.0.4
 */
function ConvexHullGrahamScan() {
    this.anchorPoint = undefined;
    this.reverse = false;
    this.points = [];
}

ConvexHullGrahamScan.prototype = {

    constructor: ConvexHullGrahamScan,

    Point: function (x, y, name) {
        this.x = x;
        this.y = y;
		this.name = name;
    },

    _findPolarAngle: function (a, b) {
        var ONE_RADIAN = 57.295779513082;
        var deltaX = (b.x - a.x);
        var deltaY = (b.y - a.y);

        if (deltaX == 0 && deltaY == 0) {
            return 0;
        }

        var angle = Math.atan2(deltaY, deltaX) * ONE_RADIAN;

        if (this.reverse){
            if (angle <= 0) {
                angle += 360;
            }
        }else{
            if (angle >= 0) {
                angle += 360;
            }
        }

        return angle;
    },

    addPoint: function (x, y, name) {
        //Check to see if anchorPoint has been defined yet.
        if (this.anchorPoint === undefined) {
            //Create new anchorPoint.
            this.anchorPoint = new this.Point(x, y, name);
            return;
            // Sets anchorPoint if point being added is further left.
        } else if (
            (this.anchorPoint.y > y && this.anchorPoint.x > x) ||
            (this.anchorPoint.y === y && this.anchorPoint.x > x) ||
            (this.anchorPoint.y > y && this.anchorPoint.x === x)
        ) {
            this.points.push(new this.Point(this.anchorPoint.x, this.anchorPoint.y, this.anchorPoint.name));
            this.anchorPoint = new this.Point(x, y, name);
            return;
        }

        this.points.push(new this.Point(x, y, name));
    },

    _sortPoints: function () {
        var self = this;

        return this.points.sort(function (a, b) {
            var polarA = self._findPolarAngle(self.anchorPoint, a);
            var polarB = self._findPolarAngle(self.anchorPoint, b);

            if (polarA < polarB) {
                return -1;
            }
            if (polarA > polarB) {
                return 1;
            }

            return 0;
        });
    },

    _checkPoints: function (p0, p1, p2) {
        var difAngle;
        var cwAngle = this._findPolarAngle(p0, p1);
        var ccwAngle = this._findPolarAngle(p0, p2);

        if (cwAngle > ccwAngle) {

            difAngle = cwAngle - ccwAngle;

            return !(difAngle > 180);

        } else if (cwAngle < ccwAngle) {

            difAngle = ccwAngle - cwAngle;

            return (difAngle > 180);

        }

        return true;
    },

    getHull: function () {
        var hullPoints = [],
            points,
            pointsLength;

        this.reverse = this.points.every(function(point){
            return (point.x < 0 && point.y < 0);
        });

        points = this._sortPoints();
        pointsLength = points.length;

        //If there are less than 4 points, joining these points creates a correct hull.
        if (pointsLength < 4) {
            points.unshift(this.anchorPoint);
            return points;
        }

        //move first two points to output array
        hullPoints.push(points.shift(), points.shift());

        //scan is repeated until no concave points are present.
        while (true) {
            var p0,
                p1,
                p2;

            hullPoints.push(points.shift());

            p0 = hullPoints[hullPoints.length - 3];
            p1 = hullPoints[hullPoints.length - 2];
            p2 = hullPoints[hullPoints.length - 1];

            if (this._checkPoints(p0, p1, p2)) {
                hullPoints.splice(hullPoints.length - 2, 1);
            }

            if (points.length == 0) {
                if (pointsLength == hullPoints.length) {
                    //check for duplicate anchorPoint edge-case, if not found, add the anchorpoint as the first item.
                    var ap = this.anchorPoint;
                    if (!hullPoints.some(function(p){
                            return(p.x == ap.x && p.y == ap.y);
                        })) {
                        hullPoints.unshift(this.anchorPoint);
                    }
                    return hullPoints;
                }
                points = hullPoints;
                pointsLength = points.length;
                hullPoints = [];
                hullPoints.push(points.shift(), points.shift());
            }
        }
    }
};

// EXPORTS

if (typeof define === 'function' && define.amd) {
    define(function() {
        return ConvexHullGrahamScan;
    });
}
if (typeof module !== 'undefined') {
    module.exports = ConvexHullGrahamScan;
}
