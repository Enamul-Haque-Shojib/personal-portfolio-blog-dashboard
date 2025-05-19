
"use server"




const selectedFeaturesProjects = async(id: string) => {
    const res = await fetch(`http://localhost:5000/api/projects/feature-project/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({isSelected: true}),
            cache: 'no-store'
        }
    );
    const projectData = res.json();
    return projectData;
};

export default selectedFeaturesProjects;