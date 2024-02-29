let habits = []
let habitList = document.getElementById("habitList");
let habitContainer = document.getElementById("habit-container");
let habitInput = document.getElementById("habitInput");
let addHabitBtn = document.getElementById("addHabitBtn");
// let priorityBtn = document.querySelector("input[name='priority']");
// let priorityBtnChecked = document.querySelectorAll("input[name='priority']:checked").value;




let createHabitListItem = (habitText, index) => {
    let priorityBtn = document.querySelector("input[name='priority']:checked").value;
    // let priorityBtnChecked = document.querySelectorAll("input[name='priority']:checked").value;
    console.log(priorityBtn)
    let li = document.createElement("li");
    li.innerHTML = ` 
    <h3>${habitText}</h3> 
    `;


    let selectedPriority = document.createElement("p");
    selectedPriority.innerText = priorityBtn + " Priority";
    li.append(selectedPriority);

    let streakNumber = document.createElement("p");
    streakNumber.innerText = "Streak: " + "0";
    li.append(streakNumber);

    //skapar ny completedknapp
    let completedHabitBtn = document.createElement("button");
    completedHabitBtn.innerText = "Mark as Completed";
    li.append(completedHabitBtn);

    completedHabitBtn.addEventListener("click", () => {
// Här ska det läggas in funktionalitet för att ändra streaknummer. typ index+1?
    });

    //skapar ny editknapp
    let editHabitBtn = document.createElement("button");
    editHabitBtn.innerText = "Edit Habit";
    li.append(editHabitBtn);

    //skapar ny deleteknapp
    let deleteHabitBtn = document.createElement("button");
    deleteHabitBtn.innerText = "Delete Habit";
    li.append(deleteHabitBtn);


    deleteHabitBtn.addEventListener("click", () => {
        li.remove();

        //tar bort habit med rätt index från arrayen
        let habitIndex = habits.indexOf(habitText);
        habits.splice(habitIndex, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
    });

    habitList.append(li);

    return li;
};


let onRender = () => {
    //kollar om det finns data i localStorage
    if (localStorage.getItem("habits")) {
        habits = JSON.parse(localStorage.getItem("habits"));
        //skapar li för varje habit

        habits.forEach((habit, i) => {
           
            let li = createHabitListItem(habit);
            habitList.append(li);

        });
    };
};


addHabitBtn.addEventListener("click", () => {
    
    //säkerställer att prio är vald
    let priorityBtn = document.querySelectorAll('input[name="priority"]');
    let prioritySelected = false;
    priorityBtn.forEach(radio => {
        if (radio.checked) {
            prioritySelected = true;
        }
    });

    if (!prioritySelected) {
        alert("Please select a priority for your new habit.");
        return;
    };

    let newHabit = habitInput.value;
    let li = createHabitListItem(newHabit);
    habitList.append(li);

    //sparar värden i localStorage
    habits.push(newHabit);
    
    localStorage.setItem("habits", JSON.stringify(habits));
    habitInput.value = "";

});

onRender();
