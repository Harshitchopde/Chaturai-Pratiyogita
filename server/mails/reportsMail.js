export const developerEmailTemplate = (issueName,issueDesc,email,status) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333;">New Issue Reported 🚨</h2>
        <p><strong>Name:</strong> ${issueName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Desc:</strong> ${issueDesc}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #fff; padding: 10px; border-radius: 5px; border-left: 5px solid #007bff;"></p>
        <p><strong>Status:</strong> <span style="color: ${status === 'High' ? 'red' : 'black'};">${status}</span></p>
        <p><strong>Reported At:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p style="color: #555;">Please check the admin dashboard for more details.</p>
      </div>
    `;
  };
  
  export const userAcknowledgmentEmail = (email,issueDesc) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #007bff;">Thank You for Contacting Us! 🙌</h2>
        <p>Hi <strong>${email}</strong>,</p>
        <p>We have received your message and our team will get back to you soon.</p>
        <p><strong>Subject:</strong> ${issueDesc}</p>
        <p><strong>Your Message:</strong></p>
        <p style="background-color: #fff; padding: 10px; border-radius: 5px; border-left: 5px solid #007bff;"></p>
        <p>For urgent matters, please reply to this email.</p>
        <hr>
        <p style="color: #555;">Best Regards, <br> Support Team</p>
      </div>
    `;
  };
  

  