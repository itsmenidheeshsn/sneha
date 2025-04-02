import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Route from "./routes/Route";
function App() {
  return (
    <div>
      <RouterProvider router={Route} />
      <Toaster />
    </div>
  );
}

export default App;
