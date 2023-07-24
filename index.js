var algorithm = document.getElementById("algorithm");
var btn = document.getElementById("btn");

var algorithmValue = algorithm.options[algorithm.selectedIndex].value;
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var algorithmValue = algorithm.options[algorithm.selectedIndex].value;
  if (algorithmValue === "") {
    alert("Please select an algorithm");
  } else {
    // do something
    algorithmCallback(algorithmValue);
  }
});

// Path: algorithm.js
function algorithmCallback(algorithmValue) {
  console.log(algorithmValue);
  var frame = document.getElementById("frame").value;
  var arrayValue = document.getElementById("arr").value.split(" "); // array of numbers
//   gridview(frame, arrayValue.length, arrayValue);
  console.log(arrayValue);
  if (algorithmValue === "fifo") {
    fifo(Number(frame), arrayValue);
  } else if (algorithmValue === "lru") {
    lru(Number(frame), arrayValue);
  } else if (algorithmValue === "optimal") {
    optimal(Number(frame), arrayValue);
  }
}
//grid view
async function gridview(frame,arr) {
  var table = document.getElementById("grid");
  var row = table.insertRow(); 
  for (var i = 0; i < frame; i++) {
      var cell = row.insertCell(i);
      cell.innerHTML = arr[i];

	await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },800))
  }
}

// FIFO ALGORITHM
async function fifo(n, element) {
//   console.log(n, element);
  let res = new Array(n).fill('*');
  let pos = 0;
  let hit = 0;
  let miss = 0;
  for (let i of element) {
    if (!res.includes(i)) {
      res[pos] = i;      
      pos = (pos + 1) % n;
      miss++;
    } else {
      hit++;
    }
    gridview(n,res);
	await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },(n+1)*1000))
  }
  console.log("Hit: " + hit);
  console.log("Miss: " + miss);
  let hitRatio = hit / (hit + miss);
  let missRatio = miss / (hit + miss);
  console.log("Hit Ratio: " + hitRatio);
  console.log("Miss Ratio: " + missRatio);
  document.getElementById("hits").innerHTML = "Hit: " + hit;
  document.getElementById("miss").innerHTML = "Miss: " + miss;
  document.getElementById("ratioh").innerHTML = "Hit Ratio: " + hitRatio;
  document.getElementById("ratiom").innerHTML = "Miss Ratio: " + missRatio;
  
}

// LRU ALGORITHM
async function lru(n, pages) {
  let s = new Set();
  let indexes = new Map();
  let miss = 0;
  let hit = 0;
  for (let i = 0; i < pages.length; i++) {
    if (s.size < n) {
      if (!s.has(pages[i])) {
          s.add(pages[i]);
            var k = 0;
            var table = document.getElementById("grid");
            var row = table.insertRow(); 
          for (let itr of s.values()) {
            var cell = row.insertCell(k);
            cell.innerHTML = itr;
            k++;
            console.log(itr);
  await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },500))
          }   
          miss++;
      }
      else {
        hit++;
      }
      indexes.set(pages[i], i);
    } else {
      if (!s.has(pages[i])) {
        let lru = Number.MAX_VALUE,
          val = Number.MIN_VALUE;
        for (let itr of s.values()) {
          let temp = itr;
          if (indexes.get(temp) < lru) {
            lru = indexes.get(temp);
            val = temp;
          }
        }
        // Remove the indexes page
        s.delete(val);
        //remove lru from hashmap
        indexes.delete(val);
        // insert the current page
        s.add(pages[i]);

        var k = 0;
        var table = document.getElementById("grid");
       var row = table.insertRow(); 
        for(let itr of s.values()) {
          
          var cell = row.insertCell(k);
          cell.innerHTML = itr;
          k++;
  await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },500))
  
        }
        miss++;
      } else {
        hit++;
      }
      // Update the current page index
      indexes.set(pages[i], i);
    }
  }
  console.log("Hit: " + hit);
  console.log("Miss: " + miss);
  let hitRatio = hit / (hit + miss);
  let missRatio = miss / (hit + miss);
  console.log("Hit Ratio: " + hitRatio);
  console.log("Miss Ratio: " + missRatio);
  document.getElementById("hits").innerHTML = "Hit: " + hit;
  document.getElementById("miss").innerHTML = "Miss: " + miss;
  document.getElementById("ratioh").innerHTML = "Hit Ratio: " + hitRatio;
  document.getElementById("ratiom").innerHTML = "Miss Ratio: " + missRatio;
}


// OPTIMAL ALGORITHM
async function optimal(n, element) {
  let res = new Array(n).fill('*');
  let pos = 0;
  let hit = 0;
  let miss = 0;
  for (let i = 0; i < element.length; i++) {
    if (!res.includes(element[i])) {
      if (res.includes(-1)) {
        res[pos] = element[i];
        pos = (pos + 1) % n;
        miss++;
      } else {
        let max = -1;
        let maxIndex = 0;
        for (let j = 0; j < n; j++) {
          let temp = element.slice(i + 1).indexOf(res[j]);
          if (temp === -1) {
            maxIndex = j;
            break;
          } else if (temp > max) {
            max = temp;
            maxIndex = j;
          }
        }
        res[maxIndex] = element[i];
        miss++;
      }
    } else {
      hit++;
    }
    gridview(n, res);
  // To pause the execution of code for 300 milliseconds
	await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },(n+1)*1000))
  
  }
  console.log("Hit: " + hit);
  console.log("Miss: " + miss);
  let hitRatio = hit / (hit + miss);
  let missRatio = miss / (hit + miss);
  console.log("Hit Ratio: " + hitRatio);
  console.log("Miss Ratio: " + missRatio);
  document.getElementById("hits").innerHTML = "Hit: " + hit;
  document.getElementById("miss").innerHTML = "Miss: " + miss;
  document.getElementById("ratioh").innerHTML = "Hit Ratio: " + hitRatio;
  document.getElementById("ratiom").innerHTML = "Miss Ratio: " + missRatio;
  
}
