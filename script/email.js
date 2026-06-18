(function () {
  emailjs.init({
    publicKey: "bncpQ8tUIxIxIu9rQ",
  });
})();


function sendMail(){
  let parms = {
    name: document.getElementById("input-name").value,
    email: document.getElementById("input-email").value,
    phone: document.getElementById("input-phone").value,
    message: document.getElementById("input-msg").value,
  };

  emailjs
    .send("service_343483u", "template_49jo4vj", parms)
    .then(alert("> Email Sent <"));
}