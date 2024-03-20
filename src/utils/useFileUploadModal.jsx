import { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";
import checkLogin from "./checkLogin";

const useFileUploadModal = (client, toast, uploadUrl) => {
  const loginInfo = checkLogin();
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUpload, setUpload] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUploadedFiles([]);
  }, [isModalOpen]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const allowedFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );
    setUploadedFiles(allowedFiles);
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const importFun = async () => {
    setUpload(true);
    try {
      let formData = new FormData();
      formData.append("myfile", uploadedFiles[0]);
      const response = await client.post(uploadUrl, formData, {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (response) {
        handleCloseModal();
        toast({
          title: response?.data.message,
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        setUpload(false);
      }
    } catch (error) {
      setUpload(false);
      toast({
        title: "Error during file upload",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const ModalComponent = ({ children }) => (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Data</ModalHeader>
        <ModalBody>
          <Box>
            <Button
              height="48px"
              width="100%"
              border="2px"
              borderColor="green.500"
              onClick={handleChooseFileClick}
            >
              Choose File
            </Button>
            <Input
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              display="none"
              ref={fileInputRef}
            />
          </Box>

          {uploadedFiles.map((file, index) => (
            <HStack
              spacing="24px"
              p={3}
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              borderRadius={6}
              marginTop={6}
              key={index}
            >
              <CiFileOn size={30} />
              <Text fontSize="16">{file.name.slice(0, 15)}</Text>
              <Text fontSize="12" color="gray.500">
                Size: {(file.size / 1024).toFixed(2)} KB
              </Text>
            </HStack>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isUpload}
            colorScheme="green"
            onClick={importFun}
            mr={2}
          >
            Upload
          </Button>
          <Button colorScheme="red" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleFileChange,
    handleChooseFileClick,
    importFun,
    uploadedFiles,
    fileInputRef,
    ModalComponent,
    isUpload,
  };
};
export default useFileUploadModal;
