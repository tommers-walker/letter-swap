import { utils } from './utils';
import 'gsap';
import 'lodash';

const lines = Array.from(document.querySelectorAll('.js-line'));

let lineIndex = 0;

const animation = () => {
  const currentLineElements = Array.from(lines[lineIndex].getElementsByClassName('js-letter'));
  const nextLineElements = Array.from(lines[lineIndex+1].getElementsByClassName('js-letter'));

  const currentLineLetters = currentLineElements.map(function(el) {
    const newObj = {
      "letter": el.dataset.letter
    }
    return newObj;
  });

  const nextLineLetters = nextLineElements.map(function(el) {
    const newObj = {
      "letter": el.dataset.letter,
      "x": el.getBoundingClientRect().x,
      "y": el.getBoundingClientRect().y,
    }
    return newObj;
  });

  // https://stackoverflow.com/questions/37434108/how-can-i-get-arrays-intersection-include-duplicate-values-using-javascript
  const intersectwith = (f,xs,ys) => xs.filter(x => ys.some(y => f(x,y)));
  const equals = (x,y) => x.letter === y.letter;
  const matchingLetters = (intersectwith(equals, currentLineLetters, nextLineLetters));
  const lettersToKeep = [];
  const currentLineElementsCopy = _.cloneDeep(currentLineElements);
  const nextLineElementsCopy = _.cloneDeep(nextLineElements);

  matchingLetters.forEach(function(letter) {
    const index = currentLineElementsCopy.findIndex(function(el) {
      return el.dataset.letter == letter.letter;
    })

    const letterToKeep = currentLineElementsCopy[index];
    lettersToKeep.push(letterToKeep);
    currentLineElementsCopy.splice(index, 1);
  });

  lettersToKeep.forEach(function(letterToKeep) {
    const index = nextLineElementsCopy.findIndex(function(el) {
      return el.dataset.letter == letterToKeep.dataset.letter;
    })

    const nextLineEl = nextLineElementsCopy[index];
    const currentPos = letterToKeep.getBoundingClientRect();
    const newPos = nextLineEl.getBoundingClientRect();

    letterToKeep.newPosX = newPos.x-currentPos.x;
    nextLineElementsCopy.splice(index, 1);
  });

  const tl = new TimelineLite();
  tl
  .to(currentLineElements, 0.5, {
    opacity: 1
  })
  .to(currentLineElementsCopy, 0.5, {
    opacity: 0
  }, "+=0.5")
  .to(nextLineElements, 0.5, {
    opacity: 1
  }, "+=0.5")
  .to(lettersToKeep, 0.5, {
    opacity: 0
  }, "+=0.5")

  TweenLite.delayedCall(1, function() {
    lettersToKeep.forEach(function(el, i) {
      TweenLite.to(el, 0.5, {x: el.newPosX})
    })
  })

  lineIndex++

  if (lineIndex < lines.length -1) {
    setTimeout(() => {
      animation();
    }, 2000);
  }
}

const letters = {
  init() {
    animation();
  }
}

export { letters }
