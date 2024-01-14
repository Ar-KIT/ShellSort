let currentStep = 0;
let stepsContent = document.querySelector(".buttons .steps");
let moveContent = document.querySelector(".buttons .move");
let cards = document.querySelectorAll('.card');
let arrValues = Array.from(cards).map(card => parseInt(card.textContent));
let totalSteps;
let sortButton = document.getElementById("sort");
let shuffleButton = document.getElementById("shuffle")

sortButton.addEventListener("click", async () => {
    currentStep = 0;
    totalSteps = countShellSortSteps([...arrValues]);
    sortButton.disabled = true;
    sortButton.classList.add("disabled");

    await shellSort(arrValues);
    moveContent.textContent = "";
    shuffleButton.style.display ="block"
});
shuffleButton.addEventListener("click", async ()=>{
    currentStep = 0;
    changeStepContent();
    arrValues = generateShuffledArray(1, 50);
    updateCardValues();
    shuffleButton.style.display = "none";
    sortButton.disabled = false;
    sortButton.classList.remove("disabled");
    stepsContent.textContent = "";
})

async function shellSort(arr) {
    
    let n = arr.length;
    let toSwap;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n ; i += 1) {
            toSwap = false;
            if(arr[i] < arr[i-gap] && gap === 1){
                moveContent.textContent = "Compare the Cards"
                let j;
                let temp = arr[i];
                
                for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
                    moveContent.textContent = "Compare the Cards"
                    arr[j] = arr[j-gap];
                    arr[j-gap] = temp

                    changeStepContent();
                    addHighlight(j, j-gap);
                    await delay(900);
                    toSwap = true;
                    if(toSwap){
                        moveContent.textContent = "Swap the Cards"
                    }else{
                        moveContent.textContent = "Don't Swap the Cards"
                    }
                    changeStepContent();
                    removeHighlight(j, j - gap, arr);
                    await delay(1500);

                    removeSwap();
                    
                }
                arr[j] = temp;
                
                
            }else{
                moveContent.textContent = "Compare the Cards"
                let x = arr[i];
                let y = arr[i-gap];
                if(arr[i] < arr[i-gap]){
                    arr[i] = y;
                    arr[i-gap] = x;
                    toSwap = true;
                }
                changeStepContent();
                addHighlight(i, i - gap);
                await delay(900);
                if(toSwap){
                    moveContent.textContent = "Swap the Cards"
                }else{
                    moveContent.textContent = "Don't Swap the Cards"
                }
                changeStepContent();
                removeHighlight(i, i - gap, arr);
                await delay(1000);

                removeSwap();
            }

        }
    }
    return arr;
}


async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function removeSwap(){
    cards.forEach((card, index) => {
        card.classList.remove("swap");
    });
}
function removeHighlight(x, y, arr){
    cards[x].classList.remove("highlight");
    cards[y].classList.remove("highlight");
    cards.forEach((card, index) => {
        card.textContent = arr[index];
    });
    cards[x].classList.add("swap");
    cards[y].classList.add("swap");
}
function addHighlight(x,y){
    cards[x].classList.add("highlight");
    cards[y].classList.add("highlight");
}

function changeStepContent() {
    currentStep++;
    stepsContent.textContent = `STEP ${currentStep}/${totalSteps}`;
}
function countShellSortSteps(arr) {
    let n = arr.length;
    let totalSteps = 0;

    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n ; i += 1) {
            if(arr[i] < arr[i-gap] && gap === 1){
                let j;
                let temp = arr[i];
                
                for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
                    arr[j] = arr[j-gap];
                    arr[j-gap] = temp

                    totalSteps+= 2;
                }
                arr[j] = temp;
            }else{
                let x = arr[i];
                let y = arr[i-gap];
                if(arr[i] < arr[i-gap]){
                    arr[i] = y;
                    arr[i-gap] = x;
                    toSwap = true;
                }
                totalSteps+= 2;
            }

        }
    }
    return totalSteps;
}

function generateShuffledArray(min, max) {
    let allValues = Array.from({ length: max - min + 1 }, (_, index) => index + min);
    
    for (let i = allValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
    }

    return allValues.slice(0, 6);
}
function updateCardValues() {
    cards.forEach((card, index) => {
        card.textContent = arrValues[index];
    });
}