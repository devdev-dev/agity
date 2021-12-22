import {
  Avatar,
  AvatarGroup,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaUserAstronaut,
  FaUserGraduate,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";

export const LoginAvatarGroup = () => {
  const size = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Stack direction={"row"} spacing={4} justifyContent="center">
      <AvatarGroup>
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            icon={avatar.icon}
            size={size}
            position={"relative"}
            zIndex={2}
            _before={{
              content: '""',
              width: "full",
              height: "full",
              rounded: "full",
              transform: "scale(1.125)",
              bgGradient: "linear(to-bl, red.400,pink.400)",
              position: "absolute",
              zIndex: -1,
              top: 0,
              left: 0,
            }}
          />
        ))}
      </AvatarGroup>
      <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "5xl" }}>
        +
      </Text>
      <Flex
        align={"center"}
        justify={"center"}
        fontFamily={"heading"}
        fontSize={{ base: "sm", md: "lg" }}
        bg={useColorModeValue("gray.700", "gray.100")}
        color={useColorModeValue("gray.100", "gray.700")}
        rounded={"full"}
        width={useBreakpointValue({ base: "56px", md: "72px" })}
        height={useBreakpointValue({ base: "56px", md: "72px" })}
        position={"relative"}
        _before={{
          content: '""',
          width: "full",
          height: "full",
          rounded: "full",
          transform: "scale(1.125)",
          bgGradient: "linear(to-bl, orange.400,yellow.400)",
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      >
        YOU
      </Flex>
    </Stack>
  );
};

const avatars = [
  {
    icon: <FaUserAstronaut />,
  },
  {
    icon: <FaUserNinja />,
  },
  {
    icon: <FaUserGraduate />,
  },
  {
    icon: <FaUserSecret />,
  },
  {
    icon: <FaUserTie />,
  },
];
