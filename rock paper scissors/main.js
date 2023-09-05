// get DOM element
const gameContainer = document.querySelector('.container');
const userResult = document.querySelector('.user-result img');
const cpuResult = document.querySelector('.cpu-result img');
const result = document.querySelector('.result');
const optionImages = document.querySelectorAll('.option-image');

// loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        image.classList.add('active');

        userResult.src = cpuResult.src = './images/rock.png'
        result.textContent = 'Wait...';

        // loop through each option image element again
        optionImages.forEach((image2, index2) => {
            // console.log(index,index2 ); for check
            //  if the current index does not match the clicked index
            // remove the "active" class from the other option images
            index !== index2 && image2.classList.remove('active');
        });

        gameContainer.classList.add('start');

        //  set a timeout to delay the result calculation
        let time = setTimeout(() => {
            gameContainer.classList.remove('start');
             // get the source of the clicked option image
        let imageSrc = e.target.querySelector('img').src;
        // set the user image to the clicked option image
        userResult.src = imageSrc;

        // generate a random number between 0 and 2
        let randomNumber = Math.floor(Math.random() * 3);
        // console.log(randomNumber); for check
        // create an array of CPU image options
        let cpuImages = ['./images/rock.png', './images/paper.png','./images/scissors.png'];
        cpuResult.src = cpuImages[randomNumber];
        

        // assign a letter a value to the CPU option (R for rock, P for paper and S for scissors)
        let cpuValue = ['R', 'P', 'S'] [randomNumber];
         // assign a letter a value to the clicked option (based on index)
         let userValue = ['R', 'P', 'S'] [index];

         // create an object with all possible outcomes
         let outcomes = {
            RR: 'Draw',
            RP: 'Cpu',
            RS: 'User',
            PP: 'Draw',
            PR: 'User',
            PS: 'Cpu',
            SS: 'Draw',
            SR: 'Cpu',
            SP: 'User',
         };
        //create an object outcome value based on the user and CPU options
        let outComeValue = outcomes[userValue + cpuValue];

        // display the result
        result.textContent = userValue === cpuValue ? 'Match Draw' : `${outComeValue} Won!!`;

        }, 2500)

    });
});