/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length - 1; i++){
      let word = this.words[i];
      let nextword = this.words[i + 1];

      if (!this.chains[word]) {
        this.chains[word] = [];
      };
      this.chains[word].push[nextword];
    }

    let lastword = this.words[this.words.length - 1];
    if (!this.chains[lastword]){
      this.chains[lastword] = [null];
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let result = [];
    let currword = this.getRandomWord();

    for (let i = 0; i < numWords; i++) {
      if (currword == null) {
        break;
      }
      result.push(currword);
      currword = this.getRandomNextWord(currword);
    }
    return result.join(" ");
  }

  getRandomWord(){
    const words = Object.keys(this.chains);
    return words[Math.floor(Math.random() * words.length)];
  }

  getRandomNextWord(word) {
    const nextWords = this.chains[word];
    return nextWords[Math.floor(Math.random() * nextWords.length)];
  }
}

// Example usage
let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());
console.log(mm.makeText(50));