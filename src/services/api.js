// const BASE_URL = "http://localhost:5000/api/projects";
const BASE_URL="https://metagenomics-backend.onrender.com/api/projects"
export const fetchPCA = async (projectId, token) => {
  const res = await fetch(`${BASE_URL}/pca`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
  });

  return res.json();
};

export const fetchVolcano = async (projectId, token) => {
  const res = await fetch(`${BASE_URL}/volcano`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
  });

  return res.json();
};

export const fetchHeatmap = async (projectId, token) => {
  const res = await fetch(`${BASE_URL}/heatmap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
  });

  return res.json();
};

export const fetchConfusion = async (projectId, token) => {
  const res = await fetch(`${BASE_URL}/confusion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
  });
  return res.json();
};
