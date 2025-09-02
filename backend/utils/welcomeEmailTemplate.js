export const welcomeEmailTemplate = (userFullname) => {
    return `
    
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to NotesXchange</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
        margin: 0;
      }
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header h1 {
        color: #2c3e50;
      }
      .content {
        color: #333;
        font-size: 16px;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 12px 20px;
        margin-top: 20px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        color: #888;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to NotesXchange 🎉</h1>
      </div>
      <div class="content">
        <p>Hi <strong>
        ${userFullname}</strong>,</p>
        <p>
          Your email has been successfully verified! We're excited to have you on board at <strong>NotesXchange</strong>.
        </p>
        <p>
          You can now log in, upload your notes, and start helping or learning from other students around the world.
        </p>
        <a href="https://notesxchange.vercel.app" class="btn">Get Started</a>
        <p>Thank you for being a part of our community!</p>
        <p>– The NotesXchange Team</p>
      </div>
      <div class="footer">
        © 2025 NotesXchange. All rights reserved.
      </div>
    </div>
  </body>
</html>

    
    
    `;
}