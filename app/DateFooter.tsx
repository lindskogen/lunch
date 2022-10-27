export interface Props {
  lastUpdated: string;
}

export const DateFooter = ({ lastUpdated }: Props) => {
  const stringified = new Date(lastUpdated).toLocaleDateString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="pt2 ma4">
      <small className="mid-gray">
        Uppdaterat <time dateTime={lastUpdated}>{stringified}</time>
      </small>
    </div>
  );
};
