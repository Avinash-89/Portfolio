// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation and Google Sheets Integration
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate inputs
    if (name === '' || email === '' || message === '') {
        alert('All fields are required!');
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
    } else {
        // Send form data to Google Sheets
        submitToGoogleSheets(name, email, message);

        // Alert user and reset form
        alert('Your message has been sent successfully!');
        document.getElementById('contact-form').reset();
    }
});

// Simple Email Validation Function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Submit data to Google Sheets via Google Sheets API
function submitToGoogleSheets(name, email, message) {
    const sheetId ='https://docs.google.com/spreadsheets/d/1O9UxiHCDI4TcimBJlHrjqbId_RKYO673p520Fhcwoik/edit?gid=0#gid=0';  // Replace with your Google Sheet ID
    const apiKey = 'AIzaSyD4iJLWKLLuXP74znHt7SDU_1VrEOSDcTc';  // Replace with your Google API key
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:C1:append?valueInputOption=RAW&key=${apiKey}`;

    const data = {
        "values": [
            [name, email, message]
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Data submitted to Google Sheets:', data))
    .catch(error => console.error('Error submitting data:', error));
}
