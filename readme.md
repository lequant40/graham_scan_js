## Calcul de l'enveloppe convexe d'un ensemle de points par parcours de Graham en JavaScript

Pour une utilisation sur mon blog <a href="http://www.lequant40.com/2016/01/etat-des-principaux-indices-boursiers_14.html" target="_blank">Le Quant 40</a> avec la librairie <a href="http://www.highcharts.com/" target="_blank">Highcharts</a>, j'avais besoin d'une implémentation en JavaScript d'un algorithme de calcul de l'enveloppe convexe d'un ensemble de points, si possible simple et rapide (parcours de Graham donc...).

J'ai trouvé mon bonheur sur le Github de <a href="https://github.com/brian3kb/graham_scan_js" target="_blank">brian3kb(</a>, mais il manquait la possibilité de gérer des points avec des étiquettes, ce que j'ai rajouté ici.


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
