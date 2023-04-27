import React from "react";
import Layout from "../layout";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="container mx-auto py-28">
        <h1 className="font-maxbold text-xl sm:text-3xl">
          TERMS AND CONDITIONS
        </h1>

        <p className="font-bold mt-4 mb-12 text-lg sm:text-xl text-zinc-600">
          Welcome to Trouble Partner!
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          INTRODUCTION
        </h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          Please read the following Terms of Use carefully. By using the
          "Trouble Partner" website (hereinafter referred to as the "Platform"),
          you agree to these terms. If you do not agree to these terms, please
          do not use the Platform.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          Terms of Use
        </h2>

        <p className="mb-2 text-lg font-medium tracking-tight">
          Your access and use of the Platform must comply with the following
          conditions:
        </p>

        <p className="mb-2 text-lg font-medium tracking-tight">
          a. The Platform is provided for personal use only. It is prohibited to
          use the Platform for any commercial purpose.
        </p>

        <p className="mb-2 text-lg font-medium tracking-tight">
          b. When using the Platform, you must comply with applicable Turkish
          laws. The Platform may not be used for any illegal activity.
        </p>

        <p className="mb-2 text-lg font-medium tracking-tight">
          c. Any activity that may jeopardize the security of the Platform or
          interfere with the operation of the Platform is prohibited.
        </p>
        <p className="mb-2 text-lg font-medium tracking-tight">
          d. You may not violate the privacy or intellectual property rights of
          any person by using the Platform.
        </p>

        <p className="mb-12 text-lg font-medium tracking-tight">
          e. You do not have to pay any fees for access to the Platform.
        </p>
        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          Creating an Account
        </h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          You must be over 18 years of age to create an account on the Platform.
          To create an account, you are required to provide personal
          information. It is important that you keep this information accurate
          and up to date.
        </p>
        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          Disclaimer of Liability
        </h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          The Platform does not guarantee the accuracy or consistency of the
          information provided by users. The Platform is also not responsible
          for the comments or behavior of other users.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          Copyright and Intellectual Property Rights
        </h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          All content on the Platform is protected by copyright or other
          intellectual property rights. No content on the Platform may be
          copied, distributed or modified without permission.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">Changes</h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          The Platform reserves the right to change these Terms of Use at any
          time. Amendments will become effective upon posting on the Platform.
          Continued use of the Platform constitutes your acceptance of the
          changes.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">Privacy</h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          The Platform acknowledges and respects the privacy of its users. The
          Platform does not collect, share, or sell personal information without
          the user's consent. However, users should be aware that when they
          share their problems and concerns, they may voluntarily provide
          personal information. The Platform takes necessary precautions to
          ensure the security of user's personal information but does not assume
          any liability for any loss, misuse, or alteration of user information.
          By using the Platform, users acknowledge and agree that the Platform
          does not assume any responsibility or liability for the
          confidentiality, security, or integrity of any user information. Users
          are solely responsible for any personal information they choose to
          share on the Platform.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">Termination</h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          The Platform reserves the right to terminate any user's account at any
          time. The Platform also reserves the right to terminate the accounts
          of users who violate these Terms of Use.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">
          Dispute Resolution
        </h2>

        <p className="mb-12 text-lg font-medium tracking-tight">
          If you breach these Terms of Use or have any dispute arising out of
          the use of the Platform, you should contact the Platform to seek
          remedies. Dispute resolution will be governed by the laws of Turkey.
        </p>

        <h2 className="font-extrabold text-lg sm:text-xl my-3 ">Contact Us</h2>

        <p className="mb-2 text-lg font-medium tracking-tight">
          If you have any questions or concerns regarding the Platform, please
          visit our{" "}
          <Link href="/contact" className="text-blue-600 font-extrabold">
            Contact page
          </Link>{" "}
          on our website or send an email to [
          <a
            href="mailto:info@troublepartner.com"
            className="text-blue-600 font-extrabold"
          >
            info@troublepartner.com
          </a>
          ]. We will do our best to respond to your inquiry as soon as possible.
        </p>

        <p className="mb-2 text-lg font-medium tracking-tight">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of Turkey, and any disputes arising from or in
          connection with these Terms and Conditions or the use of the Platform
          shall be subject to the exclusive jurisdiction of the courts of
          Turkey. By using the Platform, you agree to submit to the jurisdiction
          of the courts of Turkey for any such disputes.
        </p>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
