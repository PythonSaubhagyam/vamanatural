import {
  Heading,
  Image,
  Text,
  Stack,
  LinkBox,
  Card,
  LinkOverlay,
} from "@chakra-ui/react";


export default function DetailCard({ details, cardType }) {
  return (
    <LinkBox
      as={Card}
      direction={"row"}
      overflow="hidden"
      variant="outline"
      h={"100px"}
      maxH={"100px"}
      minW={"300px"}
      cursor={"pointer"}
    >
      <Image
        objectFit="cover"
        maxW={"200px"}
        src={
          details.profile_image
            ? details.profile_image
            : "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/default profile.png"
        }
        alt={details.name}
      />

      <Stack ps={2} pe={6} spacing={1} justify="center">
        <Heading size="xs">
          <LinkOverlay
            href={
              cardType === "Employee"
                ? `/employees/details/${details.id}/`
                : `/contacts/details/${details.id}/`
            }
          >
            {cardType === "Employee"
              ? [details.first_name, details.last_name].join(" ")
              : details.name}
          </LinkOverlay>
        </Heading>
        <Text color={"gray.500"} fontSize="xs">
          {cardType === "Employee" ? details.role : details.contact_type}
        </Text>
        <Text color={"gray.500"} fontSize="xs">
          {cardType === "Employee" ? details.work_mail : details.email}
        </Text>
        <Text color={"gray.500"} fontSize="xs">
          {cardType === "Employee" ? details.work_mobile_no : details.phone_no}
        </Text>
      </Stack>
    </LinkBox>
  );
}
