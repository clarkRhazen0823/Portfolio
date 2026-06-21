// Initialize EmailJS
(function () {
  emailjs.init({ publicKey: "bncpQ8tUIxIxIu9rQ" });
})();

// Constants for Button HTML states
const BTN_STATES = {
  default: '<i class="fa-solid fa-envelope"></i> Send',
  loading: '<i class="fa-solid fa-envelope fa-beat-fade"></i> Sending...',
  success:
    '<i class="fa-solid fa-envelope-circle-check fa-bounce" style="--fa-animation-iteration-count: 1;"></i> Message sent',
};

// Helper function to manage button appearance
const updateButtonUI = (btn, html, isDisabled, isSuccess = false) => {
  btn.innerHTML = html;
  btn.disabled = isDisabled;
  isSuccess
    ? btn.classList.add("success-state")
    : btn.classList.remove("success-state");
};

// Main submit function
async function sendMail(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const getVal = (id) => document.getElementById(id).value; // Shortcut for cleaner values

  // 1. Set to Loading State
  updateButtonUI(submitBtn, BTN_STATES.loading, true);

  // 2. Gather form data safely
  const parms = {
    firstName: getVal("input-first"),
    lastName: getVal("input-last"),
    email: getVal("input-email"),
    phone: getVal("input-phone"),
    subject: getVal("input-subject"),
    message: getVal("input-msg"),
  };

  try {
    // 3. Await the email send process
    await emailjs.send("service_343483u", "template_49jo4vj", parms);

    // 4. On Success: Update UI and clear form
    updateButtonUI(submitBtn, BTN_STATES.success, true, true);
    event.target.reset();

    // 5. Alert the user and immediately reset button afterwards
    setTimeout(() => {
      alert(
        "Email sent successfully! Wait for your Gmail to notify if your receiver received your message. Thank you.",
      );
      updateButtonUI(submitBtn, BTN_STATES.default, false);
    }, 100);
  } catch (error) {
    // 6. On Error: Log it, revert button UI instantly, and alert user
    console.error("EmailJS Error:", error);
    updateButtonUI(submitBtn, BTN_STATES.default, false);

    setTimeout(() => {
      alert(
        "Oops! Something went wrong while sending the email. Please try again.",
      );
    }, 100);
  }
}
