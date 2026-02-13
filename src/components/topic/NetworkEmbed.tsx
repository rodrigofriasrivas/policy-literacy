interface NetworkEmbedProps {
  topicId?: number;
}

export function NetworkEmbed({ topicId }: NetworkEmbedProps) {
  const src = topicId
    ? `/artefact/index.html?embed=true&mode=topic&topicId=${topicId}`
    : "/artefact/index.html?embed=true";

  return (
    <iframe
      src={src}
      className="w-full rounded-2xl"
      style={{ height: 500, border: 'none', background: 'transparent' }}
      title="Topic Network Visualization"
      allowTransparency
    />
  );
}
