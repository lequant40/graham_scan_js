## Calcul de l'enveloppe convexe d'un ensemle de points par parcours de Graham en JavaScript

Pour une utilisation avec la librairie [Highcharts](http://www.highcharts.com/), j'avais besoin d'une implémentation en JavaScript d'un algorithme de calcul de l'enveloppe convexe d'un ensemble de points, si possible simple et rapide (parcours de Graham donc...).

J'ai trouvé mon bonheur sur le Github de [brian3kb](https://github.com/brian3kb/graham_scan_js), mais il manquait la possibilité de gérer des points avec des étiquettes, ce que j'ai rajouté ici.


### Compilation

This produces `graham_scan.min.js`:

	npm install
	grunt build


### Tests

Le code source est testé avec qUnit, les tests sont exécutés avec Google JS Test Driver.


### Utilisation

On fait difficilement plus simple :

    // Creation d'une instance
    var aConvexHull = new ConvexHullGrahamScan();

    // Ajout des points (avec une étiquette optionnelle), point par point
    aConvexHull.addPoint(x, y, "étiquette du point");

    // Calcul du tableau des points qui forment l'enveloppe convexe
    var hullPoints = convexHull.getHull();

    
### Références

* https://fr.wikipedia.org/wiki/Enveloppe_convexe
* https://fr.wikipedia.org/wiki/Parcours_de_Graham
* http://www.personal.kent.edu/~rmuhamma/Compgeometry/MyCG/ConvexHull/GrahamScan/grahamScan.htm


### License

MIT License
