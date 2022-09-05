// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let id = 0;
let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") || 0;

function createId() {
  id++;
  window.localStorage.setItem("_idMax", id.toString());
  return id;
}

export default createId;
