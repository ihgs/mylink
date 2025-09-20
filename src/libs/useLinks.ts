import { useEffect, useState } from "react";
import { FilterdLinks, SortLinks } from "../components/LinkList";
import { LinkData, listLinks } from "./linkStorage";

const useLinks = (search: {
  title: string;
  category: string;
}): [Array<LinkData>, FilterdLinks, SortLinks] => {
  const [links, setLinks] = useState<Array<LinkData>>([]);

  useEffect(() => {
    filtedLinks();
  }, []);

  const filtedLinks = () => {
    let items = listLinks();
    if (search.title || search.category) {
      items = items.filter((item) => {
        if (search.title) {
          if (!item.title.includes(search.title)) {
            return false;
          }
        }
        if (search.category) {
          if (!item.category.includes(search.category)) {
            return false;
          }
        }
        return true;
      });
    }
    return items;
  };

  const filter = () => {
    setLinks(filtedLinks());
  };

  const sort: SortLinks = (order) => {
    const items = filtedLinks();
    setLinks(
      items.sort((a, b) => {
        return (order == "asc" ? +1 : -1) * ((a.count ?? 0) - (b.count ?? 0));
      })
    );
  };

  return [links, filter, sort];
};

export default useLinks;
