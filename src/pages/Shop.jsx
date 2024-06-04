import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import CategoryTree from "../components/CategoryTree";
// import CategoryAccessTree from "../components/CategoryAccessTree";
import ShopProductCard from "../components/ShopProductCard";
import {
  Center,
  Container,
  Box,
  Image,
  Flex,
  Heading,
  useToast,
  SkeletonText,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import AddOrRemoveInWishlist from "../utils/addOrRemoveInWishlist";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import BreadCrumbCom from "../components/BreadCrumbCom";
import { Select } from "chakra-react-select";
import CapitalizeLetter from "../utils/CommanFunction";
import ScrollToTop from "../components/ScrollToTop";
// import Paginator from "../components/Paginator";

export default function Shop() {
  const [totalPages, setTotalPages] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [tagWise, setTagWise] = useState(null);
  const [tagsArray, setTagsArray] = useState();
  const [productFoamsArray, setProductFoamsArray] = useState();
  const [brandArray, setBrandArray] = useState();
  const [productFoam, setProductFoam] = useState(null);
  const [brandWise, setBrandWise] = useState(null);
  const [banners, setBanners] = useState({
    bannerWeb: null,
    bannerMobile: null,
  });
  const navigate = useNavigate();
  const [displayBanners, setDisplayBanners] = useState(false);
  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);
  const toast = useToast();
  let [searchParams, setSearchParams] = useSearchParams();
  // let [searchParams, setSearchParams] = useSearchParams();
  let { search } = useLocation();
  const searchPar = new URLSearchParams(search);
  const categoryId = searchPar.get("category");
  const prod_search = searchPar.get("search");
  const page = searchPar.get("page") ? searchPar.get("page") : 1;
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { currentPage, setCurrentPage, pages } = usePagination({
    pagesCount: totalPages,
    limits: {
      outer: 3,
      inner: 3,
    },
    initialState: { currentPage: 1 },
  });
  const category_name = new URLSearchParams(search).get("category_name");

  let headers = { visitor: CheckOrSetUDID()?.visitor_id };
  const loginInfo = checkLogin();
  if (loginInfo.isLoggedIn === true) {
    headers = { Authorization: `token ${loginInfo.token}` };
  }
  let name = [
    localStorage.getItem("first_name"),
    localStorage.getItem("last_name"),
  ].join(" ");

  useEffect(() => {
    getFilter();
    CheckOrSetUDID();
    getProducts(); // eslint-disable-next-line
  }, [page, categoryId, sortKey, prod_search, brandWise, tagWise, productFoam]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getProducts(nextPage) {
    setLoading(true);
    try {
      let params = categoryId
        ? {
            page: nextPage ? nextPage : page,
            category_id: categoryId,
          }
        : { page: nextPage ? nextPage : page };

      if (sortKey !== null) {
        params["ordering"] = sortKey.value;
      }
      if (brandWise !== null) {
        params.brand = brandWise.value;
      }
      if (tagWise !== null) {
        params.product_tag = tagWise.value;
      }
      if (productFoam !== null) {
        params.product_foam = productFoam.value;
      }
      if (prod_search) {
        params.prod_search = prod_search;
      }
      const response = await client.get("/web/products/list/", {
        params: params,
        headers: {
          Accept: "application/json",
          ...headers,
        },
      });
      if (response.data.status === true) {
        if (response.data.message) {
          setProducts([]);
        } else {
          setTotalPages(response.data.total_pages);
          setProducts(response.data.data.data);
          if (response.data.hasOwnProperty("category_banners")) {
            const bannersObj = response.data?.category_banners;
            setBanners({
              bannerWeb: bannersObj?.web_banner,
              bannerMobile: bannersObj?.mobile_banner,
            });
            if (categoryId !== null) {
              setDisplayBanners(
                Object.values(bannersObj).every((value) => {
                  if (value === null || value === undefined) {
                    return false;
                  }
                  return true;
                })
              );
            } else {
              setBanners({
                bannerWeb: null,
                bannerMobile: null,
              });
              setDisplayBanners(false);
            }
          }
        }
        setLoading(false);
      } else {
        toast({
          title: "There was an error loading the products!",
          description: "Please reload the page",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
      if (categoryId !== null && currentPage !== 1) {
        setCurrentPage(1);
      }
    } catch (error) {
      toast({
        title: "not was an error loading the products!",
        description: "Please reload the page",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function getCategories() {
    setCatLoading(true);
    const response = await client.get("/categories/?mega_menu=mega_menu", {
      params: { list: true },
    });
    if (response.data.status === true) {
      setCategories(response.data.categories);
      setCatLoading(false);
    }
  }

  async function getFilter() {
    try {
      const [tagsResponse, foamsResponse, brandResponse] = await Promise.all([
        client.get("/web/product-tags/list/"),
        client.get("/web/product-foams/list/"),
        client.get("/web/brand/list/"),
      ]);
      let TagsArray = [];
      tagsResponse?.data?.data?.map((data) =>
        TagsArray.push({
          label: CapitalizeLetter(data.name),
          value: data.id,
        })
      );
      setTagsArray(TagsArray);
      let ProductFoamsArray = [];
      foamsResponse?.data?.data?.map((data) =>
        ProductFoamsArray.push({
          label: CapitalizeLetter(data.name),
          value: data.id,
        })
      );
      setProductFoamsArray(ProductFoamsArray);
      let BrandArray = [];
      brandResponse?.data?.data?.map((data) =>
        BrandArray.push({
          label: CapitalizeLetter(data.name),
          value: data.id,
        })
      );
      setBrandArray(BrandArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    const filtered = categories.filter((item) => item.id === categoryId);
    setFilteredData(filtered);
  }, [data, categoryId]);

  async function handlePageChange(nextPage) {
    setCurrentPage(nextPage);
    getProducts(nextPage);
    if (categoryId) {
      setSearchParams({
        page: nextPage,
        category: categoryId,
        category_name: category_name,
      });
    } else {
      setSearchParams({
        page: nextPage,
      });
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const handleWishlistChange = async (item, index) => {
    const wishlistResponse = await AddOrRemoveInWishlist(item.id);
    if (wishlistResponse.status === true) {
      var temp = [...products];
      var elementChange = temp[index];
      elementChange.is_wished = !item.is_wished;
      setProducts(temp);
    }
  };
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"Shop"} secondUrl={"/shop"} />
      </Container>

      <Container maxW="container.xl" py={4}>
        <Heading
          size="lg"
          fontWeight={600}
          color="brand.900"
          align="center"
          mb={6}
        >
          {category_name ?? `All Products`}
        </Heading>

        <Flex
          gap={"2.5vw"}
          justify="space-between"
          direction={{ base: "column", lg: "row" }}
        >
          <Flex direction="column" gap={6}>
            {/* {catLoading && !isMobile ? (
              <Flex padding="2" flexDirection={"column"} bg="white" gap={3}>
                <SkeletonText
                  noOfLines={1}
                  spacing="4"
                  width={20}
                  skeletonHeight="4"
                />
                {[0, 1, 2, 3, 4, 5, 6, 7].map(() => (
                  <Skeleton height={8} w={235} />
                ))}
              </Flex>
            ) : ( */}
            <>
              <Box
                // borderBottom={{ base: "none", lg: "1px" }}
                borderColor="gray.300"
              >
                <Heading size="sm" my={2} fontFamily={"inter"}>
                  Sort By
                </Heading>
                <Select
                  useBasicStyles
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                    option: (provided, state) => ({
                      backgroundColor: state.isSelected
                        ? "brand.500"
                        : "inherit",
                      cursor: "pointer",
                      padding: "8px 8px 5px 8px",
                      fontSize: 14,
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                  isClearable
                  size="sm"
                  value={sortKey}
                  sx={{ padding: "0 10px" }}
                  variant={"outline"}
                  onChange={(e) => setSortKey(e)}
                  placeholder="Select Option"
                  options={[
                    {
                      label: "Catalog Price - Low to High",
                      value: "base_price",
                    },
                    {
                      label: "Catalog Price - High to Low",
                      value: "-base_price",
                    },
                  ]}
                ></Select>

                {/* <Heading size="sm" my={2} fontFamily={"inter"}>
                  Brand Wise
                </Heading>
                <Select
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                    option: (provided, state) => ({
                      backgroundColor: state.isSelected
                        ? "brand.500"
                        : "inherit",
                      cursor: "pointer",
                      padding: "8px 8px 5px 8px",
                      fontSize: 14,
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                  useBasicStyles
                  bg="bg.900"
                  w={{ base: "100%" }}
                  mb={2}
                  size="sm"
                  borderRadius={"lg"}
                  isClearable
                  value={brandWise}
                  sx={{ padding: "0 10px" }}
                  variant={"outline"}
                  onChange={(e) => setBrandWise(e)}
                  options={brandArray}
                ></Select> */}
                <Heading size="sm" my={2} fontFamily={"inter"}>
                  Tag wise
                </Heading>
                <Select
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                    option: (provided, state) => ({
                      backgroundColor: state.isSelected
                        ? "brand.500"
                        : "inherit",
                      cursor: "pointer",
                      padding: "8px 8px 5px 8px",
                      fontSize: 14,
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                  useBasicStyles
                  bg="bg.900"
                  w={{ base: "100%" }}
                  mb={2}
                  size="sm"
                  borderRadius={"lg"}
                  isClearable
                  value={tagWise}
                  sx={{ padding: "0 10px" }}
                  variant={"outline"}
                  onChange={(e) => setTagWise(e)}
                  options={tagsArray}
                ></Select>
                <Heading size="sm" my={2} fontFamily={"inter"}>
                  Product Foam
                </Heading>
                <Select
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                    option: (provided, state) => ({
                      backgroundColor: state.isSelected
                        ? "brand.500"
                        : "inherit",
                      cursor: "pointer",
                      padding: "8px 8px 5px 8px",
                      fontSize: 14,
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                  useBasicStyles
                  bg="bg.900"
                  w={{ base: "100%" }}
                  mb={2}
                  size="sm"
                  borderRadius={"lg"}
                  isClearable
                  value={productFoam}
                  sx={{ padding: "0 10px" }}
                  variant={"outline"}
                  onChange={(e) => setProductFoam(e)}
                  options={productFoamsArray}
                ></Select>
              </Box>
              {/* {!isMobile && <CategoryTree categories={categories} />} */}
            </>
            {/* )} */}
          </Flex>
          {loading ? (
            <Flex
              wrap="wrap"
              gap={8}
              justify={{ base: "center", lg: "flex-start" }}
              align={{ base: "center", lg: "flex-start" }}
              w={{ base: "100%", lg: "100%" }}
              h="100%"
            >
              {[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19,
              ].map(() => (
                <Box
                  padding="4"
                  border="1px"
                  borderColor="gray.300"
                  borderRadius={"8px"}
                  bg="white"
                  w={{
                    base: "80vw",
                    sm: "40vw",
                    md: "215px",
                  }}
                >
                  <Skeleton height={180} />
                  <SkeletonText
                    my="3"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="4"
                  />
                  <hr />
                  <Flex
                    justifyContent={"space-evenly"}
                    flexDirection={"row"}
                    mt={2}
                  >
                    <Skeleton height={5} width={65} my="auto" />
                    <Flex flexDirection={"row"} gap={2}>
                      <Skeleton height={7} width={7} />
                      <Skeleton height={7} width={7} />
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Flex>
          ) : (
            <Flex
              wrap="wrap"
              gap={8}
              justify={{ base: "center", lg: "flex-start" }}
              align={{ base: "center", lg: "flex-start" }}
              w={{ base: "100%", lg: "100%" }}
              h="100%"
            >
              {products.length === 0 ? (
                <Center w="75%" mt={4}>
                  <Heading fontSize={18} color={"gray"}>
                    No products available!
                  </Heading>
                </Center>
              ) : (
                <>
                  <Image
                    w="100%"
                    h="100%"
                    display={displayBanners ? "block" : "none"}
                    src={banners?.bannerWeb}
                  />
                  {products !== null &&
                    products.map(
                      (product, index) => (
                        // return product.available_stock_quantity <= 0 ? null : (
                        <ShopProductCard
                          key={product.id}
                          productDetails={product}
                          isInWishlist={product.is_wished}
                          onClick={() => handleWishlistChange(product, index)}
                        />
                      )
                      // );
                    )}
                  <Pagination
                    pagesCount={totalPages}
                    currentPage={parseInt(page)}
                    onPageChange={handlePageChange}
                  >
                    <PaginationContainer
                      gap={2}
                      justifyContent="center"
                      width="100%"
                    >
                      <PaginationPrevious>Previous</PaginationPrevious>
                      <PaginationPageGroup gap={1}>
                        {pages.map((page) => (
                          <PaginationPage
                            key={`page_${page}`}
                            page={page}
                            p={2}
                            _current={{
                              bg: "brand.500",
                              color: "white",
                              _hover: {
                                bg: "brand.500",
                                color: "white",
                              },
                            }}
                          />
                        ))}
                      </PaginationPageGroup>
                      <PaginationNext isDisabled={pages.length === currentPage}>
                        Next
                      </PaginationNext>
                    </PaginationContainer>
                  </Pagination>
                </>
              )}
            </Flex>
          )}
        </Flex>
        {/* )} */}
        {/* <div itemScope itemType="http://schema.org/Product">
          <meta itemProp="brand" content="facebook" />
          <meta itemProp="name" content="Facebook T-Shirt" />
          <meta
            itemProp="description"
            content="Unisex Facebook T-shirt, Small"
          />
          <meta itemProp="productID" content="facebook_tshirt_001" />
          <meta itemProp="url" content="https://example.org/facebook" />
          <meta itemProp="image" content="https://example.org/facebook.jpg" />
          <div
            itemProp="value"
            itemScope
            itemType="http://schema.org/PropertyValue"
          >
            <span itemProp="propertyID" content="item_group_id" />
            <meta itemProp="value" content="fb_tshirts" />
          </div>
          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <link itemProp="availability" href="http://schema.org/InStock" />
            <link
              itemProp="itemCondition"
              href="http://schema.org/NewCondition"
            />
            <meta itemProp="price" content="7.99" />
            <meta itemProp="priceCurrency" content="USD" />
          </div>
        </div> */}
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
