import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiHelpCircle,
  FiSearch,
  FiXCircle,
} from "react-icons/fi";
import supabase from "supabase";
import debounce from "lodash/debounce";

enum UsernameCheckState {
  LOADING,
  VALID,
  ERROR,
}

export const OnboardingForm = () => {
  const router = useRouter();

  const [uid, setUid] = useState<string>("");
  const [usernameCheck, setUsernameCheck] = useState<UsernameCheckState>();
  const debouncedUsernameCheck = useRef(
    debounce((newUid: string) => {
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .match({ username: newUid })
        .then((query) => {
          if (query.error || query.count > 0) {
            setUsernameCheck(UsernameCheckState.ERROR);
          } else {
            setUsernameCheck(UsernameCheckState.VALID);
          }
        });
    }, 500)
  );

  const [displayName, setDisplayName] = useState<string>("");

  const handleUsernameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newUid = event.currentTarget.value;
    debouncedUsernameCheck.current.cancel();
    if (newUid && newUid.length > 0) {
      setUid(newUid);
      setUsernameCheck(UsernameCheckState.LOADING);

      debouncedUsernameCheck.current(newUid);
    } else {
      setUsernameCheck(undefined);
    }
  };

  const handleLogin = async () => {
    const result = await supabase.from("profiles").insert([
      {
        id: supabase.auth.session().user.id,
        username: uid,
        displayname: displayName,
      },
    ]);
    router.push("/");
  };

  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Create a profile
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          This is a one-time requirement to use Agity. <br /> You can always
          change them later✌️
        </Text>
      </Stack>
      <Box as={"form"}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label="Agity uses your username to associate your teams with an identity. It must be unique. ">
                <span>
                  <FiHelpCircle color="black" />
                </span>
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Your Username"
              onChange={handleUsernameChange}
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <InputRightElement>
              {usernameCheck === UsernameCheckState.LOADING && (
                <Skeleton>
                  <span>
                    <FiSearch color="grey" />
                  </span>
                </Skeleton>
              )}
              {usernameCheck === UsernameCheckState.ERROR && (
                <Tooltip label="This username is not available.">
                  <span>
                    <FiXCircle color="red" />
                  </span>
                </Tooltip>
              )}
              {usernameCheck === UsernameCheckState.VALID && (
                <Tooltip label="This username is available">
                  <span>
                    <FiCheckCircle color="green" />
                  </span>
                </Tooltip>
              )}
            </InputRightElement>
          </InputGroup>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label="Your display name may appear around Agity where you participate or are mentioned.">
                <span>
                  <FiHelpCircle color="black" />
                </span>
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Your Display Name"
              onChange={(event) => setDisplayName(event.currentTarget.value)}
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
          </InputGroup>
        </Stack>
        <Button
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          bgGradient="linear(to-r, red.400,pink.400)"
          color={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.400,pink.500)",
            boxShadow: "xl",
          }}
          onClick={handleLogin}
          disabled={usernameCheck !== UsernameCheckState.VALID}
        >
          Create your Profile
        </Button>
      </Box>
    </>
  );
};
