interface NetworkEmbedProps {
  topicId?: number;
}

export function NetworkEmbed({ topicId }: NetworkEmbedProps) {
  const src = topicId
    ? `/artefact/index.html?topic=${topicId}`
    : "/artefact/index.html";

  return (
    <iframe
      src={src}
      className="w-full rounded-2xl border border-[rgba(255,255,255,0.08)]"
      style={{ height: 500 }}
      title="Topic Network Visualization"
    />
  );
}
