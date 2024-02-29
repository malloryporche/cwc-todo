import { Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export default function ProjectsView({ projects }: any) {
  return (
    <Container>
      <Heading>Projects</Heading>

      <Flex>
        <ul>
          {projects.map((project: any) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
      </Flex>
    </Container>
  );
}
