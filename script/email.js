(function () {
  emailjs.init({
    publicKey: "bncpQ8tUIxIxIu9rQ",
  });
})();

function sendMail(event) {
  event.preventDefault();

  let parms = {
    firstName: document.getElementById("input-first").value,
    lastName: document.getElementById("input-last").value,
    email: document.getElementById("input-email").value,
    phone: document.getElementById("input-phone").value,
    subject: document.getElementById("input-subject").value,
    message: document.getElementById("input-msg").value,
  };

  emailjs
    .send("service_343483u", "template_49jo4vj", parms)
    .then(() => {
      alert(
        "Email sent successfuly, Wait for your Gmail to notify if your reciever recieved your message. Thank you.",
      );

      event.target.reset();
    })

    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert(
        "Oops! Something went wrong while sending the email. Pleas try again.",
      );
    });
}
