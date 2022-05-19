// Add Eventliestner on click to myBtn which will exectute getData Function
document.getElementById('myBtn').addEventListener('click', getData);

//Variable Which will store array of objects of author
let users = [];

//Function which returns 1 if the object of array needs to be sorted and 0 if it does not need to be sorted
function sortName(a,b){
    const nameA = a.first.toUpperCase();
    const nameB = b.first.toUpperCase();
    if(nameA<nameB) {
        return -1;
    }
    if(nameA>nameB) {
        return 1;
    }

    return 0;
}

//Same function as sortName but used for Age to sort the array users according to their age
function sortAge(a,b) {
	const ageA = a.age;
	const ageB = b.age;
	if(ageA<ageB){
		return -1;
	}
	if(ageA>ageB){
		return 1;
	}
	
	return 0;
}

//Function to display the sorted Array
function displaySorted() {
	
	let output = "<h2><center>Get User Data</center></h2>";

	users.forEach(user => {
	output += `
                <div class="container">
                    <div class="card mt-4 bg-light">
                        <ul class="list-group">
                            <li class="list-group-item"><h2>Name: ${user.first}</h2></li>
                            <li class="list-group-item"><img src="${user.picture}"></li>
                            <li class="list-group-item">Phone Number: ${user.cell}</li>
                            <li class="list-group-item">Age: ${user.age}</li>
                            <li class="list-group-item">Gender: ${user.gender}</li>
                            <li class="list-group-item">Country: ${user.location}</li>
                        </ul>
                    </div>
                </div> `;
	})
	document.getElementById('output').innerHTML = output;
}

//Creating Functions for onclick on sorting buttons
function sortNameA(){
	users.sort(sortName);
	displaySorted();
}

function sortNameZ(){
	users.sort(sortName);
	users.reverse();
	displaySorted();
}

function sortAge(){
	users.sort(function(a,b){
		const ageA = a.age;
		const ageB = b.age;
		if(ageA<ageB){
			return -1;
		}
		if(ageA>ageB){
			return 1;
		}
		
		return 0;
	});
	displaySorted();
}

function sortAgedec(){
	users.sort(function(a,b){
		const ageA = a.age;
		const ageB = b.age;
		if(ageA<ageB){
			return -1;
		}
		if(ageA>ageB){
			return 1;
		}
		
		return 0;
	});
	users.reverse();
	displaySorted();
}


var slider = document.getElementById("slider");
var output = document.getElementById("value");
output.innerHTML = slider.value; // Display the default slider value
var count = 2501;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  count = this.value;
}


function getData() {
    // console.log('test');

    //Get API
    fetch('https://randomuser.me/api/?results='+count)
        .then(res => res.json())
        .then(data => {
            // console.log(data);

            let author = data.results;
            // console.log(author);

            //Get Data Value
            let output = "<h2><center>Get User Data</center></h2>";

            //Get Data Through Loop
            users = author.map(function (lists) {
                output += `
                <div class="container">
                    <div class="card mt-4 bg-light">
                        <ul class="list-group">
                            <li class="list-group-item"><h2>Name: ${lists.name.first}</h2></li>
                            <li class="list-group-item"><img src="${lists.picture.large}"></li>
                            <li class="list-group-item">Phone Number: ${lists.cell}</li>
                            <li class="list-group-item">Age: ${lists.dob.age}</li>
                            <li class="list-group-item">Gender: ${lists.gender}</li>
                            <li class="list-group-item">Country: ${lists.location.country}</li>
                        </ul>
                    </div>
                </div> `;
				return {first:lists.name.first, location:lists.location.country,cell:lists.cell,age:lists.dob.age,gender : lists.gender, picture:lists.picture.large};
            });

			//Adding Sorting Buttons to sortBtns container
			let buttons = "<input type='button' value='Sort By Name A to Z' class='sortBtn' onclick='sortNameA()'><input type='button' value='Sort By Name Z to A' class='sortBtn' onclick='sortNameZ()'><input type='button' value='Sort By Age Ascending' class='sortBtn' onclick='sortAge()'><input type='button' value='Sort By Age descending' class='sortBtn' onclick='sortAgedec()'>";
            //Show On Our Screen All Data
			document.querySelector('.shortBtns').innerHTML = buttons;
            document.getElementById('output').innerHTML = output;

        });
};
