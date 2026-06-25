// === INITIALIZATION ===
(function () {
  emailjs.init({ publicKey: "bncpQ8tUIxIxIu9rQ" });
})();

// === STATE MANAGEMENT ===
const BTN_STATES = {
  default: '<i class="fa-solid fa-envelope"></i> Send',
  loading: '<i class="fa-solid fa-envelope fa-beat-fade"></i> Sending...',
  success:
    '<i class="fa-solid fa-envelope-circle-check fa-bounce" style="--fa-animation-iteration-count: 1;"></i> Message Sent!',
  failed:
    '<i class="fa-solid fa-envelope fa-shake" style="--fa-animation-iteration-count: 1;"></i> Send',
};

// === UI HANDLER ===
const updateButtonUI = (btn, html, isDisabled, isSuccess = false) => {
  btn.innerHTML = html;
  btn.disabled = isDisabled;
  isSuccess
    ? btn.classList.add("success-state")
    : btn.classList.remove("success-state");
};

// === MAIN SUBMIT FUNCTION ===
async function sendMail(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const getVal = (id) => document.getElementById(id).value;

  updateButtonUI(submitBtn, BTN_STATES.loading, true);

  const first = getVal("input-first");
  const last = getVal("input-last");
  const phoneVal = getVal("input-phone");
  const subjectVal = getVal("input-subject");

  const parms = {
    fullName: `${first} ${last}`.trim(),
    firstName: first,
    email: getVal("input-email"),
    // Injects a line break (\n) ONLY if they filled it out. Otherwise, completely blank.
    phone: phoneVal ? `\n\nPhone: ${phoneVal}` : "",
    subject: subjectVal ? `Subject: ${subjectVal}\n\n` : "",
    // Auto-reply sentence variable
    replySubject: subjectVal ? subjectVal : "your recent inquiry",
    message: getVal("input-msg"),
  };

  try {
    await emailjs.send("service_343483u", "template_49jo4vj", parms);

    updateButtonUI(submitBtn, BTN_STATES.success, true, true);
    event.target.reset();

    setTimeout(() => {
      alert(
        "Email sent successfully! Wait for your Gmail to notify if your receiver received your message. Thank you.",
      );
      updateButtonUI(submitBtn, BTN_STATES.default, false);
    }, 100);
  } catch (error) {
    console.error("EmailJS Error:", error);
    updateButtonUI(submitBtn, BTN_STATES.failed, false);

    setTimeout(() => {
      alert(
        "Oops! Something went wrong while sending the email. Please try again.",
      );
      updateButtonUI(submitBtn, BTN_STATES.default, false);
    }, 100);
  }
}
