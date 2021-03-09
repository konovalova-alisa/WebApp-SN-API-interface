
var customerForm = document.getElementById("CustomerForm");
var fullName = document.getElementById("name");
var email = document.getElementById("email");
var company = document.getElementById("company");
var submitButton = document.getElementById("submitButton");
var buttonSpinner = document.getElementById("buttonSpinner");
var buttonText = document.getElementById("buttonText");
var errorMessage = document.getElementById("unknownError");
var requestSN = document.getElementById("requestSN");
var infoBox = document.getElementById("infoBox");



function afterSubmit(e){

    e.preventDefault();

    if (customerForm.checkValidity() === false) {
        e.stopPropagation();
        for(field of customerForm.elements) {
            if(!field.checkValidity()){
                field.classList.add("is-invalid");
            }
        }
        return;
    }

    for(field of customerForm.elements) {
            field.classList.remove("is-invalid");
    }

    var info = {
        name: fullName.value,
        email: email.value,
        company: company.value,
    };

    var url = "https://script.google.com/macros/s/AKfycbw36cJKjwdhkL26TlvqUAQ3oIla6qRY3r_e_TdgHyW6a2tqjJcqf1NlOvadA-FGn1jm/exec";

    buttonText.textContent = "It will take few seconds...";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        body: JSON.stringify(info)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (requestSN.checked) {
            infoBox.classList.remove("d-none");
            console.log("User Id is: " + res.user_id + " and the password is " + res.password)
            document.getElementById("userID").textContent = res.user_id;
            document.getElementById("plim").textContent = res.password;
        }
        customerForm.reset();   
        buttonText.textContent = "Send";
        buttonSpinner.classList.add("d-none");
        submitButton.disabled = false;
      })
      .catch(err => {
        console.log(err);
        console.log("Something Went Wrong");
        unknownError.classList.remove("d-none");
        setTimeout(function(){
            unknownError.classList.add("d-none");
            buttonText.textContent = "Send";
            buttonSpinner.classList.add("d-none");
            submitButton.disabled = false;
        },3000);
      });

}

customerForm.addEventListener("submit",afterSubmit);


