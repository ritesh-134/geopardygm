const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const jeopardyCategories = [
  {
    genre: 'WHO',
    questions: [
      {
        question: 'Who wrote the Harry Potter books?',
        answers: ['JK Rowling', 'JRR Tolkien'],
        correct: 'JK Rowling',
        level: 'easy',
      },
      {
        question: 'Who was the ipl 2022 Winner?',
        answers: ['RR', 'GT'],
        correct: 'GT',
        level: 'medium',
      },
      {
        question: 'Who designed the national flag of india?',
        answers: ['pingali Venkayya', 'Tanguturi Prakashan'],
        correct: 'pingali Venkayya',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHERE',
    questions: [
      {
        question: 'Where will olympics 2022 will held?',
        answers: ['china', 'London'],
        correct: 'china',
        level: 'easy',
      },
      {
        question: 'Where will 2022 t20 world cup held?',
        answers: ['Australia', 'New-zeland'],
        correct: 'Australia',
        level: 'medium',
      },
      {
        question: 'Where is gateway of india located?',
        answers: ['delhi', 'mumbai'],
        correct: 'mumbai',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHEN',
    questions: [
      {
        question: 'When india won first t20 wc?',
        answers: ['2016', '2007'],
        correct: '2007',
        level: 'easy',
      },
      {
        question: 'When was ipl started?',
        answers: ['2008', '2006'],
        correct: '2008',
        level: 'hard',
      },
      {
        question: 'When was world war 2 stopped?',
        answers: ['1932', '1945'],
        correct: '1945',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'WHAT',
    questions: [
      {
        question: 'What is the best score  of NEERAJ CHOPRA?',
        answers: ['89.94', '88'],
        correct: '89.94',
        level: 'hard',
      },
      {
        question: 'What do Koalas eat?',
        answers: ['Straw', 'Eucalypt'],
        correct: 'Eucalypt',
        level: 'medium',
      },
      {
        question: 'What is the record of most runs in an over in test cricket',
        answers: ['26', '35'],
        correct: '35',
        level: 'easy',
      },
    ],
  },
  {
    genre: 'HOW MANY',
    questions: [
      {
        question: 'How many players in a cricket team?',
        answers: ['15', '11'],
        correct: '11',
        level: 'easy',
      },
      {
        question: 'How many teams are there in ipl?',
        answers: ['36', '10'],
        correct: '10',
        level: 'medium',
      },
      {
        question: 'How many century did sachin scored in world cup 2011?',
        answers: ['4', '2'],
        correct: '2',
        level: 'hard',
      },
    ],
  },
]

function addCategory(category) {
  const column = document.createElement('div')
  column.classList.add('genre-column')

  const genreTitle = document.createElement('div')
  genreTitle.classList.add('genre-title')
  genreTitle.innerHTML = category.genre

  column.append(genreTitle)
  game.append(column)

  category.questions.forEach((question) => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    if (question.level == 'easy') {
      card.innerHTML = 100
    }
    if (question.level == 'medium') {
      card.innerHTML = 200
    }
    if (question.level == 'hard') {
      card.innerHTML = 300
    }

    card.setAttribute('data-question', question.question)
    card.setAttribute('data-answer-1', question.answers[0])
    card.setAttribute('data-answer-2', question.answers[1])
    card.setAttribute('data-correct', question.correct)
    card.setAttribute('data-value', card.getInnerHTML())
    card.addEventListener('click', flipCard)
  })
}

jeopardyCategories.forEach((category) => addCategory(category))

function flipCard() {
  this.innerHTML = ''
  this.style.fontSize = '15px'
  this.style.lineHeight = '30px'
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  const firstButton = document.createElement('button')
  const secondButton = document.createElement('button')
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
  firstButton.innerHTML = this.getAttribute('data-answer-1')
  secondButton.innerHTML = this.getAttribute('data-answer-2')
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)
  this.append(textDisplay, firstButton, secondButton)
  textDisplay.innerHTML = this.getAttribute('data-question')

  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.removeEventListener('click', flipCard))
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.addEventListener('click', flipCard))

  const cardOfButton = this.parentElement

  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML = score
    cardOfButton.classList.add('correct-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
    }, 100)
  } else {
    cardOfButton.classList.add('wrong-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = 0
    }, 100)
  }
  cardOfButton.removeEventListener('click', flipCard)
}
