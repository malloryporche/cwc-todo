const resetPasswordTemplate = (token, id) => {
  return `
  <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Reset Your Password</h2>
    <p>Congratulations! You're almost set to start using Animadigitalmarketing.com.
         Just click the button below to validate your email address and activate your account.</p>
         <a href="http://localhost:3000/reset-password/${token}/${id}" style="background: teal; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: inline-block;">Reset Your Password</a>
         <p>This link can only be used once and will expire in 1 hour.</p>
 `;
};

export default resetPasswordTemplate;
