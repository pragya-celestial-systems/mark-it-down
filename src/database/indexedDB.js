export function initDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("files-database", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("files", { keyPath: "id" });
      objectStore.createIndex("file", "readmeFile", { unique: true });
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      resolve(db);
    };

    request.onerror = (e) => {
      console.error(e.target.error.message);
      reject(e.target.error.message);
    };
  });
}

export function saveFile(db, fileData) {
  const transaction = db.transaction("files", "readwrite");
  const objectStore = transaction.objectStore("files");
  const addRequest = objectStore.add(fileData, fileData.id);

  addRequest.onsuccess = function (event) {
    console.log(event, "data added successfully.");
  };

  let getRequest = objectStore.get(1);

  getRequest.onsuccess = function (event) {
    let result = event.target.result;
    console.log(result);
  };
}

export function getAllFiles(db) {
  if (!db) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("files");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (err) => {
      console.error(`Error to get all files: ${err}`);
      reject(err);
    };
  });
}
