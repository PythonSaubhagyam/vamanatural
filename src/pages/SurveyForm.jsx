import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Textarea,
  Flex,
  useToast,
} from "@chakra-ui/react";
import checkLogin from "../utils/checkLogin";
import { useParams } from "react-router-dom";
import Router from "../routes/routes";

function SurveyForm() {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [errorQuestionIds, setErrorQuestionIds] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getSurveyQuestions();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // eslint-disable-next-line
  }, [surveyId]);

  async function getSurveyQuestions() {
    const res = await client.get(`/surveys/${surveyId}`, {
      headers: { Authorization: `token ${checkLogin().token}` },
    });
    if (res.data.status === true) {
      setQuestions(res.data.survey.survey_questions);
      setUserResponse(
        res.data.survey.survey_questions.map((q) => ({
          question: q.id,
          choices: [],
          other: q.show_other === true ? "" : null,
          isSelected: false,
        }))
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const noRespQuestions = userResponse.filter((q) => q.isSelected === false);
    if (noRespQuestions.length > 0) {
      const errorQuestions = noRespQuestions.map((q) => q.question);
      setErrorQuestionIds(errorQuestions);
      const errInput = document.querySelector(
        `#question-${errorQuestions[0]}-label`
      );
      errInput.parentNode.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    } else {
      try {
        const res = await client.post(
          "/surveys/user-responses/",
          {
            surveyId: surveyId,
            userResponse,
          },
          { headers: { Authorization: `token ${checkLogin().token}` } }
        );
        if (res.data.status === true) {
          toast({
            title: res.data.message,
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
          Router.navigate("/");
        }
      } catch (error) {
        if (error.response.status === 403) {
          toast({
            title: error.response.data.message,
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            title:
              error.response.data.message ??
              "There was an error submitting your response!",
            description: "Please try again!",
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    }
  }

  function onChange(qId, value, other = false) {
    const tempUserResponse = [...userResponse];
    const relatedQuestionId = tempUserResponse.findIndex(
      (qResponse) => qResponse?.question === qId
    );
    if (other === true) {
      tempUserResponse[relatedQuestionId].other = value;
    } else {
      tempUserResponse[relatedQuestionId].choices = value;
    }
    setUserResponse(tempUserResponse);
    if (tempUserResponse[relatedQuestionId].choices.length !== 0) {
      tempUserResponse[relatedQuestionId].isSelected = true;
      const tempErrorIds = [...errorQuestionIds];
      if (tempErrorIds.includes(qId)) {
        tempErrorIds.splice(
          tempErrorIds.findIndex((id) => id === qId),
          1
        );
        setErrorQuestionIds(tempErrorIds);
      }
    } else {
      if (tempUserResponse[relatedQuestionId].show_other === true) {
        if (tempUserResponse[relatedQuestionId].other === "") {
          tempUserResponse[relatedQuestionId].isSelected = false;
        } else {
          tempUserResponse[relatedQuestionId].isSelected = true;
          const tempErrorIds = [...errorQuestionIds];
          if (tempErrorIds.includes(qId)) {
            tempErrorIds.splice(
              tempErrorIds.findIndex((id) => id === qId),
              1
            );
            setErrorQuestionIds(tempErrorIds);
          }
        }
      }
    }
  }

  function getResponseValue(qId, other = false) {
    if (userResponse.length > 0) {
      const relatedQuestionId = userResponse.findIndex(
        (qResponse) => qResponse?.question === qId
      );
      if (other === true) {
        return userResponse[relatedQuestionId]?.other;
      } else {
        return userResponse[relatedQuestionId]?.choices;
      }
    } else {
      return [];
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Container as={Flex} direction="column" gap={8} my={6}>
          {questions?.map((question, idx) => (
            <FormControl
              key={question.id}
              id={`question-${question.id}`}
              isInvalid={errorQuestionIds.includes(question?.id)}
            >
              <FormLabel fontSize="md" fontWeight={600} color={"gray.500"}>
                {idx + 1}. {question?.title}
              </FormLabel>
              {errorQuestionIds.includes(question?.id) && (
                <FormErrorMessage mb={4}>
                  Please select an option!
                </FormErrorMessage>
              )}
              {question.res_type === "Multiple Choice" && (
                <CheckboxGroup
                  colorScheme="brand"
                  value={getResponseValue(question.id)}
                  onChange={(newValue) => onChange(question.id, newValue)}
                >
                  <Flex direction="column" gap={2}>
                    {question?.choices?.map((choice, idx) => (
                      <Checkbox key={idx} value={choice} w="fit-content">
                        {choice}
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              )}
              {question.res_type === "Radio" && (
                <RadioGroup
                  name={question?.title}
                  colorScheme="brand"
                  defaultValue={[]}
                  value={getResponseValue(question.id)[0]}
                  onChange={(value) => onChange(question.id, [value])}
                >
                  <Flex direction="column" gap={2}>
                    {question?.choices?.map((choice, idx) => (
                      <Radio key={idx} value={choice} w="fit-content">
                        {choice}
                      </Radio>
                    ))}
                  </Flex>
                </RadioGroup>
              )}
              {question.show_other === true && (
                <FormControl>
                  <FormLabel mt={4} mb={1} color="gray.500">
                    Other (please specify)
                  </FormLabel>

                  <Textarea
                    value={getResponseValue(question.id, true)}
                    onChange={(e) =>
                      onChange(question.id, e.target.value, true)
                    }
                  ></Textarea>
                </FormControl>
              )}
            </FormControl>
          ))}
          <Flex justify="center">
            <Button colorScheme="brand" type="submit">
              Submit
            </Button>
          </Flex>
        </Container>
      </form>
      <Footer />
    </>
  );
}

export default SurveyForm;
