var contactFormSubmitBtnTxt = document.getElementById(
  "contactFormSubmitBtn"
).value;
// smooth scroll
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// navbar toggle
$("#nav-toggle").click(function () {
  $(this).toggleClass("is-active");
  $("ul.nav").toggleClass("show");
});

// Function to validate the contact form
function validateForm() {
  const name = document.forms["contact-form"]["from_name"].value;
  const email = document.forms["contact-form"]["from_email"].value;
  const message = document.forms["contact-form"]["message_html"].value;
  console.log(name, email, message);
  if (name == "" || email == "" || message == "") {
    Swal.fire("Error!", "Please fill in all fields", "error");

    return false;
  } else {
    document.getElementById("contactFormSubmitBtn").value = "Sending";
    let count = 1;
    setInterval(() => {
      if (count == 3) {
        document.getElementById("contactFormSubmitBtn").value = "Sending";
        count = 1;
      } else {
        for (let i = 0; i < count; i++) {
          document.getElementById("contactFormSubmitBtn").value += ".";
        }
        count++;
      }
    }, 300);
    // sendEmail(name, email, message);
    formSubmit({
      name,
      email,
      message,
    });
    return true;
  }
}

function formSubmit(data) {
  $.post({
    url: "https://script.google.com/macros/s/AKfycbzNpBNS9vDeNlNKL8cohZX7Nv9d48dMH9mQ25wfQvw-sbafPNj2Lp3Rp2vIkVa29Dkq/exec",
    data: data,
    success: function (data) {
      Swal.fire(
        "Good job!",
        "You have submitted the message and i will.....!",
        "success"
      );
      document.getElementById("form_submitted_msg").classList.remove("d-none");
      document.getElementById("contact-form").style.display = "none";
      document.getElementById("contactFormSubmitBtn").value =
        contactFormSubmitBtnTxt;
    },
    error: function (data) {
      Swal.fire(
        "Error!",
        "something went wrong, please ensure your internet is connected!",
        "error"
      );
      document.getElementById("contactFormSubmitBtn").value =
        contactFormSubmitBtnTxt;
    },
  });
}
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});


/*
 JS to toggle scroll axis styles
*/
const control = document.getElementById("direction-toggle");
const marquees = document.querySelectorAll(".marquee");
const wrapper = document.querySelector(".wrapper");

control.addEventListener("click", () => {
  control.classList.toggle("toggle--vertical");
  wrapper.classList.toggle("wrapper--vertical");
  [...marquees].forEach((marquee) =>
    marquee.classList.toggle("marquee--vertical")
  );
});
