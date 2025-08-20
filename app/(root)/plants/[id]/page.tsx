import React from "react";

const PlantPage = ({ params }: { params: { id: string } }) => {
  return <div>PlantPage {params.id}</div>;
};

export default PlantPage;
