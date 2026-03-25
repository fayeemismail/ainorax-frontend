import Image from "next/image";

const CARD_W = 380;
const CARD_H = 520;

type Props = {
  title?: string;
  description?: string;
  bgColor?: string | null;
  textColor?: string | null;
  image?: { asset: { _id: string; url: string } };
  items?: { _key: string; title?: string; description?: string }[];
};

export default function ServiceCard({ title, description, bgColor, textColor, image, items }: Props) {
  const color = textColor ?? "#ffffff";
  const mutedColor = `${color}8C`;
  const dividerColor = `${color}14`;
  const bulletColor = `${color}66`;

  return (
    <div
      className="group relative flex-none flex flex-col rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 hover:border-white/20"
      style={{ width: CARD_W, height: CARD_H, background: bgColor ?? undefined }}
    >
      {image?.asset?.url && (
        <div className="relative w-full flex-none overflow-hidden" style={{ height: 180 }}>
          <Image
            src={image.asset.url}
            alt={title ?? "service"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/50" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 gap-4 overflow-hidden">
        <div className="flex-none">
          <h3 className="font-bold text-xl leading-snug" style={{ color }}>
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: mutedColor }}>
              {description}
            </p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="flex-none h-px w-full" style={{ background: dividerColor }} />
        )}

        {items && items.length > 0 && (
          <ul className="flex flex-col flex-1 justify-between">
            {items.map((item) => (
              <li key={item._key} className="flex items-start gap-3">
                <span className="mt-1.75 flex-none w-1.5 h-1.5 rounded-full" style={{ background: bulletColor }} />
                <div className="min-w-0">
                  {item.title && (
                    <p className="text-sm font-semibold leading-snug" style={{ color }}>
                      {item.title}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-xs mt-0.5 leading-relaxed line-clamp-2" style={{ color: mutedColor }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}