# lespeitsplats
OC Projet 7 "Les Petits Plats"

Fiche d'Investigation : Comparaison des Deux Algorithmes de Filtrage
Introduction
Ce document présente une comparaison détaillée entre deux implémentations d'un algorithme de filtrage utilisé pour rechercher des recettes selon différents critères (nom, description, ingrédients, appareils, et ustensiles). L'objectif est de maintenir la même logique de filtrage tout en explorant deux approches de programmation distinctes.

Les deux versions sont fonctionnellement équivalentes mais diffèrent dans leur style d'implémentation : l'une utilise des boucles impératives (for), tandis que l'autre adopte une approche fonctionnelle en utilisant des méthodes comme filter, some, forEach, et includes.

Option 1 : Utilisation des Boucles for
Description
Cette version repose principalement sur des boucles for pour effectuer les opérations de filtrage. Elle évite l'utilisation des méthodes fonctionnelles comme filter et some, sauf pour includes, qui est nécessaire pour effectuer des recherches de sous-chaînes dans des chaînes de caractères.

Avantages
Simplicité du contrôle : Chaque étape du filtrage est claire et peut être modifiée facilement sans dépendre de méthodes abstraites.
Compatibilité : Cette version est compatible avec les environnements JavaScript les plus anciens et les navigateurs ne supportant pas les méthodes fonctionnelles modernes.
Débogage aisé : Le flux de l'algorithme étant plus explicite, il est plus facile d'insérer des points de contrôle pour comprendre comment chaque boucle fonctionne.
Inconvénients
Longueur du code : L'utilisation de boucles explicites rend le code plus verbeux et peut diminuer sa lisibilité par rapport à une approche plus concise.
Performances : Dans certains cas, les boucles for imbriquées peuvent affecter la performance lorsque l'on manipule des données de grande taille.
Choix
Ce choix est particulièrement adapté si vous travaillez dans un environnement où vous avez besoin d'un contrôle total sur chaque étape du filtrage ou si vous souhaitez conserver la compatibilité avec des versions plus anciennes de JavaScript.

Option 2 : Utilisation des Méthodes Fonctionnelles
Description
Cette version utilise une approche fonctionnelle pour implémenter le même algorithme. Elle repose sur des méthodes telles que filter, some, forEach, et includes pour parcourir et filtrer les données. Il n'y a aucune boucle for dans cette implémentation.

Avantages
Lisibilité et concision : Le code est plus compact et facile à lire. Les méthodes fonctionnelles décrivent clairement l'intention du développeur.
Modularité : Chaque méthode fonctionnelle (comme filter et some) encapsule des opérations spécifiques, ce qui rend le code plus modulaire et plus facile à maintenir.
Optimisation : Les moteurs JavaScript modernes peuvent optimiser l'utilisation des méthodes fonctionnelles pour une meilleure performance avec des tableaux de grande taille.
Inconvénients
Moins de contrôle explicite : L'utilisation de méthodes fonctionnelles peut rendre certaines étapes du traitement moins flexibles si vous avez besoin de personnaliser précisément certaines opérations.
Compatibilité limitée : Cette approche nécessite un environnement JavaScript moderne (ES5 et supérieur), ce qui peut poser problème dans des environnements plus anciens ou des systèmes embarqués.
Choix
Ce choix est recommandé si vous travaillez dans un environnement moderne où la lisibilité, la concision et la performance sont importantes. Il est également adapté aux équipes de développement habituées aux paradigmes de la programmation fonctionnelle.

Similitudes entre les deux versions
Fonctionnalité : Les deux versions implémentent exactement la même logique de filtrage, garantissant que les résultats obtenus sont identiques.
Filtrage basé sur le texte : Les deux versions vérifient les noms, descriptions et ingrédients des recettes en utilisant la méthode includes pour la recherche de sous-chaînes.
Filtres supplémentaires : Les deux implémentations gèrent également les options de filtrage par appareils, ustensiles et ingrédients, tout en évitant les doublons dans les résultats.
Différences entre les deux versions
Style de programmation : La première version est basée sur des boucles impératives (for), tandis que la deuxième version adopte une approche fonctionnelle.
Lisibilité et concision : La version fonctionnelle est plus concise, utilisant des méthodes comme filter et some, ce qui la rend plus facile à lire et à maintenir. En revanche, la version avec des boucles for est plus explicite.
Compatibilité : La version avec des boucles for est compatible avec tous les environnements JavaScript, y compris les plus anciens, tandis que la version fonctionnelle nécessite des versions modernes de JavaScript (ES5+).
Performance potentielle : Bien que les performances puissent varier selon les cas d'utilisation, la version fonctionnelle pourrait être légèrement plus optimisée sur des tableaux de grande taille grâce à l'optimisation des moteurs JavaScript modernes.
Conclusion
Version impérative (for) : Idéale pour les projets où un contrôle explicite est requis, ou si la compatibilité avec des navigateurs plus anciens est une priorité.
Version fonctionnelle : Privilégiée pour les projets modernes nécessitant un code concis et lisible, particulièrement utile pour les équipes habituées à la programmation fonctionnelle.