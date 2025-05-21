// Scroll effect for banner
window.addEventListener('scroll', () => {
    const banner = document.getElementById('banner');
    if (banner) {
      const scrollPosition = window.scrollY;
      banner.style.backgroundPosition = `center ${-(scrollPosition * 2.7)}px`;
    }
  });
  
  // SMS/Email Form Submission
  document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
      quoteForm.addEventListener('submit', function(e) {
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
        const confirmation = document.querySelector('.confirmation-message');
        confirmation.style.display = 'block';
        
        // Try SMS first on mobile devices
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          const phoneNumber = '5408558962';
          const smsLink = `sms:${phoneNumber}?&body=${encodeURIComponent(message)}`;
          window.location.href = smsLink;
          
          // Fallback to email if SMS doesn't work
          setTimeout(() => {
            if (!document.hidden) {
              sendEmailFallback(message);
            }
          }, 3000);
        } else {
          // Desktop - go straight to email
          sendEmailFallback(message);
        }
        
        // Reset form
        this.reset();
      });
    }
  });
  
  function sendEmailFallback(message) {
    const email = 'alex06aug30@gmail.com';
    const subject = 'New Quote Request';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }