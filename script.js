//läd mir alle objekte die ich brauche und die events für die button
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
deleteJobsBTN.addEventListener('click', renderDeleteFields)



// checkt ob daten im LS sind und läd dann das array jobs. oder auch nicht wenns leer ist
function loader() {
    loadLocalStorage();
    renderJobs()
}

//läd LS in mein array jobs
function loadLocalStorage() {
    const storedJobs = localStorage.getItem('Jobs');
    jobs = storedJobs ? JSON.parse(storedJobs) : [];
}

// macht aus array jobs hintereinander sichtbare felder
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


//übergibt mir die im form eingegebenen werte an die nächste funktion
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fahrzeug = document.getElementById('fahrzeug').value;
    const problem = document.getElementById('problem').value;
    const ersteller = document.getElementById('ersteller').value;

    addJob(fahrzeug, problem, ersteller);
    form.reset();
});

//verpackt mir die übergebenen daten so das sie einheitlich ins array kommen und das array dann gesamt ins LS
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
        inputContainer.style.bottom = '-400px';
    };
}

function closeForm(event) {
    inputContainer.style.bottom = '-400px';
    form.reset()
}

//erstellt mir die felder neu aber mit x dahinter über dass man die einträge löschen kann
function renderDeleteFields(event) {
    auftragContainer.innerHTML = ``;
    for (let i = 0; i < jobs.length; i++) {
        const element = jobs[i];
        auftragContainer.innerHTML +=`
        <div  class="auftrag" id="${i}">
            <span>${element.fahrzeug}</span>
            <span>${element.problem}</span>
            <span>${element.ersteller}</span>
            <span onclick="deleteJob(${i})">X</span>
        </div>
        `
    }
}

//löscht mir den job der jeweils beim rendern eine id bekommt die id gibt an welche position weg kommt
function deleteJob(jobNumber) {
    jobs.splice(jobNumber,1);
    localStorage.setItem('Jobs',JSON.stringify(jobs));
    renderJobs();
}