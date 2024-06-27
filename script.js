const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 3;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

let size;
let delay;

let arr = [];

let array_container_width;
let element_width;
let element_width_max;
let margin_element;

let algo_selected;

function updateValues() {
    array_container_width = Math.floor(document.getElementById("array-container").clientWidth);
    element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if (parseInt(window.innerWidth) < 1200) {
        margin_element = 1;
    }
}

function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if (element_width > element_width_max) {
        element_width = element_width_max;
    }
}

function createArray() {
    arr = [];
    document.getElementById("array").innerHTML = '';

    for (let i = 0; i < size; i++) {
        const n = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        arr.push(n);

        const element = document.createElement('div');
        element.id = "e" + i;
        element.className = "element";
        element.style.backgroundColor = UNSORTED;
        element.style.width = element_width + 'px';
        element.style.height = n + 'px';
        element.style.marginLeft = margin_element + 'px';
        element.style.marginRight = margin_element + 'px';
        document.getElementById("array").appendChild(element);
    }
}

function setHeight(id, height) {
    document.getElementById("e" + id).style.height = height;
}

function setColor(id, color) {
    document.getElementById("e" + id).style.backgroundColor = color;
}

function setColorRange(p, r, color) {
    for (let i = p; i <= r; i++) {
        document.getElementById("e" + i).style.backgroundColor = color;
    }
}

function swap(a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    const h1 = document.getElementById("e" + a).style.height;
    const h2 = document.getElementById("e" + b).style.height;

    setHeight(a, h2);
    setHeight(b, h1);
}

function disableOthers() {
    document.getElementById("sort").disabled = true;
    document.getElementById("randomize").disabled = true;
    document.getElementById("size-slider").disabled = true;
}

function enableOthers() {
    document.getElementById("sort").disabled = false;
    document.getElementById("randomize").disabled = false;
    document.getElementById("size-slider").disabled = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function() {
    const sizeSlider = document.getElementById("size-slider");
    sizeSlider.min = MIN_SIZE;
    sizeSlider.max = MAX_SIZE;
    sizeSlider.value = DEFAULT_SIZE;

    const speedSlider = document.getElementById("speed-slider");
    speedSlider.min = MIN_SPEED;
    speedSlider.max = MAX_SPEED;
    speedSlider.value = DEFAULT_SPEED;

    size = DEFAULT_SIZE;
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);

    updateValues();
    
    findElementWidth();
    createArray();

    document.getElementById("randomize").addEventListener("click", function() {
        createArray();
    });

    document.querySelectorAll(".algo-btn").forEach(function(button) {
        button.addEventListener("click", function() {
            algo_selected = this.innerHTML;

            document.querySelectorAll(".algo-btn-active").forEach(function(activeButton) {
                activeButton.classList.remove('algo-btn-active');
            });
            this.classList.add('algo-btn-active');

            document.getElementById("no-algo-warning").classList.remove('display-flex');
            document.getElementById("no-algo-warning").classList.add('display-none');
        });
    });

    document.getElementById("sort").addEventListener("click", async function() {
        disableOthers();

        setColorRange(0, size - 1, UNSORTED);

        if (algo_selected == "Bubble Sort")
            await bubbleSort();
        else if (algo_selected == "Selection Sort")
            await selectionSort();
        else if (algo_selected == "Insertion Sort")
            await insertionSort();
        else if (algo_selected == "Merge Sort")
            await mergeSort(0, size - 1);
        else if (algo_selected == "Quicksort")
            await quicksort(0, size - 1);
        else if (algo_selected == "Heapsort")
            await heapsort();
        else {
            document.getElementById("no-algo-warning").classList.remove('display-none');
            document.getElementById("no-algo-warning").classList.add('display-flex');
        }

        enableOthers();
    });

    sizeSlider.addEventListener("input", function() {
        size = this.value;

        findElementWidth();
        createArray();
    });

    speedSlider.addEventListener("input", function() {
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - this.value);
    });

    window.addEventListener("resize", function() {
        if (array_container_width != Math.floor(document.getElementById("array-container").clientWidth)) {
            updateValues();

            findElementWidth();

            for (let i = 0; i < size; i++) {
                document.getElementById("e" + i).style.width = element_width + 'px';
                document.getElementById("e" + i).style.marginLeft = margin_element + 'px';
                document.getElementById("e" + i).style.marginRight = margin_element + 'px';
            }
        }
    });
});
