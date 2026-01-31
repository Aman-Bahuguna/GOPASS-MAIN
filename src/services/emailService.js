/**
 * Email Service for GoPass Platform
 * 
 * In development: Logs emails to console and stores in localStorage
 * In production: Replace with actual email API (SendGrid, Nodemailer, etc.)
 */

const EMAIL_STORAGE_KEY = 'gopass_pending_emails';

// Email templates
const EMAIL_TEMPLATES = {
    PLATFORM_VERIFICATION_REQUEST: {
        subject: '🔔 New Platform Verification Request - GoPass',
        getBody: (data) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3d70b2 0%, #41d6c3 100%); padding: 30px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎫 GoPass Platform</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">New Verification Request</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1e293b; margin-top: 0;">New ${data.role} Registration</h2>
          
          <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #3d70b2; margin-top: 0;">👤 User Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Full Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Role:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.role}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Position:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.position}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #3d70b2; margin-top: 0;">🏫 College Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">College Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.collegeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">State:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.collegeState}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Pincode:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.pincode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">ID Card:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.idCardFileName || 'Uploaded'}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #fcd34d;">
            <p style="margin: 0; color: #92400e;">
              ⚠️ <strong>Action Required:</strong> Please review this verification request and approve or reject within 48 hours.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #3d70b2 0%, #41d6c3 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Review in Dashboard
            </a>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 16px 16px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © 2026 GoPass. All rights reserved.
          </p>
        </div>
      </div>
    `,
    },

    USER_REGISTRATION_CONFIRMATION: {
        subject: '✅ Welcome to GoPass! Your Account is Being Verified',
        getBody: (data) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3d70b2 0%, #41d6c3 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to GoPass!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1e293b; margin-top: 0;">Hi ${data.fullName}! 👋</h2>
          
          <p style="color: #475569; line-height: 1.6;">
            Thank you for registering as a <strong>${data.role}</strong> on GoPass! 
            We've received your verification request and our team is reviewing your credentials.
          </p>
          
          <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #3d70b2; margin-top: 0;">📋 What happens next?</h3>
            <ol style="color: #475569; line-height: 1.8; padding-left: 20px;">
              <li><strong>Platform Verification</strong> - Our team will verify your college ID (24-48 hours)</li>
              ${data.role === 'ORGANIZER' ? '<li><strong>Admin Approval</strong> - Your college admin will approve your account</li>' : ''}
              <li><strong>Account Activation</strong> - You\'ll receive an email once your account is active</li>
            </ol>
          </div>
          
          <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #6ee7b7;">
            <p style="margin: 0; color: #065f46;">
              ✅ <strong>Your Registration Details:</strong><br/>
              College: ${data.collegeName}<br/>
              Position: ${data.position}<br/>
              State: ${data.collegeState}
            </p>
          </div>
          
          <p style="color: #475569; line-height: 1.6;">
            If you have any questions, feel free to contact our support team.
          </p>
        </div>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 16px 16px; text-align: center;">
          <p style="color: #94a3b8; margin: 0 0 10px; font-size: 14px;">
            Need help? Contact us at support@gopass.com
          </p>
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            © 2026 GoPass. All rights reserved.
          </p>
        </div>
      </div>
    `,
    },

    VERIFICATION_APPROVED: {
        subject: '🎊 Congratulations! Your GoPass Account is Now Active',
        getBody: (data) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎊 Account Approved!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; text-align: center;">
          <h2 style="color: #1e293b;">Welcome aboard, ${data.fullName}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Great news! Your ${data.role.toLowerCase()} account has been verified and is now active.
            You can now access all features of the GoPass platform.
          </p>
          
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0;">
            Go to Dashboard
          </a>
        </div>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 16px 16px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © 2026 GoPass. All rights reserved.
          </p>
        </div>
      </div>
    `,
    },
};

// Get stored emails from localStorage
export const getStoredEmails = () => {
    try {
        const emails = localStorage.getItem(EMAIL_STORAGE_KEY);
        return emails ? JSON.parse(emails) : [];
    } catch {
        return [];
    }
};

// Store email in localStorage
const storeEmail = (email) => {
    try {
        const emails = getStoredEmails();
        emails.unshift(email);
        localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails.slice(0, 50))); // Keep last 50
    } catch (error) {
        console.error('Failed to store email:', error);
    }
};

// Clear stored emails
export const clearStoredEmails = () => {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
};

// Main send email function
export const sendEmail = async ({ to, template, data }) => {
    const templateConfig = EMAIL_TEMPLATES[template];

    if (!templateConfig) {
        console.error(`Unknown email template: ${template}`);
        return { success: false, error: 'Unknown template' };
    }

    const email = {
        id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        to,
        subject: templateConfig.subject,
        body: templateConfig.getBody(data),
        template,
        data,
        sentAt: new Date().toISOString(),
        status: 'sent',
    };

    // Log to console with styled output
    console.group('📧 Email Sent');
    console.log('%cTo:', 'font-weight: bold; color: #3d70b2', to);
    console.log('%cSubject:', 'font-weight: bold; color: #3d70b2', email.subject);
    console.log('%cTemplate:', 'font-weight: bold; color: #3d70b2', template);
    console.log('%cData:', 'font-weight: bold; color: #3d70b2', data);
    console.groupEnd();

    // Store in localStorage for viewing
    storeEmail(email);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true, emailId: email.id };
};

// Send platform verification request to admin team
export const sendPlatformVerificationRequest = async (userData) => {
    // Send to platform admin
    await sendEmail({
        to: 'platform-admin@gopass.com',
        template: 'PLATFORM_VERIFICATION_REQUEST',
        data: userData,
    });

    // Send confirmation to user
    await sendEmail({
        to: userData.email,
        template: 'USER_REGISTRATION_CONFIRMATION',
        data: userData,
    });

    return { success: true };
};

// Send approval notification
export const sendApprovalNotification = async (userData) => {
    return sendEmail({
        to: userData.email,
        template: 'VERIFICATION_APPROVED',
        data: userData,
    });
};

export default {
    sendEmail,
    sendPlatformVerificationRequest,
    sendApprovalNotification,
    getStoredEmails,
    clearStoredEmails,
};
