(function () {
  "use strict";

  const DB_NAME = "huixie-workbench";
  const DB_VERSION = 1;
  const STORE_NAME = "workspace";

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("无法打开本地数据库"));
    });
  }

  async function transact(mode, work) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      let result;

      try {
        result = work(store);
      } catch (error) {
        database.close();
        reject(error);
        return;
      }

      transaction.oncomplete = () => {
        database.close();
        resolve(result);
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error("本地数据库操作失败"));
      };
      transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error("本地数据库操作已取消"));
      };
    });
  }

  async function get(key) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("无法读取本地数据"));
      transaction.oncomplete = () => database.close();
    });
  }

  function set(key, value) {
    return transact("readwrite", (store) => store.put(value, key));
  }

  function remove(key) {
    return transact("readwrite", (store) => store.delete(key));
  }

  function clear() {
    return transact("readwrite", (store) => store.clear());
  }

  window.HuixieStorage = { get, set, remove, clear };
})();
