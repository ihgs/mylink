import { useState } from 'react';
import LinkList from './components/LinkList';
import NewLink from './components/NewLink';

function Home() {
  const [reload, setReload] = useState<any>({})

  const postSave = () => {
    setReload({})
  }

  return (
    <div className="App w-5/6 mx-auto">
      <h1 className="text-3xl font-bold underline m-10">
        Manage Link
      </h1>
      <LinkList realod={reload} />
      <NewLink postSave={postSave}/>
    </div>
  );
}

export default Home;
