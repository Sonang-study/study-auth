const now = new Date();
const date = now.getDate();
const month =
  now.getMonth() + 1 < 10 ? 0 + `${now.getMonth() + 1}` : now.getMonth() + 1;
const year = now.getFullYear();
const nowDate = `${year}-${month}-${date}`;
export default nowDate;
