import { prisma, hasPrisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    name,
    email,
    phone,
    subject,
    options,
    message,
    planTitle,
    planPrice,
  } = req.body;

  let sheetOk = false;
  let dbResult = null;

  // 1) Save to the admin leads table (Prisma) so it shows in the dashboard.
  if (hasPrisma()) {
    try {
      dbResult = await prisma.lead.create({
        data: {
          name: name || null,
          email: email || null,
          phone: phone || null,
          subject: subject || null,
          service: options || null,
          message: message || null,
          source: planTitle ? `Book a Free Call · ${planTitle}` : "Book a Free Call",
          status: "New",
        },
      });
    } catch (error) {
      console.error("Error saving lead to database:", error);
    }
  }

  // 2) Keep pushing to the Google Sheet (existing behaviour).
  try {
    const googleScriptUrl =
      "https://v1.nocodeapi.com/devjhonss/google_sheets/kImchouZBEvfaNhV?tabId=sheet1";
    const formattedPrice =
      typeof planPrice === "number" ? planPrice.toString() : `'${planPrice}'`;
    const sheetResponse = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        [
          name,
          email,
          phone,
          subject,
          options,
          message,
          planTitle,
          formattedPrice,
          new Date().toLocaleString(),
        ],
      ]),
    });
    sheetOk = sheetResponse.ok;
  } catch (error) {
    console.error("Error during form submission:", error);
  }

  if (dbResult || sheetOk) {
    return res.status(200).json({ message: "Form submitted successfully!" });
  }
  return res
    .status(500)
    .json({ message: "An error occurred. Please try again." });
}