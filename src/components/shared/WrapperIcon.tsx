import React from 'react';

export default function WrapperIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-badge bg-primary opacity-95">{children}</div>
  );
}
