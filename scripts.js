// SMS/Email Form Submission
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
  e.preventDefault();
    
    // Get form values
    const formData = {
      makeModel: this.elements['vehicle-type'].value,
      serviceType: this.elements['service-type'].value,
      concerns: this.elements['concerns'].value,
      date: this.elements['date'].value,
      time: this.elements['time'].value,
      name: this.elements['name'].value,
      contact: this.elements['contact'].value
    };
  
    // Format message
    const message = `New Quote Request:\n\n` +
                   `Name: ${formData.name}\n` +
                   `Contact: ${formData.contact}\n` +
                   `Vehicle: ${formData.makeModel}\n` +
                   `Service: ${formData.serviceType}\n` +
                   `Date: ${formData.date}\n` +
                   `Time: ${formData.time}\n` +
                   `Concerns: ${formData.concerns || 'None'}`;
  
    // Show confirmation
    document.getElementById('confirmation').style.display = 'block';
    
    // Improved mobile detection
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad Pro detection
  
    // Try SMS first on mobile devices
    if (isMobile) {
      const phoneNumber = '5408558962';
      const smsLink = `sms:${phoneNumber}?&body=${encodeURIComponent(message)}`;
      
      // Open in new tab/window
      const smsWindow = window.open(smsLink, '_blank');
      
      // Fallback to email if SMS window was blocked or failed
      setTimeout(() => {
        if (!smsWindow || smsWindow.closed) {
          sendEmailFallback(message);
        }
      }, 1000);
    } else {
      // Desktop - go straight to email
      sendEmailFallback(message);
    }
    
    // Reset form
    this.reset();
  });
  
  function sendEmailFallback(message) {
    const email = 'alex06aug30@gmail.com';
    const subject = 'New Quote Request';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(mailtoLink, '_blank');
  }