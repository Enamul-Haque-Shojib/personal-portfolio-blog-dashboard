/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import removedFeaturesProjects from "@/actions/removedFeaturesProjects";
import selectedFeaturesProjects from "@/actions/selectedFeaturesProjects";


const SelectFeatures = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://personal-portfolio-blog-website-server.vercel.app/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjectsData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

    const handleSelectFeatures = async (id: string) => {
  try {
    const res = await selectedFeaturesProjects(id);
    if (res.success) {
                toast({ title: "Success", description: "Project selected and added successfully in to Feature !" });
            } else {
                toast({ variant: "destructive", title: "Error", description: "Failed to selected the project." });
            }

    // Update local state
    setProjectsData((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, isSelected: true } : project
      )
    );
  } catch (error: any) {
    toast({ variant: "destructive", title: "Error", description: "Something wrong." });
  }
};

const handleRemovedFeatures = async (id: string) => {
  try {
    const res = await removedFeaturesProjects(id);
    
    if (res.success) {
                toast({ title: "Success", description: "Project removed successfully from Feature!" });
            } else {
                toast({ variant: "destructive", title: "Error", description: "Failed to removed the project from Feature." });
            }

    // Update local state
    setProjectsData((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, isSelected: false } : project
      )
    );
  } catch (error: any) {
    toast({ variant: "destructive", title: "Error", description: "Something wrong." });
  }
};

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Select Top 3 Feature Projects</h2>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <Table className="w-full overflow-x-auto">
              <TableCaption>A list of your recent projects.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Selected</TableHead>
                  <TableHead className="w-1/4">Project Name</TableHead>
                 
                  <TableHead>Technologies</TableHead>
                 
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>
                  {
                    project.isSelected == false ? <Checkbox className="cursor-pointer" id="terms" checked={project.isSelected} onCheckedChange={()=>handleSelectFeatures(project._id as string)} /> :
                    <Checkbox className="cursor-pointer" id="terms" checked={project.isSelected} onCheckedChange={()=>handleRemovedFeatures(project._id as string)} />
                  }
                        
                        
                       
                </TableCell>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                  
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-white px-2 py-1 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectFeatures;
