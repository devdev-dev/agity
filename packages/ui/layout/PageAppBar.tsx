import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  FiChevronDown,
  FiEdit,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiStopCircle,
  FiSun,
} from "react-icons/fi";
import supabase, { useSession } from "supabase";
import { AppBarComponents } from "./AppBarComponents";

interface PageAppBarProps {
  links?: Array<PageAppBarLink>;
}

interface PageAppBarLink {
  id: string;
  children: ReactNode;
}

export const PageAppBar = ({ links }: PageAppBarProps) => {
  return (
    <Box
      as="header"
      gridColumn="1/-1"
      gridRow="2"
      zIndex="250"
      w="100%"
      pos="fixed"
      p="4"
      borderBottom={useColorModeValue("1px solid #EEE", "1px solid #333")}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
        <HStack>
          <AppBarComponents height="32px" />
          <Stack>
            <HStack>
              <Menu id="navbar" isLazy>
                <MenuButton
                  as={IconButton}
                  icon={<FiMenu />}
                  display={{ base: "flex", md: "none" }}
                />
                <MenuList
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  {links?.map((link) => (
                    <MenuItem minH="42px" key={link.id}>
                      {link.children}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {links?.map((link) => (
                  <Box key={link.id}>{link.children}</Box>
                ))}
              </HStack>
            </HStack>
          </Stack>
        </HStack>
        <Flex alignItems={"center"}>
          <AppBarUser />
        </Flex>
      </Flex>
    </Box>
  );
};

function AppBarUser() {
  const session = useSession();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu id="user-menu" matchWidth isLazy>
      <MenuButton p={2}>
        <HStack>
          <Text fontSize="sm">{session && session.user?.email}</Text>
          <Avatar size={"sm"} />
          <Box display={{ base: "none", md: "flex" }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList>
        <NextLink href="/" passHref>
          <MenuItem minH="42px" icon={<FiEdit />}>
            Dashboard
          </MenuItem>
        </NextLink>
        <MenuItem minH="42px" icon={<FiEdit />}>
          Profile
        </MenuItem>
        <MenuItem minH="42px" icon={<FiStopCircle />}>
          Billing
        </MenuItem>

        <MenuDivider />

        <HStack px="2" justifyContent={"space-between"}>
          <IconButton
            aria-label="Switch Theme"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
          />
          <IconButton
            variant={"ghost"}
            href="#"
            aria-label="Logout"
            icon={<FiLogOut />}
            onClick={() => supabase.auth.signOut()}
          />
        </HStack>
      </MenuList>
    </Menu>
  );
}
