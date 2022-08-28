import ancientsData from '../data/ancients.js';
const green1 = ancientsData[0].firstStage.greenCards;
const green2 = ancientsData[0].secondStage.greenCards;
const green3 = ancientsData[0].thirdStage.greenCards;
const green = Number(green1 + green2 + green3);
const greenAll = 18

const brown1 = ancientsData[0].firstStage.brownCards;
const brown2 = ancientsData[0].secondStage.brownCards;
const brown3 = ancientsData[0].thirdStage.brownCards;
const brown = Number(brown1 + brown2 + brown3);
const brownAll = 21

const blue1 = ancientsData[0].firstStage.blueCards;
const blue2 = ancientsData[0].secondStage.blueCards;
const blue3 = ancientsData[0].thirdStage.blueCards;
const blue = Number(blue1 + blue2 + blue3);
const blueAll = 12

const item_1_1 = document.querySelector('.item-1-1');
const item_1_2 = document.querySelector('.item-1-2');
const item_1_3 = document.querySelector('.item-1-3');

const item_2_1 = document.querySelector('.item-2-1');
const item_2_2 = document.querySelector('.item-2-2');
const item_2_3 = document.querySelector('.item-2-3');

const item_3_1 = document.querySelector('.item-3-1');
const item_3_2 = document.querySelector('.item-3-2');
const item_3_3 = document.querySelector('.item-3-3');

const down_card = document.querySelector('.face-down-card');
const up_card = document.querySelector('.face-up-card');
const card_ancients = document.querySelector('.card-ancients');
const easy = document.querySelector('.easy');
const middle = document.querySelector('.middle');
const hard = document.querySelector('.hard');
// const difficulty = document.querySelector('.difficulty');
const card_desk = document.querySelector('.card-desk');


let cardArr = [[], [], []];
let decomposedArr = [[[], [], []], [[], [], []], [[], [], []]]

let level = 0;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRow(max, all, color) {
  for (let i = 0; i < max; i++) {
    function everyR() {
      let rand = getRandomNum(1, all)
      if (color === 'green' && !cardArr[0].includes(rand)) cardArr[0].push(rand)
      else if (color === 'brown' && !cardArr[1].includes(rand)) cardArr[1].push(rand)
      else if (color === 'blue' && !cardArr[2].includes(rand)) cardArr[2].push(rand)
      else everyR()
    }
    everyR()
  }

  
}

function updateSet(){
  // cardArr = [[], [], []];
  generateRow(green, greenAll, 'green');
  generateRow(brown, brownAll, 'brown');
  generateRow(blue, blueAll, 'blue');
}



function insertItem(column, row, amount) {
  let count = amount
  while (count) {
    let num = cardArr[row].pop()
    decomposedArr[column][row].push(num)
    count--
  }
}

function decomposed(num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const stage = i === 0 ? 'firstStage' : i === 1 ? 'secondStage' : 'thirdStage'
      const color = j === 0 ? 'greenCards' : j === 1 ? 'brownCards' : 'blueCards'
      const amountCard = ancientsData[num][stage][color]
      if (i === 0) {
        if (j === 0) {
          insertItem(i, j, amountCard);
        }
        else if (j === 1) {
          insertItem(i, j, amountCard);
        }
        else if (j === 2) {
          insertItem(i, j, amountCard);
        }
      }
      else if (i === 1) {
          if (j === 0) {
            insertItem(i, j, amountCard);
          }
          else if (j === 1) {
            insertItem(i, j, amountCard);
          }
          else if (j === 2) {
            insertItem(i, j, amountCard);
          }
      }
      else if (i === 2) {
        if (j === 0) {
          insertItem(i, j, amountCard);
        }
        else if (j === 1) {
          insertItem(i, j, amountCard);
        }
        else if (j === 2) {
          insertItem(i, j, amountCard);
        }
      }
    }
  }
}




function updateForm() {
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++) {
      eval(`item_${i+1}_${j+1}.textContent = decomposedArr[i][j].length`);
    }
  }
}

function showCard(){
  const randomColor = getRandomNum(0, 3)
  const color = randomColor === 0 ? 'green' : randomColor === 1 ? 'brown' : 'blue'
  if (level === 0) {
    if (decomposedArr[level][0].length > 0 || decomposedArr[level][1].length > 0 || decomposedArr[level][2].length > 0){

      // let num = getRandomNum(0, decomposedArr[level].length)
      if (decomposedArr[level][randomColor].length>0){
        let num2 = decomposedArr[level][randomColor].pop()
        console.log(num2)
        up_card.style.background = `url(./assets/MythicCards/${color}/${color}${num2}.png) center / cover no-repeat`;
        updateForm()
      }else {
        showCard()
      }
    }else level++
  }else if (level === 1){
    if (decomposedArr[level][0].length > 0 || decomposedArr[level][1].length > 0 || decomposedArr[level][2].length > 0) {

      // let num = getRandomNum(0, decomposedArr[level].length)
      if (decomposedArr[level][randomColor].length > 0) {
        let num2 = decomposedArr[level][randomColor].pop()
        console.log(num2)
        up_card.style.background = `url(./assets/MythicCards/${color}/${color}${num2}.png) center / cover no-repeat`;
        updateForm()
      } else {
        showCard()
      }
    } else level++
  }else if (level === 2) {
    if (decomposedArr[level][0].length > 0 || decomposedArr[level][1].length > 0 || decomposedArr[level][2].length > 0) {

      // let num = getRandomNum(0, decomposedArr[level].length)
      if (decomposedArr[level][randomColor].length > 0) {
        let num2 = decomposedArr[level][randomColor].pop()
        console.log(num2)
        up_card.style.background = `url(./assets/MythicCards/${color}/${color}${num2}.png) center / cover no-repeat`;
        updateForm()
      } else {
        showCard()
      }
    }else level=0
  }
}

// decomposed(0);

down_card.addEventListener('click', showCard);

card_ancients.addEventListener('click', function () {
  card_ancients.classList.toggle('active');;
});

// easy.addEventListener('click', function () {
//   easy.classList.add('active');
//   if (middle.classList.contains('active')){
//     middle.classList.remove('active');
//   }
//   if (hard.classList.contains('active')){
//     hard.classList.remove('active');
//   }
// });

middle.addEventListener('click', function () {
  updateSet()
  decomposed(0);
  updateForm()
  console.table(cardArr)
  middle.classList.add('active');
  card_desk.classList.add('active');
  // if (easy.classList.contains('active')){
  //   easy.classList.remove('active');
  // }
  // if (hard.classList.contains('active')){
  //   hard.classList.remove('active');
  // }
});

// hard.addEventListener('click', function () {
//   hard.classList.add('active');
//   if (easy.classList.contains('active')){
//     easy.classList.remove('active');
//   }
//   if (middle.classList.contains('active')){
//     middle.classList.remove('active');
//   }
// });
console.log('Реализовано замешивание колоды на среднем уровне сложности для карты древнего "Азотот"')
console.log(decomposedArr)