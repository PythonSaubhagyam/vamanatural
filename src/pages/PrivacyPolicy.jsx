import React from "react";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Container maxW={"container.xl"} alignContent={"flex-start"}>
        <BreadCrumbCom
          second={"Privacy Policy"}
          secondUrl={"/privacy-policy"}
        />{" "}
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} centerContent>
        <Image src={require("../assets/Privacy-policy/Privacy_Policy.jpg")} />
        <VStack maxW={"6xl"} my={8} px={6}>
          <Box color={"text.300"} textAlign={"justify"}>
            We at Suryan Organic are committed to protecting and safe guarding
            your privacy
            <br />
            <br />
            This Privacy Policy describes the types of personal information we
            collect on the Suryan Organic website
            (<b>https://www.vamanatural.com/</b>) further referenced as
            girgauveda.com, how we may use that information and with whom we may
            share it. Our Privacy Policy also describes the measures we take to
            protect the security of this information as well as how you can
            access, modify or delete your personal information at any time. It
            also explains how you can object to the processing of your personal
            information or to receiving communications about our products and
            services. This Privacy Policy governs only information provided to{" "}
             <b>www.vamanatural.com</b>. It does not govern any other information or
            communications that may have been collected in any other manner like
            promotions, personal contact programmer etc.
            <br />
            <br />
            By accepting the Privacy Policy, you expressly consent to our use
            and disclosure of your personal information in accordance with this
            Privacy Policy.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Information We Collect:-
            </Text>
            <br />
            In general, you can visit the <b>www.vamanatural.com/</b>without telling us
            who you are or revealing any personally identifiable information.
            You can however, also register at our website which enables us to
            contact you by email or text messages on your mobile phone to inform
            you about our products or respond to your comments or queries. As
            part of the registration process, we collect and store your personal
            information that you may choose to provide us with, such as your
            name, email address, mobile phone number and date of birth.
            <br />
            <br />
            The technology that we use also allows us to collect aggregate
            information that does not identify you personally but lets us know
            your technology usage like the Uniform Resource Locater, Internet
            Protocol address, your operating system and browser type, etc. We
            may collect, compile, store, publish, promote, report, or otherwise
            disclose or use any such aggregate information which does not
            personally identify you. If any such aggregate information is
            correlated to you, it will be protected like any other personally
            identifiable information as described under this Privacy Policy.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Credit Card, Debit Card and Banking Information:-
            </Text>
            <br />
            girgauveda.com does not collect or store Credit Card or Debit Card
            or banking information. Such information may be provided by you
            during the purchase transaction. However this data does not come to
            girgauveda.com. It is directly transmitted through the payment
            gateway provider to the payment network or bank. No information is
            stored by girgauveda.com.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Data Hosting:-
            </Text>
            <br />
            The website is hosted with third party data hosting specialists.
            Information collected is kept on servers owned and managed by data
            hosting companies, which may be in India or overseas. The companies
            being used by girgauveda.com have data security processes in place.
            However girgauveda.com is not liable for any data theft or breach of
            security at the data centres hosting the website and holding
            consumer data
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              How We Use Your Personally Identifiable Information:-
            </Text>
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Marketing Emails
            </span>
            <br />
            <br />
            The information you have chosen to provide may be used by
            girgauveda.com to create and deliver to you emails such as our
            newsletters, surveys or other email messages containing product and
            event information, tips or promotions. If at any time you decide
            that you would not like to receive these emails, you may select the
            ‘Unsubscribe’ link on the email or edit your information and consent
            to receive email and other communication in the ‘Profile’ section
            for registered users
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Text Messages
            </span>
            <br />
            <br />
            You may receive text message/SMS alerts containing product and event
            information, tips or promotions on your mobile phone. Please note
            that girgauveda.com will never send you any unsolicited text message
            on your mobile phone. girgauveda.com does not charge any fee for you
            to receive any text message from us. However, your mobile service
            provider may charge you for sending and/or receiving text messages
            and air-time, as well as any other standard applicable rates charged
            by your mobile service provider.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Telephone calls
            </span>
            <br />
            <br />
            You may receive phone calls containing product and event
            information, tips or promotions on your mobile phone or landline
            phone.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Customized Service
            </span>
            <br />
            <br />
            We may use your personal information you have chosen to give us to
            provide you with customized service and use of our website. For
            example, we may suggest products that would be of particular
            interest to you. Such customized information may be conveyed to you
            by way of emails or text messages/sms and phone calls
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Technologies that Allow Us to Customize Your Experience on
              girgauveda.com:-
            </Text>
            <br />
            We use various technologies to collect information relating to your
            visit to our website, such as the Uniform Resource Locater (URL)
            that referred you to our website, Internet Protocol address, browser
            type, browser language, the date and time of your request, etc. This
            enables us to enhance and customize your experience on our website.
            For example, we may collect the Internet Protocol (IP) address
            identifying your computer or device and indicating your geographic
            region for statistical purposes. In some instances, we may use these
            technologies in combination with the personally identifiable
            information you provide on the website. These technologies may
            provide a variety of information such as whether you have visited
            girgauveda.com before. They also may enable you to save your
            preferences.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Information We Share and Who We Share With:-
            </Text>
            <br />
            We will not provide your personally identifiable information to
            third parties for their use in marketing their products or services
            to you without your consent. In addition, we do not sell or
            otherwise disclose personally identifiable information about our
            website visitors except as described here.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Affiliates
            </span>
            <br />
            <br />
            We may share your personal information with our Affiliates that
            distribute and market Suryan Organic products. Our Affiliates may
            use this information in accordance with this Privacy Policy
            including, if you have so chosen, sending you product information,
            tips or promotions. If you prefer that we not share your personal
            information with our Affiliates, please do not provide it to us.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Third Parties
            </span>
            <br />
            <br />
            We may retain other companies and individuals to perform functions
            on our behalf consistent with this Privacy Policy. Examples include
            web store management companies, order processing companies, courier
            companies, data analysis firms, customer support specialists, email
            vendors, web-hosting companies and fulfillment companies (e.g.,
            companies that coordinate mailings). Such third parties may be
            provided with access to personal information needed to perform their
            functions but may not use such information other than on our behalf
            and in accordance with this Privacy Policy.
            <br />
            <br />
            In addition, in some instances, you may be offered the opportunity
            to consent to the sharing of your information with a third party
            such as an event or promotion co-sponsor. If you consent, we will
            share your information with such third party and the information you
            provide may be used by such third party for their own purposes and
            in accordance with their own policies.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Business Transfers
            </span>
            <br />
            <br />
            As we continue to develop our business, we might sell certain of our
            assets. In such transactions, user information, including personal
            information, generally is one of the transferred business assets,
            and by submitting your personally identifiable information on the
            website you agree that your data may be transferred to such parties
            in these circumstances.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Compliance With Law
            </span>
            <br />
            <br />
            We may disclose information that is necessary to comply with any
            applicable law, regulation, legal process or governmental request.
            In addition, we may disclose any information when it is necessary to
            prevent physical harm or financial loss or in connection with
            suspected or actual illegal activity.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Transfer of Data to Other Countries
            </span>
            <br />
            <br />
            Suryan Organic, our Affiliates and third parties who may receive
            your personal information in accordance with this Privacy Policy and
            the databases in which your personal information is stored shall be
            located in India and are required to honour the privacy
            representations made in this Privacy Policy under applicable laws of
            this country. In case of transfer of data to any other country,
            legal protections applicable to personal information in the
            concerned country will apply.
            <br />
            <br />
            <span style={{ textDecoration: "underline", fontSize: "19px" }}>
              Children's Privacy
            </span>
            <br />
            <br />
            The website girgauveda.com is not designed for persons under the age
            of 13 and we do not knowingly collect personally identifiable
            information from anyone under the age of 13. If you are under 13
            years of age, you may browse girgauveda.com, but please do not
            provide your personal information to us. For example, you cannot
            register. If we become aware that we have inadvertently received
            personal information from a visitor under the age of 13 on the
            website, we will delete the information from our records.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              How We Protect Personal Information:-
            </Text>
            <br />
            We maintain reasonable safeguards for this website to protect
            against unauthorized disclosure, use, alteration or destruction of
            the personal information you provide on girgauveda.com. If you have
            any questions about security at our site, you can email us / visit
            the 'contact us' page.
            <br />
            <br />
            <Text fontWeight={600} fontSize={"24px"}>
              Updates to Our Privacy Policy:-
            </Text>
            <br />
            We may revise this Privacy Policy from time to time. If we decide to
            change our Privacy Policy, we will post the revised policy here. We
            suggest that you periodically consult this Privacy Policy.
          </Box>

          <br />
        </VStack>
      </Container>
      <Box
        w="100%"
        backgroundSize="100%"
        backgroundPosition="50% 100%"
        backgroundRepeat={"no-repeat"}
      >
        <Heading
          color="brand.500"
          size="lg"
          mx="auto"
          align={"center"}
          my={"5"}
          pb={"10px"}
        >
          AVAILABLE AT
        </Heading>
      </Box>
      <Container maxW={"container.xl"} mb={5} px={20} centerContent>
        <Image
           src={
            require("../assets/001.jpg")
          }
          w={"container.xl"}
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
