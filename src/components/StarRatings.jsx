import { Flex, Icon, Text } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StarRating = ({ avgRating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 !== 0;
  const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <Flex gap={1} alignItems="center">
      {/* <Text fontSize={16} ml={2}>{avgRating.toFixed(1)}</Text> */}
      {Array(filledStars).fill().map((_, i) => (
        <Icon key={i} as={AiFillStar} boxSize={6} color="#ffc107" />
      ))}
      {hasHalfStar && <Icon as={AiOutlineStar} boxSize={6} color="#ffd400" />}
      {Array(emptyStars).fill().map((_, i) => (
        //<Icon key={i} as={AiOutlineStar} boxSize={5} color="gray.300" />
        <Icon key={i} as={AiOutlineStar} boxSize={6} color="#ffd400" />
      ))}
      <Text fontSize={14} ml={0}>({avgRating.toFixed(1)})</Text>
    </Flex>
  );
};

export default StarRating;
