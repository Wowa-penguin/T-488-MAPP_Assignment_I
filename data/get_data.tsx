export default async function GetData() {
  const getDataFromJson = await fetch('./data.json');
  return getDataFromJson;
}
