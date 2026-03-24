// ===============================
// EMAILJS CONFIGURATION
// ===============================
(function () {
  emailjs.init("#"); 
})();

const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");
const submitBtn = form.querySelector(".btn-submit");
const btnText = submitBtn.querySelector(".btn-text");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Honeypot anti-spam
  if (form.website.value !== "") {
    return;
  }

  // UI: loading state
  submitBtn.disabled = true;
  btnText.textContent = "Envoi...";
  statusMsg.textContent = "";

  emailjs.sendForm(
    "#",   // 
    "#",  // 
    form
  ).then(
    () => {
      statusMsg.textContent = "Message envoyé";
      statusMsg.style.color = "#ffffffff";

      form.reset();
    },
    (error) => {
      console.error(error);
      statusMsg.textContent = "Erreur lors de l’envoi. Réessayez.";
      statusMsg.style.color = "#ff4d4d";
    }
  ).finally(() => {
    submitBtn.disabled = false;
    btnText.textContent = "Envoyer";
  });
});
