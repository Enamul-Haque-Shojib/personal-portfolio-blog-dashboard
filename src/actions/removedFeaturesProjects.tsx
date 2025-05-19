
"use server"




const removedFeaturesProjects = async(id: string) => {
    const res = await fetch(`http://localhost:5000/api/projects/feature-project/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({isSelected: false}),
            cache: 'no-store'
        }
    );
    const projectData = res.json();
    return projectData;
};

export default removedFeaturesProjects;