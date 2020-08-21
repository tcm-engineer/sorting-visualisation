// Randomise column heights
function randColumns(){
    
    // Read range input value from slider bar
    let columnRange = document.getElementById("sliderRange").value;

    // Assign random height for columns within input range
    for(let i = 0; i < columnRange; i++){
        randSize(document.getElementById("c" + i));
    }
    
    // Random size assigns height of element to random number between 10px-400px
    function randSize(elmt){
        elmt.style.height = Math.floor((Math.random() * 300) + 10) + "px";
    }
}


// Input slider bar range control
function sliderControl(){

    // Read input value from slider range element
    let sliderRange = document.getElementById("sliderRange").value;

    // Display slider range value in HTML file
    document.getElementById("rangeVal").innerHTML = sliderRange;

    // Set width of columns to 100/range for columns within range, 0 otherwise
    for(let i = 0; i < 100; i++){
        if(i < parseInt(sliderRange)){
            document.getElementById("c" + i).style.width = (100/sliderRange).toString() + "%";
        }
        else{
            document.getElementById("c" + i).style.width = "0%";
        }
    }       
}


// Column animation speed
function columnSpeed(){

    // Read input value from slider speed element
    let colSpeed = document.getElementById("colSpeed").value;

    // Display slider speed value in HTML file
    document.getElementById("speedVal").innerHTML = colSpeed;

    let delayTime = 25000/colSpeed;     // delay is 1s divided by speed 

    return delayTime;                   // Return calculated delay time
}


// Delay function
function sleep(delay) {
    // Wait until setTimeout resolved
    return new Promise(resolve => setTimeout(resolve, delay));    
}


// Pause sorting algorithm animation 
function stop(){

    // Read stop button value
    currentvalue = document.getElementById('stop').value;

    // Set button to default style when stop value is off
    if(currentvalue == "Off"){
        document.getElementById("stop").className = "button buttonStopDefault";
        document.getElementById("stop").value="On";
    }
    // Set button to selected style to indicate stop is activated, changes button colour
    else{
        document.getElementById("stop").className = "button buttonStopSelected";
        document.getElementById("stop").value="Off";
    }
  }

let algorithmLock = false;      // Boolean lock variable to indicate if algorithm currently running

// Bubble sort algorithm
// async permits use of await keyword within function
async function bubbleSort(){    
    
    // Run algorithm when this or no other algorithm are currently running
    if(algorithmLock == false){
        algorithmLock = true;       // Lock algorithm to indicate this algorithm is running

        // Set bubble sort button to green to indicate algorithm running
        document.getElementById("bubbleSort").className = "button buttonAlgorithmSelected";

        // Read input column range slider value
        let columnRange = document.getElementById("sliderRange").value;
        let heights = [];
        let i, j, k, temp;

        // Put values in heights array unordered
        for(i = 0; i < columnRange; i++){
            heights[i] = parseInt(document.getElementById("c" + i).style.height);
        }

        // Bubble sort array
        for(i=0; i < columnRange-1; i++){
            for(j=0; j < columnRange-i-1; j++){
                let j2 = j + 1;

                // Alter colour of columns algorithm is currently inspecting
                document.getElementById("c" + j).style.backgroundColor = "#ff2020";
                document.getElementById("c" + j2).style.backgroundColor = "#ff2020";
                
                // Swap columns if column to left is smaller value
                if(heights[j] > heights[j+1]){                        
                    temp = heights[j];
                    heights[j] = heights[j+1];
                    heights[j+1] = temp;                
                }             
    
                // Set pixel height
                for(k = 0; k < columnRange; k++){               
                    document.getElementById("c" + k).style.height = heights[k].toString() + "px";                          
                }

                // Check if button to pause sorting pressed
                if(document.getElementById("stop").value == "Off"){
                    // Set bubble sort button to default style to indicate algorithm finished
                    document.getElementById("bubbleSort").className = "button buttonAlgorithmDefault";
        
                    // Return column colour of columns algorithm is currently inspecting
                    document.getElementById("c" + j).style.backgroundColor = "#ffa500";
                    document.getElementById("c" + j2).style.backgroundColor = "#ffa500"; 
                    return;
                }

                await sleep(columnSpeed());  // Delay user selected amount of time

                // Return column colour of columns algorithm is currently inspecting
                document.getElementById("c" + j).style.backgroundColor = "#ffa500";
                document.getElementById("c" + j2).style.backgroundColor = "#ffa500";           
            
            }
        }   

        // Set bubble sort button to default style to indicate algorithm finished
        document.getElementById("bubbleSort").className = "button buttonAlgorithmDefault";    

        algorithmLock = false;      // Unlock to indicate finished and othe algorithm can be called
    }
}


// Selection sort algorithm
async function selectionSort(){

    // Run algorithm when this or no other algorithm are currently running
    if(algorithmLock == false){
        algorithmLock = true;       // Lock algorithm to indicate this algorithm is running
        
        // Set selection sort button to green to indicate algorithm running
        document.getElementById("selectionSort").className = "button buttonAlgorithmSelected";

        // Read input column range slider value
        let columnRange = document.getElementById("sliderRange").value;
        let heights = [];
        let i, j, k, min;

        // Put values in heights array unordered
        for(i = 0; i < columnRange; i++){
            heights[i] = parseInt(document.getElementById("c" + i).style.height);
        }


        // One by one move boundary of unsorted subarray
        for(i = 0; i < columnRange-1; i++){
            // Determine minimum column height in unsorted subarray
            min = i;

            for(j=i+1; j < columnRange; j++){
                if(heights[j] < heights[min]){
                    min = j;
                }
            }

            // Check if button to pause sorting pressed
            if(document.getElementById("stop").value == "Off"){
                // Set selection sort button to default style to indicate algorithm finished
                document.getElementById("selectionSort").className = "button buttonAlgorithmDefault";
                return;
            }

            // Alter colour of columns algorithm is currently inspecting
            document.getElementById("c" + i).style.backgroundColor = "#ff2020";
            document.getElementById("c" + min).style.backgroundColor = "#ff2020";

            // Swap columns
            temp = heights[i];
            heights[i] = heights[min];
            heights[min] = temp;

            // Set pixel height
            for(k = 0; k < columnRange; k++){               
                document.getElementById("c" + k).style.height = heights[k].toString() + "px";                          
            }

            await sleep(columnSpeed());  // Delay user selected amount of time

            // Return column colour of columns algorithm is currently inspecting
            document.getElementById("c" + i).style.backgroundColor = "#ffa500";
            document.getElementById("c" + min).style.backgroundColor = "#ffa500"; 
        }    

        // Set bubble sort button to default cyan to indicate algorithm finished
        document.getElementById("selectionSort").className = "button buttonAlgorithmDefault";

        algorithmLock = false;      // Unlock to indicate finished and othe algorithm can be called
    }
}


// Insertion sort algorithm
async function insertionSort(){

    // Run algorithm when this or no other algorithm are currently running
    if(algorithmLock == false){
        algorithmLock = true;       // Lock algorithm to indicate this algorithm is running
        // Set selection sort button to green to indicate algorithm running
        document.getElementById("insertionSort").className = "button buttonAlgorithmSelected";

        // Read input column range slider value
        let columnRange = document.getElementById("sliderRange").value;
        let heights = [];
        let i, j, j2, k, temp;

        // Put values in heights array unordered
        for(i = 0; i < columnRange; i++){
            heights[i] = parseInt(document.getElementById("c" + i).style.height);
        }

        
        for(i = 1; i < columnRange; i++){
            for(j = i; j > 0; j--){

                j2 = j - 1;

                // Set columns being evaluated to red
                document.getElementById("c" + j).style.backgroundColor = "#ff2020";
                document.getElementById("c" + j2).style.backgroundColor = "#ff2020";

                // Swap columns if left column greater than right
                if(heights[j-1] > heights[j]){
                    temp = heights[j];
                    heights[j] = heights[j-1];
                    heights[j-1] = temp;
                }

                // Set pixel height to adjust for changes
                for(k = 0; k < columnRange; k++){               
                    document.getElementById("c" + k).style.height = heights[k].toString() + "px";                          
                }

                await sleep(columnSpeed());  // Delay user selected amount of time

                // Return columns to orginal colour
                document.getElementById("c" + j).style.backgroundColor = "#ffa500";
                document.getElementById("c" + j2).style.backgroundColor = "#ffa500";

                // Check if button to pause sorting pressed
                if(document.getElementById("stop").value == "Off"){
                    // Set selection sort button to default style to indicate algorithm finished
                    document.getElementById("insertionSort").className = "button buttonAlgorithmDefault";
                    return;
                }
            }
        }

        // Set selection sort button to green to indicate algorithm running
        document.getElementById("insertionSort").className = "button buttonAlgorithmDefault";

        algorithmLock = false;      // Unlock to indicate finished and othe algorithm can be called
    }
}


// Quicksort algorithm
async function quickSort(){

    // Run algorithm when this or no other algorithm are currently running
    if(algorithmLock == false){
        algorithmLock = true;       // Lock algorithm to indicate this algorithm is running
      
        // Set quick sort button to green to indicate algorithm running
        document.getElementById("quickSort").className = "button buttonAlgorithmSelected";

        // Read input column range slider value
        let columnRange = document.getElementById("sliderRange").value;
        let heights = [];
        let stack = [];     // Create an auxiliary stack    
        let top = -1;       // initialize top of stack 
        let l = 0, h = columnRange-1;
        
        // Put values in heights array unordered
        for(let i = 0; i < columnRange; i++){
            heights[i] = parseInt(document.getElementById("c" + i).style.height);
        }

        // push initial values of l and h to stack
        stack[++top] = l;
        stack[++top] = h;


        // Keep popping from stack while is not empty 
        while (top >= 0) { 

            // Pop h and l 
            h = stack[top--]; 
            l = stack[top--];

            // Set pivot element at its correct position in sorted array 
            let p = partition(l, h);

            // Set pivot column to green
            document.getElementById("c" + p).style.backgroundColor = "green";

            // If there are elements on left side of pivot, then push left side to stack 
            if (p - 1 > l) { 
                stack[++top] = l; 
                stack[++top] = p - 1; 

                let l2 = p - 1;

                // Set columns being evaluated to red
                document.getElementById("c" + l).style.backgroundColor = "#ff2020";
                document.getElementById("c" + l2).style.backgroundColor = "#ff2020";

                await sleep(columnSpeed());  // Delay user selected amount of time

                // Set columns being evaluated to red
                document.getElementById("c" + l).style.backgroundColor = "#ffa500";
                document.getElementById("c" + l2).style.backgroundColor = "#ffa500";

                // Set pixel height to adjust for changes
                for(let k = 0; k < columnRange; k++){               
                    document.getElementById("c" + k).style.height = heights[k] + "px";                          
                }

                // Check if button to pause sorting pressed
                if(document.getElementById("stop").value == "Off"){

                    // Set pivot column to original colour
                    document.getElementById("c" + p).style.backgroundColor = "#ffa500"; 

                    // Set selection sort button to default style to indicate algorithm finished
                    document.getElementById("quickSort").className = "button buttonAlgorithmDefault";
                    return;
                }
            } 

            // If there are elements on right side of pivot, then push right side to stack  
            if (p + 1 < h) { 
                stack[++top] = p + 1; 
                stack[++top] = h; 

                let h2 = p - 1;

                // Set columns being evaluated to red
                document.getElementById("c" + h).style.backgroundColor = "#ff2020";
                document.getElementById("c" + h2).style.backgroundColor = "#ff2020";

                await sleep(columnSpeed());  // Delay user selected amount of time

                // Set columns being evaluated to red
                document.getElementById("c" + h).style.backgroundColor = "#ffa500";
                document.getElementById("c" + h2).style.backgroundColor = "#ffa500";

                // Set pixel height to adjust for changes
                for(let k = 0; k < columnRange; k++){               
                    document.getElementById("c" + k).style.height = heights[k] + "px";                          
                }

                // Check if button to pause sorting pressed
                if(document.getElementById("stop").value == "Off"){

                    // Set pivot column to original colour
                    document.getElementById("c" + p).style.backgroundColor = "#ffa500";

                    // Set selection sort button to default style to indicate algorithm finished
                    document.getElementById("quickSort").className = "button buttonAlgorithmDefault";
                    return;
                }
            } 

            // Set pivot column to original colour
            document.getElementById("c" + p).style.backgroundColor = "#ffa500";

        }

        // Set pixel height to adjust for changes
        for(let k = 0; k < columnRange; k++){               
            document.getElementById("c" + k).style.height = heights[k] + "px";                          
        }

        // Set selection sort button to green to indicate algorithm running
        document.getElementById("quickSort").className = "button buttonAlgorithmDefault";

        algorithmLock = false;      // Unlock to indicate finished and othe algorithm can be called
    }

    function partition(low, high){

        let x = heights[high];
        let i = l-1;
        let temp;
    
        for(let j = low; j < h; j++){
            if(heights[j] <= x){
                i++;
    
                temp = heights[i];
                heights[i] = heights[j];
                heights[j] = temp;
            }
        }
    
        temp = heights[i+1];
        heights[i+1] = heights[high];
        heights[high] = temp;
    
        return i+1;
    }
}


// Heap sort algorithm
async function heapSort(){

    // Run algorithm when this or no other algorithm are currently running
    if(algorithmLock == false){
        algorithmLock = true;       // Lock algorithm to indicate this algorithm is running
        
        // Set quick sort button to green to indicate algorithm running
        document.getElementById("heapSort").className = "button buttonAlgorithmSelected";

        // Read input column range slider value
        let columnRange = document.getElementById("sliderRange").value;
        let heights = [];

        // Put values in heights array unordered
        for(let i = 0; i < columnRange; i++){
            heights[i] = parseInt(document.getElementById("c" + i).style.height);
        }

        // Build heap
        for(let i = Math.round((columnRange/2)-1); i >= 0; i--){
            heapify(columnRange, i);
        }

        for(let i = columnRange - 1; i > 0; i--){
            let temp = heights[0];
            heights[0] = heights[i];
            heights[i] = temp;

            // Check if button to pause sorting pressed
            if(document.getElementById("stop").value == "Off"){

                // Set pivot column to original colour
                document.getElementById("c0").style.backgroundColor = "#ffa500"; 
                document.getElementById("c"+i).style.backgroundColor = "#ffa500"; 

                // Set selection sort button to default style to indicate algorithm finished
                document.getElementById("heapSort").className = "button buttonAlgorithmDefault";
                return;
            }

            // Set columns being evaluated to red
            document.getElementById("c0").style.backgroundColor = "#ff2020";
            document.getElementById("c" + i).style.backgroundColor = "#ff2020";

            await sleep(columnSpeed());  // Delay user selected amount of time

            // Set columns being evaluated to red
            document.getElementById("c0").style.backgroundColor = "#ffa500";
            document.getElementById("c" + i).style.backgroundColor = "#ffa500";

            // Set pixel height to adjust for changes
            for(let k = 0; k < columnRange; k++){               
                document.getElementById("c" + k).style.height = heights[k] + "px";                          
            }
            
            heapify(i, 0);
        }


        // Set quick sort button to green to indicate algorithm running
        document.getElementById("heapSort").className = "button buttonAlgorithmDefault";

        algorithmLock = false;      // Unlock to indicate finished and othe algorithm can be called
    }

    async function heapify(n, heapIndex){
        let largest = heapIndex;    // Initialize largest as root 
        let l = 2*heapIndex + 1;
        let r = 2*heapIndex + 2;

        // Check if button to pause sorting pressed
        if(document.getElementById("stop").value == "Off"){

            // Set selection sort button to default style to indicate algorithm finished
            document.getElementById("heapSort").className = "button buttonAlgorithmDefault";
            return;
        }
        
        if(l < n && heights[l] > heights[largest]){
            largest = l;
        }

        if (r < n && heights[r] > heights[largest]){
            largest = r;
        }

        if(largest != heapIndex){
            let temp = heights[heapIndex];
            heights[heapIndex] = heights[largest];
            heights[largest] = temp;
           
            heapify(n, largest);
        }     

        // Set columns being evaluated to red
        document.getElementById("c" + heapIndex).style.backgroundColor = "#ff2020";
        document.getElementById("c" + largest).style.backgroundColor = "#ff2020";

        await sleep(columnSpeed());  // Delay user selected amount of time

        // Set columns being evaluated to red
        document.getElementById("c" + heapIndex).style.backgroundColor = "#ffa500";
        document.getElementById("c" + largest).style.backgroundColor = "#ffa500";
        
        // Set pixel height to adjust for changes
        for(let k = 0; k < columnRange; k++){               
            document.getElementById("c" + k).style.height = heights[k] + "px";                          
        }
    }
}