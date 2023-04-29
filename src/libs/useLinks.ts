import { useEffect, useState } from "react";
import { FilterdLinks } from "../components/LinkList";
import { LinkData, listLinks } from "./storage";

const useLinks = (search: { title: string; category: string }) : [Array<LinkData>, FilterdLinks]=> {
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
    setLinks(items);
  };

  const filter = () => {
    filtedLinks();
  };

  return [links, filter];
};

export default useLinks;
