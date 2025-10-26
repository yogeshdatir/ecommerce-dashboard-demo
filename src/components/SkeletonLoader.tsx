const SkeletonLoader = ({
  width = 'w-full',
  height = 'h-full',
  rounded = 'rounded-md',
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${width} ${height} ${rounded}`}
    ></div>
  );
};

export default SkeletonLoader;
