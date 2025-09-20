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

export { saveMemo, loadMemo, clearMemo };
