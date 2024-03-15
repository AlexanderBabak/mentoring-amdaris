import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./features/common/libs/router";
import Loading from "./features/common/ui/atoms/Loading";

const App = () => {
  return (
    <Suspense>
      <RouterProvider fallbackElement={<Loading />} router={router} />
    </Suspense>
  );
};

export default App;
