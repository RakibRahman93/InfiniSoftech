// pages/api/submitForm.js


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, options,message } = req.body;

      const googleScriptUrl = 'https://v1.nocodeapi.com/devjhonss/google_sheets/CJrbDpakOZTESKrE?tabId=Sheet1';
      const formData = { records: [[name, email, phone, subject,options, message ]] };

      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          [name,email,phone,subject,options,message,new Date().toLocaleString()]
        ]),
      });

      if (response.ok) {
        return res.status(200).json({ message: 'Form submitted successfully!' });
      } else {
        const data = await response.json();
        console.error('Error during form submission:', data);
        return res.status(500).json({ message: 'An error occurred. Please try again.' });
      }
     
    } catch (error) {
      console.error('Error during form submission:', error);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
