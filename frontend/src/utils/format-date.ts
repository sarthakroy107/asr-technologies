export const formatDate = (date: string): string => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("default", { month: "short" });
  const year = new Date(date).getFullYear();

  return `${day}-${month}-${year}`;
};