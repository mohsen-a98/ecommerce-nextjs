import React from "react";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureItem({ title, description, icon }: Props) {
  return (
    <div className="flex max-w-96 flex-col gap-3">
      <div className="grid size-12 place-items-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="text-body text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureItem;
