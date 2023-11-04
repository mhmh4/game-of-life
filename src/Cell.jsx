export default function Cell({ isAlive, onCellClick }) {
  return (
    <>
      <span
        className={`w-6 h-6 border border-slate-500 select-none ${
          isAlive ? "bg-slate-500" : "bg-white hover:bg-slate-200"
        }`}
        onClick={onCellClick}
        onMouseMove={(event) => {
          if (event.buttons == 1) {
            onCellClick();
          }
        }}
      ></span>
    </>
  );
}
