const Loading = () => {
  return (
      <div className="flex-grow flex justify-center items-center" style={{ height: 'calc(90vh)' }}>
        <img
          src="/logoloading.png"
          alt="Loading"
          className="animate-spin w-20 h-auto"
        />
      </div>
  );
};

export default Loading;
