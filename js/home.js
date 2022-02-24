const studentData = JSON.parse(localStorage.getItem("sra"));

const output = () => {
  localStorage.removeItem("sra");
  window.location.href = "../index.html";
};

if (localStorage.getItem("sra") === null) {
  output();
} else {
  const student = {
    name: document.querySelector(".name"),
    registration: document.querySelector(".registration"),
    classroom: document.querySelector(".classroom"),
    course: document.querySelector(".course"),
    schoolGrade: document.querySelector(".schoolGrade"),
  };

  student.name.innerHTML = `<strong>Nome:</strong> ${studentData.name}`;
  student.registration.innerHTML = `<strong>Matrícula:</strong> ${studentData.registration}`;
  student.classroom.innerHTML = `<strong>Sala:</strong> ${studentData.classroom}`;
  student.course.innerHTML = `<strong>Curso:</strong> ${studentData.course}`;
  student.schoolGrade.innerHTML = `<strong>Série:</strong> ${studentData.schoolGrade}°`;
}

const requirement = async () => {
  fetch("https://lunch-requirement-system.herokuapp.com/sra-api/requirement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + studentData.token,
    },
    body: JSON.stringify({
      registration: studentData.registration,
      name: studentData.name,
      classroom: studentData.classroom,
      course: studentData.course,
      schoolGrade: studentData.schoolGrade,
    }),
  })
    .then((response) => response.json())
    .then((body) => checkoutRequirement(body));
};

const checkoutRequirement = (data) => {
  if (!data.token) {
    localStorage.removeItem("sra");
    window.location.href = "../index.html";
  }
  if (!data.requirement) {
    return (document.querySelector(".alert").innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong class="text">${data.message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
  }
  return (document.querySelector(".alert").innerHTML = `
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong class="text">${data.message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`);
};
