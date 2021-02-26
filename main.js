// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Tasks 3 to 6:
const pAequorFactory = (num, dna) => {
  return {
    num,
    dna,
    mutate() {
      let randIndex = Math.floor(Math.random()*this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] == newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherPAequor) {
      let coincidence = 0;
      for (let i=0; i<this.dna.length; i++) {
        for (let j=0; j<otherPAequor.dna.length; j++) {
          if(this.dna[i] == otherPAequor.dna[j] && i == j) {
            coincidence += 1;
          }
        }
      }
      let percentage = ((coincidence*2)*100)/(this.dna.length+otherPAequor.dna.length);
      return `This specimen and the other specimen have ${percentage.toFixed(0)}% DNA in common`;
    },
    compareDNA2(otherPAequor) {
      let coincidence = 0;
      for (let i=0; i<this.dna.length; i++) {
        for (let j=0; j<otherPAequor.dna.length; j++) {
          if(this.dna[i] == otherPAequor.dna[j] && i == j) {
            coincidence += 1;
          }
        }
      }
      let percentage = ((coincidence*2)*100)/(this.dna.length+otherPAequor.dna.length);
      return percentage;
    },
    willLikelySurvive() {
      let bases = 0;
      for (let i=0; i<this.dna.length; i++) {
        if (this.dna[i] == 'C') {
          bases += 1;
        } else if (this.dna[i] == 'G') {
          bases += 1;
        }
      }
      return (bases*100)/this.dna.length >= 60 ? true : false;
    },
    complementStrand() {
      let complementStrand = [];
      for (let i=0; i<this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complementStrand.push('T');
            break;
          case 'T':
            complementStrand.push('A');
            break;
          case 'C':
            complementStrand.push('G');
            break;
          case 'G':
            complementStrand.push('C');
            break;
        }
      }
      return complementStrand;
    } 
    
  }
}

//To check pAequorFactory():
/*let newInstance = pAequorFactory(1, mockUpStrand());
console.log(newInstance);*/

//To check .mutate():
/*let newInstance = pAequorFactory(1, mockUpStrand());
console.log(newInstance);
newInstance.mutate();
console.log(newInstance);*/

//To check .compareDNA():
/*let newInstance = pAequorFactory(1, mockUpStrand());
let newInstance2 = pAequorFactory(2, mockUpStrand());
console.log(newInstance.compareDNA(newInstance2));*/

//To check willLikelySurvive():
/*let newInstance = pAequorFactory(1, mockUpStrand());
console.log(newInstance.willLikelySurvive());*/

//To check complementStrand():
/*let newInstance = pAequorFactory(1, mockUpStrand());
console.log(newInstance.complementStrand());
console.log(newInstance.dna);*/

// 7. Store 30 instances of pAequor:
let thirtyInstances = [];
let idCounter = 1;
while (thirtyInstances.length<30) {
  let newInstance = pAequorFactory(idCounter, mockUpStrand());
  if (newInstance.willLikelySurvive()) {
    thirtyInstances.push(newInstance);
  }
  idCounter ++; 
}
//To check thirtyInstances:
//console.log(thirtyInstances);

// 9. Find most releated instances in thirtyInstances:
let compareResult1 = 0;
let mostRelated = [];
for (let i=0; i<thirtyInstances.length; i++) {
  for(let j=0; j<thirtyInstances.length; j++) {
    if (i != j){
      let compareResult2 = thirtyInstances[i].compareDNA2(thirtyInstances[j]);
      if (compareResult2 > compareResult1) {
        compareResult1 = compareResult2;
        mostRelated = [thirtyInstances[i], thirtyInstances[j]];
      }
    }
  }
}
//To check most releated instances in thirtyInstances:
//console.log(mostRelated);
