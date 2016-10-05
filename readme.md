| [English version](readme.en.md)


## Calcul de l'enveloppe convexe d'un ensemble de points du plan par parcours de Graham en JavaScript

Pour une utilisation sur mon blog [Le Quant 40](http://www.lequant40.com/2016/01/etat-des-principaux-indices-boursiers_14.html) avec la librairie [Highcharts](http://www.highcharts.com/), j'avais besoin d'une implémentation en JavaScript d'un algorithme de calcul de l'enveloppe convexe d'un ensemble de points du plan, si possible simple et rapide (parcours de Graham donc...).

J'ai trouvé mon bonheur sur le Github de [brian3kb](https://github.com/brian3kb/graham_scan_js), mais il manquait la possibilité de gérer des points avec des étiquettes, ce que j'ai rajouté ici.


### Téléchargement

Le code source minifié pour utilisation dans un navigateur est disponible en téléchargement direct [ici](http://raw.github.com/lequant40/graham_scan_js/master/graham_scan.min.js).


### Compilation et tests

Les commandes suivantes créées le fichier minifié `graham_scan.min.js` et exécutent les tests unitaires avec QUnit :

	npm install
	grunt deliver

Le fichier de tests QUnit est situé dans `tests/index.html`.


### Utilisation

On fait difficilement plus simple :

    // Creation d'une instance
    var aConvexHull = new ConvexHullGrahamScan();

    // Ajout des points point par point, avec une étiquette optionnelle 
    // La méthode à appeler est addPoint(coordonnée x, coordonnée y, étiquette du point)
    aConvexHull.addPoint(1.5, 3.1);
    aConvexHull.addPoint(1.6, 3.2, 'mon point');
    
    // Calcul du tableau des points qui forment l'enveloppe convexe
    // Le tableau est au format JSON : [{x: coordonnée x, y: coordonnée y, name: étiquette du point }, ...]
    var hullPoints = convexHull.getHull();

    
### Références

* https://fr.wikipedia.org/wiki/Enveloppe_convexe
* https://fr.wikipedia.org/wiki/Parcours_de_Graham


### License

[License MIT](https://fr.wikipedia.org/wiki/Licence_MIT)
