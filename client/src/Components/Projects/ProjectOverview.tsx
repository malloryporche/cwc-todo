import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import SectionHeader from "../UI/SectionHeader";
import { Project } from "../../Pages/Dashboard";

type projectOverviewProps = {
  projects: Project[];
};

export default function ProjectOverview({ projects }: projectOverviewProps) {
  return (
    <>
      <Container>
        <SectionHeader title="Projects" count={projects?.length} />
        <Flex display="column" overflowY="auto" p="4">
          {projects?.map((project) => (
            <ProjectCard key={project?.id} project={project} />
          ))}
        </Flex>
      </Container>
    </>
  );
}
