import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accordion from "../components/Accordion";
import { Container, Box, Text,Image } from "@chakra-ui/react";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";

export default function FAQS() {
  const generalInformationData = [
    {
      title: "How is SOSE Organic different from other organic Products",
      content:
        "SOSE Organic products come mainly comes from our Trusted & Ethical Farmers all over the Bharat. <br/><br/> We are an organic food, natural home care and handmade personal care brand from the house of Suryan Organic. We were born out of the need to start at the beginning, to go to the roots of our problems. As an enterprise that is inspired by the mission of Bansi Gir Gaushala, our aim is to contribute to the revival of “ Gau Sanskriti ”, an ancient culture which placed the Gaumata (Cow as the Divine Mother) at the center of all economic, cultural and social activity.  Agriculture is the foundation of such a culture, and it is with this paradigm that we seek to find solutions to the problems facing Bharat and humanity at large. <br/><br/> Our country and the world spend billions of dollars each year after synthetic fertilizer and pesticide subsidies. This introduces toxic chemicals in the food chain driving health imbalances and further spending on public health. We believe there is an urgent need to develop natural methods to improve farm production and distribution. <br/><br/> Our parent Suryan Organic has more than 10 years of organic farming, food research and development experience. We are associated with over 55,000 organic and naturally growing trusted farmers, from all over BHARAT. We believe that if we have to make a difference in society, our influence must extend from the farm all the way to the urban household.",
    },
    {
      title: "Why #SwitchToOrganic?",
      content:
        "Organic is not just a healthy way of eating but also guilt-free. When we take care of the earth, it takes care of us too. That said, organic growing methods are far more gentle on the land and aim at improving sustainability.",
    },
    {
      title: "What is Organic?",
      content:
        "Organic means in harmony with nature. In simple words, the produce that doesn't have any exposure to chemical fertilizers and chemical pesticides is termed organic. No amount of chemicals are used at any stage, from sowing until it reaches the stores for selling.",
    },
    {
      title: "Why SOSE Organic?",
      content:
        "Health is the wholeness and integrity of living systems. Founded on the belief that character need not lose out in our quest for advancement, SOSE seeks to support a wholesome life print. When humans are taking away the goodness of nature, we strive to turn the full wheel circle by preserving it. We do our bit for Mother Nature, and by making just one right change in life, so can everyone else.",
    },
    {
      title: "Why SOSE Organic products?",
      content:
        "SOSE Organic is promoted by Suryan Organic as inspired by Bansi Gir Gaushala, an integrated company headquartered in Gujarat, is primarily focused on organic and natural foods. Suryan Organic was founded with a vision of providing Pure, Healthy, Wholesome foods to Consumers and creating Sustainable Livelihood for farmers. It has been involved in the field production of crops, processing, product development, and marketing of organic products since last decade.",
    },
    {
      title: "Difference between organic and conventional grown foods?",
      content:
        "High nitrogen application to plant foods can increase crude protein concentration but decrease the nutritional value of that protein. Conventional fertilizing practices could result in higher crude protein content but poorer quality protein than organic practices. <br/><br/>There is considerable evidence from controlled experiments that some organic fertilizers result in lower nitrate concentrations in plants than conventional fertilizers. <br/><br/>The ultimate test of the nutritional value of food is its ability to support health, growth, and reproduction over successive generations of animals or humans. Evidence of increased disease resistance, productivity, or fertility of animals feeding on organically grown fodder is anecdotal.",
    },
    {
      title: "What does 'certified organic' mean?",
      content:
        "A grower or processor is 'certified organic' when Agricultural Products Export Development Authority (APEDA) accredited public or private Certification Agency has verified that the business meets the standards set forth as per said Organic Standards.",
    },
    {
      title: "How does one ensure the authenticity of Organic?",
      content:
        'Organic products undergo a rigorous certification process, from the farmland to the processor; each stage has to go through the certification process. India has adopted an Organic plan called "National Program for Organic Production: NPOP", and the certification is India Organic Certificate. Similarly, the USA has the organic standards under "National Organic Program: NOP", and the bars are called USDA. EU standards for Organic certification are followed for Europe.',
    },
  ];

  const productInformationData = [
    {
      title: "What kind of products do you have to offer?",
      content:
        "You can choose from our wide range of organic food product categories – GIR Gau Product, Ayurvedic and Herbal care products, Organic Grains & Cereals, Organic Flours, Organic Pulses, Organic Sugar, Organic Jaggery, Organic Whole Spices, Organic Masala Blends, Organic Superfoods & Health foods, Organic Tea & Organic Coffee, Organic Oils, Organic Honey, Natural Salts, Organic Ground Spices & Organic Dry Fruits, Instant Mix, Healthy Snacks, Organic and Natural Juices, Sweets, Healthy Sweetener, Homecare, Natural Utensils.",
    },
    {
      title: "How are organic products different?",
      content:
        "The difference between organic and non-organic products is how they are grown. As for organic foods, reduced pesticide use eliminates poison from the environment that kills helpful insects, such as honeybees, while reduced fertilizer use prevents polluted runoff that can poison rivers and oceans.",
    },
    {
      title: "Where can I buy SOSE products?",
      content:
        "While we're constantly looking to get our organic products to several stores so that they're conveniently available to you, you can find them at our online and offline retail stores.",
    },
    {
      title:
        "I have a product suggestion I'd love to see an organic version. How do I share it with you?",
      content:
        "We love it when you show appreciation for what we do. That said, we'd love to hear your organic product suggestions. You can drop an email regarding the same on care@suryanorganic.com, and we'll get back to you as soon as we can.",
    },
    {
      title:
        "Why does the SOSE package say 'no added sugar' when sugar content is reported in the back?",
      content:
        "Most foods have naturally occurred sugars. <br/><br/>Our products are sweetened with main jaggery, raisins, dates, and organic Honey etc.",
    },
    {
      title: "What do you mean by 'gluten-free'?",
      content:
        "Gluten refers to the protein found in specific grains like wheat, barley, etc. It acts as a glue that holds food together. <br/><br/>Gluten-free food is specifically necessary for people with allergic reactions to Gluten or suffering from Celiac disease. For others, a small amount of Gluten is essential to their diet.",
    },
    {
      title: "Some of your products are very high in calories. Why?",
      content:
        "Most of our wholesome ingredients, specifically healthy Nuts, tend to be naturally high in calories. These healthy calories help fill you up to avoid unhealthy calories throughout the day. For calorie-light, try our Muesli range!",
    },
    {
      title: "This product is pricey for the quantity I am receiving. Why?",
      content:
        "At SOSE Organic, we fill our box with so many qualities that your body will feel the difference after consistent use. We focus on providing the best ingredients generously in each package so that you can receive all of the medicinal health benefits and overall goodness. Your body will thank you!",
    },
    {
      title: "Will I always get the same taste from Organic Products?",
      content:
        "Therefore, these items are organic and only go through the natural process. Even from one batch number to other, the taste can may vary. That means that the actual taste will vary depending upon the soil condition, the farm type, handmade batches etc., compared to the conventional product, which maintains almost the same flavor because of the typical machine process and addition of the artificial preservatives and chemicals.",
    },
    {
      title: "Why does organic not look as good as conventional products?",
      content:
        "Organic products do not go through any process of polishing. Also, no chemicals are added for any artificial coloring shining agent or process. The absence of chemicals and no polishing makes the physical appearance of the organic product look less appealing.",
    },
    {
      title: "I've heard that organic foods don't taste that good. Is it true?",
      content:
        "Try organic food and see the difference. Organic food tastes better as it is grown in well-balanced soil. So, healthy plants have a great taste. <br/><br/>While there's no conclusive evidence that organic foods don't taste that good, some people may find that organic food tastes better because organic products are fresher when locally produced and being an organic brand farmer not used any hybrid seeds for growing foods also not used NON-GMO.",
    },
    {
      title: "Is organic food more nutritious than conventional food?",
      content:
        "The nutritional quality of organic foods is much better because of the emphasis on creating a natural ecosystem, soil fertility & conservation, and non-use of harmful fertilizers, pesticides, and using appropriate varieties. <br/><br/>The specific ingredients in fruits and vegetables that account for their many health-promoting benefits increasingly point to secondary plant metabolites, many of which are antioxidants, along with levels and mixtures of vitamins, minerals, and fiber content.",
    },
    {
      title:
        "Do I expect to see bugs in my pack more frequently than Conventional brands?",
      content:
        "Humid and Hot weather (e.g., Monsoon) is the most fertile development environment. Generally, all the processors will take care that while packing the organic produce, proper cleaning is done without violating the integrity of the organic nature. Hence, any typical Agri bugs/insects, beetle, etc., are removed. Being Organic, no chemical fumigation or pesticide can be used, and hence these invisible crawlers may survive. Even after a lot of care, with favorable environmental conditions, the eggs may hatch, and rarely possible to spot some bugs in a packet that is still not past its expiry date. So, if you do find these in your packet, don't panic, take it easy, you can clean these out. Still not convinced...? Please just get a replacement.",
    },
  ];

  const orderRelatedInformation = [
    {
      title: "What is the Five-day Replacement Guarantee?",
      content:
        "All products sold at www.sose.in are covered under our 5 Day Replacement Guarantee. In case there are any fitting issues, damages, defects, or any other problem, notify us within 5 days from the date of delivery, and we will either refund your money or send a replacement product to you. <br/><br/>To get a defective item replaced or return the thing that does not fit you, contact Customer Service via email at care@suryanorganic.com or phone at 7405095969, fill out the return form on our website within seven days from the date of delivery. The defective product or part will be recalled, and our quality team will check the issue.",
    },
    {
      title:
        "The following products shall not be eligible for return or replacement under this 5 Day Replacement Guarantee:",
      content:
        "<ul><li>Any product that has been used</li><li>Any product that has been sealed is broken</li><li>Any product not in its original condition</li><li>Any product that is returned without all original packaging and accessories, including the retail box and all other items originally included with the product at the time of delivery</li><li>Any product without a valid and readable serial number, including but not limited to products with missing, damaged, altered, tampered, or otherwise unreadable serial number</li></ul>",
    },
    {
      title: "How do I cancel an order on www.sose.in?",
      content:
        "<ol><li>Cancellation before the product is dispatched: <ul><li>In case the prepaid order is canceled before it is dispatched, we will refund the entire amount.</li></ul></li><br/><li>Cancellation after the product is either dispatched or delivered:<ul><li>• In case you have received the product, it will be eligible for a replacement if it is defective or is incorrect. Please refer approx. 5 Day Replacement for further details.</li></ul></ol>",
    },
    {
      title: "What is the procedure to return a product to www.sose.in?",
      content:
        "To initiate a return, contact Customer Service via email at care@suryanorganic.com or call us on 7405095969 or fill out the contact form on our website within 15 days from the date of delivery. Our customer service representative will help you with the process. <br/><br/>Please include the original contents, certificates, and any additional material sent with the shipment and ensure that the packet is sealed correctly.",
    },
    {
      title: "How will I be refunded for the return?",
      content:
        "Our QC team will inspect the return shipment upon receiving it at our Warehouse. Upon successful return processing, we will refund the purchase number of returned product(s). If you have paid online via credit card, debit card, or net banking, the refunded amount will be credited to your account.",
    },
    {
      title: "Why can't I track my order even though it has been shipped?",
      content:
        "Courier services usually take up to 24 hours to activate tracking for an order once it's been shipped. Please check again after the mentioned time.",
    },
    {
      title: "Can I get my orders delivered at a specific time?",
      content:
        "Please coordinate with the courier executive delivering your order to see if possible. Providing at a specific time may not always be an option for courier services due to their schedules.",
    },
    {
      title: "I missed the delivery of my order today. What should I do?",
      content:
        "If you aren't present when our courier partner attempts to deliver your order, they will contact you. Two additional attempts will be made on consecutive days, after which your package will be returned to our fulfillment center, and your account will be refunded for the order amount. If your order comes back to our fulfillment center, you can request it to be re-dispatched depending on the availability.",
    },
    {
      title: "What are the shipping charges?",
      content:
        "You can check your shipping fee in the Order Summary section of the Cart page. You will also be notified, on the Cart page, of the minimum order value above which you can get free shipping.",
    },
    {
      title: "Do you deliver internationally?",
      content:
        "Yes, we deliver our products worldwide, but you need to check once before placing an order; for the international order, please get in touch with us at export@suryanorganic.com.",
    },
  ];

  const businessInquiryInformation = [
    {
      title: "I wish to become a Retailer/Brand Partner",
      content:
        'Please email the details of the order you wish to place to organic@suryan.in with the subject line "Vendor Inquiry" or fill out the contact us form.',
    },
    {
      title: "I want to place a bulk order/I have a business query",
      content:
        'Please email the details of the order you wish to put to organic@suryan.in with the subject line "Bulk order."',
    },
  ];

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"FAQ"} secondUrl={"/faq"} />
      </Container>
      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/faqs.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "4xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
          FAQ
        </Text>
      </Container>
      <Container maxW={"container.xl"} pb={8} px={10} >
        <Box
          className="separator"
          w={{ base: "100%", lg: "90%" }}
          mx="auto"
          mb={4}
        >
          <Text
            fontSize={{ base: "xl", lg: "4xl" }}
            fontWeight={"600"}
            color="brand.100"
          >
            General Information
          </Text>
        </Box>
        <Accordion details={generalInformationData} />
        <Box
          className="separator"
          w={{ base: "100%", lg: "90%" }}
          mx="auto"
          my={8}
        >
          <Text
            fontSize={{ base: "xl", lg: "4xl" }}
            fontWeight={"600"}
            color="brand.100"
          >
            Product Information
          </Text>
        </Box>
        <Accordion details={productInformationData} />
        <Box
          className="separator"
          w={{ base: "100%", lg: "90%" }}
          mx="auto"
          my={8}
        >
          <Text
            fontSize={{ base: "xl", lg: "4xl" }}
            fontWeight={"600"}
            color="brand.100"
          >
            Order Related
          </Text>
        </Box>
        <Accordion details={orderRelatedInformation} />
        <Box
          className="separator"
          w={{ base: "100%", lg: "90%" }}
          mx="auto"
          my={8}
        >
          <Text
            fontSize={{ base: "xl", lg: "4xl" }}
            fontWeight={"600"}
            color="brand.100"
          >
            Bulk Orders & Business Inquiry
          </Text>
        </Box>
        <Accordion details={businessInquiryInformation} />
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
