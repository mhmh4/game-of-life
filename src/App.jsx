import { useState } from "react";

function Cell() {
  const [isAlive, setIsAlive] = useState(false);

  return (
    <>
      <span>cell</span>
    </>
  );
}

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
