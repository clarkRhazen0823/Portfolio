(function () {
  emailjs.init({
    publicKey: "bncpQ8tUIxIxIu9rQ",
  });
})();


function sendMail(event){
  event.preventDefault();

  let parms = {
    name: document.getElementById("input-name").value,
    email: document.getElementById("input-email").value,
    phone: document.getElementById("input-phone").value,
    message: document.getElementById("input-msg").value,
  };

  emailjs
    .send("service_343483u", "template_49jo4vj", parms)
    .then(() => {
      alert("> Email Sent, Wait for your Gmail to notify if your reciever recieved your message <");
      
      event.target.reset();
    })

    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Oops! Something went wrong while sending the email.");
    });
}