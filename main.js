let submit = document.querySelector('[type="button"]');
let firstNameInput = document.querySelector('[name="firstName"]');
let lastNameInput = document.querySelector('[name="lastName"]');
let emailInput = document.querySelector('[name="email"]');
let queryOptions = document.getElementsByName('query');
let messageInput = document.querySelector('[name="message"]');
let checkbox = document.querySelector('[type="checkbox"]');
let checkmark = document.querySelector('.checkmark');
let checkmarkImg = document.querySelector('.checkmarkImg');
let generalEnquiry = document.querySelector('.generalEnquiry');
let supportRequest = document.querySelector('.supportRequest');
let popup = document.querySelector('.popup');

function resetErrorState(fieldName, errorElement) {  
    fieldName.style.borderColor = "hsl(187, 24%, 22%)"; // Reset the border color  
    fieldName.style.backgroundColor = "hsl(0, 0%, 100%)"; // Reset the border color  
    errorElement.innerHTML = ""; // Clear the error message  
}  

// Attach input event listeners to reset errors  
firstNameInput.addEventListener('input', () => resetErrorState(firstNameInput, document.querySelector('.fError')));  
lastNameInput.addEventListener('input', () => resetErrorState(lastNameInput, document.querySelector('.lError')));  
emailInput.addEventListener('input', () => resetErrorState(emailInput, document.querySelector('.emailError')));  
messageInput.addEventListener('input', () => resetErrorState(messageInput, document.querySelector('.messageError')));
// Add change event listener for radio buttons  
Array.from(queryOptions).forEach(radio => {  
    radio.addEventListener('change', () => {  
        resetErrorState(queryOptions[0], document.querySelector('.queryError')); // Clear the error message when a radio button is selected  
    });  
}); 

checkbox.addEventListener('change', () => {  
    if(!checkbox.checked) {  
        document.querySelector('.checkError').innerHTML = ""; // Clear checkbox error when unchecked  
    } else {  
        resetErrorState(checkbox, document.querySelector('.checkError')); // Reset if checked  
    }  

    if (checkbox.checked) {  
        checkmark.style.display = "none";  
        checkmarkImg.style.display = "block";  
    } else {  
        checkmark.style.display = "block";  
        checkmarkImg.style.display = "none";  
    }  
}); 


function validateForm (e) {
    let firstNameValid = false;
    let lastNameValid = false;
    let emailValid = false;
    let queryValid  = false;
    let messageValid = false;
    let checkboxValid = false;

    if(firstNameInput.value === ""){
        document.querySelector('.fError').innerHTML = "This field is required";
        firstNameInput.style.borderColor = "hsl(0, 66%, 54%)";
    } else{
        firstNameValid = true;
        document.querySelector('.fError').innerHTML = "";
    }

    if(lastNameInput.value === ""){
        document.querySelector('.lError').innerHTML = "This field is required";
        lastNameInput.style.borderColor = "hsl(0, 66%, 54%)";
    } else{
        lastNameValid = true;
        document.querySelector('.lError').innerHTML = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  

    if(!emailPattern.test(emailInput.value)){
        document.querySelector('.emailError').innerHTML = "Please enter a valid email address";
        emailInput.style.borderColor = "hsl(0, 66%, 54%)";
        emailInput.value = "email#example.com";
        emailValid = false;
    } else{
        emailValid = true;
        document.querySelector('.emailError').innerHTML = "";
    }

    queryValid = Array.from(queryOptions).some(radio => radio.checked);
    if(!queryValid){
        document.querySelector('.queryError').innerHTML = "Please select a query type";
        console.log("query type");
    } else{
        document.querySelector('.queryError').innerHTML = "";
        queryValid = true;
    }

    if(messageInput.value === ""){
        document.querySelector('.messageError').innerHTML = "This field is required";
        messageInput.style.borderColor = "hsl(0, 66%, 54%)";    
    } else{
        messageValid = true;
        document.querySelector('.messageError').innerHTML = "";
    }

    if(!checkbox.checked){
        document.querySelector('.checkError').innerHTML = "To submit this form, please consent to being contacted";
    } else{
        document.querySelector('.checkError').innerHTML = "";
        checkmark.style.display = "none";
        checkmarkImg.style.display = "block";
        checkboxValid = true;
    }

     // Prevent form submission and show popup if everything is valid  
     if(firstNameValid && lastNameValid && emailValid && queryValid && messageValid && checkboxValid) {  
        // Clear the popup message content if needed  
        popup.style.display = 'block'; // Show the popup
        
        // Clear all input fields  
        firstNameInput.value = '';  
        lastNameInput.value = '';  
        emailInput.value = '';  
        messageInput.value = ''; 

        // Uncheck all radio buttons  
        Array.from(queryOptions).forEach(radio => {  
            radio.checked = false;  
        }); 

        // Uncheck the checkbox and reset its visual state  
        checkbox.checked = false;  
        document.querySelector('.checkError').innerHTML = ""; // Clear checkbox error  
        checkmark.style.display = "block";  
        checkmarkImg.style.display = "none";  

         // Reset the query error message  
         document.querySelector('.queryError').innerHTML = ""; 
         
    } else {  
        // Prevent the default action if any input is invalid  
        e.preventDefault();     
    }  
} 
submit.addEventListener('click', validateForm); 