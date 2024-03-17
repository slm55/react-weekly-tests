const opt = window.location.href.split("=")[1];

const questions = [
  {
    q1: "Терминал көмегімен <b><i>react</i></b> деп аталатын папка жасау командасын жазыңыз.",
    q2: "Құрылған папкаға кіру командасын жазыңыз",
    q3: "Құрылған папка ішінен <b><i>week1</i></b> папкасын құру командасын жазыңыз.",
    q4: "<b><i>week1</i></b> папкасына кіру командасын жазыңыз.",
    q5: "<b><i>week1</i></b> папкасы ішінен <b><i>react</i></b> папкасынан бірден шығу командасын жазыңыз.",
    q6: {
      q: `Төмендегі элементтер үшін <b><i>Card</i></b> компонентін құрыңыз.`,
      code: `<div class="card"> 
            <h3>T-shirt</h3> 
            <h6>6000 tg</h6> 
            <img src="t-shirt.png" alt="T-shirt"> 
            <button class="add_to_cart">Add to cart</button> 
        </div> \n
        <div class="card">
            <h3>Jeans</h3>
            <h6>10000 tg</h6>
            <img src="jeans.png" alt="Jeans">
            <button class="add_to_cart">Add to cart</button>
        </div> \n
        <div class="card">
            <h3>Sneakers</h3>
            <h6>20000 tg</h6>
            <img src="sneakers.png" alt="Sneakers">
            <button class="add_to_cart">Add to cart</button>
        </div>`,
    },
    q7: "<b><i>Card</i></b> компонентін тиесілі мәндерімен шақырыңыз.",
  },
  {},
];

for (const q in questions[0]) {
  if (q == "q6") {
    const label = document.querySelector(`#${q}`);
    label.innerHTML = questions[0][q].q;
    label.nextElementSibling.nextElementSibling.innerText =
      questions[0][q].code;
    continue;
  }
  document.querySelector(`#${q}`).innerHTML = questions[0][q];
}

const beforeCode = `function App() {
    return ( 
        <div className="App">`;
const afterCode = ` </div>
);
}
export default App;
`;

const beforeCodeBox = document.querySelector("#before_code");
beforeCodeBox.innerText = beforeCode;
const afterCodeBox = document.querySelector("#after_code");
afterCodeBox.innerText = afterCode;

const labels = document.querySelectorAll("label");
labels.forEach((label, ind) => {
  label.innerHTML = `<b>Q${ind + 1}. </b>` + label.innerHTML;
});

const editor1 = CodeMirror.fromTextArea(document.querySelector("#a6"), {
  theme: "dracula",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  mode: { name: "jsx", globalVars: true },
  lineNumbers: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
});
editor1.setSize(600, 250);
const editor2 = CodeMirror.fromTextArea(document.querySelector("#a7"), {
  theme: "dracula",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  mode: { name: "jsx", globalVars: true },
  lineNumbers: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
});
editor2.setSize(400, 100);

document.querySelector("#question_submit").addEventListener("click", (e) => {
  e.preventDefault();
  e.target.style.cursor = "none";
  e.target.style.enabled = false;
  e.target.innerText = "Submitting...";

  const inputs = document.querySelectorAll("input");
  const answers = {};
  inputs.forEach((q, id) => (answers["q" + (id + 1)] = q.value));
  answers["q6"] = editor1.getValue();
  answers["q7"] = editor2.getValue();

  const student = localStorage.getItem("student") || null;
  const group = localStorage.getItem("group") || null;
  if (!student) {
    alert("You should have selected your name!");
    window.location.href = "index.html";
    return;
  }

  if (!group) {
    alert("You should have selected your group!");
    window.location.href = "index.html";
    return;
  }

  const studentAnswer = {
    answers: answers,
    student: student,
    group: group,
  };

  const url = new URL("https://65f5b6eb41d90c1c5e0a06aa.mockapi.io/answers");
  url.searchParams.append("student", student);

  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((students) => {
      if (students[0]) {
        alert("You have already submitted your answers!");
        window.location.href = "index.html";
        localStorage.setItem("submitted", JSON.stringify(true));
        return;
      } else {
        fetch("https://65f5b6eb41d90c1c5e0a06aa.mockapi.io/answers", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(studentAnswer),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((answer) => {
            alert("Your answers were successfully submitted.");
            window.location.href = "index.html";
            e.target.innerText = "Submit";
            localStorage.setItem("submitted", JSON.stringify(true));
          })
          .catch((error) => {
            const errorBox = document.querySelector(".error");
            errorBox.textContent = error.message;
          });
      }
    })
    .catch((error) => {});
});
