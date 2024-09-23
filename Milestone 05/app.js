document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeDisplayElement = document.getElementById('resume-display');
    var Generatebutton = document.getElementById('Generated-button');
    var shareableLinkContainer = document.getElementById('Shareaable-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Handle Form Submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent Page Reload
        // Collect Input Values
        var username = document.getElementById('username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('Education').value;
        var experience = document.getElementById('Experience').value;
        var skills = document.getElementById('Skills').value;
        // Save Form Data In Local Storage with username as key
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // saving data locally
        // Generate The Resume Content Dynamically
        var resumeHTML = "\n        <h2><b>Editable Resume</b></h2>\n        <h3><b>Personal Information</b></h3>\n        <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3><b>Education</b></h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3><b>Experience</b></h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3><b>Skills</b></h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>");
        // Display The Generated Resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
        }
        else {
            console.log('The Resume Element Is Missing.');
        }
        // Shareable link Generated URL with The Username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display The Shareable Link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });
    // Handle PDF Download
    downloadPdfButton.addEventListener('click', function () {
        window.print(); // This will open the print dialog and allow the user to save as PDF
    });
    // Prefill The Form Based On The Username In The URL
    var URLparams = new URLSearchParams(window.location.search);
    var username = URLparams.get('username');
    if (username) {
        // Auto Fill Form if data is found in local storage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('Education').value = resumeData.education;
            document.getElementById('Experience').value = resumeData.experience;
            document.getElementById('Skills').value = resumeData.skills;
        }
    }
});
