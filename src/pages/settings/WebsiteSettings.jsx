import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import client from "../../setup/axiosClient";
import checkLogin from "../../utils/checkLogin";
import { Select } from "chakra-react-select";
export default function WebsiteSettings() {
  // const initialFormData = Object.freeze({
  //   activeCategory: 0,
  // });
  const [activeCategory, setActiveCategory] = useState("");
  // const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function getActiveCategory() {

      const response = await client.get("/home-active-category/");
      if (response.data.status === true) {
        setActiveCategory(response.data.selected_category);
      }
    }
    async function getCategories() {
      let Options = [];
      const response = await client.get("/categories/", {
        params: { list: true },
      });
      if (response.data.status === true) {
        response.data.categories?.map((data) =>
          Options.push({
            label: data.name,
            value: data.id,
          })
        );
        setCategories(Options);
      }
    }
    getCategories();
    getActiveCategory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await client.post(
      "/home-active-category/",
      {
        category_id: activeCategory.value,
      },
      {
        headers: { Authorization: `token ${checkLogin().token}` },
      }
    );
    if (res.data.status === true) {
      toast({
        title: "Active category updated!",
        position: "top-right",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Container maxW="100%" minH="sm" mt={6}>
      <Flex as="form" onSubmit={handleSubmit} direction="column">
        <FormControl w="50%" isRequired>
          <FormLabel>Home Page Category Display</FormLabel>
          <Select
            defaultValue={activeCategory}
            value={activeCategory}
            onChange={(e) => setActiveCategory(e)}
            placeholder="Select Category"
            options={categories}
            variant="outline"
            size="sm"
          >
          </Select>
        </FormControl>
        <Flex justify={"left"} mt={5} gap={3}>
          <Button type="submit" colorScheme={"brand"} width={"100px"}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
