// Professional Email Templates for HackiBits

exports.welcomeEmail = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00D084 0%, #00A86B 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">HackiBits</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Welcome to the Future of Tech</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Welcome, ${name}! 🎉</h2>
              <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Thank you for joining the <strong>HackiBits Beta Program</strong>! You're now part of an exclusive community of tech enthusiasts.
              </p>
              
              <!-- Benefits Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #00D084; margin: 0 0 15px 0; font-size: 18px;">🎁 Your Beta Benefits:</h3>
                    <ul style="color: #666666; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li><strong>30% discount</strong> on your first purchase</li>
                      <li><strong>Early access</strong> to all new products</li>
                      <li><strong>Priority support</strong> from our team</li>
                      <li><strong>Free shipping</strong> on your first order</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://hackibits.vercel.app" style="display: inline-block; background-color: #00D084; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Start Shopping
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                We'll keep you updated on product launches, exclusive offers, and tech news.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; margin: 0 0 10px 0; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #00D084;">The HackiBits Team</strong>
              </p>
              <p style="color: #999999; margin: 10px 0 0 0; font-size: 12px;">
                © 2024 HackiBits. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

exports.orderConfirmation = (name, orderId, items, total) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00D084 0%, #00A86B 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">✓ Order Confirmed!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 10px 0; font-size: 24px;">Thank you, ${name}!</h2>
              <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Your order has been confirmed and will be shipped soon.
              </p>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #999999; margin: 0 0 5px 0; font-size: 12px;">ORDER ID</p>
                    <p style="color: #333333; margin: 0; font-size: 18px; font-weight: bold;">#${orderId}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Items -->
              <h3 style="color: #333333; margin: 30px 0 15px 0; font-size: 18px;">Order Items:</h3>
              ${items.map(item => `
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 1px solid #e0e0e0; padding: 15px 0;">
                  <tr>
                    <td style="color: #333333; font-size: 14px;">${item.name} x ${item.quantity}</td>
                    <td align="right" style="color: #00D084; font-size: 14px; font-weight: bold;">₹${item.price}</td>
                  </tr>
                </table>
              `).join('')}
              
              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="color: #333333; font-size: 18px; font-weight: bold; padding: 15px 0;">Total</td>
                  <td align="right" style="color: #00D084; font-size: 24px; font-weight: bold; padding: 15px 0;">₹${total}</td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://hackibits.vercel.app/orders" style="display: inline-block; background-color: #00D084; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Track Order
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; margin: 0; font-size: 12px;">
                © 2024 HackiBits. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

exports.newsletterEmail = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00D084 0%, #00A86B 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">HackiBits Newsletter</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Latest Updates & Offers</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; margin: 0 0 10px 0; font-size: 12px;">
                You're receiving this because you subscribed to HackiBits newsletter.
              </p>
              <p style="color: #999999; margin: 0; font-size: 12px;">
                © 2024 HackiBits. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
