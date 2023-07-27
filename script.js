
let jobs = [];
const addButton = document.querySelector('#add_button');
const inputContainer = document.querySelector('.input-container')
const applyButton = document.querySelector('#applyButton');
const closeFormBTN = document.querySelector('#closeForm');
const form = document.querySelector('#form');
const contentContainer = document.getElementById('content-container');
const auftragContainer = document.getElementById('auftrag-container');
const deleteJobsBTN = document.getElementById('deleteJobs');

addButton.addEventListener('click', openAddForm);
applyButton.addEventListener('click', applyForm);
closeFormBTN.addEventListener('click', closeForm);


function loader() {
    loadLocalStorage();
    renderJobs()
}


function loadLocalStorage() {
    const storedJobs = localStorage.getItem('Jobs');
    jobs = storedJobs ? JSON.parse(storedJobs) : [];
}


function renderJobs() {
   auftragContainer.innerHTML = ``;
   for (let i = 0; i < jobs.length; i++) {
       const element = jobs[i];
       auftragContainer.innerHTML +=`
       <div  class="auftrag" id="${i}">
           <span>${element.fahrzeug}</span>
           <span>${element.problem}</span>
           <span>${element.ersteller}</span>
       </div>
       `
   }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fahrzeug = document.getElementById('fahrzeug').value;
    const problem = document.getElementById('problem').value;
    const ersteller = document.getElementById('ersteller').value;

    addJob(fahrzeug, problem, ersteller);
    form.reset();
});


function addJob(fahrzeug, problem, ersteller) {
    var job = {
        fahrzeug: fahrzeug,
        problem: problem,
        ersteller: ersteller
    };
    jobs.push(job);
    localStorage.setItem('Jobs',JSON.stringify(jobs));
    renderJobs();
};


function animatetForm() {
    inputContainer.style.bottom = '0';
}


function openAddForm(event) {
    animatetForm();
}


function applyForm(event) {
    if(form.checkValidity()){
        
    };
}

function closeForm(event) {
    inputContainer.style.bottom = '-400px';
    form.reset()
}