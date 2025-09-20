import { decodeData, LinkData, loadData, saveData } from "../libs/linkStorage";
import fileDownload from "js-file-download";
import { ChangeEvent, useEffect, useState } from "react";

const LinkTable = ({ data }: { data: string }) => {
  const [links, setLinks] = useState<Array<LinkData>>([]);

  useEffect(() => {
    const json = JSON.parse(data);
    setLinks(JSON.parse(json["items"]));
  }, []);
  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(links) &&
            links.map((link: LinkData) => {
              return (
                <tr key={link.id}>
                  <td>{link.title}</td>
                  <td>{link.category}</td>
                  <td>{link.tags}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

const DataManager = () => {
  const [uploadData, setUploadData] = useState<string>();

  const download = () => {
    fileDownload(loadData(), "mylink.data");
  };

  const clickSave = () => {
    if (uploadData) {
      saveData(uploadData);
    }
  };
  const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input?.files) {
      for (let index = 0; index < input.files.length; index++) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result?.toString();
          if (text) {
            try {
              const json = decodeData(text);
              setUploadData(json);
            } catch (e) {
              console.log(e);
            }
          }
        };
        reader.readAsText(input.files[index]);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start">
        <label className="label">
          <span className="label-text">データ保存</span>
        </label>
        <div className="flex">
          <button type="button" className="btn m-3 w-match" onClick={download}>
            Download
          </button>
        </div>
        <form>
          <label className="label">
            <span className="label-text">データ更新</span>
          </label>
          <input type="file" className="file-input flex" onChange={loadFile} />
        </form>
        <div>
          {uploadData ? (
            <>
              <div>
                <button type="button" className="btn" onClick={clickSave}>
                  Save
                </button>
              </div>
              <LinkTable data={uploadData} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default DataManager;
