document.addEventListener('DOMContentLoaded', () => {
    const flashcard = [
        {Question: 'What 1 + 1', Answer: '2'},
        {Question: 'What 2 + 2', Answer: '4'},
        {Question: 'What 2 + 3', Answer: '5'},
        {Question: 'What 3 + 3', Answer: '6'},
        {Question: 'What 5 + 5', Answer: '10'},
    ];


    let card = 0;

    const FlashElement = document.querySelector('.card');
    const questionElement = document.querySelector('.question');
    const answerElement = document.querySelector('.answer');
    const pageElement = document.querySelector('#demo');
    const progressElement = document.querySelector('.progress');

    function displaycard() {

        const pageNum = card + 1;
        const percent = Math.round((pageNum / flashcard.length) * 100);

       questionElement.textContent = flashcard[card].Question;
       answerElement.textContent = flashcard[card].Answer
       pageElement.textContent = `${pageNum}`;
       progressElement.textContent = percent + '%';
       progressElement.style.width = percent + '%';
       FlashElement.classList.remove('flipped');


    }

    document.querySelector('#Answer').addEventListener('click', () => {
       FlashElement.classList.toggle('flipped');
    })

    document.querySelector('#Next').addEventListener('click', () => {
        card = (card + 1) % flashcard.length;
        displaycard();
    })

    document.querySelector('#Back').addEventListener('click', () => {
        card = (card - 1) % flashcard.length;
        displaycard();
    })





    displaycard();

});