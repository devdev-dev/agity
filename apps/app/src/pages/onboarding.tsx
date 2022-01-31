import Head from "next/head";
import React from "react";
import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { LoginAvatarYou } from "../components/login/LoginAvatarGroup";
import { OnboardingForm } from "../components/login/OnboardingForm";
import { initAppDashboardProps } from "../utils/ssr/serversideprops";

const Login = () => {
  return (
    <>
      <Head>
        <title>Onboarding</title>
      </Head>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        textAlign="center"
      >
        <Stack spacing={{ base: 10, md: 20 }} justifyContent="center">
          <LoginAvatarYou />
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "2xl", md: "4xl", lg: "5xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              {" Welcome "}
            </Text>
            to Agity. Create your profile
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              {" and get started!"}
            </Text>
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <OnboardingForm />
        </Stack>
      </Container>
    </>
  );
};

export const getServerSideProps = initAppDashboardProps;

export default Login;
