// test.js
const calculatePossibilities = require('./calculatePossibilities');

// Scénario de test 1
// console.log('Test 1:');
// console.log("6 6");
// const team1MaxScore1 = 6;
// const team2MaxScore1 = 6;
// const possibilities1 = calculatePossibilities(team1MaxScore1, team2MaxScore1);
// console.log(possibilities1);

// Scénario de test 2
// console.log('\nTest 2:');
// console.log("12 12");
// const team1MaxScore2 = 12;
// const team2MaxScore2 = 12;
// const possibilities2 = calculatePossibilities(team1MaxScore2, team2MaxScore2);
// console.log(possibilities2);

// // Ajoutez d'autres scénarios de test selon vos besoins

// // Scénario de test pour des scores plus importants
console.log('\nTest 3:');
console.log("21 14");
const team1MaxScore3 = 21;
const team2MaxScore3 = 14;
const possibilities3 = calculatePossibilities(team1MaxScore3, team2MaxScore3);
console.log(possibilities3);
