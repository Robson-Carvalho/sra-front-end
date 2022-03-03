const form = document.forms.login;

form.addEventListener("submit", (action) => {
  action.preventDefault();
  const [user, password] = form;
  login(user.value, password.value);
});

const login = async (registration, password) => {
  await fetch("https://lunch-requirement-system.herokuapp.com/sra-api/login", {
    method: "POST",

    body: JSON.stringify({
      registration: registration,
      password: password,
    }),

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => checkoutAuth(data));
};

const checkoutAuth = async (data) => {
  if (data.auth) {
    return addDataLocalStorage(data);
  }
  document.querySelector(".alert").innerHTML = `
      <h3>${data.message}</h3>
      <button onclick="closeAlert()" class="btn-close">x</button>
  `;
  form.reset();
  form.registration.focus();
};

const closeAlert = () => {
  document.querySelector(".alert").innerHTML = ``;
};

const addDataLocalStorage = ({ data }) => {
  const sraData = {
    token: data.token,
    name: data.name,
    registration: data.registration,
    course: data.course,
    classroom: data.classroom,
    schoolGrade: data.schoolGrade,
  };
  localStorage.setItem("sra", JSON.stringify(sraData));
  redirect();
};

const redirect = () => {
  window.location.href = "../home.html";
};
