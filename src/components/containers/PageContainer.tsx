import React from 'react';

const PageContainer = ({ children }: any) => {
  return (
    <div className="flex flex-col mx-4 min-[768px]:mx-8 my-2 pt-2 gap-4 rounded-2xl">
      {children}
    </div>
  );
};

export default React.memo(PageContainer);
