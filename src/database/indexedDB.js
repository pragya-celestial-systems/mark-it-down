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

  // const fileData = {
  //   id: 0,
  //   readmeFile: "## title - list **bold text** - this is *italic* text.",
  // };

  const addRequest = objectStore.add(fileData, fileData.id);

  addRequest.onsuccess = function (event) {
    // Data added successfully
    console.log(event, "data added successfully.");
  };

  let getRequest = objectStore.get(1);

  getRequest.onsuccess = function (event) {
    let result = event.target.result;
  };
}

export function getAllFiles(db) {
  const request = db.transaction("files").objectStore("files").getAll();

  request.onsuccess = () => {
    const students = request.result;
    console.table(students);
    return students;
  };

  request.onerror = (err) => {
    console.error(`Error to get all students: ${err}`);
  };
}
