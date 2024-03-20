import {
  Box,
  Flex, SkeletonCircle
} from "@chakra-ui/react";
import { Header } from "./header";
import { SearchPanel } from "./search-panel";
import { ChatList } from "./chat-list";

export function LeftPanel({
  Groups,
  Groupsloading,
  setSearchQuery,
  setIsValid,
  isValid,
  closeChat,
}) {
  return (
    <Flex direction="column" w="25%" minWidth="25%" maxWidth="25%">
      <Box>
        <Header
          setSearchQuery={setSearchQuery}
          setIsValid={setIsValid}
          isValid={isValid}
        />
        <SearchPanel
          setSearchQuery={setSearchQuery}
          setIsValid={setIsValid}
          isValid={isValid}
         
        />
      </Box>
      <ChatList flex="1" overflow="auto" Groups={Groups}  closeChat={closeChat} />
      {Groupsloading && (
        <>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
          <Flex direction="row" padding="3" bg="white">
            <Box>
              <SkeletonCircle size="9" />
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  );
}
