export default function CopyPopUp() {
  return (
    <div className="relative border border-neutral-700 bg-neutral-800 w-auto h-fit text-white">
      <div className="absolute -top-[10px] border-b-stone-700 border-l-[10px] border-l-transparent border-b-[10px] border-r-[10px] border-r-transparent" />
      <p className="text-xs py-2 px-2">Traducción copiada!</p>
    </div>
  );
}
