//Entrée: 2 entiers positifs
//Sortie: un tableau de tableaux de chaine de charactères des résultats possibles pour les 2 équipes (ex: [[["TD", "PAT", "FG"], ["FG", "FG", "FG"]],[["TD", "PAT", "FG"], ["FG", "FG", "FG"]]])
function calculatePossibilities(team1Score, team2Score) {
    if(team1Score < 0 || team2Score < 0) {
      throw new Error('Les scores doivent être positifs');
    }

    possibilities = [];
    toto=[];
    
    // Entrée: 1 entier positif
    // Sortie: un tableau de tableaux de chaine de charactères des résultats possibles
    function generateFirstPossibilitie(score) {
        toto=[];
        firstArrayOfPossibilities=[];
        while(score!=0){
            if(score%7===0) {
                firstArrayOfPossibilities.push("Touchdown");
                firstArrayOfPossibilities.push("PAT");
                score-=7;
            }
            else if(score%6===0) {
                firstArrayOfPossibilities.push("Touchdown");
                score-=6;
            }
            else if(score%3===0) {
                firstArrayOfPossibilities.push("Field Goal");
                score-=3;
            }
            else {
                console.log("score: "+score);
                throw new Error('Un des scores est invalide');
            }
        }
        toto.push(firstArrayOfPossibilities);
    }
  
    // Entrée: un tableau de chaine de charactères d'un résultat possible
    // Sortie: un tableau de chaine de charactères des résultats avec 3 PAT remplacés par 1 FG
    function checkThreePAT(arrayOfPossibilities) {
        countPAT = arrayOfPossibilities.filter(item => item === 'PAT').length;
        while(countPAT>0){
            if(countPAT>=3) {
                // Créer une copie de arrayOfPossibilities pour chaque remplacement
                const currentPossibility = [...arrayOfPossibilities];
                for (let i = 0; i < 3; i++) {
                    const indexToRemove = currentPossibility.indexOf("PAT");
                    if (indexToRemove !== -1) {
                        currentPossibility.splice(indexToRemove, 1);
                    }
                }
                currentPossibility.push("Field Goal");
                // Ajouter la nouvelle combinaison au tableau des possibilités
                toto.push(currentPossibility);
                generateAllNextPossibilities(currentPossibility);
            }
            countPAT-=3;
        }
    }
    
    // Entrée: un tableau de chaine de charactères d'un résultat possible
    // Sortie: un tableau de tableaux de chaine de charactères des résultats avec 1 TD remplacé par 2 FG
    function generateAllNextPossibilities(arrayOfPossibilities) {

        // Trouver l'index du premier 'TD' dans arrayOfPossibilities
        const i = arrayOfPossibilities.indexOf('Touchdown');

        if (i !== -1) {
            // Créer une copie de arrayOfPossibilities pour chaque remplacement
            const currentPossibility = [...arrayOfPossibilities];
            // Remplacer 'TD' par 'FG', 'FG' dans la copie
            currentPossibility.splice(i, 1, 'Field Goal', 'Field Goal');

            // Ajouter la nouvelle combinaison au tableau des possibilités
            toto.push(currentPossibility);

            // Appeler la fonction récursivement
            generateAllNextPossibilities(currentPossibility);
        }
    }
    
    //#region SCORE 1

    generateFirstPossibilitie(team1Score);
    
    checkThreePAT(toto[0]);
    
    generateAllNextPossibilities(toto[0]);
    
    possibilities.push(toto);

    //#endregion


    //#region SCORE 2
    generateFirstPossibilitie(team2Score);

    checkThreePAT(toto[0]);

    generateAllNextPossibilities(toto[0]);
    
    possibilities.push(toto);
    //#endregion

    return possibilities;
  }
  
  module.exports = calculatePossibilities;
  