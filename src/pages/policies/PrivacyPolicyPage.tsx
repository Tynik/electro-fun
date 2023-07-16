import React from 'react';
import { Grid, Typography } from '@mui/material';

export const PrivacyPolicyPage = () => {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant={'h5'}>Privacy Policy</Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'body1'} sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
          At <strong>SmartStream Electronics</strong>, we are committed to protecting your privacy
          and ensuring the security of your personal information. This Privacy Policy outlines how
          we collect, use, and safeguard the data you provide to us when using our website and
          services.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Information Collection</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We may collect various types of information from you when you visit our website or
          interact with our services. This includes but is not limited to:
          <ul>
            <li>
              Personal information such as your name, email address, shipping address, and phone
              number.
            </li>
            <li>
              Non-personal information such as your IP address, browser type, device information,
              and website usage data.
            </li>
          </ul>
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Use of Information</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We use the collected information for the following purposes:
          <ul>
            <li>To process and fulfill your orders, including shipping and delivery.</li>
            <li>To communicate with you regarding your orders, inquiries, and promotions.</li>
            <li>
              To improve our website and services, and to enhance your overall shopping experience.
            </li>
            <li>
              To analyze website traffic and user behavior to better understand our customers'
              needs.
            </li>
          </ul>
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Data Security</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We take the security of your information seriously and implement appropriate measures to
          protect it. However, please understand that no data transmission over the internet or
          electronic storage method is 100% secure. We strive to use commercially acceptable means
          to protect your data, but we cannot guarantee absolute security.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Cookies and Tracking Technologies</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We may use cookies and similar tracking technologies to enhance your browsing experience
          on our website. Cookies are small data files that are placed on your computer or device to
          collect information about your preferences and activities on our site. You have the option
          to disable cookies through your browser settings, but this may affect certain features and
          functionality of our website.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Third-Party Disclosure</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We do not sell, trade, or otherwise transfer your personal information to third parties
          outside of our organization, except for trusted service providers who assist us in
          operating our website and providing services to you. These parties have agreed to keep
          your information confidential.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Children's Privacy</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          Our website and services are not intended for individuals under the age of 16. We do not
          knowingly collect personal information from children. If we become aware that we have
          inadvertently collected information from a child under 16, we will promptly delete it.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Changes to Privacy Policy</Typography>

        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          We reserve the right to update and modify this Privacy Policy from time to time. Any
          changes will be posted on this page, and the revised date will be indicated at the top of
          the policy. It is your responsibility to review this Privacy Policy periodically for any
          updates. By using our website and services, you consent to the terms outlined in this
          Privacy Policy. If you have any questions or concerns about our privacy practices, please
          contact us at m.aliynik@gmail.com.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Effective Date: 16/07/2023</Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography
          variant={'body1'}
          component="div"
          sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
        >
          Thank you for choosing <strong>SmartStream Electronics</strong>. Your privacy is essential
          to us, and we are dedicated to ensuring a safe and secure online experience for our valued
          customers.
        </Typography>
      </Grid>
    </Grid>
  );
};
