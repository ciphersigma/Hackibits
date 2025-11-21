const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
const senderAddress = process.env.AZURE_EMAIL_SENDER; // e.g., "DoNotReply@xxxxxxxx.azurecomm.net"

let emailClient;
if (connectionString) {
  emailClient = new EmailClient(connectionString);
}

exports.sendAzureEmail = async (to, subject, htmlContent) => {
  if (!emailClient) {
    console.log('Azure Email not configured');
    return { success: false };
  }

  try {
    const message = {
      senderAddress: senderAddress,
      content: {
        subject: subject,
        html: htmlContent,
      },
      recipients: {
        to: [{ address: to }],
      },
    };

    const poller = await emailClient.beginSend(message);
    const result = await poller.pollUntilDone();
    
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Azure Email error:', error);
    throw error;
  }
};

exports.sendBulkAzureEmail = async (recipients, subject, htmlContent) => {
  if (!emailClient) {
    console.log('Azure Email not configured');
    return { success: false };
  }

  try {
    const message = {
      senderAddress: senderAddress,
      content: {
        subject: subject,
        html: htmlContent,
      },
      recipients: {
        to: recipients.map(email => ({ address: email })),
      },
    };

    const poller = await emailClient.beginSend(message);
    const result = await poller.pollUntilDone();
    
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Azure Bulk Email error:', error);
    throw error;
  }
};
