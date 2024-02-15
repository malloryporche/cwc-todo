const resetPasswordTemplate = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Subject',
  text: 'Text content',
  html: '<p>HTML content</p>',
  // Add a function or method if needed
  send: () => {
    // Implementation to send the email
    console.log('Email sent!');
  },
};

export default resetPasswordTemplate;
