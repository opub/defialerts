let formValid = false;

document.addEventListener("DOMContentLoaded", function () {
    console.log("document loaded");

    const email = document.getElementById("email");
    email.addEventListener("input", function (event) {
        console.log("validate email");
        if (email.validity.typeMismatch) {
            email.className = "invalid";
        } else {
            email.className = !email.validity.valueMissing ? "valid" : "";
        }
        validateForm();
    });

    for (let name of ["token", "above", "below"]) {
        let field = document.getElementById(name);
        field.addEventListener("input", function (event) {
            validateStyle(field);
        });
    }

    document.getElementById("submit").addEventListener('click', function (ev) {
        ev.preventDefault();
        if (formValid) {
            grecaptcha.execute();
        }
    });
});

function validateStyle(field) {
    console.log("validate", field.id);
    if (field.validity.valueMissing) {
        field.className = "";
    } else if (field.checkValidity()) {
        field.className = "valid";
    } else {
        field.className = "invalid";
    }
    validateForm();
}

function validateForm() {
    console.log("validate form");
    let valid = true;
    for (let name of ["email", "token", "above", "below"]) {
        let field = document.getElementById(name);
        valid = valid && (field.className == "valid");
    }
    const submit = document.getElementById("submit");
    submit.className = valid ? "valid" : "invalid";
    formValid = valid;
}

function onSubmit(recaptcha) {
    const data = { 
        email: get('email'),
        token: get('token'),
        above: get('above'),
        below: get('below'),
        verify: recaptcha
    };

    fetch('/api/v1/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function get(name) {
    return document.getElementById(name).value;
}