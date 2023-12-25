import React from 'react';

export default function WrapperIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-1 rounded-badge">{children}</div>;
}
