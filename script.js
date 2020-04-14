
window.addEventListener("load", function () {

   console.log("Fetching planetary data.");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         // console.log(json);
         const div = document.getElementById("missionTarget");
         let p = randomize(json.length, 0);
         console.log(`Selected planet at index ${p}.`);
         div.innerHTML += `
                <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${json[p].name}</li>
                        <li>Diameter: ${json[p].diameter}</li>
                        <li>Star: ${json[p].star}</li>
                        <li>Distance from Earth: ${json[p].distance}</li>
                        <li>Number of Moons: ${json[p].moons}</li>
                    </ol>
                <img src="${json[p].image}"><br><br>
            `;
      });
   });


   let form = document.getElementById("formTag");

   form.addEventListener("submit", function (event) {

      console.log("Form event handler initiated upon attempt to submit.");

      let status = document.getElementById("launchStatus");
      let faulty = document.getElementById("faultyItems");
      status.innerHTML = "Awaiting Information Before Launch";
      status.style.color = "black";
      faulty.style.visibility = "hidden";
      console.log(`Launch Status is ${faulty.style.visibility}.`);


      let pilot = document.querySelector("input[name = pilotName]");
      let copilot = document.querySelector("input[name = copilotName]");
      let fuel = document.querySelector("input[name = fuelLevel]");
      let cargo = document.querySelector("input[name = cargoWeight]");

      console.log(`Pilot: ${pilot.value}  Co-pilot: ${copilot.value}`);
      console.log(`Fuel: ${fuel.value}  Cargo: ${cargo.value}`);

      let fieldsNotEmpty, namesAlpha, amountsNumbers = false;

      if (pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "") {
         console.log("User did not fill all fields.");
         alert("All fields required.");
         event.preventDefault();
      } else {
         fieldsNotEmpty = true;
      }

      let alphaRegEx = /^[a-zA-Z +]+$/;
      if (!pilot.value.match(alphaRegEx) || !copilot.value.match(alphaRegEx)) {
         console.log("User tried to enter non-alphabetic name(s).");
         alert("Oops! Please check that you have entered valid names for both pilot and copilot.");
         event.preventDefault();
      } else {
         namesAlpha = true;
      }

      if (isNaN(Number(fuel.value)) || isNaN(Number(cargo.value))) {
         console.log("User did not use valid number(s).");
         alert("Oops! Please check that you have entered valid numbers for both fuel level and cargo weight.");
         event.preventDefault();
      } else {
         amountsNumbers = true;
      }

      if (fieldsNotEmpty && namesAlpha && amountsNumbers) {

         pilot.value = toTitleCase(pilot.value);
         copilot.value = toTitleCase(copilot.value);
         console.log(`${pilot.value} and ${copilot.value} are requesting to launch with ${fuel.value} gallons of fuel and ${cargo.value} pounds of cargo.`);

         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");

         pilotStatus.innerHTML = `Pilot, ${pilot.value}, ready`;
         copilotStatus.innerHTML = `Co-pilot, ${copilot.value}, ready`;

         if (fuel.value < 10000) {
            fuelStatus.innerHTML = "Not enough fuel to launch";
            status.style.color = "red";
            status.innerHTML = "Shuttle not ready for launch";
            console.log("Fuel status changed: not enough fuel to launch");
         }

         if (cargo.value > 10000) {
            cargoStatus.innerHTML = "Cargo is too heavy to launch";
            status.style.color = "red";
            status.innerHTML = "Shuttle not ready for launch";
            console.log("Cargo status changed: cargo is too heavy.");
         }

         if (fuel.value >= 10000 && cargo.value <= 10000) {
            status.style.color = "green";
            status.innerHTML = "Shuttle is ready for launch";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo weight low enough for launch";
            console.log("Go for launch!")
         }

         faulty.style.visibility = "visible";
         console.log(`Launch Status is ${faulty.style.visibility}.`);

         event.preventDefault();

      } else {
         console.log("Waiting for user to resubmit with valid data.");
      }

   });

});