import { useState } from 'react';
import LinkList from './components/LinkList';
import NewLink from './components/NewLink';
import Title from './components/Title';

function Home() {
  const [reload, setReload] = useState<any>({})

  const postSave = () => {
    setReload({})
  }

  return (
    <div>
      <Title title="Manage Link" />
      <LinkList realod={reload} />
      <NewLink postSave={postSave}/>
    </div>
  );
}

export default Home;
