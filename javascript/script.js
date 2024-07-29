const checkBox_List = document.querySelectorAll(".circle-checkbox");
const inputFields = document.querySelectorAll(".txt");
const errMsg = document.querySelector(".err_label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector('.progress-label')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'well begun is half done',
    'Just a step away, keep going!',
    'You got this! Keep pushing forward',
    // 'You are doing great! Keep it up',
    'Whoa! You just completed all the goals, time for chill '
  ]

// const allGoals = JSON.parse(localStorage.getItem('allGoals'))||{
//   first: {
//     name:'',
//     completed:false
//   },
//   second: {
//     name:'',
//     completed:false
//   },
//   third: {
//     name:'',
//     completed:false
//   }
// }
const allGoals = JSON.parse(localStorage.getItem('allGoals'))||{}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length 
progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
progressValue.firstElementChild.textContent = `${completedGoalsCount}/${inputFields.length} completed`
progressLabel.textContent = allQuotes[completedGoalsCount]
checkBox_List.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    const checkInputFields = [...inputFields].every((input) => {
      return input.value;
    });
    if (checkInputFields) {
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length 
      progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
      progressValue.firstElementChild.textContent = `${completedGoalsCount}/${inputFields.length}completed`
      progressLabel.textContent = allQuotes[completedGoalsCount]
      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      progressBar.classList.add("show-err");
    }
  });
});

inputFields.forEach((input) => {
  
  if(allGoals[input.id]){
  input.value = allGoals[input.id].name
  if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed')
  }
  
}
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-err");
  });
  
  input.addEventListener("input", (event) =>{

    if(allGoals[input.id] && allGoals[input.id].completed){
      event.target.value = allGoals[input.id].name
      return
    }

  if( allGoals[input.id]){
    allGoals[input.id].name = input.value
  }else{
    allGoals[input.id] = {
      name : input.value,
      completed: false
    }
  }
    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
});
 