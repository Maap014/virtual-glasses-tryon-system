export async function getGlasses(category: string = "all") {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_glasses?category=${category}`,
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
}
