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
  priority?: number;
}

const genId = (link: string) => {
  return base64.encode(utf8.encode(link));
};

const addLink = (data: LinkData) => {
  const items = listLinks();
  data.id = genId(data.link);
  data.createdAt = new Date().getTime();
  if (items.find((item) => item.id === data.id)) {
    throw new Error("already existing");
  }
  items.push(data);
  localStorage.setItem("items", JSON.stringify(items));
};

const updateLink = (data: LinkData) => {
  const items = listLinks();
  data.id = genId(data.link);
  const index = items.findIndex((item) => item.id === data.id);
  if (index === -1) {
    throw new Error("Not found");
  }
  items[index]["title"] = data.title;
  items[index]["category"] = data.category;
  items[index]["priority"] = data.priority;
  localStorage.setItem("items", JSON.stringify(items));
};

const deleteLink = (id: string) => {
  const items = listLinks();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
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

  items.sort((a, b) => {
    const pa = a.priority ?? -Infinity;
    const pb = b.priority ?? -Infinity;
    return pb - pa;
  });
  return [...items];
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
};
