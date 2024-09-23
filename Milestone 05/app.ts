document.addEventListener('DOMContentLoaded' , ()=> {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement; 
    const Generatebutton =document.getElementById('Generated-button');
    const shareableLinkContainer = document.getElementById('Shareaable-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

    // Handle Form Submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent Page Reload

        // Collect Input Values
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('Education') as HTMLInputElement).value;
        const experience = (document.getElementById('Experience') as HTMLInputElement).value;
        const skills = (document.getElementById('Skills') as HTMLInputElement).value;

        // Save Form Data In Local Storage with username as key
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // saving data locally

        // Generate The Resume Content Dynamically
        const resumeHTML = `
        <h2><b>Editable Resume</b></h2>
        <h3><b>Personal Information</b></h3>
        <p><b>Name:</b><span contenteditable="true">${name}</span></p>
        <p><b>Email:</b><span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

        <h3><b>Education</b></h3>
        <p contenteditable="true">${education}</p>

        <h3><b>Experience</b></h3>
        <p contenteditable="true">${experience}</p>

        <h3><b>Skills</b></h3>
        <p contenteditable="true">${skills}</p>`;

        // Display The Generated Resume
        if(resumeDisplayElement){
            resumeDisplayElement.innerHTML = resumeHTML;
        } else {
            console.log('The Resume Element Is Missing.')
        }

        // Shareable link Generated URL with The Username only
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
        
        // Display The Shareable Link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });

    // Handle PDF Download
    downloadPdfButton.addEventListener('click', () => {
        window.print(); // This will open the print dialog and allow the user to save as PDF
    });

    // Prefill The Form Based On The Username In The URL
    const URLparams = new URLSearchParams(window.location.search);
    const username = URLparams.get('username');
    if (username) {
        // Auto Fill Form if data is found in local storage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('Education') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('Experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('Skills') as HTMLInputElement).value = resumeData.skills;
        }    
    }
});