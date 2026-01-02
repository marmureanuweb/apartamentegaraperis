import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import { Resend } from "resend";

// Environment configuration for Resend API key
// Set via: firebase functions:secrets:set RESEND_API_KEY
const resendApiKey = defineString("RESEND_API_KEY");

// Owner email configuration
const OWNER_EMAIL = "apartamentegaraperis@gmail.com";
const FROM_EMAIL = "Apartamente Gara Peris <noreply@apartamentegaraperis.ro>";

// Subject mappings for human-readable labels
const SUBJECT_LABELS: Record<string, string> = {
  informatii: "Informatii generale",
  vizita: "Programare vizita",
  pret: "Intrebare despre pret",
  altele: "Altele",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Validates the contact form data to ensure required fields are present
 * and email format is valid.
 */
function validateFormData(data: unknown): ContactFormData {
  if (!data || typeof data !== "object") {
    throw new Error("Date invalide. Te rugam sa completezi formularul.");
  }

  const formData = data as Record<string, unknown>;

  const name = formData.name;
  const email = formData.email;
  const message = formData.message;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Numele este obligatoriu.");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    throw new Error("Adresa de email este obligatorie.");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Adresa de email nu este valida.");
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw new Error("Mesajul este obligatoriu.");
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof formData.phone === "string" ? formData.phone.trim() : undefined,
    subject: typeof formData.subject === "string" ? formData.subject.trim() : undefined,
    message: message.trim(),
  };
}

/**
 * Generates the HTML email content for the owner notification.
 */
function generateOwnerEmailHtml(data: ContactFormData): string {
  const subjectLabel = data.subject ? SUBJECT_LABELS[data.subject] || data.subject : "Nespecificat";

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #198754; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">Mesaj nou de pe site</h1>
  </div>

  <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #198754; margin-top: 0;">Detalii contact</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; width: 120px;">Nume:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Email:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #198754;">${escapeHtml(data.email)}</a>
        </td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Telefon:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
          <a href="tel:${escapeHtml(data.phone)}" style="color: #198754;">${escapeHtml(data.phone)}</a>
        </td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Subiect:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">${escapeHtml(subjectLabel)}</td>
      </tr>
    </table>

    <h3 style="color: #198754; margin-top: 25px;">Mesaj:</h3>
    <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #198754;">
      ${escapeHtml(data.message).replace(/\n/g, "<br>")}
    </div>

    <p style="margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center;">
      Acest email a fost trimis automat de pe site-ul Apartamente Gara Peris.
    </p>
  </div>
</body>
</html>
`;
}

/**
 * Generates the HTML email content for the client confirmation.
 */
function generateClientEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #198754; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">Apartamente Gara Peris</h1>
  </div>

  <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #198754; margin-top: 0;">Multumim pentru mesaj!</h2>

    <p>Draga ${escapeHtml(data.name)},</p>

    <p>Am primit mesajul tau si iti multumim pentru interesul acordat apartamentelor noastre din Gara Peris.</p>

    <p>Echipa noastra va analiza solicitarea ta si te va contacta in cel mai scurt timp posibil.</p>

    <div style="background-color: white; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #198754;">
      <h3 style="margin-top: 0; color: #198754;">Rezumatul mesajului tau:</h3>
      <p style="margin-bottom: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>

    <p>Intre timp, ne poti contacta si pe urmatoarele canale:</p>

    <ul style="padding-left: 20px;">
      <li><strong>Telefon:</strong> <a href="tel:+40744123456" style="color: #198754;">+40 744 123 456</a></li>
      <li><strong>WhatsApp:</strong> <a href="https://wa.me/40744123456" style="color: #198754;">Trimite mesaj</a></li>
      <li><strong>Email:</strong> <a href="mailto:apartamentegaraperis@gmail.com" style="color: #198754;">apartamentegaraperis@gmail.com</a></li>
    </ul>

    <p style="margin-top: 30px;">Cu stima,<br><strong>Echipa Apartamente Gara Peris</strong></p>

    <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">

    <p style="font-size: 12px; color: #6c757d; text-align: center;">
      Acest email a fost trimis automat ca urmare a completarii formularului de contact de pe site-ul nostru.
      <br>
      <a href="https://apartamentegaraperis.ro" style="color: #198754;">apartamentegaraperis.ro</a>
    </p>
  </div>
</body>
</html>
`;
}

/**
 * Escapes HTML special characters to prevent XSS in email content.
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Firebase Function to handle contact form submissions.
 * Sends confirmation email to client and notification email to owner.
 */
export const sendContactEmail = onRequest(
  {
    cors: true,
    region: "europe-west1",
    secrets: [resendApiKey],
  },
  async (req, res) => {
    // Only accept POST requests
    if (req.method !== "POST") {
      res.status(405).json({
        success: false,
        message: "Metoda nepermisa. Foloseste POST.",
      } as EmailResponse);
      return;
    }

    try {
      // Validate form data
      const formData = validateFormData(req.body);

      // Initialize Resend client
      const resend = new Resend(resendApiKey.value());

      // Get subject label for email subject line
      const subjectLabel = formData.subject
        ? SUBJECT_LABELS[formData.subject] || formData.subject
        : "Contact";

      // Send both emails in parallel for better performance
      const [ownerEmailResult, clientEmailResult] = await Promise.all([
        // Email to owner with client details
        resend.emails.send({
          from: FROM_EMAIL,
          to: OWNER_EMAIL,
          replyTo: formData.email,
          subject: `[Contact Site] ${subjectLabel} - ${formData.name}`,
          html: generateOwnerEmailHtml(formData),
        }),
        // Confirmation email to client
        resend.emails.send({
          from: FROM_EMAIL,
          to: formData.email,
          subject: "Multumim pentru mesaj - Apartamente Gara Peris",
          html: generateClientEmailHtml(formData),
        }),
      ]);

      // Check if either email failed
      if (ownerEmailResult.error || clientEmailResult.error) {
        const errorMessage = ownerEmailResult.error?.message || clientEmailResult.error?.message;
        console.error("Email send error:", errorMessage);

        res.status(500).json({
          success: false,
          message: "A aparut o eroare la trimiterea emailului. Te rugam sa incerci din nou.",
          error: errorMessage,
        } as EmailResponse);
        return;
      }

      // Success response
      res.status(200).json({
        success: true,
        message: "Mesajul a fost trimis cu succes! Te vom contacta in curand.",
      } as EmailResponse);
    } catch (error) {
      console.error("Contact form error:", error);

      // Handle validation errors differently from server errors
      const isValidationError = error instanceof Error && !error.message.includes("Resend");

      res.status(isValidationError ? 400 : 500).json({
        success: false,
        message: error instanceof Error
          ? error.message
          : "A aparut o eroare neasteptata. Te rugam sa incerci din nou.",
      } as EmailResponse);
    }
  }
);
