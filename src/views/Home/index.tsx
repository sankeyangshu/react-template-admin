import { Pagination } from 'antd';
const Home = () => {
  return (
    <div>
      <Pagination defaultCurrent={6} total={500} />
    </div>
  );
};

export default Home;
