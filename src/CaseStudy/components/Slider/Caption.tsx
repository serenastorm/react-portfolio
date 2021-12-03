type CaptionProps = {
  copy: string | string[];
};

const Caption = ({ copy }: CaptionProps) => {
  const captions = typeof copy === "string" ? [copy] : copy;

  return (
    <>
      {captions.map((caption) => (
        <p className="listItem" key={caption}>
          {caption}
        </p>
      ))}
    </>
  );
};

export default Caption;
