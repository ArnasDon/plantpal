import React from "react";

const PlantPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>PlantPage {id}</div>;
};

export default PlantPage;
