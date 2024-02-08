import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import SectionHeader from "../UI/SectionHeader";

interface Task {
  id: number;
  name: string;
  dueDate: string;
}

interface Project {
  id: number;
  name: string;
  deadline: Date;
  nextTask: Task;
}

type projectOverviewProps = {
  projects: Project[];
};

export default function ProjectOverview({ projects }: projectOverviewProps) {
  return (
    <>
      <Container>
        <SectionHeader title="Projects" count={projects.length} />
        <Flex display="column" overflowY="auto" p="4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </Flex>
      </Container>
    </>
  );
}
