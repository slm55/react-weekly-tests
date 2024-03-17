let students = [];

const group_submit = document.querySelector("#group_submit");
group_submit.addEventListener("click", (e) => {
  e.preventDefault();
  const group = document.querySelector("#group").value;
  localStorage.setItem("group", group);
  switch (group) {
    case "23-2":
      students = [
        "Abylai",
        "Akerke",
        "Bekezhan",
        "Dina",
        "Ersultan D",
        "Ersultan M",
        "Malika",
        "Murager",
        "Roza",
        "Zhaidar",
        "Zhorabek",
        "Nazerke",
        "Aldiyar",
      ];
      break;
    case "23-3":
      students = [
        "Serzhan",
        "Dias",
        "Dulat",
        "Nurbek",
        "Abzal",
        "Kanatbek",
        "Dilnur",
        "Ulpan",
      ];
      break;
    default:
      students = [
        "Aikhan",
        "Akniet",
        "Aziz",
        "Bekarys",
        "Bernara",
        "Symbat",
        "Yasemin",
        "Zhanibek",
        "Nartai",
        "Ibrahim",
        "Zhibek",
      ];
      break;
  }
  updateForm();
});

function updateForm() {
  const groupForm = document.querySelector("#group_selection");
  groupForm.style.display = "none";
  const studentForm = document.querySelector("#student_name_selection");
  const select = document.querySelector("#student_name");
  select.innerHTML = students
    .map((student) => {
      return `<option value="${student}">${student}</option>`;
    })
    .join("");
  studentForm.style.display = "block";
}

const student_name_submit = document.querySelector("#student_name_submit");
student_name_submit.addEventListener("click", (e) => {
  e.preventDefault();
  const student_name = document.querySelector("#student_name").value;
  localStorage.setItem("student", student_name);
  window.location.href = "task.html";
});

const submitted = JSON.parse(localStorage.getItem("submitted")) || null;
if (submitted) {
    document.body.innerHTML = "You have finished your test!"
}