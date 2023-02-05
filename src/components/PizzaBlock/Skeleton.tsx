import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className='pizza-block'>
    <ContentLoader
      speed={2}
      width={280}
      height={460}
      viewBox='0 0 280 460'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'>
      <rect x='20' y='0' rx='120' ry='120' width='240' height='240' />
      <rect x='55' y='270' rx='5' ry='5' width='170' height='17' />
      <rect x='0' y='312' rx='10' ry='10' width='280' height='87' />
      <rect x='5' y='430' rx='5' ry='5' width='90' height='25' />
      <rect x='125' y='420' rx='20' ry='20' width='155' height='40' />
    </ContentLoader>
  </div>
);

export default Skeleton;
