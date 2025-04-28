import Header from './components/Header';
import Content from './components/Content';

// Hooks
import useFetchData from './hooks/useFetchData';

function App() {
  const { data, status } = useFetchData();
  return (
    <>
      <Header />
      <Content data={data} status={status} />
    </>
  );
}

export default App;
