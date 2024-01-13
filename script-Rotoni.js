let currentStep = 0;
let stepsContent = document.querySelector(".buttons .steps");
let moveContent = document.querySelector(".buttons .move");
let cards = document.querySelectorAll('.card');
let arrValues = Array.from(cards).map(card => parseInt(card.textContent));
console.log(arrValues);
let increments = [1, 3];

let sortButton = document.getElementById("sort");
sortButton.addEventListener("click", () => {
    shellSort(arrValues);
});

async function shellSort(arr) {
    let n = arr.length;
    let callAction = 0;

    let actionsArray = [
        { index: 0, action: 'compare' },
        { index: 1, action: 'swap' },
        { index: 2, action: 'compare' },
        { index: 3, action: 'not swap' },
        { index: 4, action: 'compare' },
        { index: 5, action: 'swap' },
        { index: 6, action: 'compare' },
        { index: 7, action: 'swap' },
        { index: 8, action: 'compare' },
        { index: 9, action: 'not swap' },
        { index: 10, action: 'compare' },
        { index: 11, action: 'not swap' },
        { index: 12, action: 'compare' },
        { index: 13, action: 'swap' },
        { index: 14, action: 'compare' },
        { index: 15, action: 'swap' },
        { index: 16, action: 'compare' },
        { index: 17, action: 'swap' },
        { index: 18, action: 'compare' },
        { index: 19, action: 'not swap' },
    ];
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n ; i += 1) {
            
            if(arr[i] < arr[i-gap] && gap === 1){
                let j;
                let temp = arr[i];
                
                for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
                    arr[j] = arr[j-gap];
                    arr[j-gap] = temp

                    changeStepContent();
                    addHighlight(j, j-gap);
                    moveContent.textContent = actionsArray[callAction].action;
                    callAction++;   
                    await delay(2000);

                    changeStepContent();
                    removeHighlight(j, j - gap, arr);
                    moveContent.textContent = actionsArray[callAction].action;
                    callAction++;
                    await delay(1000);

                    removeSwap();
                }
                arr[j] = temp;
                
            }else{
                let x = arr[i];
                let y = arr[i-gap];
                if(arr[i] < arr[i-gap]){

                    arr[i] = y;
                    arr[i-gap] = x;
                }
                changeStepContent();
                addHighlight(i, i - gap);
                moveContent.textContent = actionsArray[callAction].action;
                callAction++;
                await delay(2000);

                changeStepContent();
                removeHighlight(i, i - gap, arr);
                moveContent.textContent = actionsArray[callAction].action; 
                callAction++;
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
    stepsContent.textContent = `STEP ${currentStep}/20`;
}
