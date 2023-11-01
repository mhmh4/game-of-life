import { useState } from "react";

function Cell() {
  const [isAlive, setIsAlive] = useState(false);

  return (
    <>
      <div>cell</div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Cell />
    </>
  );
}
