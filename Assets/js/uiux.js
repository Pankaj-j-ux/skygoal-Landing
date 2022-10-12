/** @format */

function toggleClock1() {
  var ans = document.getElementById("answer1");
  var image = document.getElementById("image1");
  var displaySetting = ans.style.display;
  var clockButton = document.getElementById("clockButton1");
  if (displaySetting == "block") {
    ans.style.display = "none";
    ans.style.borderTop = "none";
    image.style.transform = "rotate(180deg)";
  } else {
    ans.style.display = "block";
    ans.style.borderTop = "Solid rgba(0, 0, 0, 0.2)";
    image.style.transform = "rotate(180deg)";
  }
}

function toggleClock2() {
  var ans = document.getElementById("answer2");
  var image = document.getElementById("image2");
  var displaySetting = ans.style.display;
  var clockButton = document.getElementById("clockButton2");
  if (displaySetting == "block") {
    ans.style.display = "none";
    ans.style.borderTop = "none";
    image.style.transform = "rotate(180deg)";
  } else {
    ans.style.display = "block";
    ans.style.borderTop = "Solid rgba(0, 0, 0, 0.2)";
    image.style.transform = "rotate(180deg)";
  }
}

function toggleClock3() {
  var ans = document.getElementById("answer3");
  var image = document.getElementById("image3");
  var displaySetting = ans.style.display;
  var clockButton = document.getElementById("clockButton3");
  if (displaySetting == "block") {
    ans.style.display = "none";
    ans.style.borderTop = "none";
    image.style.transform = "rotate(180deg)";
  } else {
    ans.style.display = "block";
    ans.style.borderTop = "Solid rgba(0, 0, 0, 0.2)";
    image.style.transform = "rotate(180deg)";
  }
}
function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

var progress = document.getElementById("progresbar");

// CONTACT FORM

var notifys = document.getElementById("notify");
var submitButton = document.getElementById("buttonsDis");
var modalsBody = document.getElementById("modalsBody");
let formPopup = true;
let canDownload = false;
let buttonClick = false;
var openModals = document.getElementById("Download");
var openModals2 = document.getElementById("Download2");

// POP UP THE MODAL WHEN USER ENTERS
setTimeout(() => {
  $("#exampleModal").modal("show");
}, 2000);

// CHECK IF THE MODAL IS CLOSED AND POP UP AGAIN AFTER 30 seconds
$("#exampleModal").on("hide.bs.modal", function (e) {
  let setTimeID = 0;
  clearTimeout(setTimeID);

  //console.log(e);
  // if(canDownload){
  //   canDownload = false
  // }

  // do something...
  if (formPopup) {
    const promting = setTimeout(() => {
      if (!formPopup) return;
      $("#exampleModal").modal("show");
    }, 30000);
    console.log(promting);

    setTimeID = promting;
  }
});

// SHOW SUCCESS IN FORM
const showSuccess = (message) => {
  notifys.textContent = message;
  notifys.className = "alert alert-success";
};

// SHOW ERROR IN FORM
const ShowWarn = (message) => {
  notifys.textContent = message;
  notifys.className = "alert alert-danger";
};

// THANK YOU GIF
const thankYou = () => {
  modalsBody.style.backgroundColor = "#fff";
  modalsBody.innerHTML =
    '<div class="text-center "><img src="../Assets/gif/thankyou.gif" class="img-fluid" > <h5 class="fixed-bottom position-absolute" style="bottom:50px; font-weight:bold;padding:10px">We are soo glad that you connected with us We look forward to being a part of your career Our team will contact you soon for more details.</h5></div>';
};

// DOWNLOAD FILE
function downloadFile(url, fileName) {
  const startTime = new Date().getTime();

  request = new XMLHttpRequest();

  request.responseType = "blob";
  request.addEventListener('progress', function(e) {
    var percent_complete = (e.loaded / e.total)*100;
    console.log(percent_complete);
  });
  request.open("get", url, true);
  request.send();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const imageURL = window.URL.createObjectURL(this.response);

      const anchor = document.createElement("a");
      anchor.href = imageURL;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
    }
  };

  request.onprogress = function (e) {
    const percent_complete = Math.floor((e.loaded / e.total) * 100);

    const duration = (new Date().getTime() - startTime) / 1000;
    const bps = e.loaded / duration;

    const kbps = Math.floor(bps / 1024);

    const time = (e.total - e.loaded) / bps;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    progress.ariaValueNow = percent_complete;
    (progress.style.width = `${percent_complete}%`),
      (progress.textContent = `${percent_complete}%`);
    // console.log(
    //   `${percent_complete}% - ${kbps} Kbps - ${minutes} min ${seconds} sec remaining`
    // );

    if (percent_complete == 100) {
      submitButton.className = "btn btn-primary disabled";
      submitButton.innerHTML = "Downloading Please wait..";
      thankYou();
      canDownload = false;
    }
  };
}

// SHEET SCRIPT URL AND FORM DATA COLLECTION
const scriptURL = "https://sheetdb.io/api/v1/djbesgz3los5v";
const form = document.forms["callBack"];

// CONDITION TO TO ONLY ALLOW DOWNLOAD THE FILE USING BUTTON DOWNLOAD
openModals.addEventListener("click", () => {
  $("#exampleModal").modal("show");
  canDownload = true;
  //console.log(buttonClick)
});

openModals2.addEventListener("click", () => {
  $("#exampleModal").modal("show");
  canDownload = true;
  //console.log(buttonClick)
});

// LEAD FORM EVENT LISTNER HERE

form.addEventListener("submit", async (event) => {
  //console.log(event)
  event.preventDefault();

  const fname = form.elements["first"];
  const last = form.elements["last"];
  const email = form.elements["email"];
  const city = form.elements["city"];
  const phone = form.elements["phone"];
  //console.log(phone.value.length)
  //console.log(_.isEmpty(fname.value))
  // FORM VALIDATION HERE
  if (_.isEmpty(fname.value)) {
    return ShowWarn("First name cannot be empty");
  }
  if (_.isEmpty(last.value)) {
    return ShowWarn("Last name cannot be empty");
  }
  if (_.isEmpty(email.value)) {
    return ShowWarn("Email cannot be empty");
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return ShowWarn("Please enter a valid Email");
  }
  if (_.isEmpty(phone.value)) {
    return ShowWarn("Phone number is required");
  }
  if (phone.value.length > 10) {
    return ShowWarn("Phone number must consist of 10 numbers");
  }
  if (phone.value.length !== 10) {
    return ShowWarn("Phone number must consist of 10 numbers");
  }
  if (!/^(?:\W*\d){10}\W*$/.test(phone.value)) {
    return ShowWarn("Phone number is invalid");
  }

  if (_.isEmpty(city.value)) {
    return ShowWarn("City name is required");
  }

  const formData = new FormData(form);
  const date = moment().format("DD-MM-YYYY , hh:mm:ss");
  formData.append("TimeStamp", date);

  //console.log("form data",formData)

  // TURN ON THE LOADER HERE INSIDE BUTTON
  submitButton.innerHTML =
    ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please Wait...';
  submitButton.className = "btn btn-primary disabled";

  // SUBMIT DATA TO GOOGLE SHEET
  await fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        formPopup = false;
        if (canDownload) {
          console.log(canDownload);
          downloadFile("../../Assets/pdf/uiux.pdf", "UI-UX-Course-Brochure");
        }
        if (canDownload !== true) {
          submitButton.innerHTML = "Submit";
        }

        if (canDownload !== true) {
          thankYou();
        }

        //window.location.replace("thanku.html")
      } else {
        ShowWarn("Something went wrong, please try again !");
      }
    })
    .catch((error) => {
      console.log(error);
      ShowWarn("Something went wrong, please try again !");
    });

  //https://script.google.com/macros/s/AKfycbxqdh19QHTJnAheLOFQlEskkcSwfmNxQEvQAozng2cbd2ftktlANV9GnSeOvviP7VmE/exec
  // handle the form data
});
