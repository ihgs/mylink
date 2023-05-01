import base64 from "base-64";
import utf8 from "utf8";

export interface LinkData {
  id?: string | null;
  title: string;
  link: string;
  category: string;
  count?: number;
  createdAt?: number;
  tags: Array<string>;
}

export interface TaskData {
  task: string;
  rank: number;
  status?: string;
}

const genId = (link: string) => {
  return base64.encode(utf8.encode(link));
};

const addLink = (data: LinkData) => {
  const items = listLinks();
  data.id = genId(data.link);
  data.createdAt = new Date().getTime();
  if (items.find((item) => item.id === data.id)) {
    alert("already existing");
    return;
  }
  items.push(data);
  localStorage.setItem("items", JSON.stringify(items));
};

const updateLink = (data: LinkData) => {
  const items = listLinks();
  data.id = genId(data.link);
  const index = items.findIndex((item) => item.id === data.id);
  items[index]["title"] = data.title;
  items[index]["category"] = data.category;
  localStorage.setItem("items", JSON.stringify(items));
};

const deleteLink = (id: string) => {
  const items = listLinks();
  const index = items.findIndex((item) => item.id === id);
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
};

const countUp = (id: string) => {
  const items = listLinks();
  const updateItem = items[items.findIndex((x) => x.id === id)];
  if (updateItem["count"]) {
    updateItem["count"] = updateItem["count"] + 1;
  } else {
    updateItem["count"] = 1;
  }

  localStorage.setItem("items", JSON.stringify(items));
};
const listLinks = (): Array<LinkData> => {
  const saved = localStorage.getItem("items");
  let items: Array<LinkData>;
  if (!saved) {
    items = [];
  } else {
    items = JSON.parse(saved);
  }

  const nows: Array<LinkData> = [];
  const others: Array<LinkData> = [];
  items.forEach((item) => {
    if (item.tags) {
      if (item.tags.indexOf("now") > -1) {
        nows.push(item);
      } else {
        others.push(item);
      }
    } else {
      others.push(item);
    }
  });
  return [...nows, ...others];
};

const listCategories = () => {
  const saved = localStorage.getItem("categories");
  let items: Array<string>;
  if (!saved) {
    items = [];
  } else {
    items = JSON.parse(saved);
  }
  return items;
};

const updateCategories = (items: Array<string>) => {
  localStorage.setItem("categories", JSON.stringify(items));
};

const loadData = (): string => {
  const categories = localStorage.getItem("categories");
  const items = localStorage.getItem("items");

  return base64.encode(utf8.encode(JSON.stringify({ categories, items })));
};

const decodeData = (data: string): string => {
  return utf8.decode(base64.decode(data));
};

const saveData = (data: string): void => {
  const jsonData = JSON.parse(data);
  if (jsonData["categories"]) {
    localStorage.setItem("categories", jsonData["categories"]);
  }
  if (jsonData["items"]) {
    localStorage.setItem("items", jsonData["items"]);
  }
};

const saveMemo = ({
  memo,
  version,
}: {
  memo: string;
  version: string | null;
}): string | null => {
  if (memo) {
    const savedMemoVersion = localStorage.getItem("memo_version");
    if (!savedMemoVersion || savedMemoVersion == version) {
      const newVersion = new Date().getTime().toString();
      localStorage.setItem("memo_version", newVersion);
      localStorage.setItem("memo", memo);
      return newVersion;
    }
    throw Error("Conflict");
  }
  return null;
};

const loadMemo = (): { memo: string; version: string | null } => {
  const memo = localStorage.getItem("memo");
  const version = localStorage.getItem("memo_version");

  return memo ? { memo, version } : { memo: "", version };
};

const clearMemo = () => {
  localStorage.removeItem("memo");
  localStorage.removeItem("memo_version");
};

const listTasks = (): Array<TaskData> => {
  const tasks = localStorage.getItem("mylink_tasks");
  if (!tasks) {
    return [];
  }
  return JSON.parse(tasks);
};
const addTask = (task: string, rank: number) => {
  const tasks = listTasks();
  tasks.push({ task, rank });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const deleteTask = (task: string) => {
  const tasks = listTasks()
    .map((datum) => {
      if (datum.task === task) {
        return undefined;
      } else {
        return datum;
      }
    })
    .filter((datum) => {
      return datum != undefined || datum != null;
    });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const doneTask = (task: string) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { ...datum, status: "done" };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const undoneTask = (task: string) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { task: datum.task, rank: datum.rank };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const updateTask = (task?: string, rank?: number) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { ...datum, rank };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

export {
  addLink,
  listLinks,
  countUp,
  updateLink,
  deleteLink,
  listCategories,
  updateCategories,
  loadData,
  saveData,
  decodeData,
  saveMemo,
  loadMemo,
  clearMemo,
  listTasks,
  addTask,
  deleteTask,
  updateTask,
  doneTask,
  undoneTask,
};
