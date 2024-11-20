export function initDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("files-database", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      // Delete the existing store to avoid errors in the deployed version
      if (db.objectStoreNames.contains("files")) {
        db.deleteObjectStore("files");
      }

      db.createObjectStore("files", { keyPath: "id" });
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
  objectStore.add(fileData, fileData.id);
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
      console.error(err);
      reject(err);
    };
  });
}

export function getFile(id) {
  const result = initDatabase().then((db) => {
    if (!db) return;

    return new Promise((resolve, reject) => {
      const transaction = db?.transaction("files", "readwrite");
      const objectStore = transaction.objectStore("files");
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (err) => {
        reject(err);
      };
    });
  });

  return result;
}

export function deleteFile(db, id) {
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("files", "readwrite");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve({ status: 200 });
    };

    request.onerror = (err) => {
      reject({ status: 500 });
    };
  });
}

export async function updateFile(fileData) {
  try {
    const db = await initDatabase();
    const transaction = db.transaction("files", "readwrite");
    const objectStore = transaction.objectStore("files");
    objectStore.put(fileData, fileData.id);
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update file");
  }
}
