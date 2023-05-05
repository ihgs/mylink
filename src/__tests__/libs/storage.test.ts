import {
  LinkData,
  addLink,
  countUp,
  deleteLink,
  listLinks,
  updateCategories,
  updateLink,
} from "../../libs/storage";
import { mockImplementation } from "../../__mocks__/localStorage";

const baseData = {
  title: "test_add_link",
  link: "http://example.com/test",
  category: "",
  tags: [],
};

test("addLink", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
});

test("addLink:aleady existing", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  expect(() => addLink(data)).toThrowError(new Error("already existing"));
});

test("updateLink", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  const link = listLinks()[0];
  const updateData = {
    ...link,
    title: "test_update_link",
    category: "mycategory",
  };
  updateLink(updateData);

  const updatedLink = listLinks()[0];
  expect(updatedLink.title).toBe("test_update_link");
  expect(updatedLink.category).toBe("mycategory");
});

test("updateLink:error", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  const link = listLinks()[0];
  const updateData = {
    ...link,
    link: "http://example.com/dummy",
    title: "test_update_link",
    category: "mycategory",
  };

  expect(() => updateLink(updateData)).toThrowError(new Error("Not found"));
});

test("deleteLink", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  addLink({ ...baseData, link: "http://example.com/test2" });
  const links = listLinks();

  expect(links.length).toBe(2);
  deleteLink(links[0].id!);

  const deletedLinks = listLinks();

  expect(deletedLinks.length).toBe(1);
  expect(deletedLinks[0].link).toBe("http://example.com/test2");
});

test("deleteLink:target is none", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  addLink({ ...baseData, link: "http://example.com/test2" });
  const links = listLinks();

  expect(links.length).toBe(2);
  deleteLink("dummy");

  const deletedLinks = listLinks();

  expect(deletedLinks.length).toBe(2);
});

test("countUp", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  let target = listLinks()[0];

  expect(target.count).toBeUndefined();

  countUp(target.id!);
  target = listLinks()[0];
  expect(target.count).toBe(1);

  countUp(target.id!);
  target = listLinks()[0];
  expect(target.count).toBe(2);

  countUp(target.id!);
  target = listLinks()[0];
  expect(target.count).toBe(3);

  countUp(target.id!);
  target = listLinks()[0];
  expect(target.count).toBe(4);
});

test("listLinks:with now", () => {
  mockImplementation();
  const data: LinkData = { ...baseData };
  addLink(data);
  addLink({ ...baseData, link: "http://example.com/test2" });
  addLink({ ...baseData, link: "http://example.com/test3", tags: ["now"] });
  addLink({ ...baseData, link: "http://example.com/test4" });
  addLink({
    ...baseData,
    link: "http://example.com/test5",
    tags: ["now", "other"],
  });

  const links = listLinks();

  expect(links[0].link).toBe("http://example.com/test3");
  expect(links[1].link).toBe("http://example.com/test5");
  expect(links[2].link).toBe("http://example.com/test");
  expect(links[3].link).toBe("http://example.com/test2");
});
