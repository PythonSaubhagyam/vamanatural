import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import TreeView from "react-accessible-treeview";

function CategoryAccessTree({ categories }) {
  return (
    <TreeView
      data={categories}
      nodeRenderer={({
        element,
        isBranch,
        isExpanded,
        handleExpand,
        getNodeProps,
        level,
      }) => (
        <Box
          {...getNodeProps({ onClick: handleExpand })}
          style={{ ps: 20 * (level - 1) }}
        >
          {isBranch && <BranchIcon isOpen={isExpanded} />}
          <Text as="span">{element.name}</Text>
        </Box>
      )}
    ></TreeView>
  );
}

const BranchIcon = ({ isOpen }) =>
  isOpen ? (
    <ChevronDownIcon display={"inline-flex"} />
  ) : (
    <ChevronRightIcon display={"inline-flex"} />
  );

export default CategoryAccessTree;
