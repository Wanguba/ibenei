document.querySelector("#confirmButton").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Form Validation
  const fullName = document.querySelector("#fullName").value;
  const address = document.querySelector("#address").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  
  if (!fullName || !address || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
  }
  
  // Confirmation alert
  alert("Thank you for your purchase!");

  // Optionally, you can perform additional actions such as sending the order to a server here

  // Redirect to the home page after confirmation
  window.location.href = "../index.html";  // Redirects to the homepage
});

  