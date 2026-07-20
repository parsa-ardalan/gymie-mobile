// services/dietApi.ts

const BASE_URL = 'http://localhost:3000/diet';

export const addIngredientApi = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  ingredient: string
) => {

  const url =
    `${BASE_URL}/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient`;

  console.log("🟢 ADD URL:", url);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredient }),
  });

  const data = await res.json();

  console.log("🟢 ADD RESPONSE:", data);

  return data;
};



export const updateIngredientApi = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  index: number,
  ingredient: string
) => {

  const url =
    `${BASE_URL}/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient/${index}`;

  console.log("🟡 UPDATE URL:", url);

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredient }),
  });

  const data = await res.json();

  console.log("🟡 UPDATE RESPONSE:", data);

  return data;
};



export const removeIngredientApi = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  index: number
) => {

  const url =
    `${BASE_URL}/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient/${index}`;

  console.log("🔴 DELETE URL:", url);

  const res = await fetch(url, {
    method: 'DELETE',
  });

  const data = await res.json();

  console.log("🔴 DELETE RESPONSE:", data);

  return data;
};