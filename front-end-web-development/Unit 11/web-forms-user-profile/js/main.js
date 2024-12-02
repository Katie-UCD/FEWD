(() => {
  // globals
  const userProfile = document.querySelector('.user-profile');
  const userProfileForm = userProfile.querySelector('form');
  const userProfileSubmit = userProfile.querySelector('#submit');
  const userProfileLSName = 'userProfileFormData';

  let userProfileFormData = new FormData(userProfileForm);
  let userProfileLocalFormData = {};

  function getFormData() {
    // Validate form fields and update `userProfileLocalFormData`
    userProfileFormData = new FormData(userProfileForm); // Update FormData
    userProfileLocalFormData = {}; // Reset local form data object

    let isValid = true;

    for (let [key, value] of userProfileFormData) {
      const field = document.querySelector(`[name=${key}]`);
      if (!field) continue;

      if (value === '') {
        field.style.border = '1px solid red';
        document.getElementById('validateError').style.display = 'block';
        isValid = false;

        // Optional: Display error message
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.textContent = `${key.replace('_', ' ')} is required.`;
          errorMsg.style.display = 'block';
        }
      } else {
        field.style.border = '1px solid darkgray';

        // Hide error message
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.style.display = 'none';
        }
      }

      // Update local form data
      userProfileLocalFormData[key] = value;
    }

    return isValid; // Return form validity

  }


  function init() {
    // Load form data from local storage
    const lsFormData = localStorage.getItem(userProfileLSName);
    if (lsFormData) {
      userProfileLocalFormData = JSON.parse(lsFormData);
    }
    updateFormData();
  }

  function updateFormData() {
    // Populate form fields with local storage data
    Object.entries(userProfileLocalFormData).forEach(([key, value]) => {
      const field = userProfileForm.querySelector(`[name=${key}]`);
      if (field) {
        const tagName = field.tagName.toLowerCase();
        switch (tagName) {
          case 'input':
            field.value = value;
            break;
          case 'textarea':
            field.innerHTML = value;
            break;
          case 'select':
            field.value = value;
            break;
        }
      }
    });
  }

  function resetLocalFormData() {
    // Clear local form data and reset form
    userProfileLocalFormData = {};
    localStorage.removeItem(userProfileLSName);
    userProfileForm.reset();
    updateFormData();
  }

  window.addEventListener("load", () => {
    init();

    // Submit event handler
    userProfileForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const isValid = getFormData(); // Validate and collect data
      if (isValid) {
        localStorage.setItem(userProfileLSName, JSON.stringify(userProfileLocalFormData)); // Save to local storage
        alert('Form submitted successfully!');
      }
    });

    // Reset event handler
    userProfileForm.addEventListener('reset', (event) => {
      resetLocalFormData();
    });
  });
})();
