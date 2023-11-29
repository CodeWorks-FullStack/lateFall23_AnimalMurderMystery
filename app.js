console.log('App loaded, time to party!')

const locations = ['🌲', '🌵', '🎁', '🌾']

const animals = [
  {
    emoji: '🐻',
    name: 'paul',
    diet: 'carnivore',
    weapon: 'claws',
    description: 'brown fur',
    currentLocation: '🌲'
  },
  {
    emoji: '🐻‍❄️',
    name: 'john',
    diet: 'omnivore',
    weapon: 'teeth',
    description: 'white fur',
    currentLocation: '🌲'
  },
  {
    emoji: '🐼',
    name: 'george',
    diet: 'herbivore',
    weapon: 'claws',
    description: 'noodles',
    currentLocation: '🌲'
  },
  {
    emoji: '🐍',
    name: 'ringo',
    diet: 'carnivore',
    weapon: 'poison',
    description: 'scaly',
    currentLocation: '🌵'
  },
  {
    emoji: '🦎',
    name: 'walter',
    diet: 'omnivore',
    weapon: 'poison',
    description: 'scaly',
    currentLocation: '🌵'
  },
  {
    emoji: '🐫',
    name: 'saint Catherine, the 3rd',
    diet: 'herbivore',
    weapon: 'limbs',
    description: 'brown fur',
    currentLocation: '🌵'
  },
  {
    emoji: '🐒',
    name: 'croc',
    diet: 'herbivore',
    weapon: 'limbs',
    description: 'brown fur',
    currentLocation: '🎁'
  },
  {
    emoji: '🦧',
    name: 'oslo',
    diet: 'carnivore',
    weapon: 'limbs',
    description: 'orange fur',
    currentLocation: '🎁'
  },
  {
    emoji: '🦍',
    name: 'harry',
    diet: 'omnivore',
    weapon: 'rock',
    description: 'grey fur',
    currentLocation: '🎁'
  },
  {
    emoji: '🐊',
    name: 'lucy',
    diet: 'carnivore',
    weapon: 'teeth',
    description: 'scaly',
    currentLocation: '🌾'
  },
  {
    emoji: '🦩',
    name: 'jenny',
    diet: 'omnivore',
    weapon: 'claws',
    description: 'long legs',
    currentLocation: '🌾'
  },
  {
    emoji: '🐸',
    name: 'fred',
    diet: 'herbivore',
    weapon: 'poison',
    description: 'long legs',
    currentLocation: '🌾'
  },
]

let clues = ['diet', 'weapon', 'description', 'name']

let murderer = animals[11]

function drawAnimals(){
  locations.forEach(location =>{
    // debugger
    console.log(location) // emoji of the current location
    // Get animals in location
    let filteredAnimals = animals.filter(animal => animal.currentLocation == location)
    console.log('📦', filteredAnimals) 
    //Grab element from the DOM
    const locationElm = document.getElementById(location)
    console.log('🗺️', locationElm)
    // Map creates a separate array of the function results, in this case an array of just the animal emojis
    let animalEmojis = filteredAnimals.map(animal => animal.emoji)
    console.log('😃', animalEmojis)

    locationElm.innerText = animalEmojis.join(' ')
    // join, joins the elements of the array into a string
  })
}

function moveAnimals(){
  animals.forEach(animal => {
    if(animal.emoji != '🪦'){
      let newLocation = locations[Math.floor(Math.random()*locations.length)]
      console.log(newLocation);
      animal.currentLocation = newLocation
    }
  })
  drawAnimals()
  murder()
}

function murder(){
  let crimeScene = murderer.currentLocation
  console.log('🗡️',crimeScene)
  let animalInRoom = animals.filter(animal => animal.currentLocation == crimeScene)
  console.log('🥫',animalInRoom);
  let victim = animalInRoom.find(animal => animal.emoji != murderer.emoji && animal.emoji != '🪦')
  console.log('😱', victim);
  if(victim){ // this will evaluate to true if there as victim, and false if there is not, skipping the 'killing'
    victim.emoji = '🪦'
  }
  checkForLoss()
}

function makeMurderer(){
  murderer = animals[Math.floor(Math.random()*animals.length)]
}

function checkForLoss(){
  let deadAnimals = animals.filter(animal => animal.emoji == '🪦') 
  if (animals.length -1 == deadAnimals.length){
    window.alert("You lost, you're a terrible detective.")
  }
}

function accuse(){
  let accused = window.prompt("Who done it?")
  console.log('👉', accused);
  if(accused == murderer.name || accused == murderer.emoji){
    window.alert('You got em 🚓')
  } else {
    moveAnimals()
  }
}

function searchLocation(locationOfInterest){
  console.log('🔍', locationOfInterest);
  let deadAnimals = animals.filter(animals => animals.emoji == '🪦' && animals.currentLocation == locationOfInterest)
  if(deadAnimals.length){
    drawAnimals()
    getClue()
  }
}

function getClue(){
  let clue = clues.shift()
  let clueElm = document.getElementById('clues')

  switch(clue){
    case 'diet':
      clueElm.innerHTML += `
      <p class="col-12">the murderer is a ${murderer.diet}</p>`
      break
    case  'weapon':
      clueElm.innerHTML += `
      <p class="col-12">The victim was killed with ${murderer.weapon}</p>`
      break
    case 'description':
      clueElm.innerHTML += `
      <p class="col-12">A witness says they saw ${murderer.description}</p>`
      break
    case 'name':
      clueElm.innerHTML += `
      <p class="col-12">A fraction of their drivers license was recovered, their name starts with ${murderer.name[0]}</p>`
      break
      default:
        clueElm.innerHTML += `
      <p class="col-12">You find nothing your already didn't know</p>`
    }
    // clues.push(clue) you could push the clue back in the end to make the array "rotate"
    moveAnimals()
}

makeMurderer()
drawAnimals()